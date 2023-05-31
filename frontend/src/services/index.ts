export const ENDPOINT: string = "http://127.0.0.1:8000";

export const STATUS = {
  SUCCESS: 200,
  ERROR: 400
};

export interface BaseResponse {
  status: number,
  message: string
}