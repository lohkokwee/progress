import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Container,
  Flex,
  Header,
  Title,
  Text,
  useMantineTheme,
  keyframes,
  Button,
  Box,
  Affix,
  Menu,
  rem,
  ActionIcon,
} from '@mantine/core';
import { useHover, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

import { IconArrowRight, IconCategory2, IconX } from '@tabler/icons-react';
import { HEADER_HEIGHT, LOGO_WIDTH, NAV_MENU_WIDTH, smallerScreenSize } from '@/components/constants';
import { LOGGED_IN_ROUTES, LOGGED_OUT_ROUTES, ROUTE_NAME_MAPPING } from '@/routes';

import useAuth from '@/hooks/useAuth';
import useToggleState from '@/hooks/useToggleState';
import { AUTH_TEXTS } from '@/pages/authentication/constants';
import { GlobalLoaderContext } from '@/contexts/GlobalLoaderContext';
import { STATUS } from '@/services';

const HeaderResponsive = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { hovered: loginHovered, ref: loginRef } = useHover();
  const { isOpen: menuState, toggle: toggleMenuState } = useToggleState(false);
  const { setGlobalLoadingState, resetGlobalLoadingState } = useContext(GlobalLoaderContext);
  const smallerScreen = useMediaQuery(`(max-width:${smallerScreenSize})`);
  const HEADER_ROUTES = isAuthenticated ? [...LOGGED_IN_ROUTES.slice(0, -1), LOGGED_OUT_ROUTES[1]] : LOGGED_OUT_ROUTES;
  
  const renderLogo = () => {
    return (
      <Box sx={{ width: LOGO_WIDTH, textAlign: smallerScreen ? "center" : "start" }}>
        <Title order={3}>
          Pr
        </Title>
      </Box>
    )
  }

  const handleLogout = async () => {
    setGlobalLoadingState({
      isLoading: true,
      loaderTitle: AUTH_TEXTS.logout.loadingTitle,
      loaderText: AUTH_TEXTS.logout.loadingText,
    })
    const [status, message] = await logout();
    resetGlobalLoadingState()
    if (status !== STATUS.SUCCESS) {
      notifications.show({
        color: 'red',
        title: AUTH_TEXTS.logout.failTitle,
        message: `Error ${status} - ${message}`,
      })
    } else {
      notifications.show({
        color: 'green',
        title: AUTH_TEXTS.logout.successTitle,
        message: AUTH_TEXTS.logout.successText,
      })
      navigate(ROUTE_NAME_MAPPING["home"].path)
    }
  }

  const handleAuthClick = () => {
    return (
      isAuthenticated
        ? handleLogout()
        : navigate(ROUTE_NAME_MAPPING["authenticate"].path)
    )
  }

  const renderAuthButton = () => {
    const arrowHoverKeyframe = keyframes({
      '0%': {
        transform: 'translate(-1.5px, 0px)'
      }, '50%': {
        transform: 'translate(1.5px, 0px)'
      }, '100%': {
        transform: 'translate(-1.5px, 0px)'
      }
    });

    return (
      <Box onClick={() => { handleAuthClick() }}>
        <Flex gap={`calc(${theme.spacing.xs} / 2)`} sx={{ cursor: "pointer" }} ref={loginRef}>
          <Text size="sm">
            { isAuthenticated
              ? AUTH_TEXTS.logout.buttonText
              : AUTH_TEXTS.login.buttonText
            }
          </Text>
          <Flex
            align="center"
            sx={{ animation: loginHovered ? `${arrowHoverKeyframe} 1s ease-in-out infinite` : "" }}
          >
            <IconArrowRight size={theme.fontSizes.md} />
          </Flex>
        </Flex>
      </Box>
    )
  }

  const renderHeadersWide = () => {
    return (
      <Flex>
        {HEADER_ROUTES.map((headerData, idx) => (
          <Button
            key={idx}
            variant='header'
            onClick={() => { navigate(headerData.path) }}>
            {headerData.title}
          </Button>
        ))}
      </Flex>
    )
  }

  const renderHeadersSmall = () => {
    return (
      <Menu shadow="md" width={NAV_MENU_WIDTH} position='top-end' opened={menuState} onChange={toggleMenuState}>
        <Menu.Target>
          <Affix position={{ bottom: rem(20), right: rem(20) }} zIndex={10}>
            <ActionIcon size="xl" radius="xl" variant="filled" onClick={() => { toggleMenuState() }}>
              {menuState ? <IconX /> : <IconCategory2 />}
            </ActionIcon>

          </Affix>
        </Menu.Target>

        <Menu.Dropdown>
          {HEADER_ROUTES.map((headerData, idx) => (
            <Menu.Item
              key={idx}
              onClick={() => { navigate(headerData.path) }}>
              <Text ta="right">
                {headerData.title}
              </Text>
            </Menu.Item>
          ))}
          <Menu.Divider />
          <Menu.Item onClick={() => { navigate(ROUTE_NAME_MAPPING["authenticate"].path) }}>
            <Text ta="right">
              {isAuthenticated ? "Sign out" : "Log in"}
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <Header height={HEADER_HEIGHT}>
      <Container sx={{ height: '100%' }}>
        <Flex justify={smallerScreen ? "center" : "space-between"} align="center" sx={{ height: '100%' }}>
          {renderLogo()}
          {!smallerScreen && renderHeadersWide()}
          {!smallerScreen && renderAuthButton()}
          {smallerScreen && renderHeadersSmall()}
        </Flex>
      </Container>
    </Header>
  )
}

export default HeaderResponsive