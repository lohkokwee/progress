import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { notifications } from '@mantine/notifications';

import useAuth from '@/hooks/useAuth'
import { PATH_NAME_MAPPING, ROUTE_NAME_MAPPING } from '@/routes';
import { AUTH_TEXTS } from '@/pages/authentication/constants';
import { LoadingOverlay } from '@mantine/core';

/**
 * Route guard logic implemented here.
 */
const AppOutlet = (): React.ReactElement => {
  const { isAuthenticated, isLoadingUser } = useAuth();
  const location = useLocation();
  const isPathRequiresAuth = PATH_NAME_MAPPING[location.pathname].requiresAuth

  const renderUnauthenticatedOutlet = () => {
    setTimeout(() => {
      notifications.show({
        color: 'red',
        title: AUTH_TEXTS.unauthorised.notificationTitle,
        message: AUTH_TEXTS.unauthorised.notificationText,
      });
    }, 0);
    return (
      <Navigate to={ROUTE_NAME_MAPPING["authenticate"].path} />
    );
  }

  if (isLoadingUser) {
    return <LoadingOverlay visible />
  }

  if (isPathRequiresAuth) {
    if (isAuthenticated) {
      return <Outlet />
    }
    return renderUnauthenticatedOutlet()
  }
  return <Outlet />
}

export default AppOutlet