import type { TJWTUserData } from "../../@types/user/user.t";

export interface IUserStore {
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  getHydrated: () => boolean;
  user: TJWTUserData | null;
  getUser: () => TJWTUserData | null;
  setUser: (user: TJWTUserData | null) => void;
  token: string | null;
  getToken: () => string | null;
  setToken: (token: string | null) => void;
}
