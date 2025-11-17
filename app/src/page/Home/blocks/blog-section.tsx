import { useQuery } from "@tanstack/react-query";
import Blog from "../components/blog";
import { getBlogBlockQuery } from "@/data/query/blocks/blog-block.query";
import BlogSkeleton from "../skeletons/blog-teasers-skeleton";
import { Navigate } from "react-router-dom";

const BlogSection = () => {
  const { data, isLoading, error } = useQuery({
    ...getBlogBlockQuery(),
  });

  if (isLoading) {
    return <BlogSkeleton />;
  }

  if (error || !data?.data.posts) {
    return <Navigate to="/error" replace />;
  }

  const posts = data.data;

  return <Blog blogData={posts} />;
};

export default BlogSection;
