import { Link, Navigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogQuery } from "@/data/query/content/blog.query";
import { useQuery } from "@tanstack/react-query";
import BlogSkeleton from "./BlogSkeleton";

export default function BlogPage({
  id,
  type,
  contentType,
}: {
  id: number;
  type: string;
  contentType: string;
}) {
  const { data, error, isLoading, isPending } = useQuery({
    ...getBlogQuery({
      id: id,
      type: type,
      content_type: contentType,
    }),
  });

  if (isLoading || isPending) {
    return <BlogSkeleton />;
  }

  if (error) {
    return <Navigate to="/error" replace />;
  }

  const post = data.data.fields;
  // post.created is seconds (UNIX timestamp in seconds) — convert to a human date
  const createdDateLabel = post.created
    ? new Date(Number(post.created) * 1000).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
            {createdDateLabel && (
              <span className="inline-block">{createdDateLabel}</span>
            )}
            {post.field_tag.name && <Badge>{post.field_tag.name}</Badge>}
            <div className="text-sm text-muted-foreground">
              {post.field_read_time ? `${post.field_read_time} min read` : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" className="rounded-lg">
            <Link to="/">← All posts</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <article className="prose lg:prose-lg col-span-2 max-w-none">
          <img
            src={post.field_image.url}
            alt={post.field_image.alt}
            className="mb-6 w-full rounded-lg object-cover"
          />

          <Card className="shadow-sm">
            <CardContent>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.field_content.value }}
              />
            </CardContent>
          </Card>
        </article>

        <aside className="col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Related posts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(post.field_related_posts ?? []).slice(0, 5).map((p, idx) => (
                  <li key={idx}>
                    <a
                      className="text-sm font-medium hover:underline"
                      href={p.path?.alias ?? `/node/${p.nid}`}
                    >
                      {p.title}
                    </a>
                    <div className="text-xs text-muted-foreground">
                      {p.field_description?.value
                        ? String(p.field_description.value).slice(0, 90) + "…"
                        : ""}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}
