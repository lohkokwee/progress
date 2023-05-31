import { useState } from 'react';
import './App.css';

import { RouterProvider } from 'react-router-dom';
import { routes } from '@/routes';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { useColorScheme } from '@mantine/hooks';

import { createTheme } from './theme';
import { AuthContext } from './contexts/AuthContext';
import { AuthUser } from './pages/authentication/constants';
import { GlobalLoaderContext, GlobalLoadingState, defaultGlobalLoadingState } from './contexts/GlobalLoaderContext';

function App() {
  // Theming
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const theme = createTheme(colorScheme);

  // Auth
  const [user, setUser] = useState<AuthUser | null>(null);
  const [globalLoadingState, setGlobalLoadingState] = useState<GlobalLoadingState>(defaultGlobalLoadingState);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications />
        <AuthContext.Provider value={{ user, setUser }}>
          <GlobalLoaderContext.Provider value={{ 
            globalLoadingState,
            setGlobalLoadingState,
            resetGlobalLoadingState: () => setGlobalLoadingState(defaultGlobalLoadingState)
          }}>
            <RouterProvider router={routes} />
          </GlobalLoaderContext.Provider>
        </AuthContext.Provider>
      </MantineProvider>
    </ColorSchemeProvider >
  )
}

export default App
