export interface IApiResponseBlogPage {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseBlogPageData;
}

export interface IApiResponseBlogPageData {
  fields: IApiResponseBlogPageFields;
}

interface IApiResponseBlogPageFields {
  title: string;
  created: number;
  path: IFieldPath;
  field_content: IFieldContent;
  field_description: IFieldDescription;
  field_image: IFieldImage;
  field_read_time: number;
  field_related_posts: IFieldRelatedPost[];
  field_tag: IFieldTag;
}

interface IFieldContent {
  value: string;
}

interface IFieldDescription {
  value: string;
  summary: string;
}

interface IFieldImage {
  alt: string;
  url: string;
}

interface IFieldRelatedPost {
  nid: number;
  title: string;
  created: number;
  path: IFieldPath;
  field_description: IFieldDescription;
}

interface IFieldPath {
  alias: string | null;
}

interface IFieldTag {
  name: string;
}
