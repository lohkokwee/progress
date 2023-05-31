import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { AUTH_TEXTS, AuthUser, LoginData } from "@/pages/authentication/constants";
import { AuthContext } from "@/contexts/AuthContext";
import { STATUS } from "@/services";
import { loginUser } from "@/services/authentication/loginUser";
import { logoutUser } from "@/services/authentication/logoutUser";
import { notifications } from "@mantine/notifications";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);
  const { getItem, setItem } = useLocalStorage();
  const [isLoadingUser, setIsLoadingUser] = useState(true); 
  const now = new Date().getTime()

  const authenticateUser = (user: AuthUser) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const unauthenticateUser = (): void => {
    setUser(null);
    setItem("user", "");
  };

  useEffect(() => {
    const userData = getItem("user");
    let user: AuthUser | null = null;
    if (userData) {
      user = JSON.parse(userData)
      setUser(user);
    }
    if (user && now > user?.TTL) {
      notifications.show({
        color: 'red',
        title: AUTH_TEXTS.inactivity.notificationTitle,
        message: AUTH_TEXTS.inactivity.notificationText,
      })
      logout()
      unauthenticateUser()
    }
    setIsLoadingUser(false);
  }, []);

  const login = async (loginData: LoginData): Promise<[number, string]> => {
    const data = await loginUser(loginData);

    if (data.status === STATUS.SUCCESS && data.data) {
      const authUser: AuthUser = {
        id: data.data.user.id,
        email: data.data.user.email,
        name: data.data.user.name,
        JWTToken: data.data.token,
        TTL: now + (15 * 60000)
      };
      authenticateUser(authUser);
      return [data.status, data.message]
    } 
    return [data.status, data.message]
  };

  const logout = async (): Promise<[number, string]> => {
    const data = await logoutUser();
    if (data.status === STATUS.SUCCESS) {
      unauthenticateUser();
      return [data.status, data.message]
    }
    return [data.status, data.message]
  };

  return { user, login, logout, isAuthenticated: Boolean(user), isLoadingUser };
};

export default useAuth;