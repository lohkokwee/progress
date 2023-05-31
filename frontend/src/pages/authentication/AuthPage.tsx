import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Divider,
  Anchor,
  Stack,
  Container,
  Title,
  Box,
  Flex,
} from '@mantine/core';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

import { AUTH_TEXTS, LoginData } from '@/pages/authentication/constants';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { smallerScreenSize } from '@/components/constants';
import useAuth from '@/hooks/useAuth';
import { STATUS } from '@/services';
import { ROUTE_NAME_MAPPING } from '@/routes';
import { GlobalLoaderContext } from '@/contexts/GlobalLoaderContext';

const AuthPage = () => {
  const [type, toggle] = useToggle<'login' | 'signup'>(['login', 'signup']);
  const { login } = useAuth();
  const { setGlobalLoadingState, resetGlobalLoadingState } = useContext(GlobalLoaderContext);
  const navigate = useNavigate();
  const smallerScreen = useMediaQuery(`(max-width:${smallerScreenSize})`);

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      name: (val) => ((type === 'signup' && val.length == 0) ? 'Invalid name' : null),
      password: (val) => (val.length < 4 ? 'Password should include at least 4 characters' : null),
    },
  });

  const renderDescArea = () => {
    return (
      <Box>
        <Title ta="center" mb="sm">
          Progress App
        </Title>
        <Text size="xs" ta="center">
          {AUTH_TEXTS[type].buttonText} with
        </Text>
      </Box>
    )
  }

  const renderGoogleLogIn = () => {
    return (
      <Box>
        <Button
          leftIcon={<GoogleIcon />}
          radius="md"
          bg="white"
          c="black"
          variant='outline'
          fullWidth>
          Google
        </Button>
      </Box>
    )
  }

  const renderBreak = () => {
    return (
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
    )
  }

  const renderAuthPrompt = () => {
    return (
      <Flex justify={smallerScreen ? "center" : "start"} mt="xs">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => {
            toggle();
            form.setFieldValue('name', '');
          }}
          size="xs"
        >
          {type === 'signup'
            ? `Already have an account? ${AUTH_TEXTS["login"].buttonText}`
            : `Don't have an account? ${AUTH_TEXTS["signup"].buttonText}`}
        </Anchor>
      </Flex>
    )
  }

  const submitLogin = async () => {
    setGlobalLoadingState({
      isLoading: true,
      loaderTitle: AUTH_TEXTS["login"].loadingTitle,
      loaderText: AUTH_TEXTS["login"].loadingText,
    })
    const loginData: LoginData = {
      email: form.values.email,
      password: form.values.password
    }
    const [status, message] = await login(loginData);
    resetGlobalLoadingState()
    if (status !== STATUS.SUCCESS) {
      notifications.show({
        color: 'red',
        title: AUTH_TEXTS.login.failTitle,
        message: `Error ${status} - ${message}`,
      })
    } else {
      notifications.show({
        color: 'green',
        title: AUTH_TEXTS.login.successTitle,
        message: AUTH_TEXTS.login.successText,
      })
      navigate(ROUTE_NAME_MAPPING["dashboard"].path)
    }
  }

  const submitSignup = () => {
    // TODO
    return;
  }

  const renderForm = () => {
    return (
      <form onSubmit={form.onSubmit(() => {
        submitLogin()
      })}>
        <Stack>
          {type === 'signup' && (
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              error={form.errors.name}
              radius="md"
            />
          )}

          <TextInput
            withAsterisk
            label="Email"
            placeholder="youremail@progress.app"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            withAsterisk
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password}
            radius="md"
          />
        </Stack>

        <Flex direction={smallerScreen ? "column" : "row"} justify={smallerScreen ? "center" : "space-between"} mt="xl">
          {!smallerScreen && renderAuthPrompt()}
          <Button type="submit" radius="xl">
            {AUTH_TEXTS[type].buttonText}
          </Button>
          {smallerScreen && renderAuthPrompt()}
        </Flex>
      </form>
    )
  }

  return (
    <Container>
      <Paper radius="md" p="xl">
        <Box mb="md">
          {renderDescArea()}
        </Box>
        <Box>
          {renderGoogleLogIn()}
        </Box>
        {renderBreak()}
        <Box>
          {renderForm()}
        </Box>
      </Paper>
    </Container>
  );
}

export default AuthPage