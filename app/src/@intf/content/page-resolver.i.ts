export interface IApiResponsePage {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponsePageData;
}

export interface IApiResponsePageData {
  id: number;
  type: string;
  content_type: string;
}
