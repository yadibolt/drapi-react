import type { QueryClient } from "@tanstack/react-query";
import type { LoaderFunction } from "react-router-dom";
import { gUserQuery } from "./user.query";

export const userLoader = (client: QueryClient): LoaderFunction => {
  return async () => {
    const query = gUserQuery();

    return (
      client.getQueryData(query.queryKey) || (await client.fetchQuery(query))
    );
  };
};
