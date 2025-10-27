import type { TUser } from "../../@types/user/user.t";

export interface IUserStore {
  user: TUser | null;
  gUser: () => TUser | null;
  sUser: (user: TUser | null) => void;
  token: string | null;
  gToken: () => string | null;
  sToken: (token: string | null) => void;
}
