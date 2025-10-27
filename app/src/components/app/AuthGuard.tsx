import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hook/user/use-user-token.h";

export default function AuthGuard() {
  const { isLoading, error } = useAuth();

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <Navigate to="/500" replace />;
  }

  return <Outlet />;
}
