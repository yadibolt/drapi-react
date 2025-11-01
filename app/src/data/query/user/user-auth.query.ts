import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userAuthRepo } from "./user.repo";
import { USER_QUERY_KEY } from "./user.query";

export const USER_LOGIN_QUERY_KEY = ["login"];
export const USER_LOGOUT_QUERY_KEY = ["logout"];
export const USER_RESET_PASSWORD_QUERY_KEY = ["reset-password"];
export const USER_RESET_PASSWORD_CONFIRM_QUERY_KEY = ["reset-password-confirm"];

export const useLoginQueryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAuthRepo.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_LOGIN_QUERY_KEY],
      });
    },
  });
};

export const useLogoutQueryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAuthRepo.logout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          USER_LOGOUT_QUERY_KEY,
          USER_LOGIN_QUERY_KEY,
          USER_QUERY_KEY,
          USER_RESET_PASSWORD_QUERY_KEY,
          USER_RESET_PASSWORD_CONFIRM_QUERY_KEY,
        ],
      });
    },
  });
};

export const useResetPasswordQueryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAuthRepo.resetPassword,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_LOGIN_QUERY_KEY],
      });
    },
  });
};

export const useResetPasswordConfirmMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userAuthRepo.resetPasswordConfirm,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          USER_LOGOUT_QUERY_KEY,
          USER_LOGIN_QUERY_KEY,
          USER_QUERY_KEY,
          USER_RESET_PASSWORD_QUERY_KEY,
          USER_RESET_PASSWORD_CONFIRM_QUERY_KEY,
        ],
      });
    },
  });
};
