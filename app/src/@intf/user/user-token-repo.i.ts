import type { IApiResponseUserToken } from "./user-token.i";

export interface ITokenRepo {
  g: () => Promise<IApiResponseUserToken>;
}
