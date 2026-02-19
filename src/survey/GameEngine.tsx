import { useCallback, useMemo, memo } from 'react'
import { Box, Fade, Typography, Button } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { mindfulColors } from '../games/core/theme'
import { gameRegistry, getGameById } from '../games/registry'
import type { GameMetadata } from '../games/core/types'

type GameEngineProps = {
  gameId: string
  onComplete: () => void
  onSkip?: () => void
  allowSkip?: boolean
}

export const GameEngine = memo(function GameEngine({
  gameId,
  onComplete,
  onSkip,
  allowSkip = false,
}: GameEngineProps) {
  const game: GameMetadata | undefined = useMemo(() => getGameById(gameId), [gameId])

  const handleComplete = useCallback(() => {
    onComplete()
  }, [onComplete])

  const handleSkip = useCallback(() => {
    onSkip?.()
  }, [onSkip])

  if (!game) {
    // Fallback if game not found
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: { xs: 200, sm: 300 },
          gap: 2,
        }}
      >
        <Typography color="error" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Game not found: {gameId}
        </Typography>
        <Button variant="contained" onClick={handleComplete}>
          Continue
        </Button>
      </Box>
    )
  }

  const GameComponent = game.component

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          width: '100%',
          maxWidth: { xs: '100%', sm: 550 },
          mx: 'auto',
          px: { xs: 0, sm: 0 },
        }}
      >
        {/* Game intro */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 0.5, sm: 1 },
            px: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: mindfulColors.text.secondary,
              fontStyle: 'italic',
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
            }}
          >
            Take a mindful moment...
          </Typography>
        </Box>

        {/* Game component */}
        <Box sx={{ width: '100%' }}>
          <GameComponent onComplete={handleComplete} />
        </Box>

        {/* Skip option */}
        {allowSkip && (
          <Button
            variant="text"
            size="small"
            onClick={handleSkip}
            sx={{
              mt: { xs: 0.5, sm: 1 },
              color: alpha(mindfulColors.text.secondary, 0.7),
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              '&:hover': {
                backgroundColor: alpha(mindfulColors.primary.main, 0.05),
              },
            }}
          >
            Skip activity
          </Button>
        )}
      </Box>
    </Fade>
  )
})
