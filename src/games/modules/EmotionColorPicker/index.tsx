import { useState, useCallback, useEffect, memo } from 'react'
import { Box, Typography, Fade } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

type Emotion = {
  name: string
  emoji: string
  color: string
  type: 'positive' | 'negative'
}

const POSITIVE_EMOTIONS: Emotion[] = [
  { name: 'Happy', emoji: '😊', color: '#FFD700', type: 'positive' },
  { name: 'Calm', emoji: '😌', color: '#87CEEB', type: 'positive' },
  { name: 'Excited', emoji: '🤩', color: '#FF6B9D', type: 'positive' },
  { name: 'Peaceful', emoji: '🧘', color: '#98FB98', type: 'positive' },
  { name: 'Grateful', emoji: '🙏', color: '#FFDAB9', type: 'positive' },
  { name: 'Loved', emoji: '🥰', color: '#FFB6C1', type: 'positive' },
]

const NEGATIVE_EMOTIONS: Emotion[] = [
  { name: 'Sad', emoji: '😢', color: '#87CEEB', type: 'negative' },
  { name: 'Angry', emoji: '😠', color: '#FF6B6B', type: 'negative' },
  { name: 'Anxious', emoji: '😰', color: '#DDA0DD', type: 'negative' },
  { name: 'Lonely', emoji: '😔', color: '#B0C4DE', type: 'negative' },
  { name: 'Frustrated', emoji: '😤', color: '#FFA07A', type: 'negative' },
  { name: 'Worried', emoji: '😟', color: '#D3D3D3', type: 'negative' },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type PuzzleState = {
  emotions: Emotion[]
  oddOne: Emotion
  majorityType: 'positive' | 'negative'
}

function generatePuzzle(): PuzzleState {
  const isMajorityPositive = Math.random() > 0.5
  const majorityPool = isMajorityPositive ? POSITIVE_EMOTIONS : NEGATIVE_EMOTIONS
  const minorityPool = isMajorityPositive ? NEGATIVE_EMOTIONS : POSITIVE_EMOTIONS

  // Pick 5 random from majority
  const shuffledMajority = shuffleArray(majorityPool)
  const majorityPicks = shuffledMajority.slice(0, 5)

  // Pick 1 random from minority (the odd one)
  const shuffledMinority = shuffleArray(minorityPool)
  const oddOne = shuffledMinority[0]

  // Combine and shuffle
  const allEmotions = shuffleArray([...majorityPicks, oddOne])

  return {
    emotions: allEmotions,
    oddOne,
    majorityType: isMajorityPositive ? 'positive' : 'negative',
  }
}

export const EmotionColorPicker = memo(function EmotionColorPicker({
  onComplete,
}: GameProps) {
  const [puzzle] = useState<PuzzleState>(generatePuzzle)
  const [triedEmotions, setTriedEmotions] = useState<Set<string>>(new Set())
  const [showTryAgain, setShowTryAgain] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { playGentle, playChime, playSuccess } = useSound()

  const { emotions, oddOne, majorityType } = puzzle

  const handleSelect = useCallback((emotion: Emotion) => {
    if (isComplete) return
    if (triedEmotions.has(emotion.name)) return // Already tried this one

    // The odd one has the opposite type from the majority
    const correct = emotion.type !== majorityType

    if (correct) {
      // Found the odd one!
      playSuccess()
      setIsComplete(true)
      setTimeout(() => {
        playChime()
      }, 500)
      setTimeout(() => {
        onComplete?.()
      }, 2000)
    } else {
      // Wrong - try again
      playGentle()
      setTriedEmotions(prev => new Set(prev).add(emotion.name))
      setShowTryAgain(true)
      setTimeout(() => setShowTryAgain(false), 1000)
    }
  }, [majorityType, isComplete, triedEmotions, onComplete, playSuccess, playChime, playGentle])

  const instruction = isComplete
    ? `Nice! ${oddOne.emoji} ${oddOne.name} was the odd one out`
    : showTryAgain
    ? 'Try again!'
    : `Find the ${majorityType === 'positive' ? 'negative' : 'positive'} emotion`

  return (
    <GameContainer
      title="Odd Emotion Out"
      instruction={instruction}
      ariaLabel="Find the emotion that doesn't fit with the others"
    >
      {isComplete ? (
        <Fade in>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: mindfulColors.pastel.mint,
                boxShadow: `0 0 30px ${alpha(mindfulColors.pastel.mint, 0.5)}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                },
              }}
            >
              {oddOne.emoji}
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: mindfulColors.text.primary,
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              Well done!
            </Typography>
          </Box>
        </Fade>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: { xs: 1.5, sm: 2 },
            maxWidth: 320,
          }}
        >
          {emotions.map((emotion, index) => {
            const alreadyTried = triedEmotions.has(emotion.name)
            return (
              <Box
                key={`${emotion.name}-${index}`}
                onClick={() => handleSelect(emotion)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelect(emotion)
                  }
                }}
                role="button"
                tabIndex={alreadyTried ? -1 : 0}
                aria-label={`Select ${emotion.name}`}
                aria-disabled={alreadyTried}
                sx={{
                  width: { xs: 75, sm: 85 },
                  height: { xs: 75, sm: 85 },
                  borderRadius: '16px',
                  backgroundColor: alreadyTried ? alpha(emotion.color, 0.3) : emotion.color,
                  cursor: alreadyTried ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: alreadyTried ? 'none' : `0 4px 12px ${alpha(emotion.color, 0.4)}`,
                  opacity: alreadyTried ? 0.5 : 1,
                  '&:hover, &:focus': alreadyTried ? {} : {
                    transform: 'scale(1.08)',
                    boxShadow: `0 6px 20px ${alpha(emotion.color, 0.6)}`,
                  },
                  '&:focus': {
                    outline: alreadyTried ? 'none' : `3px solid ${mindfulColors.primary.main}`,
                    outlineOffset: 2,
                  },
                  '&:active': alreadyTried ? {} : {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <Typography sx={{ fontSize: { xs: '1.5rem', sm: '1.8rem' } }}>
                  {emotion.emoji}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: '0.6rem', sm: '0.7rem' },
                    fontWeight: 600,
                    color: mindfulColors.text.primary,
                    mt: 0.5,
                    textAlign: 'center',
                  }}
                >
                  {emotion.name}
                </Typography>
              </Box>
            )
          })}
        </Box>
      )}
    </GameContainer>
  )
})

export default EmotionColorPicker
