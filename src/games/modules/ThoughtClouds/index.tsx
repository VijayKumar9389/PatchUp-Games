import { useState, useCallback, useRef, useEffect, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useAnimationFrame, useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

type Cloud = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  text: string
  scale: number
  opacity: number
  popped: boolean
}

const THOUGHTS = [
  'Worry',
  'Stress',
  'Fear',
  'Doubt',
  'Rush',
  'Noise',
]

const CLOUDS_TO_POP = 5

export const ThoughtClouds = memo(function ThoughtClouds({
  onComplete,
}: GameProps) {
  const [clouds, setClouds] = useState<Cloud[]>([])
  const [poppedCount, setPoppedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const cloudIdRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { playTone, playChime } = useSound()

  // Spawn initial clouds
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const initialClouds: Cloud[] = THOUGHTS.slice(0, CLOUDS_TO_POP).map((text, i) => ({
      id: cloudIdRef.current++,
      x: 30 + (i % 3) * (rect.width > 300 ? 100 : 80),
      y: 40 + Math.floor(i / 3) * 70,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      text,
      scale: 1,
      opacity: 1,
      popped: false,
    }))
    setClouds(initialClouds)
  }, [])

  // Gentle floating animation
  useAnimationFrame(
    () => {
      setClouds(prev => prev.map(cloud => {
        if (cloud.popped) {
          // Pop animation - expand and fade out
          const newScale = cloud.scale + 0.08
          const newOpacity = cloud.opacity - 0.06
          return {
            ...cloud,
            scale: newScale,
            opacity: Math.max(0, newOpacity),
          }
        }

        // Gentle drift for non-popped clouds
        const container = containerRef.current
        if (!container) return cloud

        const rect = container.getBoundingClientRect()
        let { x, y, vx, vy } = cloud

        x += vx
        y += vy

        // Bounce off walls gently
        if (x < 10 || x > rect.width - 80) vx *= -1
        if (y < 10 || y > rect.height - 50) vy *= -1

        x = Math.max(10, Math.min(rect.width - 80, x))
        y = Math.max(10, Math.min(rect.height - 50, y))

        return { ...cloud, x, y, vx, vy }
      }).filter(c => c.opacity > 0))
    },
    { enabled: !isComplete }
  )

  const handlePopCloud = useCallback((cloudId: number) => {
    const cloud = clouds.find(c => c.id === cloudId)
    if (!cloud || cloud.popped) return

    // Play a gentle pop sound
    playTone({ frequency: 400 + Math.random() * 200, duration: 150, volume: 0.2 })

    setClouds(prev => prev.map(c =>
      c.id === cloudId ? { ...c, popped: true } : c
    ))
    setPoppedCount(c => c + 1)
  }, [clouds, playTone])

  // Check completion
  useEffect(() => {
    if (poppedCount >= CLOUDS_TO_POP && !isComplete) {
      setIsComplete(true)
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [poppedCount, isComplete, onComplete, playChime])

  const instruction = isComplete
    ? 'All thoughts released!'
    : `Tap the clouds to pop them (${poppedCount}/${CLOUDS_TO_POP})`

  return (
    <GameContainer
      title="Thought Clouds"
      instruction={instruction}
      ariaLabel="Tap thought clouds to pop them and release your worries"
    >
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: { xs: 220, sm: 260 },
          borderRadius: 3,
          background: `linear-gradient(180deg, ${mindfulColors.primary.light} 0%, ${alpha(mindfulColors.background.default, 0.8)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          touchAction: 'none',
        }}
      >
        {/* Clouds */}
        {clouds.map(cloud => (
          <Box
            key={cloud.id}
            onClick={() => handlePopCloud(cloud.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handlePopCloud(cloud.id)
              }
            }}
            role="button"
            tabIndex={cloud.popped ? -1 : 0}
            aria-label={`Pop ${cloud.text} thought`}
            sx={{
              position: 'absolute',
              left: cloud.x,
              top: cloud.y,
              px: { xs: 1.5, sm: 2 },
              py: { xs: 0.8, sm: 1 },
              borderRadius: 20,
              backgroundColor: alpha('#fff', 0.9),
              boxShadow: `0 4px 12px ${alpha('#000', 0.1)}`,
              cursor: cloud.popped ? 'default' : 'pointer',
              opacity: cloud.opacity,
              transform: `scale(${cloud.scale})`,
              transition: cloud.popped ? 'transform 0.2s ease-out, opacity 0.2s ease-out' : 'none',
              userSelect: 'none',
              pointerEvents: cloud.popped ? 'none' : 'auto',
              '&:hover': !cloud.popped ? {
                backgroundColor: '#fff',
                boxShadow: `0 6px 16px ${alpha('#000', 0.15)}`,
                transform: 'scale(1.05)',
              } : undefined,
              '&:active': !cloud.popped ? {
                transform: 'scale(0.95)',
              } : undefined,
              '&:focus': {
                outline: `3px solid ${mindfulColors.primary.main}`,
                outlineOffset: 2,
              },
            }}
          >
            <Typography
              sx={{
                color: mindfulColors.text.secondary,
                fontWeight: 500,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
              }}
            >
              {cloud.text}
            </Typography>
          </Box>
        ))}

        {/* Hint if no clouds popped yet */}
        {poppedCount === 0 && clouds.length > 0 && (
          <Typography
            sx={{
              position: 'absolute',
              bottom: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              color: alpha(mindfulColors.text.secondary, 0.6),
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
            }}
          >
            Tap a cloud to pop it
          </Typography>
        )}
      </Box>
    </GameContainer>
  )
})

export default ThoughtClouds
