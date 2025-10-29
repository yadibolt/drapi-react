export interface IApiResponseUserLogin {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseUserLoginData;
}

export interface IApiResponseUserLoginData {
  token: string;
}
