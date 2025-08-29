
import { Container, Stack } from '@mui/material'
// Import type separately so it doesn't inflate the runtime bundle
import type { ContainerProps } from '@mui/material/Container'
import { PropsWithChildren } from 'react'

/**
 * Wraps content with a responsive Material UI Container and Stack.
 * Using this component keeps spacing consistent across all pages.
 */
export function PageContainer({ children, ...props }: PropsWithChildren<ContainerProps>) {
  return (
    // Limit width for comfortable reading and apply vertical padding
    <Container maxWidth="lg" sx={{ py: 4 }} {...props}>
      {/* Stack provides consistent vertical spacing between children */}
      <Stack spacing={3}>{children}</Stack>
    </Container>
  )
}
