import { useState, useEffect, useCallback, memo, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useAnimationFrame, useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const CONTAINER_HEIGHT = 280
const FEATHER_START_Y = 220 // Start near bottom
const GRAVITY = 0.025 // How fast feather falls
const TAP_BOOST = -1.2 // Upward velocity on tap (negative = up)
const MAX_VELOCITY = 2 // Max falling speed
const COMPLETION_THRESHOLD = -30 // Feather needs to go above container

export const FeatherFloat = memo(function FeatherFloat({
  onComplete,
}: GameProps) {
  const [featherY, setFeatherY] = useState(FEATHER_START_Y)
  const [velocity, setVelocity] = useState(0)
  const [featherX, setFeatherX] = useState(50)
  const [featherRotation, setFeatherRotation] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [tapCount, setTapCount] = useState(0)
  const [showTapEffect, setShowTapEffect] = useState(false)
  const elapsedTimeRef = useRef(0)
  const { playTone, playChime } = useSound()

  const handleTap = useCallback(() => {
    if (isComplete) return

    // Play a gentle whoosh sound
    playTone({ frequency: 300 + Math.random() * 100, duration: 100, volume: 0.15 })

    // Give upward boost
    setVelocity(TAP_BOOST)
    setTapCount(c => c + 1)

    // Show tap effect
    setShowTapEffect(true)
    setTimeout(() => setShowTapEffect(false), 150)
  }, [isComplete, playTone])

  // Feather physics
  useAnimationFrame(
    (deltaTime) => {
      if (isComplete) return

      elapsedTimeRef.current += deltaTime

      // Apply gravity to velocity
      setVelocity(v => Math.min(v + GRAVITY * deltaTime * 0.1, MAX_VELOCITY))

      // Update position based on velocity
      setFeatherY(y => {
        const newY = y + velocity
        return Math.min(newY, FEATHER_START_Y) // Don't go below start
      })

      // Gentle horizontal sway
      setFeatherX(50 + Math.sin(elapsedTimeRef.current * 0.002) * 15)

      // Rotation based on velocity (tilt up when rising, down when falling)
      setFeatherRotation(velocity * 5)
    },
    { enabled: !isComplete }
  )

  // Check completion
  useEffect(() => {
    if (featherY <= COMPLETION_THRESHOLD && !isComplete) {
      setIsComplete(true)
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [featherY, isComplete, onComplete, playChime])

  const progress = Math.max(0, ((FEATHER_START_Y - featherY) / (FEATHER_START_Y - COMPLETION_THRESHOLD)) * 100)

  const instruction = isComplete
    ? 'The feather floated away!'
    : velocity < 0
    ? 'Keep tapping!'
    : 'Tap to lift the feather'

  return (
    <GameContainer
      title="Feather Float"
      instruction={instruction}
      ariaLabel="Tap repeatedly to lift the feather to the sky"
    >
      <Box
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleTap()
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Tap to boost the feather upward"
        sx={{
          width: '100%',
          height: { xs: 240, sm: CONTAINER_HEIGHT },
          borderRadius: 3,
          background: `linear-gradient(180deg, ${mindfulColors.primary.light} 0%, ${alpha(mindfulColors.pastel.lavender, 0.5)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          touchAction: 'manipulation',
          userSelect: 'none',
          '&:focus': {
            outline: `3px solid ${mindfulColors.primary.main}`,
            outlineOffset: 2,
          },
          '&:active': {
            backgroundColor: alpha(mindfulColors.primary.light, 0.9),
          },
        }}
      >
        {/* Sky decorations */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: { xs: 15 + i * 25, sm: 20 + i * 30 },
              left: `${20 + i * 30}%`,
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              opacity: 0.5,
            }}
          >
            ☁️
          </Box>
        ))}

        {/* Target zone at top */}
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: '50%',
            transform: 'translateX(-50%)',
            px: { xs: 1.5, sm: 2 },
            py: 0.5,
            borderRadius: 2,
            border: `2px dashed ${alpha(mindfulColors.primary.main, 0.4)}`,
            color: mindfulColors.text.secondary,
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
          }}
        >
          Float here ↑
        </Box>

        {/* Feather */}
        <Box
          sx={{
            position: 'absolute',
            left: `${featherX}%`,
            top: Math.max(0, featherY),
            transform: `translateX(-50%) rotate(${featherRotation}deg)`,
            fontSize: { xs: '2rem', sm: '2.5rem' },
            transition: 'filter 0.15s ease',
            filter: showTapEffect ? 'drop-shadow(0 0 12px rgba(255,255,255,0.9))' : 'none',
          }}
        >
          🪶
        </Box>

        {/* Tap ripple effect */}
        {showTapEffect && (
          <Box
            sx={{
              position: 'absolute',
              left: `${featherX}%`,
              top: featherY + 20,
              transform: 'translateX(-50%)',
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: `2px solid ${alpha('#fff', 0.6)}`,
              animation: 'ripple 0.3s ease-out',
              '@keyframes ripple': {
                '0%': { transform: 'translateX(-50%) scale(0.5)', opacity: 1 },
                '100%': { transform: 'translateX(-50%) scale(2)', opacity: 0 },
              },
            }}
          />
        )}

        {/* Progress bar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 35, sm: 45 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60%',
            height: { xs: 6, sm: 8 },
            backgroundColor: alpha(mindfulColors.primary.main, 0.2),
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: `${Math.min(100, progress)}%`,
              height: '100%',
              backgroundColor: mindfulColors.primary.main,
              borderRadius: 4,
              transition: 'width 0.1s ease-out',
            }}
          />
        </Box>

        {/* Tap counter and hint */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 10, sm: 15 },
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            sx={{
              color: mindfulColors.text.secondary,
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              opacity: 0.7,
            }}
          >
            {tapCount === 0 ? 'Tap anywhere!' : `${tapCount} taps`}
          </Typography>
          {velocity > 0 && tapCount > 0 && (
            <Typography
              sx={{
                color: alpha(mindfulColors.text.secondary, 0.6),
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
              }}
            >
              ⬇️ drifting...
            </Typography>
          )}
        </Box>
      </Box>
    </GameContainer>
  )
})

export default FeatherFloat
