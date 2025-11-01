import { useMemo } from "react";
import { UserStoreContext } from "./context/user/user-store.c";
import useUserStore from "./hook/user/use-user-store.h";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./data/client/query.client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { Toaster } from "./components/ui/sonner";

function App() {
  const userStore = useUserStore();
  const userStoreMemo = useMemo(() => ({ store: userStore }), [userStore]);

  return (
    <UserStoreContext.Provider value={userStoreMemo}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" richColors={true} theme="light" />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserStoreContext.Provider>
  );
}

export default App;
