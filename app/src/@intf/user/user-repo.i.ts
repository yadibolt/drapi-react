import type { IApiResponseUser } from "./user.i";

export interface IUserRepo {
  get: () => Promise<IApiResponseUser>;
}
