import { useState } from 'react'
import { Box, Typography, Button, Tabs, Tab, Paper, useMediaQuery, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { SurveyEngine } from './survey'
import { gameRegistry, mindfulColors } from './games'
import type { Question, Answer } from './survey/types'
import type { GameProps } from './games/core/types'

// Sample survey questions for testing
const sampleQuestions: Question[] = [
  {
    id: 'q1',
    type: 'yes_no',
    text: 'Did you sleep well last night?',
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    text: 'How are you feeling today?',
    options: ['Happy', 'Calm', 'Tired', 'Anxious', 'Excited'],
  },
  {
    id: 'q3',
    type: 'text',
    text: 'What is one thing you are grateful for today?',
  },
  {
    id: 'q4',
    type: 'yes_no',
    text: 'Have you taken any breaks today?',
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    text: 'What helps you feel calm?',
    options: ['Deep breathing', 'Music', 'Being outdoors', 'Talking to friends', 'Drawing or art'],
  },
  {
    id: 'q6',
    type: 'text',
    text: 'Describe a happy memory from this week.',
  },
  {
    id: 'q7',
    type: 'yes_no',
    text: 'Do you feel ready for tomorrow?',
  },
  {
    id: 'q8',
    type: 'multiple_choice',
    text: 'What would make today better?',
    options: ['More rest', 'Time with friends', 'Fun activity', 'Quiet time', 'Good food'],
  },
  {
    id: 'q9',
    type: 'text',
    text: 'What is something kind you could do for someone else?',
  },
  {
    id: 'q10',
    type: 'yes_no',
    text: 'Are you proud of something you did recently?',
  },
]

// Single game demo wrapper
function GameDemo({ gameId }: { gameId: string }) {
  const [key, setKey] = useState(0)
  const game = gameRegistry.find(g => g.id === gameId)

  if (!game) {
    return <Typography>Game not found</Typography>
  }

  const GameComponent = game.component as React.ComponentType<GameProps>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: '100%' }}>
      <GameComponent
        key={key}
        onComplete={() => {
          console.log(`Game ${gameId} completed`)
        }}
      />
      <Button
        variant="outlined"
        onClick={() => setKey(k => k + 1)}
        sx={{
          borderColor: mindfulColors.primary.main,
          color: mindfulColors.primary.main,
        }}
      >
        Restart Game
      </Button>
    </Box>
  )
}

function App() {
  const [mode, setMode] = useState<'survey' | 'games'>('survey')
  const [selectedGame, setSelectedGame] = useState(gameRegistry[0]?.id || '')
  const [surveyKey, setSurveyKey] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleSurveyComplete = (answers: Answer[]) => {
    console.log('Survey completed with answers:', answers)
  }

  return (
    <Box
      sx={{
        minHeight: '100dvh', // Dynamic viewport height for mobile (fallback: 100vh)
        background: mindfulColors.background.gradient,
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          maxWidth: 800,
          mx: 'auto',
          width: '100%',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 4 } }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              color: mindfulColors.text.primary,
              fontWeight: 700,
              mb: 0.5,
            }}
          >
            Mindfulness Mini-Games
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: mindfulColors.text.secondary,
              mb: { xs: 1.5, sm: 3 },
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            A calming experience for children and teens
          </Typography>

          {/* Mode tabs */}
          <Paper
            sx={{
              display: 'inline-flex',
              borderRadius: 3,
              overflow: 'hidden',
              backgroundColor: alpha('#fff', 0.8),
            }}
          >
            <Tabs
              value={mode}
              onChange={(_, newMode) => setMode(newMode)}
              sx={{
                minHeight: { xs: 40, sm: 48 },
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                  minWidth: { xs: 90, sm: 120 },
                  minHeight: { xs: 40, sm: 48 },
                  fontSize: { xs: '0.8rem', sm: '0.875rem' },
                  px: { xs: 1.5, sm: 2 },
                },
                '& .Mui-selected': {
                  color: mindfulColors.primary.dark,
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: mindfulColors.primary.main,
                },
              }}
            >
              <Tab label="Survey" value="survey" />
              <Tab label="Games" value="games" />
            </Tabs>
          </Paper>
        </Box>

        {/* Content */}
        <Paper
          sx={{
            p: { xs: 1.5, sm: 3 },
            borderRadius: { xs: 3, sm: 4 },
            backgroundColor: alpha('#fff', 0.9),
            boxShadow: `0 8px 32px ${alpha(mindfulColors.primary.main, 0.1)}`,
            minHeight: { xs: 'calc(100dvh - 180px)', sm: 'auto' },
          }}
        >
          {mode === 'survey' ? (
            <Box>
              <Box sx={{ textAlign: 'center', mb: { xs: 1, sm: 2 } }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: mindfulColors.text.secondary,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  A mini-game will appear after every 2 questions
                </Typography>
                <Button
                  size="small"
                  onClick={() => setSurveyKey(k => k + 1)}
                  sx={{
                    mt: 0.5,
                    color: mindfulColors.primary.main,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  }}
                >
                  Restart Survey
                </Button>
              </Box>
              <SurveyEngine
                key={surveyKey}
                questions={sampleQuestions}
                onComplete={handleSurveyComplete}
                config={{
                  gameFrequency: 2,
                  allowSkip: true,
                  showProgress: true,
                }}
                devMode={!isMobile} // Hide dev panel on mobile
              />
            </Box>
          ) : (
            <Box>
              {/* Game selector - scrollable on mobile */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: { xs: 0.5, sm: 1 },
                  mb: { xs: 2, sm: 4 },
                  justifyContent: 'center',
                  maxHeight: { xs: 120, sm: 'none' },
                  overflowY: { xs: 'auto', sm: 'visible' },
                  pb: { xs: 1, sm: 0 },
                }}
              >
                {gameRegistry.map(game => (
                  <Button
                    key={game.id}
                    variant={selectedGame === game.id ? 'contained' : 'outlined'}
                    size="small"
                    onClick={() => setSelectedGame(game.id)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: { xs: '0.65rem', sm: '0.75rem' },
                      py: { xs: 0.3, sm: 0.5 },
                      px: { xs: 1, sm: 1.5 },
                      minWidth: 'auto',
                      backgroundColor: selectedGame === game.id
                        ? mindfulColors.primary.main
                        : 'transparent',
                      borderColor: mindfulColors.primary.main,
                      color: selectedGame === game.id
                        ? mindfulColors.primary.contrastText
                        : mindfulColors.primary.main,
                      '&:hover': {
                        backgroundColor: selectedGame === game.id
                          ? mindfulColors.primary.dark
                          : alpha(mindfulColors.primary.main, 0.1),
                      },
                    }}
                  >
                    {game.name}
                  </Button>
                ))}
              </Box>

              {/* Selected game info */}
              {selectedGame && (
                <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: mindfulColors.text.secondary,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      px: 1,
                    }}
                  >
                    {gameRegistry.find(g => g.id === selectedGame)?.description}
                  </Typography>
                </Box>
              )}

              {/* Game demo */}
              {selectedGame && <GameDemo gameId={selectedGame} />}
            </Box>
          )}
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: { xs: 2, sm: 4 }, pb: { xs: 2, sm: 0 } }}>
          <Typography
            variant="caption"
            sx={{
              color: mindfulColors.text.secondary,
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
            }}
          >
            {gameRegistry.length} mindfulness games available
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default App
