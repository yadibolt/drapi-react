import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IUserStore } from "../../@intf/user/user-store.i";

const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        gUser: () => {
          return get().user;
        },
        sUser: (user) => {
          set({ user });
        },
        token: null,
        gToken: () => {
          return get().token;
        },
        sToken: (token) => {
          set({ token });
        },
      }),
      {
        name: "user-store",
      },
    ),
  ),
);

export default useUserStore;
