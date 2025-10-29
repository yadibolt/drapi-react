import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../../service/auth/auth.s";

export default function Protected() {
  const { loggedIn } = authService.getState();

  if (!loggedIn) {
    authService.setState("loggedOut", null);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
