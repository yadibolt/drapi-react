import { Button } from "@/components/ui/button";
import { useNavigate, useRevalidator } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import type { IApiResponseUserLogout } from "@/@intf/user/user-auth.i";
import { authService } from "@/service/auth/auth.s";
import { toast } from "sonner";
import { useLogoutQueryMutation } from "@/data/query/user/user-auth.query";
import { useState } from "react";

export function LogoutButton() {
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const logoutMut = useLogoutQueryMutation();

  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      toast.promise<{ name: string }>(
        () =>
          new Promise((resolve, reject) => {
            logoutMut
              .mutateAsync()
              .then((result) => {
                if (result) {
                  const { message, error } = result as IApiResponseUserLogout;
                  if (error) {
                    reject(new Error(message));
                    return;
                  }

                  authService.setState("loggedOut");
                  resolve({ name: "" });
                  navigate("/login");
                }
              })
              .catch((error) => {
                reject(error);
              });
          }),
        {
          loading: "Logging out...",
          success: "Successfully logged out.",
          error: "Could not log out. Please try again.",
        },
      );
    } catch (error: unknown) {
      toast.error(`${(error as Error).message}`);
      setSubmitting(false);
    } finally {
      revalidator.revalidate();
      setSubmitting(false);
    }
  };

  return (
    <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
      {isSubmitting ? <Spinner className="size-4" /> : "Logout"}
    </Button>
  );
}
