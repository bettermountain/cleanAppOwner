import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
// import { ThemeProvider } from '@mui/material/styles'
// import { CssBaseline } from '@mui/material'
import { muiTheme } from '../theme/mui-theme'
import { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

interface ProvidersProps {
  children: React.ReactNode
}

// Centralized theme object so it's created once and reused
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    // Include Japanese-friendly font stack for better rendering
    fontFamily: ["'Roboto'", "'Noto Sans JP'", 'sans-serif'].join(','),
  },
  // Slightly rounder corners for a softer look
  shape: { borderRadius: 8 },
})

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

  return (
    <ThemeProvider theme={muiTheme}>
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
