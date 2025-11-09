import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer>
      <Separator />

      <div className="mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6">
        <p className="text-center font-medium text-balance">
          {`©${new Date().getFullYear()}`} <a href="#">Shadcn/studio</a>, Made
          with ❤️ for better web.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
