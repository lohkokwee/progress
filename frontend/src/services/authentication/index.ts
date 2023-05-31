import { BaseResponse } from "@/services";

export interface User {
  id: string,
  name: string,
  email: string,
  created_at: string,
  updated_at: string
}

export interface LoginResponse extends BaseResponse {
  data?: {
    token: string,
    user: User
  }
}