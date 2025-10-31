import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router-dom";
import { getUserQuery } from "./user.query";

export const userLoader = (client: QueryClient): LoaderFunction => {
  return async () => {
    const query = getUserQuery();

    return (
      client.getQueryData(query.queryKey) || (await client.fetchQuery(query))
    );
  };
};
