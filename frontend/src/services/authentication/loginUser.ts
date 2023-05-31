import { ENDPOINT, STATUS } from "@/services"
import { LoginResponse } from "@/services/authentication"
import { LoginData } from "@/pages/authentication/constants";

export const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  const loginUserEndpoint = `${ENDPOINT}/api/auth/login`
  let data: LoginResponse;
  try {
    const response = await fetch(loginUserEndpoint, {
      method: "POST",
      body: JSON.stringify(loginData)
    });

    if (response.status !== STATUS.SUCCESS) {
      data = {
        status: response.status,
        message: response.statusText
      }
      return data
    }

    data = await response.json();
  } catch (error) {
    data = {
      status: 500,
      message: error as string
    }
  }

  return data
}