import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useHold, useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const BREATH_CYCLE_DURATION = 4000 // 4 seconds inhale, 4 seconds exhale
const CYCLES_TO_COMPLETE = 3

export const BreathingBubble = memo(function BreathingBubble({
  onComplete,
  duration = BREATH_CYCLE_DURATION * CYCLES_TO_COMPLETE * 2,
}: GameProps) {
  const [cyclesCompleted, setCyclesCompleted] = useState(0)
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('inhale')
  const [bubbleScale, setBubbleScale] = useState(0.5)
  const hasIncrementedRef = useRef(false)
  const { playGentle, playChime } = useSound()

  const handleHoldProgress = useCallback((progress: number) => {
    // Expand bubble as user holds
    setBubbleScale(0.5 + progress * 0.5)
  }, [])

  const handleHoldEnd = useCallback((holdDuration: number) => {
    if (holdDuration >= BREATH_CYCLE_DURATION * 0.7) {
      // Good breath
      playGentle()
      hasIncrementedRef.current = false
      setPhase('exhale')
    }
  }, [playGentle])

  const { isHolding, handlers } = useHold({
    targetDuration: BREATH_CYCLE_DURATION,
    onHoldProgress: handleHoldProgress,
    onHoldEnd: handleHoldEnd,
  })

  // Exhale phase - bubble shrinks
  useEffect(() => {
    if (phase === 'exhale' && !isHolding) {
      const interval = setInterval(() => {
        setBubbleScale(prev => {
          const newScale = prev - 0.02
          if (newScale <= 0.5) {
            clearInterval(interval)
            setPhase('inhale')
            if (!hasIncrementedRef.current) {
              hasIncrementedRef.current = true
              setCyclesCompleted(c => c + 1)
            }
            return 0.5
          }
          return newScale
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [phase, isHolding])

  // Check completion
  useEffect(() => {
    if (cyclesCompleted >= CYCLES_TO_COMPLETE) {
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [cyclesCompleted, onComplete, playChime, duration])

  const phaseText = phase === 'inhale'
    ? (isHolding ? 'Breathe in...' : 'Press and hold to breathe in')
    : 'Slowly breathe out...'

  return (
    <GameContainer
      title="Breathing Bubble"
      instruction={phaseText}
      ariaLabel="Breathing exercise: press and hold to inflate the bubble, release to deflate"
    >
      <Box
        {...handlers}
        sx={{
          width: { xs: 160, sm: 200 },
          height: { xs: 160, sm: 200 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <Box
          sx={{
            width: { xs: 120, sm: 150 },
            height: { xs: 120, sm: 150 },
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${mindfulColors.pastel.lavender}, ${mindfulColors.primary.main})`,
            boxShadow: `0 0 ${30 * bubbleScale}px ${alpha(mindfulColors.primary.main, 0.5)}`,
            transform: `scale(${bubbleScale})`,
            transition: isHolding ? 'none' : 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              color: mindfulColors.text.primary,
              fontWeight: 600,
              opacity: 0.7,
            }}
          >
            {cyclesCompleted}/{CYCLES_TO_COMPLETE}
          </Typography>
        </Box>
      </Box>
    </GameContainer>
  )
})

export default BreathingBubble
