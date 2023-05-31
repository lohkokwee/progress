import { Box, Container, Text, Title } from '@mantine/core';

const LandingPage = () => {
  const renderHeroSection = () => {
    return (
      <Box>
        <Title ta="center">Progress App</Title>
        <Text ta="center">Training with intention</Text>
      </Box>
    )
  }

  return (
    <Container>
      {renderHeroSection()}

    </Container>
  )
}

export default LandingPage