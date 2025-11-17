import AppLoader from "@/components/app/app-loader";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import BlogPage from "../Blog/BlogPage";
import { getPageResolver } from "@/data/query/content/page-resolver.query";

export default function PageResolver() {
  const { pathname, search } = useLocation();
  const { data, error, isLoading, isPending } = useQuery({
    ...getPageResolver({ destination: pathname + search }),
    queryKey: ["content", "content-resolver", pathname + search],
  });

  if (isLoading || isPending) {
    return <AppLoader />;
  }

  if (error) {
    return <Navigate to="/error" replace />;
  }

  switch (data?.data.content_type) {
    case "blog_page":
      return (
        <BlogPage
          id={data?.data.id}
          type={data?.data.type}
          contentType={data?.data.content_type}
        />
      );
    default:
      return <Navigate to={"/error"} replace />;
  }
}
