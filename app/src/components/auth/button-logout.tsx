import { Button } from "@/components/ui/button";
import { useNavigate, useRevalidator } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import type { IApiResponseUserLogout } from "@/@intf/user/user-auth.i";
import { authService } from "@/service/auth/auth.s";
import { toast } from "sonner";
import { useLogoutQueryMutation } from "@/data/query/user/user-auth.query";
import { useState } from "react";
import type { AxiosError } from "axios";

export function LogoutButton() {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const logoutMut = useLogoutQueryMutation();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    toast.promise<{ message: string }>(
      () =>
        new Promise((resolve, reject) => {
          logoutMut
            .mutateAsync()
            .then((result) => {
              if (result) {
                const { message, error } = result as IApiResponseUserLogout;

                if (error) {
                  reject(message);
                  return;
                }

                authService.setState("loggedOut");
                resolve({ message: "" });

                revalidator.revalidate();
                navigate("/login");
              }
            })
            .catch((error: AxiosError) => {
              const data = error.response?.data;
              if (data) {
                reject((data as IApiResponseUserLogout).message || null);
              } else {
                reject(error);
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
      {
        loading: "Logging out...",
        success: "Successfully logged out.",
        error: "Could not log out. Please try again.",
      },
    );
  };

  return (
    <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
      {isSubmitting ? <Spinner className="size-4" /> : "Logout"}
    </Button>
  );
}
