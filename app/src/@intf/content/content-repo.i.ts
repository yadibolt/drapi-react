import type { TContentValues } from "@/@types/content/content-values.t";
import type { IApiResponseContent } from "./content.i";

export interface IContentRepo {
  get: (data: TContentValues) => Promise<IApiResponseContent>;
}
