import { tokenRepo } from "./token.repo";

export const TOKEN_QUERY_KEY = ["token"];

export const getTokenQuery = () => ({
  queryKey: [TOKEN_QUERY_KEY],
  queryFn: () => tokenRepo.get(),
});
