import { useState, useCallback, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useAnimationFrame, useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const ORBIT_SPEED = 0.0015 // Radians per ms (slightly slower for easier timing)
const TAPS_TO_COMPLETE = 3
const ORBIT_RADIUS = 70
const TARGET_ANGLE = -Math.PI / 2 // Top of the circle
const TARGET_ZONE = 0.4 // Radians tolerance for successful tap

export const OrbitCalm = memo(function OrbitCalm({
  onComplete,
}: GameProps) {
  const [angle, setAngle] = useState(0)
  const [successfulTaps, setSuccessfulTaps] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState<'none' | 'success' | 'miss'>('none')
  const [showTargetGlow, setShowTargetGlow] = useState(false)
  const canTapRef = useRef(true)
  const { playTone, playChime } = useSound()

  // Orbit animation
  useAnimationFrame(
    (deltaTime) => {
      if (isComplete) return

      setAngle(a => {
        const newAngle = a + deltaTime * ORBIT_SPEED

        // Check if moon is in target zone for visual feedback
        const normalizedAngle = ((newAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const targetNormalized = ((TARGET_ANGLE % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const angleDiff = Math.min(
          Math.abs(normalizedAngle - targetNormalized),
          Math.abs(normalizedAngle - targetNormalized + Math.PI * 2),
          Math.abs(normalizedAngle - targetNormalized - Math.PI * 2)
        )
        setShowTargetGlow(angleDiff < TARGET_ZONE)

        // Reset tap ability when leaving target zone
        if (angleDiff > TARGET_ZONE + 0.2) {
          canTapRef.current = true
        }

        return newAngle
      })
    },
    { enabled: !isComplete }
  )

  const handleTap = useCallback(() => {
    if (isComplete || !canTapRef.current) return

    // Check if moon is in target zone
    const normalizedAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const targetNormalized = ((TARGET_ANGLE % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
    const angleDiff = Math.min(
      Math.abs(normalizedAngle - targetNormalized),
      Math.abs(normalizedAngle - targetNormalized + Math.PI * 2),
      Math.abs(normalizedAngle - targetNormalized - Math.PI * 2)
    )

    if (angleDiff < TARGET_ZONE) {
      // Success!
      canTapRef.current = false
      const newTaps = successfulTaps + 1
      setSuccessfulTaps(newTaps)
      setFeedback('success')
      playTone({ frequency: 523.25, duration: 200, volume: 0.3 })

      if (newTaps >= TAPS_TO_COMPLETE) {
        setIsComplete(true)
        playChime()
        setTimeout(() => {
          onComplete?.()
        }, 1500)
      }
    } else {
      // Missed
      setFeedback('miss')
      playTone({ frequency: 300, duration: 100, volume: 0.15 })
    }

    setTimeout(() => setFeedback('none'), 300)
  }, [angle, successfulTaps, isComplete, onComplete, playTone, playChime])

  // Calculate moon position
  const moonX = Math.cos(angle) * ORBIT_RADIUS
  const moonY = Math.sin(angle) * ORBIT_RADIUS

  // Target position (top)
  const targetX = Math.cos(TARGET_ANGLE) * ORBIT_RADIUS
  const targetY = Math.sin(TARGET_ANGLE) * ORBIT_RADIUS

  const instruction = isComplete
    ? 'Perfect timing!'
    : 'Tap when the moon enters the circle'

  return (
    <GameContainer
      title="Orbit Calm"
      instruction={instruction}
      ariaLabel={`Timing game: tap when the moon is in the target circle. ${successfulTaps} of ${TAPS_TO_COMPLETE} successful taps`}
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
        aria-label="Tap when moon is in the target zone"
        sx={{
          width: 220,
          height: 220,
          borderRadius: '50%',
          backgroundColor: alpha(mindfulColors.primary.main, 0.08),
          position: 'relative',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease',
          '&:active': {
            backgroundColor: alpha(mindfulColors.primary.main, 0.15),
          },
          '&:focus': {
            outline: `3px solid ${mindfulColors.primary.main}`,
            outlineOffset: 4,
          },
        }}
      >
        {/* Orbit path */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: ORBIT_RADIUS * 2,
            height: ORBIT_RADIUS * 2,
            borderRadius: '50%',
            border: `2px dashed ${alpha(mindfulColors.primary.main, 0.25)}`,
          }}
        />

        {/* Center sun */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: mindfulColors.pastel.lemon,
            boxShadow: `0 0 15px ${alpha(mindfulColors.pastel.lemon, 0.5)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.3rem',
          }}
        >
          ☀️
        </Box>

        {/* Target zone circle at top */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px))`,
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: `3px solid ${showTargetGlow ? mindfulColors.pastel.mint : alpha(mindfulColors.primary.main, 0.4)}`,
            backgroundColor: showTargetGlow
              ? alpha(mindfulColors.pastel.mint, 0.3)
              : alpha(mindfulColors.primary.main, 0.1),
            boxShadow: showTargetGlow
              ? `0 0 20px ${alpha(mindfulColors.pastel.mint, 0.6)}`
              : 'none',
            transition: 'all 0.15s ease',
          }}
        />

        {/* Orbiting moon */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: mindfulColors.pastel.periwinkle,
            transform: `translate(calc(-50% + ${moonX}px), calc(-50% + ${moonY}px))`,
            boxShadow: feedback === 'success'
              ? `0 0 25px ${mindfulColors.pastel.mint}`
              : feedback === 'miss'
              ? `0 0 15px ${mindfulColors.pastel.coral}`
              : `0 4px 8px ${alpha('#000', 0.15)}`,
            transition: 'box-shadow 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.1rem',
            zIndex: 2,
          }}
        >
          🌙
        </Box>

        {/* Progress indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 15,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
          }}
        >
          {Array.from({ length: TAPS_TO_COMPLETE }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: i < successfulTaps
                  ? mindfulColors.pastel.mint
                  : alpha(mindfulColors.primary.main, 0.2),
                border: `2px solid ${i < successfulTaps
                  ? mindfulColors.pastel.mint
                  : alpha(mindfulColors.primary.main, 0.3)}`,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>

        {/* Tap instruction */}
        <Typography
          sx={{
            position: 'absolute',
            top: 15,
            left: '50%',
            transform: 'translateX(-50%)',
            color: mindfulColors.text.secondary,
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
          }}
        >
          {successfulTaps}/{TAPS_TO_COMPLETE}
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default OrbitCalm
