import { BaseResponse, ENDPOINT, STATUS } from "@/services"
import { AuthUser } from "@/pages/authentication/constants";

export const logoutUser = async (): Promise<BaseResponse> => {
  const logoutUserEndpoint = `${ENDPOINT}/api/auth/logout`
  let data: BaseResponse;

  const userData = localStorage.getItem("user");
  let user: Partial<AuthUser> = {};
  if (userData) {
    user = JSON.parse(userData);
  }

  try {
    const response = await fetch(logoutUserEndpoint, {
      headers: {
        'Authorization': `Bearer ${user.JWTToken}`
      }
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