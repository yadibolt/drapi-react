export interface IApiResponseBlogTeasers {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseBlogTeasersData;
}

export interface IApiResponseBlogTeasersData {
  posts: IApiResponseBlogTeasersFields[];
}

interface IApiResponseBlogTeasersFields {
  title: string;
  nid: number;
  field_description: IFieldDescription;
  field_image: IFieldImageBottom;
  path: IFieldPath;
}

interface IFieldImageBottom {
  alt: string;
  url: string;
}

interface IFieldDescription {
  value: string;
  summary: string;
}

interface IFieldPath {
  alias: string | null;
}
