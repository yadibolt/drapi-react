import { authService } from "@/service/auth/auth.s";
import { Navigate, Outlet } from "react-router-dom";

export default function Public() {
  const { loggedIn } = authService.getState();

  if (loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
