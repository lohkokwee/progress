import { createContext } from "react";
import { AuthUser } from "@/pages/authentication/constants";

export type AuthContextProps = {
  user: AuthUser | null,
  setUser: (user: AuthUser | null) => void
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => null
});