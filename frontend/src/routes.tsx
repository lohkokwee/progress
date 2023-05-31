import { createBrowserRouter } from "react-router-dom";
import AppShell from "@/components/nav/AppShell";
import LandingPage from "@/pages/landing/LandingPage";
import LogsPage from "@/pages/logs/LogsPage";
import ProgressPage from "@/pages/progress/ProgressPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import AboutPage from "@/pages/about/AboutPage";
import AuthPage from "@/pages/authentication/AuthPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

export type ROUTE_DATA = {
  "title": string,
  "path": string,
  "element": React.ReactNode,
  "requiresAuth": boolean
}

export const LOGGED_OUT_ROUTES: ROUTE_DATA[] = [
  {
    title: "Home",
    path: '/',
    element: <LandingPage />,
    requiresAuth: false
  }, {
    title: "About",
    path: '/about',
    element: <AboutPage />,
    requiresAuth: false
  }
]

export const LOGGED_IN_ROUTES: ROUTE_DATA[] = [
  {
    title: "Dashboard",
    path: '/v',
    element: <DashboardPage />,
    requiresAuth: true
  }, {
    title: "Log",
    path: '/v/log',
    element: <LogsPage />,
    requiresAuth: true
  }, {
    title: "Progress",
    path: '/v/progress',
    element: <ProgressPage />,
    requiresAuth: true
  }, {
    title: "Settings",
    path: '/v/settings',
    element: <SettingsPage />,
    requiresAuth: true
  }
]

export const AUTH_ROUTES: ROUTE_DATA[] = [
  {
    title: "Authenticate",
    path: "/auth",
    element: <AuthPage />,
    requiresAuth: false
  }
]

const ALL_ROUTES = [
  ...LOGGED_OUT_ROUTES,
  ...LOGGED_IN_ROUTES,
  ...AUTH_ROUTES
]

// Allows access to route paths (e.g. ROUTE_NAME_MAPPING["home"])
export const ROUTE_NAME_MAPPING = ALL_ROUTES.reduce((route_map: { [key: string]: ROUTE_DATA }, route_data) => {
  route_map[route_data.title.toLowerCase()] = route_data
  return route_map
}, {})

export const PATH_NAME_MAPPING = ALL_ROUTES.reduce((path_map: { [key: string]: ROUTE_DATA }, route_data) => {
  path_map[route_data.path] = route_data
  return path_map
}, {})

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: LOGGED_OUT_ROUTES.concat(AUTH_ROUTES)
  }, {
    path: '/v',
    element: <AppShell />,
    children: LOGGED_IN_ROUTES
  }
])