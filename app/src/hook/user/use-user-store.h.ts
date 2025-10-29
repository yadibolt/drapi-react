import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IUserStore } from "../../@intf/user/user-store.i";

const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set, get) => ({
        hydrated: false,
        setHydrated: (hydrated: boolean) => {
          set({ hydrated });
        },
        getHydrated: () => {
          return get().hydrated;
        },
        user: null,
        getUser: () => {
          return get().user;
        },
        setUser: (user) => {
          set({ user });
        },
        token: null,
        getToken: () => {
          return get().token;
        },
        setToken: (token) => {
          set({ token });
        },
      }),
      {
        name: "user-store",
        onRehydrateStorage: () => (state) => {
          state?.setHydrated(true);
        },
      },
    ),
  ),
);

export default useUserStore;
