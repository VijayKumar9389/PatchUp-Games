import { useState, useCallback, useMemo, memo } from 'react'
import { Box, Fade, Typography, Button } from '@mui/material'
import { mindfulColors } from '../games/core/theme'
import { QuestionRenderer } from './components/QuestionRenderer'
import { ProgressIndicator } from './components/ProgressIndicator'
import { DevPanel } from './components/DevPanel'
import { GameEngine } from './GameEngine'
import { pickRandomGame } from './utils'
import { getGameById } from '../games/registry'
import type { SurveyEngineProps, SurveyState, Answer } from './types'

const DEFAULT_CONFIG = {
  gameFrequency: 2,
  maxRecentGames: 3,
  allowSkip: false,
  showProgress: true,
  transitionDuration: 500,
}

export const SurveyEngine = memo(function SurveyEngine({
  questions,
  gameIds,
  config = {},
  onComplete,
  onAnswerChange,
  devMode = false,
}: SurveyEngineProps) {
  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config])

  const [state, setState] = useState<SurveyState>({
    currentIndex: 0,
    answers: [],
    showingGame: false,
    currentGameId: null,
    recentGameIds: [],
  })

  const [isCompleted, setIsCompleted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const currentQuestion = questions[state.currentIndex]
  const currentAnswer = state.answers.find(a => a.questionId === currentQuestion?.id)
  const currentGameName = state.currentGameId
    ? getGameById(state.currentGameId)?.name
    : undefined

  const handleAnswer = useCallback((answer: Answer) => {
    setState(prev => {
      const existingIndex = prev.answers.findIndex(a => a.questionId === answer.questionId)
      const newAnswers = existingIndex >= 0
        ? prev.answers.map((a, i) => i === existingIndex ? answer : a)
        : [...prev.answers, answer]

      return { ...prev, answers: newAnswers }
    })
    onAnswerChange?.(answer)
  }, [onAnswerChange])

  const handleNextQuestion = useCallback(() => {
    setIsTransitioning(true)

    setTimeout(() => {
      setState(prev => {
        const nextIndex = prev.currentIndex + 1

        // Check if survey is complete
        if (nextIndex >= questions.length) {
          setIsCompleted(true)
          onComplete?.(prev.answers)
          return prev
        }

        // Check if we should show a game
        const questionsSinceGame = (nextIndex) % mergedConfig.gameFrequency
        const shouldShowGame = questionsSinceGame === 0 && nextIndex > 0

        if (shouldShowGame) {
          const newGameId = pickRandomGame(prev.recentGameIds, gameIds)
          return {
            ...prev,
            currentIndex: nextIndex,
            showingGame: true,
            currentGameId: newGameId,
            recentGameIds: [
              ...prev.recentGameIds.slice(-(mergedConfig.maxRecentGames - 1)),
              newGameId,
            ],
          }
        }

        return {
          ...prev,
          currentIndex: nextIndex,
          showingGame: false,
          currentGameId: null,
        }
      })

      setIsTransitioning(false)
    }, mergedConfig.transitionDuration)
  }, [questions.length, mergedConfig, gameIds, onComplete])

  const handleGameComplete = useCallback(() => {
    setIsTransitioning(true)

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        showingGame: false,
        currentGameId: null,
      }))
      setIsTransitioning(false)
    }, mergedConfig.transitionDuration)
  }, [mergedConfig.transitionDuration])

  const handleRestart = useCallback(() => {
    setState({
      currentIndex: 0,
      answers: [],
      showingGame: false,
      currentGameId: null,
      recentGameIds: [],
    })
    setIsCompleted(false)
  }, [])

  // Completion screen
  if (isCompleted) {
    return (
      <Fade in>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: { xs: 280, sm: 400 },
            gap: { xs: 2, sm: 3 },
            p: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: mindfulColors.text.primary,
              fontWeight: 600,
              textAlign: 'center',
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            Thank you!
          </Typography>
          <Typography
            sx={{
              color: mindfulColors.text.secondary,
              textAlign: 'center',
              maxWidth: 400,
              fontSize: { xs: '0.85rem', sm: '1rem' },
              px: { xs: 2, sm: 0 },
            }}
          >
            You've completed all the questions. We hope you enjoyed the mindful moments along the way.
          </Typography>
          <Box
            sx={{
              fontSize: { xs: '3rem', sm: '4rem' },
              animation: 'bounce 2s ease-in-out infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-10px)' },
              },
            }}
          >
            🎉
          </Box>
          {devMode && (
            <Button
              variant="outlined"
              onClick={handleRestart}
              sx={{
                mt: 1,
                borderColor: mindfulColors.primary.main,
                color: mindfulColors.primary.main,
                fontSize: { xs: '0.85rem', sm: '1rem' },
              }}
            >
              Restart Survey
            </Button>
          )}
        </Box>
      </Fade>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 2, sm: 3 },
        p: { xs: 1, sm: 3 },
        minHeight: { xs: 300, sm: 500 },
        width: '100%',
      }}
    >
      {/* Progress indicator */}
      {mergedConfig.showProgress && !state.showingGame && (
        <ProgressIndicator
          current={state.currentIndex + 1}
          total={questions.length}
        />
      )}

      {/* Main content area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          minHeight: { xs: 250, sm: 350 },
          opacity: isTransitioning ? 0 : 1,
          transition: `opacity ${mergedConfig.transitionDuration / 2}ms ease`,
        }}
      >
        {state.showingGame && state.currentGameId ? (
          <GameEngine
            gameId={state.currentGameId}
            onComplete={handleGameComplete}
            onSkip={handleGameComplete}
            allowSkip={mergedConfig.allowSkip}
          />
        ) : currentQuestion ? (
          <QuestionRenderer
            question={currentQuestion}
            answer={currentAnswer}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            allowSkip={mergedConfig.allowSkip}
          />
        ) : null}
      </Box>

      {/* Dev panel */}
      {devMode && (
        <DevPanel
          state={state}
          answers={state.answers}
          currentGameName={currentGameName}
        />
      )}
    </Box>
  )
})

export default SurveyEngine
