import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import * as Yup from "yup";
import { Link, Navigate, useRevalidator } from "react-router-dom";
import type {
  TJWTPasswordResetToken,
  TResetPasswordConfirmValues,
} from "@/@types/form/auth-values.t";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
  type FormikHelpers,
} from "formik";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { BadgeAlertIcon, BadgeCheckIcon, Droplet } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { IApiResponseUserPasswordResetConfirm } from "@/@intf/user/user-auth.i";
import { toast } from "sonner";
import { useResetPasswordConfirmMutation } from "@/data/query/user/user-auth.query";
import { useState } from "react";
import { jwt } from "@/data/util/jwt.util";
import type { AxiosError } from "axios";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";

const schema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &)",
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your new password"),
});

export function ForgotPasswordConfirmForm({
  queryToken,
  className,
  ...props
}: { queryToken: string } & React.ComponentProps<"form">) {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const revalidator = useRevalidator();
  const resetPasswordConfirmMut = useResetPasswordConfirmMutation();

  const handleSubmit = async (
    values: TResetPasswordConfirmValues,
    { setSubmitting, resetForm }: FormikHelpers<TResetPasswordConfirmValues>,
  ) => {
    setSubmitting(true);
    toast.promise<{ message: string }>(
      () =>
        new Promise((resolve, reject) => {
          resetPasswordConfirmMut
            .mutateAsync(values)
            .then((result) => {
              const { message, error } =
                result as IApiResponseUserPasswordResetConfirm;
              if (error) {
                reject(message);
                return;
              }

              resolve({ message: "" });
              setFormSubmitted(true);
              resetForm();

              revalidator.revalidate();
            })
            .catch((error: AxiosError) => {
              const data = error.response?.data;

              if (data) {
                reject(
                  (data as IApiResponseUserPasswordResetConfirm).message ||
                    null,
                );
              } else {
                reject(error);
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
      {
        loading: "Resetting password...",
        success: () => `Password reset successfully!`,
        error: (message) =>
          `${message}` || "Could not reset password. Please try again.",
      },
    );
  };

  const resetPasswordToken = jwt.decode<TJWTPasswordResetToken>(queryToken);
  if (!resetPasswordToken) {
    return <Navigate to="/" replace />;
  }

  if (resetPasswordToken.exp < new Date().getTime() / 1000) {
    return (
      <div className={cn("flex flex-col gap-6", className)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link to="/login">
              <div className="flex size-8 items-center justify-center rounded-md">
                <Droplet className="size-6" />
                <span className="sr-only">DrapiReact</span>
              </div>
            </Link>
            <h1 className="text-xl font-bold">Change your password</h1>
          </div>
          <Item
            variant="outline"
            size="sm"
            className="border-destructive bg-destructive/5"
          >
            <ItemMedia>
              <BadgeAlertIcon className="size-5 text-destructive" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle className="text-destructive">
                This link has already expired.
              </ItemTitle>
            </ItemContent>
          </Item>
          <FieldDescription className="text-center">
            <Link to="/">Go back home</Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    );
  }

  // TODO: set langcode from token

  const initialValues: TResetPasswordConfirmValues = {
    email: resetPasswordToken.data.mail,
    newPassword: "",
    confirmNewPassword: "",
    token: queryToken,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <FormikForm className={cn("flex flex-col gap-6", className)} {...props}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <Link to="/login">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Droplet className="size-6" />
                  <span className="sr-only">DrapiReact</span>
                </div>
              </Link>
              <h1 className="text-xl font-bold">Change your password</h1>
              <FieldDescription>
                Enter new credentials for your account
              </FieldDescription>
            </div>
            {!formSubmitted ? (
              <>
                <Field className="gap-1">
                  <FieldLabel htmlFor="email" className="text-xs">
                    Email
                  </FieldLabel>
                  <FormikField
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    disabled={true}
                    required
                    className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                      className,
                    )}
                  />
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="newPassword" className="text-xs">
                    New Password
                  </FieldLabel>
                  <FormikField
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                      className,
                      errors.newPassword ? "border-destructive" : "",
                    )}
                  />
                  <FormikErrorMessage name="newPassword">
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
                  <FieldLabel htmlFor="confirmNewPassword" className="text-xs">
                    Confirm New Password
                  </FieldLabel>
                  <FormikField
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                    className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                      className,
                      errors.confirmNewPassword ? "border-destructive" : "",
                    )}
                  />
                  <FormikErrorMessage name="confirmNewPassword">
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
                      "Reset Password"
                    )}
                  </Button>
                </Field>
              </>
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
                    <ItemTitle className="text-success">
                      Password reset successfully.
                    </ItemTitle>
                    <ItemTitle className="text-success">
                      You may now
                      <Link to="/login" className="underline">
                        login
                      </Link>
                      with your new password.
                    </ItemTitle>
                  </ItemContent>
                </Item>
              </>
            )}
          </FieldGroup>
        </FormikForm>
      )}
    </Formik>
  );
}
