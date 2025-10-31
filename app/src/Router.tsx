import { createBrowserRouter } from "react-router-dom";
import AppError from "./components/app/app-error";
import App40x50xPage from "./page/Error/App40x50xPage";
import Protected from "./components/app/protected";
import Public from "./components/app/public";
import AppLoader from "./components/app/app-loader";

export const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const { default: AppLayout } = await import(
        "./components/app/app-layout"
      );

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
                "./components/app/app-shell"
              );

              return {
                Component: AppShell,
              };
            },
            children: [
              {
                index: true,
                lazy: async () => {
                  const { default: HomePage } = await import(
                    "./page/Home/HomePage"
                  );

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
                "./page/Auth/LoginPage"
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
                "./page/Auth/RegisterPage"
              );

              return {
                Component: RegisterPage,
              };
            },
          },
          {
            path: "/reset-password",
            lazy: async () => {
              const { default: ResetPasswordPage } = await import(
                "./page/Auth/ResetPasswordPage"
              );

              return {
                Component: ResetPasswordPage,
              };
            },
          },
        ],
      },
    ],
  },
]);
