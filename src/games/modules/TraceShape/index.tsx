import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const CANVAS_SIZE = 250
const SHAPE_SIZE = 160
const PATH_TOLERANCE = 25
const MAX_SPEED = 8
const COMPLETION_THRESHOLD = 0.95 // 95% to complete (accounts for small gaps)

type Point = { x: number; y: number }
type ShapeType = 'circle' | 'triangle' | 'square'

// Generate points along a circle
function generateCirclePath(centerX: number, centerY: number, radius: number, numPoints: number): Point[] {
  const points: Point[] = []
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2 - Math.PI / 2
    points.push({
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius,
    })
  }
  return points
}

// Generate points along a triangle
function generateTrianglePath(centerX: number, centerY: number, size: number, numPoints: number): Point[] {
  const points: Point[] = []
  const height = size * 0.866 // Height of equilateral triangle
  const halfSize = size / 2

  // Three vertices: top, bottom-left, bottom-right
  const vertices: Point[] = [
    { x: centerX, y: centerY - height / 2 }, // Top
    { x: centerX - halfSize, y: centerY + height / 2 }, // Bottom-left
    { x: centerX + halfSize, y: centerY + height / 2 }, // Bottom-right
  ]

  const pointsPerSide = Math.floor(numPoints / 3)

  for (let side = 0; side < 3; side++) {
    const start = vertices[side]
    const end = vertices[(side + 1) % 3]

    for (let i = 0; i < pointsPerSide; i++) {
      const t = i / pointsPerSide
      points.push({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
      })
    }
  }

  return points
}

// Generate points along a square
function generateSquarePath(centerX: number, centerY: number, size: number, numPoints: number): Point[] {
  const points: Point[] = []
  const halfSize = size / 2

  // Four vertices: top-left, top-right, bottom-right, bottom-left
  const vertices: Point[] = [
    { x: centerX - halfSize, y: centerY - halfSize }, // Top-left
    { x: centerX + halfSize, y: centerY - halfSize }, // Top-right
    { x: centerX + halfSize, y: centerY + halfSize }, // Bottom-right
    { x: centerX - halfSize, y: centerY + halfSize }, // Bottom-left
  ]

  const pointsPerSide = Math.floor(numPoints / 4)

  for (let side = 0; side < 4; side++) {
    const start = vertices[side]
    const end = vertices[(side + 1) % 4]

    for (let i = 0; i < pointsPerSide; i++) {
      const t = i / pointsPerSide
      points.push({
        x: start.x + (end.x - start.x) * t,
        y: start.y + (end.y - start.y) * t,
      })
    }
  }

  return points
}

function getRandomShape(): ShapeType {
  const shapes: ShapeType[] = ['circle', 'triangle', 'square']
  return shapes[Math.floor(Math.random() * shapes.length)]
}

export const TraceShape = memo(function TraceShape({
  onComplete,
}: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [shapeType] = useState<ShapeType>(getRandomShape)
  const [isTracing, setIsTracing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isRushing, setIsRushing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [message, setMessage] = useState('')

  const lastPosRef = useRef<Point | null>(null)
  const tracedSegmentsRef = useRef<Set<number>>(new Set())
  const pathPointsRef = useRef<Point[]>([])
  const rushTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { playChime } = useSound()

  const getShapeName = useCallback(() => {
    switch (shapeType) {
      case 'circle': return 'circle'
      case 'triangle': return 'triangle'
      case 'square': return 'square'
    }
  }, [shapeType])

  // Draw the shape outline
  const drawShapeOutline = useCallback((ctx: CanvasRenderingContext2D) => {
    const centerX = CANVAS_SIZE / 2
    const centerY = CANVAS_SIZE / 2
    const radius = SHAPE_SIZE / 2

    ctx.strokeStyle = alpha(mindfulColors.primary.main, 0.3)
    ctx.lineWidth = 20
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    ctx.beginPath()
    if (shapeType === 'circle') {
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    } else if (shapeType === 'triangle') {
      const height = SHAPE_SIZE * 0.866
      const halfSize = SHAPE_SIZE / 2
      ctx.moveTo(centerX, centerY - height / 2)
      ctx.lineTo(centerX - halfSize, centerY + height / 2)
      ctx.lineTo(centerX + halfSize, centerY + height / 2)
      ctx.closePath()
    } else if (shapeType === 'square') {
      const halfSize = SHAPE_SIZE / 2
      ctx.rect(centerX - halfSize, centerY - halfSize, SHAPE_SIZE, SHAPE_SIZE)
    }
    ctx.stroke()

    // Draw thin outline
    ctx.strokeStyle = alpha(mindfulColors.pastel.lavender, 0.6)
    ctx.lineWidth = 4
    ctx.stroke()
  }, [shapeType])

  // Draw start indicator
  const drawStartIndicator = useCallback((ctx: CanvasRenderingContext2D) => {
    const points = pathPointsRef.current
    if (points.length === 0) return

    const startPoint = points[0]

    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, 12, 0, Math.PI * 2)
    ctx.fillStyle = alpha(mindfulColors.pastel.mint, 0.8)
    ctx.fill()
    ctx.strokeStyle = '#2E7D32'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [])

  // Main draw function
  const drawShape = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    drawShapeOutline(ctx)
    drawStartIndicator(ctx)

    // Draw traced segments
    if (tracedSegmentsRef.current.size > 0) {
      const points = pathPointsRef.current
      const sortedIndices = Array.from(tracedSegmentsRef.current).sort((a, b) => a - b)

      ctx.strokeStyle = mindfulColors.pastel.mint
      ctx.lineWidth = 6
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // Draw connected segments
      let i = 0
      while (i < sortedIndices.length) {
        ctx.beginPath()
        ctx.moveTo(points[sortedIndices[i]].x, points[sortedIndices[i]].y)

        while (i < sortedIndices.length - 1 && sortedIndices[i + 1] - sortedIndices[i] <= 2) {
          i++
          ctx.lineTo(points[sortedIndices[i]].x, points[sortedIndices[i]].y)
        }
        ctx.stroke()
        i++
      }
    }
  }, [drawShapeOutline, drawStartIndicator])

  // Initialize canvas and shape
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = CANVAS_SIZE / 2
    const centerY = CANVAS_SIZE / 2
    const radius = SHAPE_SIZE / 2

    // Generate path points based on shape type
    if (shapeType === 'circle') {
      pathPointsRef.current = generateCirclePath(centerX, centerY, radius, 100)
    } else if (shapeType === 'triangle') {
      pathPointsRef.current = generateTrianglePath(centerX, centerY, SHAPE_SIZE, 99)
    } else if (shapeType === 'square') {
      pathPointsRef.current = generateSquarePath(centerX, centerY, SHAPE_SIZE, 100)
    }

    setMessage(`Trace the ${getShapeName()} slowly`)
    drawShape(ctx)
  }, [shapeType, getShapeName, drawShape])

  const findNearestSegment = useCallback((x: number, y: number): number => {
    const points = pathPointsRef.current
    let nearestIdx = -1
    let nearestDist = Infinity

    for (let i = 0; i < points.length; i++) {
      const dx = points[i].x - x
      const dy = points[i].y - y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < nearestDist && dist < PATH_TOLERANCE) {
        nearestDist = dist
        nearestIdx = i
      }
    }
    return nearestIdx
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isComplete) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (CANVAS_SIZE / rect.width)
    const y = (e.clientY - rect.top) * (CANVAS_SIZE / rect.height)

    const segmentIdx = findNearestSegment(x, y)
    if (segmentIdx >= 0) {
      setIsTracing(true)
      lastPosRef.current = { x, y }
      tracedSegmentsRef.current.add(segmentIdx)

      const ctx = canvas.getContext('2d')
      if (ctx) drawShape(ctx)

      setProgress(tracedSegmentsRef.current.size / pathPointsRef.current.length)
    }
  }, [isComplete, findNearestSegment, drawShape])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isTracing || isComplete) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) * (CANVAS_SIZE / rect.width)
    const y = (e.clientY - rect.top) * (CANVAS_SIZE / rect.height)

    // Check speed
    if (lastPosRef.current) {
      const dx = x - lastPosRef.current.x
      const dy = y - lastPosRef.current.y
      const speed = Math.sqrt(dx * dx + dy * dy)

      if (speed > MAX_SPEED) {
        setIsRushing(true)
        setMessage('Slow down...')

        const segments = Array.from(tracedSegmentsRef.current)
        const removeCount = Math.min(5, segments.length)
        for (let i = 0; i < removeCount; i++) {
          const randomIdx = Math.floor(Math.random() * segments.length)
          tracedSegmentsRef.current.delete(segments[randomIdx])
          segments.splice(randomIdx, 1)
        }

        if (rushTimeoutRef.current) clearTimeout(rushTimeoutRef.current)
        rushTimeoutRef.current = setTimeout(() => {
          setIsRushing(false)
          setMessage(`Trace the ${getShapeName()} slowly`)
        }, 500)
      }
    }

    lastPosRef.current = { x, y }

    const segmentIdx = findNearestSegment(x, y)
    if (segmentIdx >= 0) {
      tracedSegmentsRef.current.add(segmentIdx)

      const ctx = canvas.getContext('2d')
      if (ctx) drawShape(ctx)

      const newProgress = tracedSegmentsRef.current.size / pathPointsRef.current.length
      setProgress(newProgress)

      if (newProgress >= COMPLETION_THRESHOLD && !isComplete) {
        setIsComplete(true)
        setMessage('Beautiful!')
        playChime()
        setTimeout(() => {
          onComplete?.()
        }, 1500)
      }
    }
  }, [isTracing, isComplete, findNearestSegment, drawShape, getShapeName, onComplete, playChime])

  const handlePointerUp = useCallback(() => {
    setIsTracing(false)
    lastPosRef.current = null
    if (!isComplete && !isRushing) {
      setMessage(`Trace the ${getShapeName()} slowly`)
    }
  }, [isComplete, isRushing, getShapeName])

  useEffect(() => {
    return () => {
      if (rushTimeoutRef.current) {
        clearTimeout(rushTimeoutRef.current)
      }
    }
  }, [])

  const progressPercent = Math.round(progress * 100)

  return (
    <GameContainer
      title="Trace the Shape"
      instruction={message}
      ariaLabel={`Trace the glowing ${getShapeName()} slowly with your finger`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: 3,
            padding: 1,
            backgroundColor: alpha(mindfulColors.background.default, 0.5),
            boxShadow: isRushing
              ? `0 0 20px ${alpha(mindfulColors.pastel.coral, 0.5)}`
              : `0 0 20px ${alpha(mindfulColors.pastel.lavender, 0.3)}`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              display: 'block',
              cursor: isTracing ? 'crosshair' : 'pointer',
              touchAction: 'none',
              borderRadius: 12,
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography
            sx={{
              color: isRushing ? mindfulColors.pastel.coral : mindfulColors.text.secondary,
              fontSize: '0.85rem',
              fontWeight: 500,
              transition: 'color 0.3s ease',
            }}
          >
            {progressPercent}% traced
          </Typography>
          {isRushing && (
            <Typography
              sx={{
                color: mindfulColors.pastel.coral,
                fontSize: '0.75rem',
              }}
            >
              (too fast!)
            </Typography>
          )}
        </Box>
      </Box>
    </GameContainer>
  )
})

export default TraceShape
