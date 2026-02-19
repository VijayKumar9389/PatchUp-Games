import { memo } from 'react'
import { Box, Typography, LinearProgress } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { mindfulColors } from '../../games/core/theme'

type ProgressIndicatorProps = {
  current: number
  total: number
  showText?: boolean
}

export const ProgressIndicator = memo(function ProgressIndicator({
  current,
  total,
  showText = true,
}: ProgressIndicatorProps) {
  const progress = total > 0 ? (current / total) * 100 : 0

  return (
    <Box sx={{ width: '100%', maxWidth: { xs: 280, sm: 400 }, px: { xs: 1, sm: 0 } }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: { xs: 6, sm: 8 },
          borderRadius: 4,
          backgroundColor: alpha(mindfulColors.primary.main, 0.15),
          '& .MuiLinearProgress-bar': {
            backgroundColor: mindfulColors.primary.main,
            borderRadius: 4,
          },
        }}
      />
      {showText && (
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            textAlign: 'center',
            color: mindfulColors.text.secondary,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Question {current} of {total}
        </Typography>
      )}
    </Box>
  )
})
