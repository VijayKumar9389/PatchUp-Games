import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useAnimationFrame, useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const APPLES_TO_CATCH = 5
const APPLE_FALL_SPEED = 0.08 // Moderate falling speed
const BASKET_WIDTH = 60
const SPAWN_INTERVAL = 1500 // New apple every 1.5 seconds

type Apple = {
  id: number
  x: number
  y: number
  caught: boolean
}

export const ApplePicking = memo(function ApplePicking({
  onComplete,
}: GameProps) {
  const [apples, setApples] = useState<Apple[]>([])
  const [basketX, setBasketX] = useState(50) // Percentage position
  const [caughtCount, setCaughtCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showCatchEffect, setShowCatchEffect] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const nextAppleIdRef = useRef(0)
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { playSuccess, playChime } = useSound()

  // Spawn apples periodically
  useEffect(() => {
    if (isComplete) return

    const spawnApple = () => {
      const newApple: Apple = {
        id: nextAppleIdRef.current++,
        x: 15 + Math.random() * 70, // 15-85% to stay away from edges
        y: 0,
        caught: false,
      }
      setApples(prev => [...prev, newApple])
    }

    // Spawn first apple immediately
    spawnApple()

    spawnIntervalRef.current = setInterval(spawnApple, SPAWN_INTERVAL)

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current)
      }
    }
  }, [isComplete])

  // Apple falling animation
  useAnimationFrame(
    (deltaTime) => {
      if (isComplete) return

      setApples(prev => {
        const updated = prev.map(apple => {
          if (apple.caught) return apple

          const newY = apple.y + deltaTime * APPLE_FALL_SPEED

          // Check if caught by basket
          if (newY >= 75 && newY <= 85) {
            const basketLeft = basketX - (BASKET_WIDTH / 2) / 100 * 100
            const basketRight = basketX + (BASKET_WIDTH / 2) / 100 * 100

            if (apple.x >= basketLeft - 5 && apple.x <= basketRight + 5) {
              // Caught!
              setTimeout(() => {
                const newCount = caughtCount + 1
                setCaughtCount(newCount)
                setShowCatchEffect(true)
                setTimeout(() => setShowCatchEffect(false), 300)
                playSuccess()

                if (newCount >= APPLES_TO_CATCH) {
                  setIsComplete(true)
                  if (spawnIntervalRef.current) {
                    clearInterval(spawnIntervalRef.current)
                  }
                  playChime()
                  setTimeout(() => {
                    onComplete?.()
                  }, 1500)
                }
              }, 0)

              return { ...apple, caught: true }
            }
          }

          return { ...apple, y: newY }
        })

        // Remove apples that fell past the screen or were caught
        return updated.filter(apple => apple.y < 100 && !apple.caught)
      })
    },
    { enabled: !isComplete }
  )

  // Handle pointer move to control basket
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (isComplete) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100

    // Clamp to keep basket on screen
    setBasketX(Math.max(15, Math.min(85, x)))
  }, [isComplete])

  const handlePointerDown = handlePointerMove

  const instruction = isComplete
    ? 'Great picking!'
    : `Catch the apples! (${caughtCount}/${APPLES_TO_CATCH})`

  return (
    <GameContainer
      title="Apple Picking"
      instruction={instruction}
      ariaLabel={`Catch falling apples with the basket. ${caughtCount} of ${APPLES_TO_CATCH} caught`}
    >
      <Box
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: 'linear-gradient(180deg, #87CEEB 0%, #98FB98 70%, #8B4513 100%)',
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
          touchAction: 'none',
        }}
      >
        {/* Tree trunk */}
        <Box
          sx={{
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 28,
            height: 70,
            background: 'linear-gradient(90deg, #5D3A1A 0%, #8B5A2B 30%, #8B5A2B 70%, #5D3A1A 100%)',
            borderRadius: '3px 3px 8px 8px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 20,
              left: 4,
              width: 3,
              height: 15,
              backgroundColor: '#4A2F15',
              borderRadius: 2,
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 40,
              right: 5,
              width: 4,
              height: 10,
              backgroundColor: '#4A2F15',
              borderRadius: 2,
            },
          }}
        />

        {/* Tree foliage - layered circles for fuller look */}
        <Box
          sx={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 160,
            height: 90,
          }}
        >
          {/* Back layer */}
          <Box sx={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 140,
            height: 60,
            backgroundColor: '#1B5E20',
            borderRadius: '50%',
          }} />
          {/* Left cluster */}
          <Box sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            width: 70,
            height: 55,
            backgroundColor: '#2E7D32',
            borderRadius: '50%',
          }} />
          {/* Right cluster */}
          <Box sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 70,
            height: 55,
            backgroundColor: '#2E7D32',
            borderRadius: '50%',
          }} />
          {/* Top center */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 50,
            backgroundColor: '#388E3C',
            borderRadius: '50%',
          }} />
          {/* Front highlights */}
          <Box sx={{
            position: 'absolute',
            top: 25,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 100,
            height: 45,
            backgroundColor: '#43A047',
            borderRadius: '50%',
          }} />
          {/* Small accent clusters */}
          <Box sx={{
            position: 'absolute',
            top: 5,
            left: 35,
            width: 35,
            height: 30,
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
          }} />
          <Box sx={{
            position: 'absolute',
            top: 5,
            right: 35,
            width: 35,
            height: 30,
            backgroundColor: '#4CAF50',
            borderRadius: '50%',
          }} />
        </Box>

        {/* Apples on tree (decorative) */}
        <Box sx={{ position: 'absolute', top: 15, left: 'calc(50% - 45px)', fontSize: '0.9rem' }}>🍎</Box>
        <Box sx={{ position: 'absolute', top: 25, left: 'calc(50% + 35px)', fontSize: '0.9rem' }}>🍎</Box>
        <Box sx={{ position: 'absolute', top: 40, left: 'calc(50% - 30px)', fontSize: '0.9rem' }}>🍎</Box>

        {/* Falling apples */}
        {apples.map(apple => (
          <Box
            key={apple.id}
            sx={{
              position: 'absolute',
              left: `${apple.x}%`,
              top: `${apple.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: '1.8rem',
              transition: 'none',
              filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))',
            }}
          >
            🍎
          </Box>
        ))}

        {/* Basket */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '12%',
            left: `${basketX}%`,
            transform: 'translateX(-50%)',
            width: BASKET_WIDTH,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.2rem',
            filter: showCatchEffect
              ? 'drop-shadow(0 0 10px #4CAF50)'
              : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            transition: 'left 0.1s ease-out, filter 0.2s ease',
          }}
        >
          🧺
        </Box>

        {/* Ground */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '10%',
            backgroundColor: '#8B4513',
            borderRadius: '0 0 12px 12px',
          }}
        />

        {/* Grass details */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            left: 0,
            right: 0,
            height: 15,
            background: 'linear-gradient(to top, #228B22, transparent)',
          }}
        />

        {/* Progress apples */}
        <Box
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            display: 'flex',
            gap: 0.5,
          }}
        >
          {Array.from({ length: APPLES_TO_CATCH }).map((_, i) => (
            <Box
              key={i}
              sx={{
                fontSize: '1rem',
                opacity: i < caughtCount ? 1 : 0.3,
                transition: 'opacity 0.3s ease',
              }}
            >
              🍎
            </Box>
          ))}
        </Box>

        {/* Counter */}
        <Typography
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            color: '#fff',
            fontSize: '0.9rem',
            fontWeight: 600,
            textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          }}
        >
          {caughtCount} / {APPLES_TO_CATCH}
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default ApplePicking
