export interface IApiResponseUser {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseUserData;
}

interface IApiResponseUserData {
  id: number;
  active: boolean;
  langcode: string;
  permissions: string[];
  roles: string[];
}
