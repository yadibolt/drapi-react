import { mainMenuRepo } from "./main-menu.repo";

export const MAIN_MENU_QUERY_KEY = ["main-menu"];

export const getMainMenuQuery = () => ({
  queryKey: [MAIN_MENU_QUERY_KEY],
  queryFn: () => mainMenuRepo.get(),
});
