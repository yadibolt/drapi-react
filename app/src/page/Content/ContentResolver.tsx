import AppLoader from "@/components/app/app-loader";
import App40x50xPage from "../Error/App40x50xPage";
import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getContentQuery } from "@/data/query/content/content.query";
import ContentSimplePage from "./ContentSimplePage";

export default function ContentResolver() {
  const { pathname, search } = useLocation();
  const { data, error, isLoading, isPending } = useQuery({
    ...getContentQuery({ destination: pathname + search }),
    queryKey: ["content", "content-resolver", pathname + search],
  });

  if (isLoading || isPending) {
    return <AppLoader />;
  }

  if (error) {
    return <App40x50xPage />;
  }

  switch (data?.data.content_type) {
    case "simple_page":
      return <ContentSimplePage content={data.data.fields} />;
    default:
      return <Navigate to={"/404"} replace />;
  }
}
