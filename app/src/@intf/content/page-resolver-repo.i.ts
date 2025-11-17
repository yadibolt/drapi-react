import type { TContentValues } from "@/@types/content/content-values.t";
import type { IApiResponsePage } from "./page-resolver.i";

export interface IPageResolverRepo {
  get: (data: TContentValues) => Promise<IApiResponsePage>;
}
