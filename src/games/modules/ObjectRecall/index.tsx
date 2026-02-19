import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const ITEMS_TO_MEMORIZE = 5
const TOTAL_ITEMS_IN_RECALL = 9
const MEMORIZE_TIME = 4000 // 4 seconds to memorize

// Calming objects/symbols for the game
const ALL_OBJECTS = [
  { emoji: '🌸', name: 'flower' },
  { emoji: '🌿', name: 'leaf' },
  { emoji: '🦋', name: 'butterfly' },
  { emoji: '🌙', name: 'moon' },
  { emoji: '⭐', name: 'star' },
  { emoji: '🌊', name: 'wave' },
  { emoji: '🍃', name: 'leaves' },
  { emoji: '🌺', name: 'hibiscus' },
  { emoji: '🐚', name: 'shell' },
  { emoji: '🪷', name: 'lotus' },
  { emoji: '🌻', name: 'sunflower' },
  { emoji: '☁️', name: 'cloud' },
  { emoji: '🕊️', name: 'dove' },
  { emoji: '🌈', name: 'rainbow' },
  { emoji: '💧', name: 'droplet' },
]

type GamePhase = 'memorize' | 'recall' | 'complete'

type ObjectItem = {
  emoji: string
  name: string
  isOriginal: boolean
  selected: boolean
  wrong: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Initialize items once
function initializeGame() {
  const shuffled = shuffleArray(ALL_OBJECTS)
  return shuffled.slice(0, ITEMS_TO_MEMORIZE)
}

export const ObjectRecall = memo(function ObjectRecall({
  onComplete,
}: GameProps) {
  // Use lazy initializer to prevent StrictMode issues
  const [originalItems] = useState<typeof ALL_OBJECTS>(() => initializeGame())
  const [phase, setPhase] = useState<GamePhase>('memorize')
  const [recallItems, setRecallItems] = useState<ObjectItem[]>([])
  const [correctCount, setCorrectCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(MEMORIZE_TIME / 1000)
  const { playSuccess, playChime, playTone } = useSound()

  const correctCountRef = useRef(0)
  const hasTransitionedRef = useRef(false)

  // Countdown timer during memorize phase
  useEffect(() => {
    if (phase !== 'memorize') return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [phase])

  // Transition to recall phase after memorize time
  useEffect(() => {
    if (phase !== 'memorize' || hasTransitionedRef.current) return

    const timer = setTimeout(() => {
      if (hasTransitionedRef.current) return
      hasTransitionedRef.current = true

      // Create recall items: original items + some new ones
      const originalSet = new Set(originalItems.map(i => i.name))
      const newItems = ALL_OBJECTS.filter(i => !originalSet.has(i.name))
      const shuffledNew = shuffleArray(newItems)
      const extraItems = shuffledNew.slice(0, TOTAL_ITEMS_IN_RECALL - ITEMS_TO_MEMORIZE)

      const allRecallItems: ObjectItem[] = [
        ...originalItems.map(i => ({ ...i, isOriginal: true, selected: false, wrong: false })),
        ...extraItems.map(i => ({ ...i, isOriginal: false, selected: false, wrong: false })),
      ]

      setRecallItems(shuffleArray(allRecallItems))
      setPhase('recall')
    }, MEMORIZE_TIME)

    return () => clearTimeout(timer)
  }, [phase, originalItems])

  // Handle item tap during recall
  const handleItemTap = useCallback((index: number) => {
    if (phase !== 'recall') return

    const item = recallItems[index]
    if (!item || item.selected || item.wrong) return

    if (item.isOriginal) {
      // Correct!
      setRecallItems(prev => {
        const updated = [...prev]
        updated[index] = { ...prev[index], selected: true }
        return updated
      })

      correctCountRef.current += 1
      const newCount = correctCountRef.current
      setCorrectCount(newCount)
      playSuccess()

      if (newCount >= ITEMS_TO_MEMORIZE) {
        setPhase('complete')
        playChime()
        setTimeout(() => {
          onComplete?.()
        }, 1500)
      }
    } else {
      // Wrong - mark as wrong briefly
      setRecallItems(prev => {
        const updated = [...prev]
        updated[index] = { ...prev[index], wrong: true }
        return updated
      })
      playTone({ frequency: 200, duration: 150, volume: 0.15, type: 'sine' })

      // Reset wrong state after animation
      setTimeout(() => {
        setRecallItems(prev => {
          const reset = [...prev]
          if (reset[index]) {
            reset[index] = { ...reset[index], wrong: false }
          }
          return reset
        })
      }, 500)
    }
  }, [phase, recallItems, onComplete, playSuccess, playChime, playTone])

  const getInstruction = () => {
    switch (phase) {
      case 'memorize':
        return `Remember these items... (${timeLeft}s)`
      case 'recall':
        return `Tap the items you saw (${correctCount}/${ITEMS_TO_MEMORIZE})`
      case 'complete':
        return 'Great memory!'
      default:
        return ''
    }
  }

  return (
    <GameContainer
      title="Object Recall"
      instruction={getInstruction()}
      ariaLabel={`Memory game. ${phase === 'memorize' ? 'Memorize the items shown' : `Find the original items. ${correctCount} of ${ITEMS_TO_MEMORIZE} found`}`}
    >
      <Box
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(mindfulColors.pastel.lavender, 0.3)} 0%, ${alpha(mindfulColors.pastel.mint, 0.3)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Memorize Phase */}
        {phase === 'memorize' && (
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
            }}
          >
            {originalItems.map((item, i) => (
              <Box
                key={item.name}
                sx={{
                  fontSize: '3rem',
                  animation: 'fadeInScale 0.5s ease forwards',
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                  '@keyframes fadeInScale': {
                    '0%': {
                      opacity: 0,
                      transform: 'scale(0.5)',
                    },
                    '100%': {
                      opacity: 1,
                      transform: 'scale(1)',
                    },
                  },
                }}
              >
                {item.emoji}
              </Box>
            ))}
          </Box>
        )}

        {/* Recall Phase */}
        {(phase === 'recall' || phase === 'complete') && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              p: 3,
              maxWidth: 300,
            }}
          >
            {recallItems.map((item, i) => (
              <Box
                key={`${item.name}-${i}`}
                onClick={() => handleItemTap(i)}
                sx={{
                  fontSize: '2.5rem',
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  backgroundColor: item.selected
                    ? alpha(mindfulColors.pastel.mint, 0.5)
                    : item.wrong
                    ? alpha('#ff6b6b', 0.3)
                    : alpha('#fff', 0.5),
                  cursor: item.selected || item.wrong ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  transform: item.wrong ? 'scale(0.9)' : 'scale(1)',
                  boxShadow: item.selected
                    ? `0 0 15px ${alpha(mindfulColors.pastel.mint, 0.6)}`
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  border: item.selected
                    ? `2px solid ${mindfulColors.pastel.mint}`
                    : '2px solid transparent',
                  '&:hover': {
                    transform: item.selected || item.wrong ? undefined : 'scale(1.05)',
                    backgroundColor: item.selected
                      ? alpha(mindfulColors.pastel.mint, 0.5)
                      : item.wrong
                      ? alpha('#ff6b6b', 0.3)
                      : alpha('#fff', 0.7),
                  },
                  '&:active': {
                    transform: item.selected || item.wrong ? undefined : 'scale(0.95)',
                  },
                }}
              >
                {item.emoji}
              </Box>
            ))}
          </Box>
        )}

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
          {Array.from({ length: ITEMS_TO_MEMORIZE }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: i < correctCount
                  ? mindfulColors.pastel.mint
                  : alpha('#fff', 0.5),
                transition: 'background-color 0.3s ease',
                boxShadow: i < correctCount
                  ? `0 0 8px ${mindfulColors.pastel.mint}`
                  : 'none',
              }}
            />
          ))}
        </Box>

        {/* Timer during memorize */}
        {phase === 'memorize' && (
          <Box
            sx={{
              position: 'absolute',
              top: 15,
              right: 15,
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: alpha('#fff', 0.8),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: mindfulColors.pastel.lavender,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            {timeLeft}
          </Box>
        )}
      </Box>
    </GameContainer>
  )
})

export default ObjectRecall
