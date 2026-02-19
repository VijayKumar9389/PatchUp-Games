import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const STARS_TO_COLLECT = 5
const STAR_LIFETIME = 2000 // How long a star is visible (ms)
const STAR_FADE_DURATION = 500 // Fade in/out duration (ms)
const SPAWN_DELAY_MIN = 800
const SPAWN_DELAY_MAX = 1500

type Star = {
  id: number
  x: number
  y: number
  spawnTime: number
  collected: boolean
}

export const StarCollector = memo(function StarCollector({
  onComplete,
}: GameProps) {
  const [stars, setStars] = useState<Star[]>([])
  const [collectedCount, setCollectedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const nextStarIdRef = useRef(0)
  const spawnTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { playTone, playChime } = useSound()

  // Spawn a new star
  const spawnStar = useCallback(() => {
    if (isComplete) return

    const newStar: Star = {
      id: nextStarIdRef.current++,
      x: 15 + Math.random() * 70, // 15-85% to keep away from edges
      y: 15 + Math.random() * 60, // 15-75% to keep in upper area
      spawnTime: Date.now(),
      collected: false,
    }

    setStars(prev => [...prev, newStar])

    // Schedule next star spawn
    const delay = SPAWN_DELAY_MIN + Math.random() * (SPAWN_DELAY_MAX - SPAWN_DELAY_MIN)
    spawnTimeoutRef.current = setTimeout(spawnStar, delay)
  }, [isComplete])

  // Start spawning stars
  useEffect(() => {
    spawnStar()

    return () => {
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current)
      }
    }
  }, [spawnStar])

  // Remove faded stars
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setStars(prev => prev.filter(star => {
        const age = now - star.spawnTime
        return star.collected || age < STAR_LIFETIME
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Handle star tap
  const handleStarTap = useCallback((starId: number) => {
    if (isComplete) return

    setStars(prev => prev.map(star => {
      if (star.id === starId && !star.collected) {
        return { ...star, collected: true }
      }
      return star
    }))

    const newCount = collectedCount + 1
    setCollectedCount(newCount)

    // Play twinkle sound
    playTone({
      frequency: 600 + Math.random() * 400,
      duration: 200,
      volume: 0.2,
      type: 'sine'
    })

    if (newCount >= STARS_TO_COLLECT) {
      setIsComplete(true)
      if (spawnTimeoutRef.current) {
        clearTimeout(spawnTimeoutRef.current)
      }
      playChime()
      setTimeout(() => {
        onComplete?.()
      }, 1500)
    }
  }, [isComplete, collectedCount, onComplete, playTone, playChime])

  // Calculate star opacity based on age
  const getStarOpacity = (star: Star): number => {
    if (star.collected) return 0

    const age = Date.now() - star.spawnTime
    const fadeInEnd = STAR_FADE_DURATION
    const fadeOutStart = STAR_LIFETIME - STAR_FADE_DURATION

    if (age < fadeInEnd) {
      // Fading in
      return age / fadeInEnd
    } else if (age > fadeOutStart) {
      // Fading out
      return (STAR_LIFETIME - age) / STAR_FADE_DURATION
    }
    // Fully visible
    return 1
  }

  const instruction = isComplete
    ? 'Wonderful stargazing!'
    : `Tap the stars before they fade (${collectedCount}/${STARS_TO_COLLECT})`

  return (
    <GameContainer
      title="Star Collector"
      instruction={instruction}
      ariaLabel={`Collect stars by tapping them. ${collectedCount} of ${STARS_TO_COLLECT} collected`}
    >
      <Box
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Background stars (static, decorative) */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={`bg-${i}`}
            sx={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2,
              height: 2,
              borderRadius: '50%',
              backgroundColor: alpha('#fff', 0.3 + Math.random() * 0.3),
            }}
          />
        ))}

        {/* Collectible stars */}
        {stars.map(star => {
          const opacity = getStarOpacity(star)
          if (opacity <= 0) return null

          return (
            <Box
              key={star.id}
              onClick={(e) => {
                e.stopPropagation()
                handleStarTap(star.id)
              }}
              sx={{
                position: 'absolute',
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem',
                opacity: star.collected ? 0 : opacity,
                cursor: 'pointer',
                transition: star.collected ? 'opacity 0.2s ease, transform 0.2s ease' : 'none',
                filter: `drop-shadow(0 0 ${10 * opacity}px ${alpha('#FFD700', 0.8)})`,
                animation: star.collected ? 'none' : 'twinkle 1.5s ease-in-out infinite',
                '&:hover': {
                  transform: 'translate(-50%, -50%) scale(1.2)',
                },
                '@keyframes twinkle': {
                  '0%, 100%': {
                    filter: `drop-shadow(0 0 ${8 * opacity}px ${alpha('#FFD700', 0.6)})`,
                  },
                  '50%': {
                    filter: `drop-shadow(0 0 ${15 * opacity}px ${alpha('#FFD700', 1)})`,
                  },
                },
              }}
            >
              ⭐
            </Box>
          )
        })}

        {/* Moon decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 30,
            fontSize: '1.5rem',
            opacity: 0.6,
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
          {Array.from({ length: STARS_TO_COLLECT }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 16,
                height: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                opacity: i < collectedCount ? 1 : 0.3,
                transition: 'opacity 0.3s ease',
              }}
            >
              ⭐
            </Box>
          ))}
        </Box>

        {/* Collected counter */}
        <Typography
          sx={{
            position: 'absolute',
            top: 15,
            left: 15,
            color: alpha('#fff', 0.8),
            fontSize: '0.9rem',
            fontWeight: 500,
          }}
        >
          {collectedCount} / {STARS_TO_COLLECT}
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default StarCollector
