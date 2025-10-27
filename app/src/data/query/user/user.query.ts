import { userRepo } from "./user.repo";

export const USER_QUERY_KEY = ["user"];

export const gUserQuery = () => ({
  queryKey: [USER_QUERY_KEY],
  queryFn: () => userRepo.g(),
});
