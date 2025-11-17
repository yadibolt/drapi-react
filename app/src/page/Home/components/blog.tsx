import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import type { IApiResponseBlogTeasersData } from "@/@intf/content/blog-teasers.i";

const Blog = ({ blogData }: { blogData: IApiResponseBlogTeasersData }) => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
          <p className="text-primary text-sm font-medium uppercase">
            Blog list
          </p>
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
            Plan your upcoming journey.
          </h2>
          <p className="text-muted-foreground text-xl">
            Explore new destinations, indulge in local cuisines, and immerse
            yourself in diverse cultures.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogData.posts.map((item, index) => (
            <Card
              className="pt-0 shadow-none max-lg:last:col-span-full"
              key={index}
            >
              <CardContent className="px-0">
                <img
                  src={item.field_image.url}
                  alt={item.field_image.alt}
                  className="aspect-video h-60 w-full rounded-t-xl object-cover"
                />
              </CardContent>
              <CardHeader className="mb-2 gap-3">
                <CardTitle className="text-xl">
                  <a href={item.path.alias ?? `/node/${item.nid}`}>
                    {item.title}
                  </a>
                </CardTitle>
                <CardDescription className="text-base">
                  {item.field_description.value}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="group rounded-lg text-base shadow-sm has-[>svg]:px-6"
                  size="lg"
                  asChild
                >
                  <a href={item.path.alias ?? `/node/${item.nid}`}>
                    Read More
                    <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
