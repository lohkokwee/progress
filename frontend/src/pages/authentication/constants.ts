export const AUTH_TEXTS = {
  login: {
    buttonText: "Log in",
    loadingTitle: "Logging you in",
    loadingText: "Hang on tight",
    successTitle: "Log in successful",
    successText: "Redirecting you to your home page",
    failTitle: "Log in failed"
  },
  signup: {
    buttonText: "Sign up",
    loadingTitle: "Signing you up",
    loadingText: "Give us some time"
  },
  logout: {
    buttonText: "Sign out",
    loadingTitle: "Logging you out",
    loadingText: "Feel free to leave this page",
    successTitle: "Log out successful",
    successText: "Redirecting you to the Progress landing page",
    failTitle: "Log out failed"
  },
  unauthorised: {
    notificationTitle: "Unauthorised access",
    notificationText: "Please log in to your account to proceed"
  },
  inactivity: {
    notificationTitle: "Log in data expired",
    notificationText: "Please log in to try again"
  }
}

export type AuthUser = {
  id: string,
  name: string,
  email: string,
  JWTToken: string,
  TTL: number
}

export type LoginData = {
  email: string,
  password: string
}