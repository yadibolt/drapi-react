import { createContext } from "react";
import useUserStore from "../../hook/user/use-user-store.h";
import type { IUserStoreContext } from "../../@types/user/user-store-context.t";

export const UserStoreContext = createContext<IUserStoreContext>({
  store: useUserStore.getState(),
});
