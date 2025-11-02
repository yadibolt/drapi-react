import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { TRegisterValues } from "@/@types/form/auth-values.t";
import { Link, useRevalidator } from "react-router-dom";
import { useRegisterQueryMutation } from "@/data/query/user/user-auth.query";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
  type FormikHelpers,
} from "formik";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import type { IApiResponseUserRegister } from "@/@intf/user/user-auth.i";
import type { AxiosError } from "axios";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import { BadgeCheckIcon } from "lucide-react";
import { useState } from "react";

const schema = Yup.object({
  username: Yup.string().min(6).max(50).required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your new password"),
});

export function RegisterForm({
  termsOfServiceUrl,
  privacyPolicyUrl,
  className,
  ...props
}: {
  termsOfServiceUrl: string;
  privacyPolicyUrl: string;
} & React.ComponentProps<"form">) {
  const initialValues: TRegisterValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const revalidator = useRevalidator();
  const registerMut = useRegisterQueryMutation();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (
    values: TRegisterValues,
    { setSubmitting, resetForm }: FormikHelpers<TRegisterValues>,
  ) => {
    setSubmitting(true);
    toast.promise<{ username: string }>(
      () =>
        new Promise((resolve, reject) => {
          registerMut
            .mutateAsync(values)
            .then((result) => {
              const { message, error } = result as IApiResponseUserRegister;

              if (error) {
                reject(message);
                return;
              }

              resolve({
                username: values.username || "{{ %username% }}",
              });
              setFormSubmitted(true);
              resetForm();

              revalidator.revalidate();
            })
            .catch((error: AxiosError) => {
              const data = error.response?.data;

              if (data) {
                reject((data as IApiResponseUserRegister).message || null);
              } else {
                reject(error);
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
      {
        loading: "Creating account...",
        success: (data) => `Welcome aboard, ${data.username}!`,
        error: "Could not create account. Please try again.",
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
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Create your account</CardTitle>
                <CardDescription>
                  Enter your email below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!formSubmitted ? (
                  <FieldGroup>
                    <Field className="gap-1">
                      <FieldLabel htmlFor="username" className="text-xs">
                        Username
                      </FieldLabel>
                      <FormikField
                        id="username"
                        name="username"
                        type="text"
                        placeholder="Username"
                        required
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                          className,
                        )}
                      />
                      <FormikErrorMessage name="username">
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
                      <FieldLabel htmlFor="email" className="text-xs">
                        Email
                      </FieldLabel>
                      <FormikField
                        id="email"
                        name="email"
                        type="email"
                        placeholder="user@example.com"
                        required
                        className={cn(
                          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                          className,
                        )}
                      />
                      <FormikErrorMessage name="email">
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
                      <Field className="grid grid-cols-2 gap-4">
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
                        <FormikField
                          id="confirmPassword"
                          name="confirmPassword"
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
                      </Field>
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
                      <FormikErrorMessage name="confirmPassword">
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
                        {isSubmitting ? (
                          <Spinner className="size-4" />
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                      <FieldDescription className="text-center text-xs">
                        Already have an account?{" "}
                        <Link
                          to="/login"
                          className="underline decoration-success"
                        >
                          log in.
                        </Link>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                ) : (
                  <>
                    <Item
                      variant="outline"
                      size="sm"
                      className="border-success-accent bg-success-accent/50"
                    >
                      <ItemMedia>
                        <BadgeCheckIcon className="size-5 text-success" />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="text-success gap-1">
                          Account created. You may now
                          <Link
                            to="/login"
                            className="underline decoration-success"
                          >
                            log in.
                          </Link>
                        </ItemTitle>
                      </ItemContent>
                    </Item>
                  </>
                )}
              </CardContent>
              <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our{" "}
                <a href={termsOfServiceUrl}>Terms of Service</a> and{" "}
                <a href={privacyPolicyUrl}>Privacy Policy</a>.
              </FieldDescription>
            </Card>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
