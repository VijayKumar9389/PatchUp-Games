import { memo, useState } from 'react'
import { Box, Typography, Paper, Collapse } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { mindfulColors } from '../../games/core/theme'
import type { SurveyState, Answer } from '../types'

type DevPanelProps = {
  state: SurveyState
  answers: Answer[]
  currentGameName?: string
}

export const DevPanel = memo(function DevPanel({
  state,
  answers,
  currentGameName,
}: DevPanelProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        maxWidth: 350,
        maxHeight: isOpen ? 400 : 40,
        overflow: 'hidden',
        backgroundColor: alpha('#1a1a2e', 0.95),
        color: '#fff',
        borderRadius: 2,
        transition: 'max-height 0.3s ease',
        zIndex: 1000,
      }}
    >
      <Box
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          px: 2,
          py: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: isOpen ? `1px solid ${alpha('#fff', 0.1)}` : 'none',
        }}
      >
        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
          🛠️ Dev Panel
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>
          {isOpen ? '▼' : '▲'}
        </Typography>
      </Box>

      <Collapse in={isOpen}>
        <Box sx={{ p: 2, maxHeight: 350, overflow: 'auto' }}>
          {/* State info */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" sx={{ color: mindfulColors.pastel.mint, fontFamily: 'monospace' }}>
              State
            </Typography>
            <Box sx={{ mt: 0.5, fontFamily: 'monospace', fontSize: '0.75rem' }}>
              <div>Index: {state.currentIndex}</div>
              <div>Showing Game: {state.showingGame ? 'Yes' : 'No'}</div>
              {state.currentGameId && <div>Current Game: {currentGameName || state.currentGameId}</div>}
              <div>Recent Games: [{state.recentGameIds.join(', ')}]</div>
            </Box>
          </Box>

          {/* Answers */}
          <Box>
            <Typography variant="caption" sx={{ color: mindfulColors.pastel.lavender, fontFamily: 'monospace' }}>
              Answers ({answers.length})
            </Typography>
            <Box
              sx={{
                mt: 0.5,
                p: 1,
                backgroundColor: alpha('#000', 0.3),
                borderRadius: 1,
                fontFamily: 'monospace',
                fontSize: '0.7rem',
                maxHeight: 200,
                overflow: 'auto',
              }}
            >
              {answers.length === 0 ? (
                <Typography variant="caption" sx={{ color: alpha('#fff', 0.5) }}>
                  No answers yet
                </Typography>
              ) : (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(answers, null, 2)}
                </pre>
              )}
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  )
})
