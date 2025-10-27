import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router-dom";
import { gTokenQuery } from "./token.query";

export const tokenLoader = (client: QueryClient): LoaderFunction => {
  return async () => {
    const query = gTokenQuery();

    return (
      client.getQueryData(query.queryKey) || (await client.fetchQuery(query))
    );
  };
};
