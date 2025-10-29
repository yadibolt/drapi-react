import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLoginRepo, userRepo } from "./user.repo";

export const USER_QUERY_KEY = ["user"];
export const USER_LOGIN_QUERY_KEY = ["login"];

export const gUserQuery = () => ({
  queryKey: [USER_QUERY_KEY],
  queryFn: () => userRepo.g(),
});

export const useLoginQueryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLoginRepo.login,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [USER_LOGIN_QUERY_KEY],
      });
    },
  });
};
