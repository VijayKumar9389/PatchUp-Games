import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const STEPS_TO_COMPLETE = 5
const COUNT_INTERVAL = 1000 // 1 second per number

export const SlowTurtle = memo(function SlowTurtle({
  onComplete,
}: GameProps) {
  const [stepsCompleted, setStepsCompleted] = useState(0)
  const [turtlePosition, setTurtlePosition] = useState(0)
  const [currentCount, setCurrentCount] = useState(1)
  const [message, setMessage] = useState('Tap when you see 3')
  const [isComplete, setIsComplete] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [canTap, setCanTap] = useState(true)
  const { playGentle, playChime, playSuccess, playTone } = useSound()
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Count 1, 2, 3 repeatedly
  useEffect(() => {
    if (isComplete) return

    countIntervalRef.current = setInterval(() => {
      setCurrentCount(prev => {
        if (prev >= 3) {
          setCanTap(true) // Reset tap ability on new cycle
          return 1
        }
        return prev + 1
      })
    }, COUNT_INTERVAL)

    return () => {
      if (countIntervalRef.current) {
        clearInterval(countIntervalRef.current)
      }
    }
  }, [isComplete])

  const handleTap = useCallback(() => {
    if (isComplete || !canTap) return

    if (currentCount === 3) {
      // Correct! Turtle moves
      setCanTap(false)
      playSuccess()
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 300)

      const newSteps = stepsCompleted + 1
      setStepsCompleted(newSteps)
      setTurtlePosition(newSteps * (100 / STEPS_TO_COMPLETE))
      setMessage('Great timing!')

      if (newSteps >= STEPS_TO_COMPLETE) {
        setIsComplete(true)
        setMessage('The turtle made it!')
        playChime()
        setTimeout(() => {
          onComplete?.()
        }, 2000)
      } else {
        if (messageTimeoutRef.current) {
          clearTimeout(messageTimeoutRef.current)
        }
        messageTimeoutRef.current = setTimeout(() => {
          setMessage('Tap when you see 3')
        }, 1500)
      }
    } else {
      // Wrong number - turtle doesn't move
      setCanTap(false) // Prevent spam tapping
      playTone({ frequency: 300, duration: 100, volume: 0.15 })
      setMessage('Wait for 3...')

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
      }
      messageTimeoutRef.current = setTimeout(() => {
        setMessage('Tap when you see 3')
      }, 1000)
    }
  }, [isComplete, canTap, currentCount, stepsCompleted, onComplete, playSuccess, playChime, playTone])

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current)
      }
      if (countIntervalRef.current) {
        clearInterval(countIntervalRef.current)
      }
    }
  }, [])

  // Determine number color
  const getNumberColor = () => {
    if (currentCount === 3) {
      return '#2E7D32' // Green for 3
    }
    return mindfulColors.text.secondary
  }

  return (
    <GameContainer
      title="Slow Turtle"
      instruction={message}
      ariaLabel={`Timing game: tap when the counter shows 3. Step ${stepsCompleted} of ${STEPS_TO_COMPLETE}`}
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
        aria-label="Tap when counter shows 3"
        sx={{
          width: '100%',
          height: 220,
          borderRadius: 3,
          backgroundColor: alpha(mindfulColors.pastel.mint, 0.2),
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          '&:focus': {
            outline: `3px solid ${mindfulColors.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        {/* Counter display */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '4rem',
              fontWeight: 700,
              color: getNumberColor(),
              transition: 'color 0.2s ease',
              textShadow: currentCount === 3
                ? `0 0 20px ${alpha('#2E7D32', 0.5)}`
                : 'none',
            }}
          >
            {currentCount}
          </Typography>
        </Box>

        {/* Ground */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            backgroundColor: alpha(mindfulColors.pastel.sage, 0.5),
            borderRadius: '0 0 12px 12px',
          }}
        />

        {/* Turtle */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 45,
            left: `${8 + turtlePosition * 0.75}%`,
            fontSize: '2.5rem',
            transition: 'left 0.5s ease-out',
            transform: 'translateX(-50%) scaleX(-1)',
            zIndex: 2,
            filter: showSuccess ? 'drop-shadow(0 0 10px #4CAF50)' : 'none',
          }}
        >
          🐢
        </Box>

        {/* Finish flag */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 45,
            right: 15,
            fontSize: '2rem',
          }}
        >
          🏁
        </Box>

        {/* Progress dots */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 15,
            display: 'flex',
            gap: 0.5,
          }}
        >
          {Array.from({ length: STEPS_TO_COMPLETE }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: i < stepsCompleted
                  ? '#4CAF50'
                  : alpha(mindfulColors.primary.main, 0.2),
                border: `2px solid ${i < stepsCompleted
                  ? '#2E7D32'
                  : alpha(mindfulColors.primary.main, 0.3)}`,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </GameContainer>
  )
})

export default SlowTurtle
