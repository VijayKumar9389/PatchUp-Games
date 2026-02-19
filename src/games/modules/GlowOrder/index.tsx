import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const ROUNDS_TO_COMPLETE = 3
const STARTING_SEQUENCE_LENGTH = 2
const FLASH_DURATION = 500
const FLASH_GAP = 300

// Light colors
const LIGHTS = [
  { id: 0, color: '#FF6B6B', glowColor: '#FF8E8E', name: 'red' },
  { id: 1, color: '#4ECDC4', glowColor: '#7EEEE6', name: 'teal' },
  { id: 2, color: '#FFE66D', glowColor: '#FFF0A0', name: 'yellow' },
  { id: 3, color: '#95E1D3', glowColor: '#C0F0E8', name: 'mint' },
]

type GamePhase = 'watching' | 'repeating' | 'success' | 'error' | 'complete'

function generateSequence(length: number): number[] {
  const sequence: number[] = []
  for (let i = 0; i < length; i++) {
    sequence.push(Math.floor(Math.random() * LIGHTS.length))
  }
  return sequence
}

export const GlowOrder = memo(function GlowOrder({
  onComplete,
}: GameProps) {
  const [phase, setPhase] = useState<GamePhase>('watching')
  const [sequence, setSequence] = useState<number[]>(() =>
    generateSequence(STARTING_SEQUENCE_LENGTH)
  )
  const [activeLight, setActiveLight] = useState<number | null>(null)
  const [userInput, setUserInput] = useState<number[]>([])
  const [currentRound, setCurrentRound] = useState(0)
  const [showingIndex, setShowingIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { playTone, playSuccess, playChime } = useSound()

  // Play sequence animation
  useEffect(() => {
    if (phase !== 'watching') return

    let index = 0
    setShowingIndex(0)

    const playNext = () => {
      if (index >= sequence.length) {
        // Done showing sequence
        setTimeout(() => {
          setPhase('repeating')
          setUserInput([])
        }, FLASH_GAP)
        return
      }

      // Light up current light
      setActiveLight(sequence[index])
      setShowingIndex(index)

      // Play tone for this light
      const frequencies = [262, 330, 392, 523] // C4, E4, G4, C5
      playTone({
        frequency: frequencies[sequence[index]],
        duration: FLASH_DURATION - 50,
        volume: 0.2,
        type: 'sine'
      })

      // Turn off after duration
      timeoutRef.current = setTimeout(() => {
        setActiveLight(null)

        // Wait gap then play next
        timeoutRef.current = setTimeout(() => {
          index++
          playNext()
        }, FLASH_GAP)
      }, FLASH_DURATION)
    }

    // Start after initial delay
    timeoutRef.current = setTimeout(playNext, 500)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [phase, sequence, playTone])

  // Handle light tap
  const handleLightTap = useCallback((lightId: number) => {
    if (phase !== 'repeating') return

    // Flash the tapped light
    setActiveLight(lightId)

    // Play tone
    const frequencies = [262, 330, 392, 523]
    playTone({
      frequency: frequencies[lightId],
      duration: 150,
      volume: 0.2,
      type: 'sine'
    })

    setTimeout(() => setActiveLight(null), 200)

    const newInput = [...userInput, lightId]
    setUserInput(newInput)

    // Check if correct so far
    const expectedLight = sequence[newInput.length - 1]

    if (lightId !== expectedLight) {
      // Wrong!
      setPhase('error')

      // Retry after brief pause
      setTimeout(() => {
        setPhase('watching')
        setUserInput([])
      }, 1000)
      return
    }

    // Check if sequence complete
    if (newInput.length === sequence.length) {
      // Success!
      setPhase('success')
      playSuccess()

      const newRound = currentRound + 1

      setTimeout(() => {
        if (newRound >= ROUNDS_TO_COMPLETE) {
          setPhase('complete')
          playChime()
          setTimeout(() => {
            onComplete?.()
          }, 1500)
        } else {
          // Next round with longer sequence
          setCurrentRound(newRound)
          setSequence(generateSequence(STARTING_SEQUENCE_LENGTH + newRound))
          setUserInput([])
          setPhase('watching')
        }
      }, 1000)
    }
  }, [phase, userInput, sequence, currentRound, onComplete, playTone, playSuccess, playChime])

  const getInstruction = () => {
    switch (phase) {
      case 'watching':
        return 'Watch the sequence...'
      case 'repeating':
        return `Repeat the pattern (${userInput.length}/${sequence.length})`
      case 'success':
        return 'Correct!'
      case 'error':
        return 'Try again...'
      case 'complete':
        return 'Perfect memory!'
      default:
        return ''
    }
  }

  return (
    <GameContainer
      title="Glow Order"
      instruction={getInstruction()}
      ariaLabel={`Memory game. Watch the lights flash and repeat the sequence. Round ${currentRound + 1} of ${ROUNDS_TO_COMPLETE}`}
    >
      <Box
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha('#2C3E50', 0.9)} 0%, ${alpha('#1a1a2e', 0.95)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        {/* Lights grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 2,
          }}
        >
          {LIGHTS.map((light) => {
            const isActive = activeLight === light.id
            const isDisabled = phase !== 'repeating'

            return (
              <Box
                key={light.id}
                onClick={() => handleLightTap(light.id)}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: isActive ? light.glowColor : light.color,
                  opacity: isActive ? 1 : 0.6,
                  cursor: isDisabled ? 'default' : 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isActive
                    ? `0 0 30px ${light.glowColor}, 0 0 60px ${alpha(light.glowColor, 0.5)}, inset 0 0 20px ${alpha('#fff', 0.3)}`
                    : `0 4px 15px ${alpha('#000', 0.3)}, inset 0 2px 10px ${alpha('#fff', 0.1)}`,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  border: `3px solid ${alpha('#fff', isActive ? 0.4 : 0.1)}`,
                  '&:hover': {
                    opacity: isDisabled ? undefined : 0.8,
                    transform: isDisabled ? undefined : 'scale(1.02)',
                  },
                  '&:active': {
                    transform: isDisabled ? undefined : 'scale(0.98)',
                  },
                }}
              />
            )
          })}
        </Box>

        {/* Sequence progress during watching */}
        {phase === 'watching' && (
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              mt: 1,
            }}
          >
            {sequence.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: i <= showingIndex
                    ? alpha('#fff', 0.8)
                    : alpha('#fff', 0.2),
                  transition: 'background-color 0.2s ease',
                }}
              />
            ))}
          </Box>
        )}

        {/* Input progress during repeating */}
        {phase === 'repeating' && (
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              mt: 1,
            }}
          >
            {sequence.map((_, i) => (
              <Box
                key={i}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: i < userInput.length
                    ? mindfulColors.pastel.mint
                    : alpha('#fff', 0.2),
                  transition: 'background-color 0.2s ease',
                  boxShadow: i < userInput.length
                    ? `0 0 6px ${mindfulColors.pastel.mint}`
                    : 'none',
                }}
              />
            ))}
          </Box>
        )}

        {/* Round progress */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {Array.from({ length: ROUNDS_TO_COMPLETE }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: i < currentRound
                  ? mindfulColors.pastel.mint
                  : i === currentRound && (phase === 'success' || phase === 'complete')
                  ? mindfulColors.pastel.mint
                  : alpha('#fff', 0.3),
                transition: 'background-color 0.3s ease',
                boxShadow: i < currentRound || (i === currentRound && phase === 'success')
                  ? `0 0 8px ${mindfulColors.pastel.mint}`
                  : 'none',
              }}
            />
          ))}
        </Box>

        {/* Round counter */}
        <Typography
          sx={{
            position: 'absolute',
            top: 10,
            left: 12,
            fontSize: '0.85rem',
            fontWeight: 600,
            color: alpha('#fff', 0.7),
          }}
        >
          Round {currentRound + 1} / {ROUNDS_TO_COMPLETE}
        </Typography>

        {/* Sequence length indicator */}
        <Typography
          sx={{
            position: 'absolute',
            top: 10,
            right: 12,
            fontSize: '0.85rem',
            fontWeight: 600,
            color: alpha('#fff', 0.5),
          }}
        >
          {sequence.length} lights
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default GlowOrder
