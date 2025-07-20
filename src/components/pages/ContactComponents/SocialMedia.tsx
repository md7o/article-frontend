import { Linkedin, Mail, Phone, Github, LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

interface SocialMediaItem {
  title: string;
  icon: LucideIcon;
  description: string;
  link: string;
  linkText: string;
  iconBgColor: string;
  iconColor: string;
}

const socialMediaItems: SocialMediaItem[] = [
  {
    title: "LinkedIn",
    icon: Linkedin,
    description:
      "Connect with me professionally on LinkedIn. Let's expand our network and explore opportunities together.",
    link: "https://www.linkedin.com/in/mohammed-alheraki-6bb97b247/",
    linkText: "Connect on LinkedIn",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "GitHub",
    icon: Github,
    description:
      "Check out my open-source projects and contributions on GitHub. Let's collaborate and build something amazing together.",
    link: "https://github.com/md7o",
    linkText: "View GitHub Profile",
    iconBgColor: "bg-gray-100",
    iconColor: "text-gray-800",
  },
  {
    title: "Email",
    icon: Mail,
    description:
      "Send me an email for business inquiries, collaborations, or just to say hello. I'll get back to you promptly.",
    link: "mailto:md7ohe@gmail.com",
    linkText: "Send an Email",
    iconBgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "WhatsApp",
    icon: Phone,
    description:
      "Reach out to me directly via WhatsApp for quick conversations and real-time communication.",
    link: "https://wa.me/0551227021",
    linkText: "Chat on WhatsApp",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export default function SocialMediaPage() {
  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {socialMediaItems.map((item) => (
          <Card
            key={item.title}
            className="flex flex-col h-full"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <CardHeader className="flex flex-col items-center">
              <div className={`p-2 rounded-full ${item.iconBgColor} mb-2`}>
                <item.icon className={`h-8 w-8 ${item.iconColor}`} />
              </div>
              <CardTitle className="text-2xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-lg">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full" asChild>
                <Link href={item.link} target="_blank">
                  {item.linkText}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
