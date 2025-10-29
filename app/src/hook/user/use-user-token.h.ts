import { useSuspenseQuery } from "@tanstack/react-query";
import useUserStore from "./use-user-store.h";
import { gTokenQuery } from "../../data/query/user/token.query";

export const useToken = () => {
  const { sToken } = useUserStore();

  const { data, error, isLoading } = useSuspenseQuery({
    ...gTokenQuery(),
    staleTime: Infinity,
  });

  if (data?.data.token) {
    sToken(data.data.token);
  }

  return {
    data,
    error,
    isLoading,
  };
};

export const useAuth = () => {
  const { isLoading, error } = useToken();

  return {
    isLoading,
    error,
  };
};
