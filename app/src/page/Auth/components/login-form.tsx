import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as Yup from "yup";
import { Link, useNavigate, useRevalidator } from "react-router-dom";
import type { TLoginValues } from "@/@types/form/auth-values.t";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
  type FormikHelpers,
} from "formik";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useLoginQueryMutation } from "@/data/query/user/user-auth.query";
import type {
  IApiResponseUserLogin,
  IApiResponseUserLoginData,
} from "@/@intf/user/user-auth.i";
import { authService } from "@/service/auth/auth.s";
import { toast } from "sonner";
import type { AxiosError } from "axios";

const schema = Yup.object({
  login: Yup.string().min(6).max(50).required("Login is required"),
  password: Yup.string().min(6, "Too short").required("Password is required"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const initialValues: TLoginValues = { login: "", password: "" };

  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const loginMut = useLoginQueryMutation();

  const handleSubmit = async (
    values: TLoginValues,
    { setSubmitting, resetForm }: FormikHelpers<TLoginValues>,
  ) => {
    setSubmitting(true);
    toast.promise<{ username: string }>(
      () =>
        new Promise((resolve, reject) => {
          loginMut
            .mutateAsync(values)
            .then((result) => {
              const { message, error, data } = result as IApiResponseUserLogin;

              if (error) {
                reject(new Error(message));
                return;
              }

              const { token } = data as IApiResponseUserLoginData;
              authService.setToken(token);
              authService.setUser(authService.getUser());

              resolve({
                username: authService.getUser()?.username || "{{ %username% }}",
              });
              resetForm();

              revalidator.revalidate();
              navigate("/");
            })
            .catch((error: AxiosError) => {
              const data = error.response?.data;

              if (data) {
                reject((data as IApiResponseUserLogin).message || null);
              } else {
                reject(error);
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
      {
        loading: "Logging in...",
        success: (data) => `Welcome back, ${data.username}!`,
        error: "Could not log in. Please try again.",
      },
    );
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm
            className={cn("flex flex-col gap-6", className)}
            {...props}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  Enter your credentials below to login
                </p>
              </div>
              <Field className="gap-1">
                <FieldLabel htmlFor="login" className="text-xs">
                  Login
                </FieldLabel>
                <FormikField
                  id="login"
                  name="login"
                  type="text"
                  placeholder="user@example.com"
                  required
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className,
                  )}
                />
                <FormikErrorMessage name="login">
                  {(msg) => (
                    <Alert
                      variant="destructive"
                      className="border-0 px-1 py-0 text-xs"
                    >
                      <AlertTitle>{msg}</AlertTitle>
                    </Alert>
                  )}
                </FormikErrorMessage>
              </Field>
              <Field className="gap-1">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-xs">
                    Password
                  </FieldLabel>
                  <Link
                    to="/reset-password"
                    className="ml-auto underline-offset-4 hover:underline text-xs"
                  >
                    Reset your password
                  </Link>
                </div>
                <FormikField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    className,
                  )}
                />
                <FormikErrorMessage name="password">
                  {(msg) => (
                    <Alert
                      variant="destructive"
                      className="border-0 px-1 py-0 text-xs"
                    >
                      <AlertTitle>{msg}</AlertTitle>
                    </Alert>
                  )}
                </FormikErrorMessage>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner className="size-4" /> : "Login"}
                </Button>
              </Field>
              <Field>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/register" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
