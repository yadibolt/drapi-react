import type { TUser } from "../../@types/user/user.t";

export interface IUserStore {
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  getHydrated: () => boolean;
  user: TUser | null;
  getUser: () => TUser | null;
  setUser: (user: TUser | null) => void;
  token: string | null;
  getToken: () => string | null;
  setToken: (token: string | null) => void;
}
