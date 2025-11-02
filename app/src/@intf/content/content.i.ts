export interface IApiResponseContent {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseContentData;
}

export interface IApiResponseContentData {
  content_type: string;
  fields: Record<string, unknown>;
}
