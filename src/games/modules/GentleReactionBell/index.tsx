import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

type BellState = 'waiting' | 'glowing' | 'tapped' | 'complete'

const ROUNDS_TO_COMPLETE = 3

export const GentleReactionBell = memo(function GentleReactionBell({
  onComplete,
}: GameProps) {
  const [bellState, setBellState] = useState<BellState>('waiting')
  const [roundsCompleted, setRoundsCompleted] = useState(0)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const [currentReaction, setCurrentReaction] = useState<number | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const glowStartTimeRef = useRef<number>(0)
  const { playTone, playChime, playSuccess } = useSound()

  // Start glow cycle
  const startGlowCycle = useCallback(() => {
    setBellState('waiting')
    setCurrentReaction(null)

    // Random delay before bell glows (1.5-4 seconds)
    const delay = 1500 + Math.random() * 2500
    timeoutRef.current = setTimeout(() => {
      glowStartTimeRef.current = performance.now()
      setBellState('glowing')
      playTone({ frequency: 440, duration: 100, volume: 0.2 })
    }, delay)
  }, [playTone])

  // Initial start
  useEffect(() => {
    startGlowCycle()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [startGlowCycle])

  const handleTap = useCallback(() => {
    if (bellState !== 'glowing') return

    // Calculate reaction time
    const reactionTime = Math.round(performance.now() - glowStartTimeRef.current)
    setCurrentReaction(reactionTime)
    setReactionTimes(prev => [...prev, reactionTime])

    setBellState('tapped')
    playSuccess()
    const newRoundsCompleted = roundsCompleted + 1
    setRoundsCompleted(newRoundsCompleted)

    // Short pause then next round
    setTimeout(() => {
      if (newRoundsCompleted >= ROUNDS_TO_COMPLETE) {
        setBellState('complete')
        playChime()
        setTimeout(() => {
          onComplete?.()
        }, 2000)
      } else {
        startGlowCycle()
      }
    }, 1200)
  }, [bellState, roundsCompleted, onComplete, playSuccess, playChime, startGlowCycle])

  const getInstruction = () => {
    switch (bellState) {
      case 'waiting':
        return 'Wait for the bell to light up...'
      case 'glowing':
        return 'TAP NOW!'
      case 'tapped':
        return currentReaction !== null ? `${currentReaction}ms` : 'Nice!'
      case 'complete':
        return 'Great reflexes!'
      default:
        return ''
    }
  }

  const bellColor = bellState === 'glowing'
    ? mindfulColors.pastel.lemon
    : bellState === 'tapped'
    ? mindfulColors.pastel.mint
    : mindfulColors.pastel.lavender

  const averageTime = reactionTimes.length > 0
    ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
    : null

  const bestTime = reactionTimes.length > 0
    ? Math.min(...reactionTimes)
    : null

  return (
    <GameContainer
      title="Reaction Bell"
      instruction={getInstruction()}
      ariaLabel={`Reaction game: tap when the bell lights up. Round ${roundsCompleted + 1} of ${ROUNDS_TO_COMPLETE}`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Bell */}
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
          aria-label={bellState === 'glowing' ? 'Tap the bell now' : 'Wait for glow'}
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            backgroundColor: bellColor,
            cursor: bellState === 'glowing' ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            transition: bellState === 'glowing' ? 'none' : 'all 0.3s ease',
            boxShadow: bellState === 'glowing'
              ? `0 0 50px ${alpha(mindfulColors.pastel.lemon, 1)}, 0 0 100px ${alpha(mindfulColors.pastel.lemon, 0.6)}`
              : bellState === 'tapped'
              ? `0 0 30px ${alpha(mindfulColors.pastel.mint, 0.8)}`
              : `0 4px 15px ${alpha(bellColor, 0.4)}`,
            transform: bellState === 'tapped' ? 'scale(0.9)' : 'scale(1)',
            animation: bellState === 'glowing' ? 'pulse 0.3s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)' },
              '50%': { transform: 'scale(1.05)' },
            },
            '&:focus': {
              outline: `3px solid ${mindfulColors.primary.main}`,
              outlineOffset: 4,
            },
          }}
        >
          🔔
        </Box>

        {/* Reaction times list */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            minHeight: 80,
          }}
        >
          {reactionTimes.map((time, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  color: mindfulColors.text.secondary,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                Round {index + 1}:
              </Typography>
              <Typography
                sx={{
                  color: time === bestTime ? '#2E7D32' : mindfulColors.text.primary,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  backgroundColor: time === bestTime ? alpha('#4CAF50', 0.15) : 'transparent',
                  px: time === bestTime ? 1 : 0,
                  borderRadius: 1,
                }}
              >
                {time}ms
                {time === bestTime && reactionTimes.length > 1 && ' ⚡'}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Stats (shown after completion) */}
        {bellState === 'complete' && averageTime !== null && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              mt: 1,
              p: 1.5,
              borderRadius: 2,
              backgroundColor: alpha(mindfulColors.primary.main, 0.1),
            }}
          >
            <Typography
              sx={{
                color: mindfulColors.text.secondary,
                fontSize: '0.8rem',
              }}
            >
              Average: <strong>{averageTime}ms</strong>
            </Typography>
            <Typography
              sx={{
                color: '#2E7D32',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              Best: {bestTime}ms ⚡
            </Typography>
          </Box>
        )}

        {/* Progress dots */}
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
          {Array.from({ length: ROUNDS_TO_COMPLETE }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: i < roundsCompleted
                  ? mindfulColors.pastel.mint
                  : alpha(mindfulColors.primary.main, 0.2),
                transition: 'background-color 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </GameContainer>
  )
})

export default GentleReactionBell
