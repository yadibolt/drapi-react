import type { IApiResponseHeroBlock } from "./hero-block.i";

export interface IHeroBlockRepo {
  get: () => Promise<IApiResponseHeroBlock>;
}
