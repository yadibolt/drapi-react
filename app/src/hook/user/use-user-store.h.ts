import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { IUserStore } from "../../@intf/user/user-store.i";

const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set, get) => ({
        hydrated: false,
        sHydrated: (hydrated: boolean) => {
          set({ hydrated });
        },
        gHydrated: () => {
          return get().hydrated;
        },
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
        onRehydrateStorage: () => (state) => {
          state?.sHydrated(true);
        },
      },
    ),
  ),
);

export default useUserStore;
