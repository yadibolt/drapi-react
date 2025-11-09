export interface IApiResponseMainMenu {
  message: string;
  error: boolean;
  timestamp: number;
  data: IApiResponseMainMenuData;
}

export interface IApiResponseMainMenuData {
  links: IApiResponseMainMenuLink[] | [];
}

export interface IApiResponseMainMenuLink {
  title: string;
  link: string;
  children: IApiResponseMainMenuLink[] | [];
}
