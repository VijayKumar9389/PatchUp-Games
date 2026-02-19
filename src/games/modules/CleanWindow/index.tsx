import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const CLEAR_THRESHOLD = 0.98 // 98% cleared to complete (allowing for edge pixels)
const BRUSH_RADIUS = 25

export const CleanWindow = memo(function CleanWindow({
  onComplete,
}: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cleanCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const clearedMapRef = useRef<boolean[]>([])
  const [clearedPercent, setClearedPercent] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const { playChime } = useSound()

  // Initialize the fog layer
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Create offscreen canvas for clean image
    const cleanCanvas = document.createElement('canvas')
    cleanCanvas.width = canvas.width
    cleanCanvas.height = canvas.height
    const cleanCtx = cleanCanvas.getContext('2d')
    if (!cleanCtx) return

    // Draw the "clean" background on offscreen canvas
    const gradient = cleanCtx.createLinearGradient(0, 0, 0, cleanCanvas.height)
    gradient.addColorStop(0, '#87CEEB')
    gradient.addColorStop(1, '#E0F4FF')
    cleanCtx.fillStyle = gradient
    cleanCtx.fillRect(0, 0, cleanCanvas.width, cleanCanvas.height)

    // Add some simple scenery
    cleanCtx.fillStyle = '#98FB98'
    cleanCtx.fillRect(0, cleanCanvas.height * 0.7, cleanCanvas.width, cleanCanvas.height * 0.3)

    // Sun
    cleanCtx.beginPath()
    cleanCtx.arc(cleanCanvas.width * 0.8, cleanCanvas.height * 0.2, 30, 0, Math.PI * 2)
    cleanCtx.fillStyle = '#FFE4B5'
    cleanCtx.fill()

    cleanCanvasRef.current = cleanCanvas

    // Draw fog on main canvas
    ctx.fillStyle = '#B8C9D9'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some fog texture
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 30 + 15
      const fogGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      fogGradient.addColorStop(0, 'rgba(200, 210, 220, 0.4)')
      fogGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = fogGradient
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    // Initialize cleared map
    clearedMapRef.current = new Array(canvas.width * canvas.height).fill(false)
  }, [])

  const clearFogAt = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    const cleanCanvas = cleanCanvasRef.current
    if (!canvas || !cleanCanvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = Math.floor(x)
    const centerY = Math.floor(y)

    // Draw clean image through circular clip
    ctx.save()
    ctx.beginPath()
    ctx.arc(centerX, centerY, BRUSH_RADIUS, 0, Math.PI * 2)
    ctx.clip()
    ctx.drawImage(cleanCanvas, 0, 0)
    ctx.restore()

    // Update cleared map
    const clearedMap = clearedMapRef.current
    for (let dy = -BRUSH_RADIUS; dy <= BRUSH_RADIUS; dy++) {
      for (let dx = -BRUSH_RADIUS; dx <= BRUSH_RADIUS; dx++) {
        if (dx * dx + dy * dy <= BRUSH_RADIUS * BRUSH_RADIUS) {
          const px = centerX + dx
          const py = centerY + dy
          if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
            const idx = py * canvas.width + px
            clearedMap[idx] = true
          }
        }
      }
    }

    // Calculate cleared percentage
    const clearedCount = clearedMap.filter(Boolean).length
    const percent = clearedCount / clearedMap.length
    setClearedPercent(percent)
  }, [])

  // Check for completion
  useEffect(() => {
    if (clearedPercent >= CLEAR_THRESHOLD && !isComplete) {
      setIsComplete(true)
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [clearedPercent, isComplete, onComplete, playChime])

  const getCanvasPosition = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    const pos = getCanvasPosition(e)
    clearFogAt(pos.x, pos.y)
  }, [getCanvasPosition, clearFogAt])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const pos = getCanvasPosition(e)
    clearFogAt(pos.x, pos.y)
  }, [isDragging, getCanvasPosition, clearFogAt])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const instruction = isComplete
    ? 'Window is sparkling clean!'
    : 'Drag your finger to wipe away the fog'

  const displayPercent = Math.min(Math.round(clearedPercent * 100), 100)

  return (
    <GameContainer
      title="Clean Window"
      instruction={instruction}
      ariaLabel="Clean the foggy window by dragging your finger across it"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: `0 4px 20px ${alpha(mindfulColors.primary.main, 0.3)}`,
            border: `4px solid ${mindfulColors.pastel.sage}`,
          }}
        >
          <canvas
            ref={canvasRef}
            width={280}
            height={200}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              display: 'block',
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: mindfulColors.text.secondary,
            fontWeight: 500,
          }}
        >
          {displayPercent}% clear
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default CleanWindow
