import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const ROUNDS_TO_COMPLETE = 3
const SYMBOLS_COUNT = 6
const MEMORIZE_TIME = 2500
const TRANSITION_TIME = 500

// Calming symbols
const ALL_SYMBOLS = [
  '🌸', '🌿', '🦋', '🌙', '⭐', '🌊',
  '🍃', '🌺', '🐚', '🪷', '🌻', '☁️',
  '🕊️', '🌈', '💧', '🍀', '🌷', '✨',
  '🐠', '🌴', '🎐', '🪻', '🌼', '🫧',
]

type GamePhase = 'memorize' | 'transition' | 'guess' | 'reveal' | 'complete'

type RoundData = {
  originalSymbols: string[]
  changedSymbols: string[]
  changedIndex: number
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateRound(): RoundData {
  // Pick random symbols
  const shuffled = shuffleArray(ALL_SYMBOLS)
  const originalSymbols = shuffled.slice(0, SYMBOLS_COUNT)

  // Pick which index to change
  const changedIndex = Math.floor(Math.random() * SYMBOLS_COUNT)

  // Pick a new symbol (not in original set)
  const availableSymbols = shuffled.slice(SYMBOLS_COUNT)
  const newSymbol = availableSymbols[0]

  // Create changed version
  const changedSymbols = [...originalSymbols]
  changedSymbols[changedIndex] = newSymbol

  return { originalSymbols, changedSymbols, changedIndex }
}

function initializeRounds(): RoundData[] {
  return Array.from({ length: ROUNDS_TO_COMPLETE }, () => generateRound())
}

export const SymbolSwap = memo(function SymbolSwap({
  onComplete,
}: GameProps) {
  const [rounds] = useState<RoundData[]>(() => initializeRounds())
  const [currentRound, setCurrentRound] = useState(0)
  const [phase, setPhase] = useState<GamePhase>('memorize')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [completedCount, setCompletedCount] = useState(0)
  const hasTransitionedRef = useRef(false)
  const { playSuccess, playChime, playTone } = useSound()

  const round = rounds[currentRound]

  // Phase transitions
  useEffect(() => {
    if (phase !== 'memorize') return
    hasTransitionedRef.current = false

    const timer = setTimeout(() => {
      if (hasTransitionedRef.current) return
      hasTransitionedRef.current = true
      setPhase('transition')
    }, MEMORIZE_TIME)

    return () => clearTimeout(timer)
  }, [phase, currentRound])

  useEffect(() => {
    if (phase !== 'transition') return

    const timer = setTimeout(() => {
      setPhase('guess')
    }, TRANSITION_TIME)

    return () => clearTimeout(timer)
  }, [phase])

  // Handle symbol tap
  const handleSymbolTap = useCallback((index: number) => {
    if (phase !== 'guess') return

    setSelectedIndex(index)
    setPhase('reveal')

    const isCorrect = index === round.changedIndex

    if (isCorrect) {
      playSuccess()
      const newCount = completedCount + 1
      setCompletedCount(newCount)

      setTimeout(() => {
        if (newCount >= ROUNDS_TO_COMPLETE) {
          setPhase('complete')
          playChime()
          setTimeout(() => {
            onComplete?.()
          }, 1500)
        } else {
          // Next round
          setCurrentRound(prev => prev + 1)
          setSelectedIndex(null)
          setPhase('memorize')
        }
      }, 1200)
    } else {
      playTone({ frequency: 200, duration: 150, volume: 0.15, type: 'sine' })

      // Let them try again
      setTimeout(() => {
        setSelectedIndex(null)
        setPhase('guess')
      }, 800)
    }
  }, [phase, round, completedCount, onComplete, playSuccess, playChime, playTone])

  const getInstruction = () => {
    switch (phase) {
      case 'memorize':
        return 'Remember these symbols...'
      case 'transition':
        return '...'
      case 'guess':
        return `Which symbol changed? (${completedCount + 1}/${ROUNDS_TO_COMPLETE})`
      case 'reveal':
        return selectedIndex === round.changedIndex ? 'Correct!' : 'Try again...'
      case 'complete':
        return 'Sharp eyes!'
      default:
        return ''
    }
  }

  const displaySymbols = phase === 'memorize' || phase === 'transition'
    ? round.originalSymbols
    : round.changedSymbols

  return (
    <GameContainer
      title="Symbol Swap"
      instruction={getInstruction()}
      ariaLabel={`Find the changed symbol. Round ${completedCount + 1} of ${ROUNDS_TO_COMPLETE}`}
    >
      <Box
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(mindfulColors.pastel.lavender, 0.4)} 0%, ${alpha(mindfulColors.pastel.pink, 0.3)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        {/* Symbols grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
            opacity: phase === 'transition' ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {displaySymbols.map((symbol, i) => {
            const isSelected = selectedIndex === i
            const isCorrectAnswer = phase === 'reveal' && i === round.changedIndex
            const isWrongSelection = phase === 'reveal' && isSelected && i !== round.changedIndex

            return (
              <Box
                key={i}
                onClick={() => handleSymbolTap(i)}
                sx={{
                  width: 70,
                  height: 70,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.2rem',
                  borderRadius: 2,
                  backgroundColor: isCorrectAnswer
                    ? alpha(mindfulColors.pastel.mint, 0.7)
                    : isWrongSelection
                    ? alpha('#ff6b6b', 0.4)
                    : alpha('#fff', 0.6),
                  cursor: phase === 'guess' ? 'pointer' : 'default',
                  transition: 'all 0.2s ease',
                  transform: isWrongSelection ? 'scale(0.95)' : 'scale(1)',
                  boxShadow: isCorrectAnswer
                    ? `0 0 20px ${alpha(mindfulColors.pastel.mint, 0.8)}`
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  border: isCorrectAnswer
                    ? `3px solid ${mindfulColors.pastel.mint}`
                    : '3px solid transparent',
                  '&:hover': {
                    transform: phase === 'guess' ? 'scale(1.05)' : undefined,
                    backgroundColor: phase === 'guess' ? alpha('#fff', 0.8) : undefined,
                  },
                  '&:active': {
                    transform: phase === 'guess' ? 'scale(0.95)' : undefined,
                  },
                }}
              >
                {symbol}
              </Box>
            )
          })}
        </Box>

        {/* Phase indicator */}
        {phase === 'memorize' && (
          <Typography
            sx={{
              mt: 2,
              fontSize: '0.8rem',
              color: mindfulColors.text.secondary,
              animation: 'pulse 1s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 0.5 },
                '50%': { opacity: 1 },
              },
            }}
          >
            Memorizing...
          </Typography>
        )}

        {/* Progress indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 0.75,
          }}
        >
          {Array.from({ length: ROUNDS_TO_COMPLETE }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: i < completedCount
                  ? mindfulColors.pastel.mint
                  : i === currentRound && phase === 'reveal' && selectedIndex === round.changedIndex
                  ? mindfulColors.pastel.mint
                  : alpha('#fff', 0.5),
                transition: 'background-color 0.3s ease',
                boxShadow: i < completedCount
                  ? `0 0 6px ${mindfulColors.pastel.mint}`
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
            color: mindfulColors.text.secondary,
          }}
        >
          {completedCount} / {ROUNDS_TO_COMPLETE}
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default SymbolSwap
