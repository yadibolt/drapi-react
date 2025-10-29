import type { IApiResponseUserToken } from "./user-token.i";

export interface ITokenRepo {
  get: () => Promise<IApiResponseUserToken>;
}
