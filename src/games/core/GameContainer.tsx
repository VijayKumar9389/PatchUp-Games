import React, { memo } from 'react'
import { Box, Fade, Typography, useMediaQuery, useTheme } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { mindfulColors, transitions } from './theme'

type GameContainerProps = {
  children: React.ReactNode
  title?: string
  instruction?: string
  backgroundColor?: string
  minHeight?: number | string
  maxWidth?: number | string
  showTransition?: boolean
  ariaLabel?: string
}

export const GameContainer = memo(function GameContainer({
  children,
  title,
  instruction,
  backgroundColor = mindfulColors.background.default,
  showTransition = true,
  ariaLabel,
}: GameContainerProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const content = (
    <Box
      role="application"
      aria-label={ariaLabel || title || 'Mindfulness game'}
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', sm: 500 },
        minHeight: { xs: 320, sm: 400 },
        margin: '0 auto',
        padding: { xs: 1.5, sm: 3 },
        borderRadius: { xs: 3, sm: 4 },
        backgroundColor,
        background: `linear-gradient(180deg, ${backgroundColor} 0%, ${alpha(backgroundColor, 0.8)} 100%)`,
        boxShadow: `0 8px 32px ${alpha(mindfulColors.primary.main, 0.15)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: transitions.gentle,
        touchAction: 'none', // Prevent browser touch gestures
        userSelect: 'none', // Prevent text selection
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        position: 'relative',
        overflow: 'hidden',
        // Accessibility: Focus styles
        '&:focus': {
          outline: `3px solid ${mindfulColors.primary.main}`,
          outlineOffset: 2,
        },
        '&:focus:not(:focus-visible)': {
          outline: 'none',
        },
        '&:focus-visible': {
          outline: `3px solid ${mindfulColors.primary.main}`,
          outlineOffset: 2,
        },
      }}
      tabIndex={0}
    >
      {title && (
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          sx={{
            mb: { xs: 0.5, sm: 1 },
            textAlign: 'center',
            color: mindfulColors.text.primary,
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.5rem' },
          }}
        >
          {title}
        </Typography>
      )}
      {instruction && (
        <Typography
          variant="body2"
          sx={{
            mb: { xs: 1.5, sm: 3 },
            textAlign: 'center',
            color: mindfulColors.text.secondary,
            maxWidth: '90%',
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
            lineHeight: 1.4,
          }}
        >
          {instruction}
        </Typography>
      )}
      <Box
        sx={{
          flex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </Box>
    </Box>
  )

  if (showTransition) {
    return (
      <Fade in timeout={500}>
        {content}
      </Fade>
    )
  }

  return content
})

// Wrapper for the game play area (where interactions happen)
type GameAreaProps = {
  children: React.ReactNode
  width?: number | string
  height?: number | string
  backgroundColor?: string
  borderRadius?: number
}

export const GameArea = memo(function GameArea({
  children,
  width = '100%',
  height = 300,
  backgroundColor = 'transparent',
  borderRadius = 20,
}: GameAreaProps) {
  return (
    <Box
      sx={{
        width,
        height: { xs: typeof height === 'number' ? height * 0.8 : height, sm: height },
        backgroundColor,
        borderRadius: `${borderRadius}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {children}
    </Box>
  )
})

// Completion overlay
type CompletionOverlayProps = {
  show: boolean
  message?: string
  onAnimationEnd?: () => void
}

export const CompletionOverlay = memo(function CompletionOverlay({
  show,
  message = 'Great job!',
  onAnimationEnd,
}: CompletionOverlayProps) {
  return (
    <Fade in={show} timeout={800} onExited={onAnimationEnd}>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: alpha(mindfulColors.background.default, 0.9),
          borderRadius: { xs: 3, sm: 4 },
          zIndex: 10,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: mindfulColors.primary.dark,
            textAlign: 'center',
            fontSize: { xs: '1.3rem', sm: '1.75rem' },
            animation: show ? 'pulse 2s ease-in-out infinite' : 'none',
            '@keyframes pulse': {
              '0%, 100%': { transform: 'scale(1)', opacity: 1 },
              '50%': { transform: 'scale(1.05)', opacity: 0.9 },
            },
          }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  )
})
