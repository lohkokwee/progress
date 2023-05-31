import { useContext } from 'react';

import {
  AppShell as MantineShell
} from '@mantine/core';

import HeaderResponsive from './HeaderResponsive';
import { getLightDarkBackgroundColors } from '@/theme';
import AppOutlet from './AppOutlet';
import LoadingOverlay from '../overlays/LoadingOverlay';
import { GlobalLoaderContext } from '@/contexts/GlobalLoaderContext';

const AppShell = () => {
  const { globalLoadingState } = useContext(GlobalLoaderContext);

  return (
    <MantineShell
      header={<HeaderResponsive />}
      styles={(theme) => ({
        main: { ...getLightDarkBackgroundColors(theme) },
      })}>
        <LoadingOverlay
          visible={globalLoadingState.isLoading}
          title={globalLoadingState.loaderTitle}
          text={globalLoadingState.loaderText} 
        />
        <AppOutlet />
    </MantineShell>
  )
}

export default AppShell