import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { jaJP } from '@mui/material/locale'

function readCssVar(name: string): string | undefined {
  if (typeof window === 'undefined') return undefined
  const value = getComputedStyle(document.documentElement).getPropertyValue(name)
  const trimmed = value.trim()
  return trimmed.length ? trimmed : undefined
}

export function createThemeFromCssVars() {
  const primaryMain = readCssVar('--mui-primary') || '#1976d2'
  const primaryLight = readCssVar('--mui-primary-light') || '#42a5f5'
  const primaryDark = readCssVar('--mui-primary-dark') || '#1565c0'
  const primaryContrast = readCssVar('--mui-primary-contrast') || '#ffffff'

  const base = createTheme(
    {
      palette: {
        primary: {
          main: primaryMain,
          light: primaryLight,
          dark: primaryDark,
          contrastText: primaryContrast,
        },
        secondary: {
          main: '#9c27b0',
          light: '#ba68c8',
          dark: '#7b1fa2',
        },
        background: {
          default: '#ffffff',
          paper: '#ffffff',
        },
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
      },
      typography: {
        fontFamily: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ].join(','),
        h1: {
          fontSize: '2rem',
          fontWeight: 600,
          lineHeight: 1.2,
        },
        h2: {
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.3,
        },
        h3: {
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.4,
        },
        body1: {
          fontSize: '0.875rem',
          lineHeight: 1.5,
        },
        body2: {
          fontSize: '0.75rem',
          lineHeight: 1.4,
        },
      },
      shape: {
        borderRadius: 8,
      },
      spacing: 8,
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 8,
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow:
                '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
              },
            },
          },
        },
      },
    },
    jaJP
  )
  return responsiveFontSizes(base)
}

// Fallback theme for initial render or environments without CSS variables
const fallbackBase = createTheme(
  {
    palette: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
      },
    },
    typography: {
      fontFamily: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ].join(','),
      h1: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.2 },
      h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
      h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
      body1: { fontSize: '0.875rem', lineHeight: 1.5 },
      body2: { fontSize: '0.75rem', lineHeight: 1.4 },
    },
    shape: { borderRadius: 8 },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: { root: { textTransform: 'none', fontWeight: 500, borderRadius: 8 } },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: { '& .MuiOutlinedInput-root': { borderRadius: 8 } },
        },
      },
    },
  },
  jaJP
)

export const fallbackTheme = responsiveFontSizes(fallbackBase)
