import { useState, useCallback, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const PAIRS_TO_MATCH = 5

// Emotion pairs: face emoji and word
const ALL_EMOTIONS = [
  { emoji: '😊', word: 'Happy' },
  { emoji: '😢', word: 'Sad' },
  { emoji: '😠', word: 'Angry' },
  { emoji: '😨', word: 'Scared' },
  { emoji: '😮', word: 'Surprised' },
  { emoji: '😌', word: 'Calm' },
  { emoji: '🥰', word: 'Loving' },
  { emoji: '😴', word: 'Sleepy' },
  { emoji: '🤔', word: 'Thinking' },
  { emoji: '😤', word: 'Frustrated' },
]

type MatchItem = {
  id: string
  emoji: string
  word: string
  matched: boolean
}

type Selection = {
  type: 'face' | 'word'
  id: string
} | null

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function initializeGame() {
  const shuffled = shuffleArray(ALL_EMOTIONS)
  const selected = shuffled.slice(0, PAIRS_TO_MATCH)
  return selected.map((e, i) => ({
    id: `emotion-${i}`,
    emoji: e.emoji,
    word: e.word,
    matched: false,
  }))
}

export const EmotionMatch = memo(function EmotionMatch({
  onComplete,
}: GameProps) {
  const [items] = useState<MatchItem[]>(() => initializeGame())
  const [shuffledWords] = useState<MatchItem[]>(() => shuffleArray([...items]))
  const [selection, setSelection] = useState<Selection>(null)
  const [matchedCount, setMatchedCount] = useState(0)
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set())
  const [wrongPair, setWrongPair] = useState<{ face: string; word: string } | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const { playSuccess, playChime, playTone } = useSound()

  const handleFaceTap = useCallback((item: MatchItem) => {
    if (isComplete || matchedIds.has(item.id) || wrongPair) return

    if (selection?.type === 'word') {
      // Check if it matches
      const selectedWord = items.find(i => i.id === selection.id)
      if (selectedWord && selectedWord.id === item.id) {
        // Match!
        const newMatchedIds = new Set(matchedIds)
        newMatchedIds.add(item.id)
        setMatchedIds(newMatchedIds)
        setSelection(null)

        const newCount = matchedCount + 1
        setMatchedCount(newCount)
        playSuccess()

        if (newCount >= PAIRS_TO_MATCH) {
          setIsComplete(true)
          playChime()
          setTimeout(() => {
            onComplete?.()
          }, 1500)
        }
      } else {
        // Wrong match
        setWrongPair({ face: item.id, word: selection.id })
        playTone({ frequency: 200, duration: 150, volume: 0.15, type: 'sine' })
        setTimeout(() => {
          setWrongPair(null)
          setSelection(null)
        }, 500)
      }
    } else {
      // Select this face
      setSelection({ type: 'face', id: item.id })
    }
  }, [isComplete, matchedIds, wrongPair, selection, items, matchedCount, onComplete, playSuccess, playChime, playTone])

  const handleWordTap = useCallback((item: MatchItem) => {
    if (isComplete || matchedIds.has(item.id) || wrongPair) return

    if (selection?.type === 'face') {
      // Check if it matches
      if (selection.id === item.id) {
        // Match!
        const newMatchedIds = new Set(matchedIds)
        newMatchedIds.add(item.id)
        setMatchedIds(newMatchedIds)
        setSelection(null)

        const newCount = matchedCount + 1
        setMatchedCount(newCount)
        playSuccess()

        if (newCount >= PAIRS_TO_MATCH) {
          setIsComplete(true)
          playChime()
          setTimeout(() => {
            onComplete?.()
          }, 1500)
        }
      } else {
        // Wrong match
        setWrongPair({ face: selection.id, word: item.id })
        playTone({ frequency: 200, duration: 150, volume: 0.15, type: 'sine' })
        setTimeout(() => {
          setWrongPair(null)
          setSelection(null)
        }, 500)
      }
    } else {
      // Select this word
      setSelection({ type: 'word', id: item.id })
    }
  }, [isComplete, matchedIds, wrongPair, selection, matchedCount, onComplete, playSuccess, playChime, playTone])

  const instruction = isComplete
    ? 'Great matching!'
    : selection
    ? 'Now tap the match!'
    : `Match faces to words (${matchedCount}/${PAIRS_TO_MATCH})`

  return (
    <GameContainer
      title="Emotion Match"
      instruction={instruction}
      ariaLabel={`Match emotion faces to words. ${matchedCount} of ${PAIRS_TO_MATCH} matched`}
    >
      <Box
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(mindfulColors.pastel.peach, 0.3)} 0%, ${alpha(mindfulColors.pastel.lavender, 0.3)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          p: 2,
          gap: 2,
        }}
      >
        {/* Faces column */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.map(item => {
            const isMatched = matchedIds.has(item.id)
            const isSelected = selection?.type === 'face' && selection.id === item.id
            const isWrong = wrongPair?.face === item.id

            return (
              <Box
                key={`face-${item.id}`}
                onClick={() => handleFaceTap(item)}
                sx={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  borderRadius: 2,
                  backgroundColor: isMatched
                    ? alpha(mindfulColors.pastel.mint, 0.6)
                    : isWrong
                    ? alpha('#ff6b6b', 0.4)
                    : isSelected
                    ? alpha(mindfulColors.primary.main, 0.4)
                    : alpha('#fff', 0.6),
                  cursor: isMatched ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isWrong ? 'scale(0.9)' : isSelected ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: isSelected
                    ? `0 0 12px ${alpha(mindfulColors.primary.main, 0.5)}`
                    : isMatched
                    ? `0 0 10px ${alpha(mindfulColors.pastel.mint, 0.6)}`
                    : '0 2px 6px rgba(0,0,0,0.1)',
                  border: isSelected
                    ? `2px solid ${mindfulColors.primary.main}`
                    : isMatched
                    ? `2px solid ${mindfulColors.pastel.mint}`
                    : '2px solid transparent',
                  opacity: isMatched ? 0.7 : 1,
                  '&:hover': {
                    transform: isMatched ? undefined : 'scale(1.05)',
                  },
                }}
              >
                {item.emoji}
              </Box>
            )
          })}
        </Box>

        {/* Connecting line visual hint */}
        <Box
          sx={{
            width: 2,
            backgroundColor: alpha(mindfulColors.text.secondary, 0.2),
            borderRadius: 1,
            my: 2,
          }}
        />

        {/* Words column */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {shuffledWords.map(item => {
            const isMatched = matchedIds.has(item.id)
            const isSelected = selection?.type === 'word' && selection.id === item.id
            const isWrong = wrongPair?.word === item.id

            return (
              <Box
                key={`word-${item.id}`}
                onClick={() => handleWordTap(item)}
                sx={{
                  minWidth: 90,
                  height: 42,
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  backgroundColor: isMatched
                    ? alpha(mindfulColors.pastel.mint, 0.6)
                    : isWrong
                    ? alpha('#ff6b6b', 0.4)
                    : isSelected
                    ? alpha(mindfulColors.primary.main, 0.4)
                    : alpha('#fff', 0.6),
                  cursor: isMatched ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  transform: isWrong ? 'scale(0.9)' : isSelected ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: isSelected
                    ? `0 0 12px ${alpha(mindfulColors.primary.main, 0.5)}`
                    : isMatched
                    ? `0 0 10px ${alpha(mindfulColors.pastel.mint, 0.6)}`
                    : '0 2px 6px rgba(0,0,0,0.1)',
                  border: isSelected
                    ? `2px solid ${mindfulColors.primary.main}`
                    : isMatched
                    ? `2px solid ${mindfulColors.pastel.mint}`
                    : '2px solid transparent',
                  opacity: isMatched ? 0.7 : 1,
                  '&:hover': {
                    transform: isMatched ? undefined : 'scale(1.02)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: mindfulColors.text.primary,
                  }}
                >
                  {item.word}
                </Typography>
              </Box>
            )
          })}
        </Box>

        {/* Progress indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 0.75,
          }}
        >
          {Array.from({ length: PAIRS_TO_MATCH }).map((_, i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i < matchedCount
                  ? mindfulColors.pastel.mint
                  : alpha('#fff', 0.5),
                transition: 'background-color 0.3s ease',
                boxShadow: i < matchedCount
                  ? `0 0 6px ${mindfulColors.pastel.mint}`
                  : 'none',
              }}
            />
          ))}
        </Box>

        {/* Counter */}
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
          {matchedCount} / {PAIRS_TO_MATCH}
        </Typography>
      </Box>
    </GameContainer>
  )
})

export default EmotionMatch
