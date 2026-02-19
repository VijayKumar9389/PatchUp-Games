import { useState, useCallback, useEffect, memo, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useAnimationFrame, useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

type Shape = {
  id: number
  x: number
  y: number
  size: number
  color: string
  isTarget: boolean
  found: boolean
  rotation: number
  shapeType: 'circle' | 'square' | 'triangle' | 'star'
  opacity: number
  scale: number
}

const TARGET_COLOR = '#5BA4E6' // Soft blue
const DISTRACTOR_COLORS = [
  '#E8A5B3', // Pink
  '#A8D5A2', // Green
  '#F5D76E', // Yellow
  '#D4A5E8', // Lavender
  '#F5B971', // Orange
]

const SHAPE_TYPES: Shape['shapeType'][] = ['circle', 'square', 'triangle', 'star']
const TARGET_COUNT = 5
const DISTRACTOR_COUNT = 7

function createShapes(): Shape[] {
  const shapes: Shape[] = []
  let id = 0

  // Create target shapes (blue)
  for (let i = 0; i < TARGET_COUNT; i++) {
    shapes.push({
      id: id++,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 75,
      size: 35 + Math.random() * 15,
      color: TARGET_COLOR,
      isTarget: true,
      found: false,
      rotation: Math.random() * 360,
      shapeType: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      opacity: 1,
      scale: 1,
    })
  }

  // Create distractor shapes (other colors)
  for (let i = 0; i < DISTRACTOR_COUNT; i++) {
    shapes.push({
      id: id++,
      x: 15 + Math.random() * 70,
      y: 10 + Math.random() * 75,
      size: 30 + Math.random() * 15,
      color: DISTRACTOR_COLORS[Math.floor(Math.random() * DISTRACTOR_COLORS.length)],
      isTarget: false,
      found: false,
      rotation: Math.random() * 360,
      shapeType: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      opacity: 1,
      scale: 1,
    })
  }

  return shapes
}

const ShapeRenderer = memo(function ShapeRenderer({
  shape,
  onClick
}: {
  shape: Shape
  onClick: () => void
}) {
  const getShapePath = () => {
    switch (shape.shapeType) {
      case 'circle':
        return { borderRadius: '50%' }
      case 'square':
        return { borderRadius: '4px' }
      case 'triangle':
        return {
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          borderRadius: 0,
        }
      case 'star':
        return {
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          borderRadius: 0,
        }
      default:
        return { borderRadius: '50%' }
    }
  }

  return (
    <Box
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
      role="button"
      tabIndex={shape.found ? -1 : 0}
      aria-label={shape.isTarget ? 'Blue shape - tap to collect' : 'Not a blue shape'}
      sx={{
        position: 'absolute',
        left: `${shape.x}%`,
        top: `${shape.y}%`,
        width: shape.size,
        height: shape.size,
        backgroundColor: shape.color,
        transform: `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(${shape.scale})`,
        opacity: shape.opacity,
        cursor: shape.found ? 'default' : 'pointer',
        pointerEvents: shape.found ? 'none' : 'auto',
        boxShadow: `0 3px 8px ${alpha(shape.color, 0.4)}`,
        transition: 'transform 0.2s ease, opacity 0.3s ease',
        '&:hover': !shape.found ? {
          transform: `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(1.1)`,
          boxShadow: `0 4px 12px ${alpha(shape.color, 0.5)}`,
        } : undefined,
        '&:active': !shape.found ? {
          transform: `translate(-50%, -50%) rotate(${shape.rotation}deg) scale(0.95)`,
        } : undefined,
        '&:focus': {
          outline: `3px solid ${mindfulColors.primary.main}`,
          outlineOffset: 2,
        },
        ...getShapePath(),
      }}
    />
  )
})

export const ColorHunt = memo(function ColorHunt({
  onComplete,
}: GameProps) {
  const [shapes, setShapes] = useState<Shape[]>(() => createShapes())
  const [foundCount, setFoundCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showWrongFeedback, setShowWrongFeedback] = useState(false)
  const elapsedRef = useRef(0)
  const { playTone, playChime } = useSound()

  // Gentle floating animation
  useAnimationFrame(
    (deltaTime) => {
      elapsedRef.current += deltaTime
      setShapes(prev => prev.map(shape => {
        if (shape.found) {
          // Fade out animation for found shapes
          return {
            ...shape,
            scale: shape.scale * 0.95,
            opacity: Math.max(0, shape.opacity - 0.03),
          }
        }
        // Gentle bob for unfound shapes
        const bobOffset = Math.sin(elapsedRef.current * 0.002 + shape.id) * 0.02
        return {
          ...shape,
          scale: 1 + bobOffset,
        }
      }).filter(s => s.opacity > 0.1 || !s.found))
    },
    { enabled: !isComplete }
  )

  const handleShapeClick = useCallback((shapeId: number) => {
    if (isComplete) return

    const shape = shapes.find(s => s.id === shapeId)
    if (!shape || shape.found) return

    if (shape.isTarget) {
      // Correct! Found a blue shape
      playTone({ frequency: 500 + foundCount * 50, duration: 150, volume: 0.15 })

      setShapes(prev => prev.map(s =>
        s.id === shapeId ? { ...s, found: true } : s
      ))
      setFoundCount(c => c + 1)
    } else {
      // Wrong color - gentle feedback
      playTone({ frequency: 200, duration: 100, volume: 0.1 })
      setShowWrongFeedback(true)
      setTimeout(() => setShowWrongFeedback(false), 500)
    }
  }, [shapes, isComplete, foundCount, playTone])

  // Check completion
  useEffect(() => {
    if (foundCount >= TARGET_COUNT && !isComplete) {
      setIsComplete(true)
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [foundCount, isComplete, onComplete, playChime])

  const instruction = isComplete
    ? 'All blue shapes found!'
    : `Find the blue shapes (${foundCount}/${TARGET_COUNT})`

  return (
    <GameContainer
      title="Color Hunt"
      instruction={instruction}
      ariaLabel="Find and tap all the blue shapes"
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Color hint */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              color: mindfulColors.text.secondary,
            }}
          >
            Look for:
          </Typography>
          <Box
            sx={{
              width: { xs: 20, sm: 24 },
              height: { xs: 20, sm: 24 },
              backgroundColor: TARGET_COLOR,
              borderRadius: '50%',
              boxShadow: `0 2px 6px ${alpha(TARGET_COLOR, 0.4)}`,
            }}
          />
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              color: TARGET_COLOR,
              fontWeight: 600,
            }}
          >
            Blue
          </Typography>
        </Box>

        {/* Game area */}
        <Box
          sx={{
            width: '100%',
            height: { xs: 220, sm: 260 },
            borderRadius: 3,
            background: `linear-gradient(180deg, ${alpha(mindfulColors.background.paper, 0.9)} 0%, ${alpha(mindfulColors.pastel.peach, 0.2)} 100%)`,
            position: 'relative',
            overflow: 'hidden',
            border: showWrongFeedback
              ? `2px solid ${alpha('#E8A5B3', 0.5)}`
              : `1px solid ${alpha(mindfulColors.primary.main, 0.1)}`,
            transition: 'border-color 0.2s ease',
          }}
        >
          {shapes.map(shape => (
            <ShapeRenderer
              key={shape.id}
              shape={shape}
              onClick={() => handleShapeClick(shape.id)}
            />
          ))}

          {/* Wrong tap feedback */}
          {showWrongFeedback && (
            <Typography
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: alpha(mindfulColors.text.secondary, 0.6),
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                backgroundColor: alpha('#fff', 0.9),
                px: 2,
                py: 0.5,
                borderRadius: 2,
              }}
            >
              Look for blue shapes
            </Typography>
          )}
        </Box>

        {/* Progress indicator */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          {[...Array(TARGET_COUNT)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 10, sm: 12 },
                height: { xs: 10, sm: 12 },
                borderRadius: '50%',
                backgroundColor: i < foundCount
                  ? TARGET_COLOR
                  : alpha(TARGET_COLOR, 0.2),
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                transform: i < foundCount ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </Box>
      </Box>
    </GameContainer>
  )
})

export default ColorHunt
