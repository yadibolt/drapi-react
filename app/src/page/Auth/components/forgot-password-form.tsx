import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import * as Yup from "yup";
import { Link, useRevalidator } from "react-router-dom";
import type { TResetPasswordValues } from "@/@types/form/auth-values.t";
import {
  Formik,
  Form as FormikForm,
  Field as FormikField,
  ErrorMessage as FormikErrorMessage,
  type FormikHelpers,
} from "formik";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { BadgeCheckIcon, Droplet } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import type { IApiResponseUserPasswordReset } from "@/@intf/user/user-auth.i";
import { toast } from "sonner";
import { useResetPasswordQueryMutation } from "@/data/query/user/user-auth.query";
import { useState } from "react";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item";
import type { AxiosError } from "axios";

const schema = Yup.object({
  email: Yup.string().email().required("Email is required"),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const initialValues: TResetPasswordValues = { email: "" };

  const revalidator = useRevalidator();
  const resetPasswordMut = useResetPasswordQueryMutation();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (
    values: TResetPasswordValues,
    { setSubmitting, resetForm }: FormikHelpers<TResetPasswordValues>,
  ) => {
    setSubmitting(true);
    toast.promise<{ email: string }>(
      () =>
        new Promise((resolve, reject) => {
          resetPasswordMut
            .mutateAsync(values)
            .then((result) => {
              const { message, error } =
                result as IApiResponseUserPasswordReset;

              if (error) {
                reject(message);
                return;
              }

              resolve({
                email: values.email,
              });
              setFormSubmitted(true);
              resetForm();

              revalidator.revalidate();
            })
            .catch((error: AxiosError) => {
              const data = error.response?.data;
              if (data) {
                reject((data as IApiResponseUserPasswordReset).message || null);
              } else {
                reject(error);
              }
            })
            .finally(() => {
              setSubmitting(false);
            });
        }),
      {
        loading: "Sending reset link...",
        success: (data) => `Reset link sent to ${data.email}!`,
        error: "Could not send reset link. Please try again.",
      },
    );
  };

  const handleTryAgain = () => {
    setFormSubmitted(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormikForm className={cn("flex flex-col gap-6", className)} {...props}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-2 text-center">
              <Link to="/login">
                <div className="flex size-8 items-center justify-center rounded-md">
                  <Droplet className="size-6" />
                  <span className="sr-only">DrapiReact</span>
                </div>
              </Link>
              <h1 className="text-xl font-bold">Reset your password</h1>
              <FieldDescription>
                Changed your mind? Go back <Link to="/login">to login</Link>
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
                  <Button
                    type="submit"
                    disabled={isSubmitting || formSubmitted}
                  >
                    {isSubmitting ? (
                      <Spinner className="size-4" />
                    ) : (
                      "Send Reset Link"
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
                      Password reset link sent.
                    </ItemTitle>
                  </ItemContent>
                </Item>
                <FieldSeparator>Or</FieldSeparator>
                <FieldDescription className="text-center">
                  Problems?{" "}
                  <Link to="" onClick={handleTryAgain}>
                    Try again
                  </Link>
                </FieldDescription>
              </>
            )}
          </FieldGroup>
        </FormikForm>
      )}
    </Formik>
  );
}
