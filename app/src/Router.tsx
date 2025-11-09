import { createBrowserRouter } from "react-router-dom";
import AppLoader from "./components/app/app-loader";
import ErrorPage from "./page/Error/ErrorPage";
import Public from "./components/app/public";

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
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <AppLoader />,
    children: [
      // open routes
      {
        index: true,
        lazy: async () => {
          const { default: HomePage } = await import("./page/Home/HomePage");

          return {
            Component: HomePage,
          };
        },
      },
      // protected routes
      /* {
        path: "",
        element: <Protected />,
        errorElement: <ErrorPage />,
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
          },
        ],
      }, */
      // public routes
      {
        path: "",
        element: <Public />,
        errorElement: <ErrorPage />,
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
          {
            path: "/reset-password/confirm",
            lazy: async () => {
              const { default: ResetPasswordConfirmPage } = await import(
                "./page/Auth/ResetPasswordConfirmPage"
              );

              return {
                Component: ResetPasswordConfirmPage,
              };
            },
          },
        ],
      },
      // content resolver
      /* {
        path: "*",
        lazy: async () => {
          const { default: ContentResolver } = await import(
            "./page/Content/ContentResolver"
          );

          return {
            Component: ContentResolver,
          };
        },
      }, */
    ],
  },
]);
