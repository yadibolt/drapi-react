import type { ComponentType } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type ContactInfo = {
  title: string;
  icon: ComponentType;
  description: string;
}[];

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  return (
    <section id="contact-us" className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/contact-us/image-1.png"
            alt="Contact illustration"
            className="size-full rounded-md object-cover max-lg:max-h-70"
          />

          <div>
            <h3 className="mb-6 text-2xl font-semibold">Happy to help you!</h3>
            <p className="text-muted-foreground mb-10 text-lg font-medium">
              shadcn/studio gives you the blocks and components you need to
              create a truly professional website, landing page or admin panel
              for your SaaS and gives the blocks.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {contactInfo.map((info, index) => (
                <Card className="bg-muted border-none shadow-none" key={index}>
                  <CardContent className="flex flex-col items-center gap-4 text-center">
                    <Avatar className="size-9 border">
                      <AvatarFallback className="bg-transparent [&>svg]:size-5">
                        <info.icon />
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold">{info.title}</h4>
                      <div className="text-muted-foreground text-base font-medium">
                        {info.description.split("\n").map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
