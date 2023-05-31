import {
  Loader,
  Overlay,
  Title,
  Text,
  Center,
  Box,
  Stack
} from "@mantine/core"

type LoadingOverlayProps = {
  visible: boolean
  title?: string,
  text?: string,
}

const LoadingOverlay = ({
  title,
  text,
  visible
}: LoadingOverlayProps) => {
  return (
    <Box
      display={visible ? "block" : "none"}
    >
      <Overlay blur={5} opacity={0.1} center >
        <Stack>
          <Center><Title order={3}>{title}</Title></Center>
          <Center><Loader variant="dots" /></Center>
          <Center><Text>{text}</Text></Center>
        </Stack>
      </Overlay>
    </Box>
  )
}

export default LoadingOverlay