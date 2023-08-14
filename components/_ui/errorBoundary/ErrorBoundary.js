import React from "react"
import { Box, Container, Stack, Typography, Button } from '@mui/material'



class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box py={10} textAlign='center'>
          <Container className='center'>
            <Stack spacing={2} alignItems='center'>
              <Typography variant='h2' color='error.dark'>Sorry! Something went wrong</Typography>
              <Button onClick={() => window.location.reload()} variant='outlined' size="large" >Try Again</Button>
            </Stack>
          </Container>
        </Box>
      )
    }


    return this.props.children
  }
}

export default ErrorBoundary