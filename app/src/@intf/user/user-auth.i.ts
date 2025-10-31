export interface IApiResponseUserLogin {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseUserLoginData;
}

export interface IApiResponseUserLoginData {
  token: string;
}

export interface IApiResponseUserLogout {
  message: string;
  error: boolean;
  timestamp: number;
}

export interface IApiResponseUserPasswordReset {
  message: string;
  error: boolean;
  timestamp: number;
}
