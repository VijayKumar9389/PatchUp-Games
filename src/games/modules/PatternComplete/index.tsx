import { useState, useCallback, memo } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'

const ROUNDS_TO_COMPLETE = 3
const NUMBERS_SHOWN = 4
const OPTIONS_COUNT = 4

type Round = {
  sequence: number[]
  answer: number
  options: number[]
  increment: number
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function generateRound(): Round {
  // Pick random increment between 1-6
  const increment = Math.floor(Math.random() * 6) + 1

  // Pick random starting number (1-10)
  const start = Math.floor(Math.random() * 10) + 1

  // Generate sequence
  const sequence: number[] = []
  for (let i = 0; i < NUMBERS_SHOWN; i++) {
    sequence.push(start + i * increment)
  }

  // The answer is the 5th number
  const answer = start + NUMBERS_SHOWN * increment

  // Generate wrong options (nearby numbers)
  const wrongOptions: number[] = []
  const possibleWrong = [
    answer - increment,  // Previous number in sequence
    answer + increment,  // Next number after answer
    answer - 1,          // Off by 1
    answer + 1,          // Off by 1
    answer + 2,          // Off by 2
    answer - 2,          // Off by 2
  ].filter(n => n !== answer && n > 0)

  // Pick 3 unique wrong answers
  const shuffledWrong = shuffleArray(possibleWrong)
  for (const num of shuffledWrong) {
    if (!wrongOptions.includes(num) && wrongOptions.length < OPTIONS_COUNT - 1) {
      wrongOptions.push(num)
    }
  }

  // Combine and shuffle options
  const options = shuffleArray([answer, ...wrongOptions])

  return { sequence, answer, options, increment }
}

function initializeRounds(): Round[] {
  const rounds: Round[] = []
  for (let i = 0; i < ROUNDS_TO_COMPLETE; i++) {
    rounds.push(generateRound())
  }
  return rounds
}

export const PatternComplete = memo(function PatternComplete({
  onComplete,
}: GameProps) {
  const [rounds] = useState<Round[]>(() => initializeRounds())
  const [currentRound, setCurrentRound] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { playSuccess, playChime, playTone } = useSound()

  const round = rounds[currentRound]

  const handleOptionTap = useCallback((option: number) => {
    if (showResult || isComplete) return

    setSelectedOption(option)
    setShowResult(true)

    const correct = option === round.answer
    setIsCorrect(correct)

    if (correct) {
      playSuccess()
      const newCount = completedCount + 1
      setCompletedCount(newCount)

      setTimeout(() => {
        if (newCount >= ROUNDS_TO_COMPLETE) {
          setIsComplete(true)
          playChime()
          setTimeout(() => {
            onComplete?.()
          }, 1500)
        } else {
          // Move to next round
          setCurrentRound(prev => prev + 1)
          setSelectedOption(null)
          setShowResult(false)
        }
      }, 1000)
    } else {
      playTone({ frequency: 200, duration: 150, volume: 0.15, type: 'sine' })

      // Allow retry after brief delay
      setTimeout(() => {
        setSelectedOption(null)
        setShowResult(false)
      }, 800)
    }
  }, [showResult, isComplete, round, completedCount, onComplete, playSuccess, playChime, playTone])

  const instruction = isComplete
    ? 'Pattern master!'
    : showResult && isCorrect
    ? 'Correct!'
    : showResult && !isCorrect
    ? 'Try again...'
    : `What comes next? (${completedCount + 1}/${ROUNDS_TO_COMPLETE})`

  return (
    <GameContainer
      title="Pattern Complete"
      instruction={instruction}
      ariaLabel={`Complete the number pattern. Round ${completedCount + 1} of ${ROUNDS_TO_COMPLETE}`}
    >
      <Box
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(mindfulColors.pastel.periwinkle, 0.4)} 0%, ${alpha(mindfulColors.pastel.mint, 0.3)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        {/* Sequence display */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 3,
          }}
        >
          {round.sequence.map((num, i) => (
            <Box
              key={i}
              sx={{
                width: 50,
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 2,
                backgroundColor: alpha('#fff', 0.8),
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: mindfulColors.text.primary,
                }}
              >
                {num}
              </Typography>
            </Box>
          ))}

          {/* Question mark box */}
          <Box
            sx={{
              width: 50,
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 2,
              backgroundColor: showResult && isCorrect
                ? alpha(mindfulColors.pastel.mint, 0.8)
                : alpha(mindfulColors.primary.main, 0.3),
              border: `2px dashed ${mindfulColors.primary.main}`,
              boxShadow: showResult && isCorrect
                ? `0 0 15px ${alpha(mindfulColors.pastel.mint, 0.6)}`
                : '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
            }}
          >
            <Typography
              sx={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: showResult && isCorrect
                  ? mindfulColors.text.primary
                  : mindfulColors.primary.dark,
              }}
            >
              {showResult && isCorrect ? round.answer : '?'}
            </Typography>
          </Box>
        </Box>

        {/* Pattern hint */}
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: mindfulColors.text.secondary,
            mb: 2,
          }}
        >
          +{round.increment} each time
        </Typography>

        {/* Options */}
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {round.options.map((option, i) => {
            const isSelected = selectedOption === option
            const isAnswer = option === round.answer
            const showCorrect = showResult && isAnswer
            const showWrong = showResult && isSelected && !isAnswer

            return (
              <Box
                key={i}
                onClick={() => handleOptionTap(option)}
                sx={{
                  width: 60,
                  height: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  backgroundColor: showCorrect
                    ? alpha(mindfulColors.pastel.mint, 0.7)
                    : showWrong
                    ? alpha('#ff6b6b', 0.4)
                    : alpha('#fff', 0.7),
                  cursor: showResult ? 'default' : 'pointer',
                  transition: 'all 0.2s ease',
                  transform: showWrong ? 'scale(0.95)' : 'scale(1)',
                  boxShadow: showCorrect
                    ? `0 0 12px ${alpha(mindfulColors.pastel.mint, 0.6)}`
                    : '0 2px 8px rgba(0,0,0,0.1)',
                  border: showCorrect
                    ? `2px solid ${mindfulColors.pastel.mint}`
                    : '2px solid transparent',
                  '&:hover': {
                    transform: showResult ? undefined : 'scale(1.05)',
                    backgroundColor: showResult ? undefined : alpha('#fff', 0.9),
                  },
                  '&:active': {
                    transform: showResult ? undefined : 'scale(0.95)',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    color: mindfulColors.text.primary,
                  }}
                >
                  {option}
                </Typography>
              </Box>
            )
          })}
        </Box>

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
                  : i === currentRound
                  ? alpha(mindfulColors.primary.main, 0.5)
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

export default PatternComplete
