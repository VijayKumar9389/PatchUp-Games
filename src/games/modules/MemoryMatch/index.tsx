import { useState, useCallback, useEffect, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

type Card = {
  id: number
  symbol: string
  isFlipped: boolean
  isMatched: boolean
}

const SYMBOLS = ['🌸', '🌿', '☁️', '⭐', '🌙', '🦋']
const PAIRS = 6 // 12 cards total

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function createCards(): Card[] {
  const symbols = SYMBOLS.slice(0, PAIRS)
  const pairs = [...symbols, ...symbols]
  const shuffled = shuffleArray(pairs)

  return shuffled.map((symbol, index) => ({
    id: index,
    symbol,
    isFlipped: false,
    isMatched: false,
  }))
}

export const MemoryMatch = memo(function MemoryMatch({
  onComplete,
}: GameProps) {
  const [cards, setCards] = useState<Card[]>(() => createCards())
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [matchCount, setMatchCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { playTone, playChime } = useSound()

  const handleCardClick = useCallback((cardId: number) => {
    if (isChecking || isComplete) return

    const card = cards.find(c => c.id === cardId)
    if (!card || card.isFlipped || card.isMatched) return

    // Play soft flip sound
    playTone({ frequency: 500 + Math.random() * 100, duration: 80, volume: 0.1 })

    // Flip the card
    setCards(prev => prev.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))

    setFlippedIds(prev => [...prev, cardId])
  }, [cards, isChecking, isComplete, playTone])

  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedIds.length !== 2) return

    setIsChecking(true)
    const [firstId, secondId] = flippedIds
    const firstCard = cards.find(c => c.id === firstId)
    const secondCard = cards.find(c => c.id === secondId)

    if (firstCard && secondCard && firstCard.symbol === secondCard.symbol) {
      // Match found!
      playTone({ frequency: 600, duration: 150, volume: 0.15 })

      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === firstId || c.id === secondId
            ? { ...c, isMatched: true }
            : c
        ))
        setMatchCount(m => m + 1)
        setFlippedIds([])
        setIsChecking(false)
      }, 400)
    } else {
      // No match - flip back
      setTimeout(() => {
        setCards(prev => prev.map(c =>
          c.id === firstId || c.id === secondId
            ? { ...c, isFlipped: false }
            : c
        ))
        setFlippedIds([])
        setIsChecking(false)
      }, 800)
    }
  }, [flippedIds, cards, playTone])

  // Check completion
  useEffect(() => {
    if (matchCount === PAIRS && !isComplete) {
      setIsComplete(true)
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [matchCount, isComplete, onComplete, playChime])

  const instruction = isComplete
    ? 'All pairs found!'
    : `Find matching pairs (${matchCount}/${PAIRS})`

  return (
    <GameContainer
      title="Memory Match"
      instruction={instruction}
      ariaLabel="Flip cards to find matching pairs"
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: { xs: 1, sm: 1.5 },
            p: { xs: 1, sm: 2 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(mindfulColors.pastel.mint, 0.3)} 0%, ${alpha(mindfulColors.pastel.lavender, 0.3)} 100%)`,
          }}
        >
        {cards.map(card => (
          <Box
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleCardClick(card.id)
              }
            }}
            role="button"
            tabIndex={card.isMatched ? -1 : 0}
            aria-label={card.isFlipped || card.isMatched ? `Card showing ${card.symbol}` : 'Face down card'}
            sx={{
              aspectRatio: '1',
              borderRadius: 2,
              cursor: card.isMatched ? 'default' : 'pointer',
              perspective: '1000px',
              '&:focus': {
                outline: `3px solid ${mindfulColors.primary.main}`,
                outlineOffset: 2,
              },
            }}
          >
            {/* Card inner container for 3D flip */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                position: 'relative',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.4s ease',
                transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0)',
              }}
            >
              {/* Card back (face down) */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${mindfulColors.primary.main} 0%, ${mindfulColors.primary.light} 100%)`,
                  boxShadow: `0 2px 8px ${alpha('#000', 0.1)}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': !card.isFlipped && !card.isMatched ? {
                    boxShadow: `0 4px 12px ${alpha(mindfulColors.primary.main, 0.3)}`,
                    transform: 'scale(1.02)',
                  } : undefined,
                  '&:active': !card.isFlipped && !card.isMatched ? {
                    transform: 'scale(0.98)',
                  } : undefined,
                }}
              >
                <Typography
                  sx={{
                    color: alpha('#fff', 0.4),
                    fontSize: { xs: '1.2rem', sm: '1.5rem' },
                  }}
                >
                  ✦
                </Typography>
              </Box>

              {/* Card front (face up) */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backfaceVisibility: 'hidden',
                  borderRadius: 2,
                  backgroundColor: card.isMatched
                    ? alpha(mindfulColors.pastel.mint, 0.8)
                    : alpha('#fff', 0.95),
                  boxShadow: card.isMatched
                    ? `0 2px 8px ${alpha(mindfulColors.pastel.mint, 0.4)}`
                    : `0 2px 8px ${alpha('#000', 0.1)}`,
                  transform: 'rotateY(180deg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    opacity: card.isMatched ? 0.7 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  {card.symbol}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
        </Box>

        {/* Progress indicator */}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          {[...Array(PAIRS)].map((_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 8, sm: 10 },
                height: { xs: 8, sm: 10 },
                borderRadius: '50%',
                backgroundColor: i < matchCount
                  ? mindfulColors.primary.main
                  : alpha(mindfulColors.primary.main, 0.2),
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                transform: i < matchCount ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </Box>
      </Box>
    </GameContainer>
  )
})

export default MemoryMatch
