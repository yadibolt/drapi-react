import { useMemo } from "react";
import { UserStoreContext } from "./context/user/user-store.c";
import useUserStore from "./hook/user/use-user-store.h";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./data/client/query.client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

function App() {
  const userStore = useUserStore();
  const userStoreMemo = useMemo(() => ({ store: userStore }), [userStore]);

  return (
    <UserStoreContext.Provider value={userStoreMemo}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserStoreContext.Provider>
  );
}

export default App;
