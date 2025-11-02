import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "../../service/auth/auth.s";

export default function Protected() {
  const { loggedIn } = authService.getState();

  useEffect(() => {
    if (!loggedIn) {
      authService.setState("loggedOut", null);
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
