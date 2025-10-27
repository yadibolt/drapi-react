import { createBrowserRouter } from "react-router-dom";
import { userLoader } from "./data/query/user/user.loader";
import { queryClient } from "./data/client/query.client";
import AppError from "./components/app/AppError";
import AppLayout from "./components/app/AppLayout";
import AppShell from "./components/app/AppShell";
import HomePage from "./page/HomePage";
import App40x50xPage from "./page/App40x50xPage";
import AuthGuard from "./components/app/AuthGuard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <App40x50xPage />,
    children: [
      // protected routes
      {
        path: "/",
        element: <AuthGuard />,
        errorElement: <AppError />,
        children: [
          {
            path: "/",
            element: <AppShell />,
            loader: userLoader(queryClient),
            children: [
              {
                index: true,
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
