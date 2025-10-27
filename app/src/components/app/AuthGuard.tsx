import { Outlet } from "react-router-dom";
import { useAuth } from "../../hook/user/use-user-token.h";
import { authService } from "../../service/auth/auth.s";
import Spinner from "./Spinner";

export default function AuthGuard() {
  const { isLoading, error } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return null;
  }

  console.log(authService.gUser());

  return <Outlet />;
}
