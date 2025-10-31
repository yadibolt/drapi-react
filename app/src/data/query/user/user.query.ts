import { userRepo } from "./user.repo";

export const USER_QUERY_KEY = ["user"];

export const getUserQuery = () => ({
  queryKey: [USER_QUERY_KEY],
  queryFn: () => userRepo.get(),
});
