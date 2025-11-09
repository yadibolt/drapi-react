import type { IApiResponseMainMenu } from "./main-menu.i";

export interface IMainMenuRepo {
  get: () => Promise<IApiResponseMainMenu>;
}
