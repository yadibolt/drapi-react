import { Navigate } from "react-router-dom";
import { ForgotPasswordConfirmForm } from "./components/forgot-password-confirm-form";

export default function ResetPasswordConfirmPage() {
  const queryToken =
    new URLSearchParams(window.location.search).get("token") || null;

  if (!queryToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordConfirmForm queryToken={queryToken} />
      </div>
    </div>
  );
}
