export interface IApiResponseUserToken {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseUserTokenData;
}

interface IApiResponseUserTokenData {
  token: string;
}
