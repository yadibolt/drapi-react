export interface IApiResponseUserToken {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseUserTokenData;
}

export interface IApiResponseUserTokenData {
  token: string;
}
