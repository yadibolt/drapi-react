import { Droplet, MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getMainMenuQuery } from "@/data/query/menu/main-menu.query";
import { Link, Navigate } from "react-router-dom";
import HeaderSkeleton from "../skeletons/header-skeleton";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const { data, isLoading, error } = useQuery({
    ...getMainMenuQuery(),
    staleTime: 0,
  });

  if (isLoading) {
    return <HeaderSkeleton className={className} />;
  }

  if (error || !data?.data.links) {
    return <Navigate to="/error" replace />;
  }

  return (
    <header
      className={cn("bg-background sticky top-0 z-50 h-16 border-b", className)}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <a href="#">
          <Droplet className="text-primary" size={32} />
        </a>

        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="flex-wrap justify-start gap-0">
            {data.data.links.map((navItem) => (
              <NavigationMenuItem key={navItem.title}>
                <NavigationMenuLink
                  href={navItem.link}
                  className="text-muted-foreground hover:text-primary px-3 py-1.5 text-base! font-medium hover:bg-transparent"
                >
                  {navItem.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="rounded-lg max-md:hidden" asChild>
          <Link
            to="/login"
            className="inline-flex items-center justify-center text-inherit"
          >
            Login
          </Link>
        </Button>

        <div className="flex gap-4 md:hidden">
          <Button className="rounded-lg" asChild>
            <Link
              to="/login"
              className="inline-flex items-center justify-center text-inherit"
            >
              Login
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              {data.data.links.map((item, index) => (
                <DropdownMenuItem key={index}>
                  <a href={item.link}>{item.title}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
