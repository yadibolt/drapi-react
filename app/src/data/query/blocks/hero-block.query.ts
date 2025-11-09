import { heroBlockRepo } from "./hero-block.repo";

export const HERO_BLOCK_QUERY_KEY = ["hero-block"];

export const getHeroBlockQuery = () => ({
  queryKey: [HERO_BLOCK_QUERY_KEY],
  queryFn: () => heroBlockRepo.get(),
});
