import { Container, Stack, ContainerProps } from '@mui/material'
import { PropsWithChildren } from 'react'

/**
 * Wraps content with a responsive Material UI Container and Stack.
 * Using this component keeps spacing consistent across all pages.
 */
export function PageContainer({ children, ...props }: PropsWithChildren<ContainerProps>) {
  return (
    <Container sx={{ py: 4 }} {...props}>
      <Stack spacing={3}>{children}</Stack>
    </Container>
  )
}
