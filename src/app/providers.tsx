import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
// Material UI theme utilities for consistent design
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: (failureCount, error: unknown) => {
              if (error && typeof error === 'object' && 'response' in error && 
                  error.response && typeof error.response === 'object' && 
                  'status' in error.response && error.response.status === 404) return false
              return failureCount < 3
            },
          },
        },
      })
  )

  return (
    // Wrap the app with ThemeProvider to enable Material UI's design system
    <ThemeProvider
      // Custom palette ensures brand consistency
      theme={createTheme({
        palette: {
          primary: { main: '#1976d2' },
          background: { default: '#f5f5f5' },
        },
      })}
    >
      {/* CssBaseline provides a sensible CSS reset for better UX */}
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
