import { useSuspenseQuery } from "@tanstack/react-query";
import useUserStore from "./use-user-store.h";
import { getTokenQuery } from "../../data/query/user/token.query";

export const useToken = () => {
  const { setToken } = useUserStore();

  const { data, error, isLoading } = useSuspenseQuery({
    ...getTokenQuery(),
    staleTime: Infinity,
  });

  if (data?.data.token) {
    setToken(data.data.token);
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
