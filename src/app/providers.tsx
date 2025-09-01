import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { createThemeFromCssVars, fallbackTheme } from '../theme/mui-theme'
import { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

interface ProvidersProps {
  children: React.ReactNode
}


export function Providers({ children }: ProvidersProps) {
  // Configure React Query client with sane defaults
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: (failureCount, error: unknown) => {
              if (
                error &&
                typeof error === 'object' &&
                'response' in error &&
                error.response &&
                typeof error.response === 'object' &&
                'status' in error.response &&
                error.response.status === 404
              )
                return false
              return failureCount < 3
            },
          },
        },
      })
  )

  // Build theme from CSS variables on the client; fall back initially
  const [theme] = useState(() => {
    try {
      return createThemeFromCssVars()
    } catch {
      return fallbackTheme
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
