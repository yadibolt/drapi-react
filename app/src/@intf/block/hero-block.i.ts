export interface IApiResponseHeroBlock {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseHeroBlockData;
}

export interface IApiResponseHeroBlockData {
  fields: IApiResponseHeroBlockFields;
}

interface IApiResponseHeroBlockFields {
  field_image_bottom: IFieldImageBottom;
  field_catchy_badge_text: IFieldCatchyBadgeText;
  field_cta_button: IFieldCtaButton;
  field_description: IFieldDescription;
  field_heading: string;
}

interface IFieldImageBottom {
  alt: string;
  url: string;
}

interface IFieldCatchyBadgeText {
  value: string;
  summary: string;
}

interface IFieldDescription {
  value: string;
  summary: string;
}

interface IFieldCtaButton {
  uri: string;
  title: string;
}
