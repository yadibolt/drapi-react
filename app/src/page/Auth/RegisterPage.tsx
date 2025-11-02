import { Droplet } from "lucide-react";
import { RegisterForm } from "./components/register-form";
import { getContentQuery } from "@/data/query/content/content.query";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "@/components/app/app-loader";
import App40x50xPage from "../Error/App40x50xPage";

export default function RegisterPage() {
  const { pathname, search } = useLocation();
  const { data, error, isLoading, isPending } = useQuery({
    ...getContentQuery({ destination: pathname + search }),
    queryKey: ["content", "register-page"],
  });

  if (isLoading || isPending) {
    return <AppLoader />;
  }

  if (error) {
    return <App40x50xPage />;
  }

  const termsOfServiceUrl =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data.data.fields?.field_terms_of_service as any)?.path?.alias ?? "#";
  const privacyPolicyUrl =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data.data.fields?.field_privacy_policy as any)?.path?.alias ?? "#";

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <Droplet className="size-4" />
          </div>
          DrapiReact
        </a>
        <RegisterForm
          termsOfServiceUrl={termsOfServiceUrl}
          privacyPolicyUrl={privacyPolicyUrl}
        />
      </div>
    </div>
  );
}
