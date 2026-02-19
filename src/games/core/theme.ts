import { createTheme, alpha } from '@mui/material/styles'

// Sky-blue based pastel palette for calming mindfulness games
export const mindfulColors = {
  primary: {
    main: '#87CEEB', // Sky blue
    light: '#B0E0E6', // Powder blue
    dark: '#6BB3D9',
    contrastText: '#1a365d',
  },
  secondary: {
    main: '#DDA0DD', // Plum (pastel purple)
    light: '#E6CCE6',
    dark: '#CC8FCC',
    contrastText: '#4a1a4a',
  },
  background: {
    default: '#F0F8FF', // Alice blue
    paper: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #F0F8FF 0%, #E6E6FA 100%)',
  },
  pastel: {
    pink: '#FFB6C1',
    mint: '#98FB98',
    peach: '#FFDAB9',
    lavender: '#E6E6FA',
    lemon: '#FFFACD',
    coral: '#FFB4A2',
    sage: '#B2D3C2',
    periwinkle: '#CCCCFF',
  },
  text: {
    primary: '#2C3E50', // Dark blue-gray for readability
    secondary: '#5D6D7E',
    disabled: '#95A5A6',
  },
  success: '#90EE90', // Light green
  warning: '#FFE4B5', // Moccasin
  error: '#FFB6C1', // Light pink (soft error)
  info: '#ADD8E6', // Light blue
}

export const mindfulTheme = createTheme({
  palette: {
    mode: 'light',
    primary: mindfulColors.primary,
    secondary: mindfulColors.secondary,
    background: {
      default: mindfulColors.background.default,
      paper: mindfulColors.background.paper,
    },
    text: mindfulColors.text,
    success: { main: mindfulColors.success },
    warning: { main: mindfulColors.warning },
    error: { main: mindfulColors.error },
    info: { main: mindfulColors.info },
  },
  typography: {
    fontFamily: '"Nunito", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2rem',
      color: mindfulColors.text.primary,
    },
    h2: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: mindfulColors.text.primary,
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.25rem',
      color: mindfulColors.text.primary,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: mindfulColors.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: mindfulColors.text.secondary,
    },
  },
  shape: {
    borderRadius: 16, // Rounded corners for soft feel
  },
  shadows: [
    'none',
    `0 2px 4px ${alpha('#000', 0.05)}`,
    `0 4px 8px ${alpha('#000', 0.08)}`,
    `0 6px 12px ${alpha('#000', 0.1)}`,
    `0 8px 16px ${alpha('#000', 0.12)}`,
    `0 10px 20px ${alpha('#000', 0.14)}`,
    `0 12px 24px ${alpha('#000', 0.16)}`,
    `0 14px 28px ${alpha('#000', 0.18)}`,
    `0 16px 32px ${alpha('#000', 0.2)}`,
    `0 18px 36px ${alpha('#000', 0.22)}`,
    `0 20px 40px ${alpha('#000', 0.24)}`,
    `0 22px 44px ${alpha('#000', 0.26)}`,
    `0 24px 48px ${alpha('#000', 0.28)}`,
    `0 26px 52px ${alpha('#000', 0.3)}`,
    `0 28px 56px ${alpha('#000', 0.32)}`,
    `0 30px 60px ${alpha('#000', 0.34)}`,
    `0 32px 64px ${alpha('#000', 0.36)}`,
    `0 34px 68px ${alpha('#000', 0.38)}`,
    `0 36px 72px ${alpha('#000', 0.4)}`,
    `0 38px 76px ${alpha('#000', 0.42)}`,
    `0 40px 80px ${alpha('#000', 0.44)}`,
    `0 42px 84px ${alpha('#000', 0.46)}`,
    `0 44px 88px ${alpha('#000', 0.48)}`,
    `0 46px 92px ${alpha('#000', 0.5)}`,
    `0 48px 96px ${alpha('#000', 0.52)}`,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          boxShadow: `0 4px 12px ${alpha(mindfulColors.primary.main, 0.3)}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 6px 16px ${alpha(mindfulColors.primary.main, 0.4)}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: `0 8px 24px ${alpha('#000', 0.08)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
})

// Accessibility: Check contrast ratios meet WCAG AA (4.5:1 for normal text)
export const accessibleTextOnColor = (bgColor: string): string => {
  // Simple luminance check - use dark text on light backgrounds
  const hex = bgColor.replace('#', '')
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.5 ? mindfulColors.text.primary : '#FFFFFF'
}

// Animation timing for reduced motion preference
export const getAnimationDuration = (baseMs: number): number => {
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return prefersReducedMotion ? 0 : baseMs
  }
  return baseMs
}

export const transitions = {
  gentle: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  fade: 'opacity 0.3s ease-in-out',
  scale: 'transform 0.3s ease-out',
}
