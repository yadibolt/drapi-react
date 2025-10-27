import type { IApiResponseUser } from "./user.i";

export interface IUserRepo {
  g: () => Promise<IApiResponseUser>;
}
