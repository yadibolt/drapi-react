import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHeroBlockQuery } from "@/data/query/blocks/hero-block.query";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import HeroSectionSkeleton from "../skeletons/hero-section-skeleton";

const HeroSection = () => {
  const { data, isLoading, error } = useQuery({
    ...getHeroBlockQuery(),
  });

  if (isLoading) {
    return <HeroSectionSkeleton />;
  }

  if (error || !data?.data.fields) {
    return <Navigate to="/error" replace />;
  }

  const fields = data.data.fields;

  return (
    <section className="flex min-h-[calc(100dvh-4rem)] flex-1 flex-col justify-between gap-12 overflow-x-hidden pt-8 sm:gap-16 sm:pt-16 lg:gap-24 lg:pt-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:px-8">
        <div className="bg-muted flex items-center gap-2.5 rounded-full border px-3 py-2">
          <Badge className="rounded-full">AI-Powered</Badge>
          <span className="text-muted-foreground">
            {fields.field_catchy_badge_text.value}
          </span>
        </div>

        <h1 className="text-3xl leading-[1.29167] font-bold text-balance sm:text-4xl lg:text-5xl">
          {fields.field_heading}
        </h1>

        <p
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: fields.field_description.value }}
        ></p>

        <Button size="lg" asChild>
          <Link
            to={fields.field_cta_button.uri.replace("internal:", "")}
            className="inline-flex items-center justify-center text-inherit"
          >
            {fields.field_cta_button.title}
          </Link>
        </Button>
      </div>

      {/* Image */}
      <img
        src={fields.field_image_bottom.url}
        alt={fields.field_image_bottom.alt}
        className="min-h-67 w-full object-cover"
      />
    </section>
  );
};

export default HeroSection;
