import { useQuery } from "@tanstack/react-query";
import useUserStore from "./use-user-store.h";
import { gTokenQuery } from "../../data/query/user/token.query";
import { useEffect } from "react";

export const useToken = () => {
  const { gToken, sToken } = useUserStore();

  const query = useQuery({
    ...gTokenQuery(),
    enabled: !gToken(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (query.data?.data.token) {
      sToken(query.data.data.token);
    }
  }, [query.data, sToken]);

  return query;
};

export const useAuth = () => {
  const { isLoading, error } = useToken();

  console.log("useAuth", { isLoading, error });

  return {
    isLoading,
    error,
  };
};
