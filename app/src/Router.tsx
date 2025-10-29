import { createBrowserRouter } from "react-router-dom";
import AppError from "./components/app/AppError";
import App40x50xPage from "./page/App40x50xPage";
import Protected from "./components/app/Protected";
import Public from "./components/app/Public";
import AppLoader from "./components/app/AppLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: AppLayout } = await import("./components/app/AppLayout");

      return {
        Component: AppLayout,
      };
    },
    errorElement: <App40x50xPage />,
    hydrateFallbackElement: <AppLoader />,
    children: [
      // protected routes
      {
        path: "",
        element: <Protected />,
        errorElement: <AppError />,
        children: [
          {
            path: "",
            lazy: async () => {
              const { default: AppShell } = await import(
                "./components/app/AppShell"
              );

              return {
                Component: AppShell,
              };
            },
            children: [
              {
                index: true,
                lazy: async () => {
                  const { default: HomePage } = await import("./page/HomePage");

                  return {
                    Component: HomePage,
                  };
                },
              },
            ],
          },
        ],
      },
      // public routes
      {
        path: "",
        element: <Public />,
        errorElement: <AppError />,
        children: [
          {
            path: "/login",
            lazy: async () => {
              const { default: LoginPage } = await import(
                "./page/Login/LoginPage"
              );

              return {
                Component: LoginPage,
              };
            },
          },
          {
            path: "/register",
            lazy: async () => {
              const { default: RegisterPage } = await import(
                "./page/RegisterPage"
              );

              return {
                Component: RegisterPage,
              };
            },
          },
        ],
      },
    ],
  },
]);
