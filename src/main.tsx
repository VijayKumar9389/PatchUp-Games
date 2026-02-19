import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { mindfulTheme } from './games/core/theme'
import App from './App.tsx'

// Global styles
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  html {
    height: 100%;
    overflow: hidden;
  }

  body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    font-family: 'Nunito', 'Segoe UI', 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior: none;
  }

  #root {
    min-height: 100%;
  }

  /* Prevent pull-to-refresh on mobile */
  body {
    overscroll-behavior-y: contain;
  }

  /* Better touch handling */
  button, [role="button"] {
    touch-action: manipulation;
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Safe area for notched devices */
  @supports (padding: env(safe-area-inset-bottom)) {
    body {
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
`

// Inject global styles
const styleSheet = document.createElement('style')
styleSheet.textContent = globalStyles
document.head.appendChild(styleSheet)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={mindfulTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
