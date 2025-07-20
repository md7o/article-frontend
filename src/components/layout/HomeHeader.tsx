import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  CirclePlus,
  Search,
  LogOut,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "../ui/shadcn/tooltip";
import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface HomeHeaderProps {
  emailCopied: boolean;
  setEmailCopied: (value: boolean) => void;
}

export default function HomeHeader({
  emailCopied,
  setEmailCopied,
}: HomeHeaderProps) {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const handleSearchClick = () => {
    router.push("/articles?focus=search");
  };

  const handleEmailClick = () => {
    const email = "md7ohe@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => {
          setEmailCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  const handleGithubClick = () => {
    window.open("https://github.com/md7o", "_blank");
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/mohammed-alheraki-6bb97b247/",
      "_blank"
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-2 w-full mb-1">
      {/* Name - Full width on mobile */}
      <Image
        src="/assets/images/Logo.png"
        alt="Mocodes"
        width={100}
        height={100}
        className="w-auto h-auto"
      />

      {/* Action buttons - Grid layout on mobile, flex on desktop */}
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 lg:flex gap-2 w-full lg:w-auto">
        {/* Search - Full width on mobile */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 bg-surface-elevated p-2 rounded-sm cursor-pointer hover:bg-surface-alt/80 hover:scale-105 hover:opacity-80 transition-all duration-300 flex-1 sm:col-span-2 lg:flex-none lg:w-auto"
          onClick={handleSearchClick}
          aria-label="Search articles"
        >
          <Search size={24} className="sm:w-[30px] sm:h-[30px]" />
          <p className="text-sm sm:text-base hidden sm:block">
            Search articles
          </p>
        </button>

        {/* Social icons - Smaller on mobile */}
        <TooltipProvider>
          <Tooltip open={emailCopied}>
            <TooltipTrigger asChild>
              <div
                className="flex items-center justify-center bg-surface-elevated p-2 rounded-sm cursor-pointer hover:bg-surface-alt/80 hover:scale-105 hover:opacity-80 transition-all duration-300 flex-1 lg:flex-none"
                onClick={handleEmailClick}
              >
                <Mail size={24} className="sm:w-[30px] sm:h-[30px]" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Email copied successfully!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div
          className="flex items-center justify-center bg-blue-950 p-2 rounded-sm cursor-pointer hover:bg-surface-alt/80 hover:scale-105 hover:opacity-80 transition-all duration-300 flex-1 lg:flex-none"
          onClick={handleGithubClick}
          title="Visit GitHub profile"
        >
          <Github size={24} className="sm:w-[30px] sm:h-[30px]" />
        </div>

        <div
          className="flex items-center justify-center bg-blue-500 p-2 rounded-sm cursor-pointer hover:bg-surface-alt/80 hover:scale-105 hover:opacity-80 transition-all duration-300 flex-1 lg:flex-none"
          onClick={handleLinkedInClick}
          title="Visit LinkedIn profile"
        >
          <Linkedin size={24} className="sm:w-[30px] sm:h-[30px]" />
        </div>

        {/* Location - Full width on mobile */}
        <div className="flex justify-center items-center gap-1 bg-surface-elevated p-2 rounded-sm text-sm sm:text-base lg:text-lg text-accent hover:bg-surface-alt/80 hover:opacity-80 transition-all duration-300 w-full sm:col-span-2 lg:w-auto lg:flex-none">
          <MapPin size={20} className="sm:w-6 sm:h-6" />
          <span className="whitespace-nowrap">Dammam, SA</span>
          <span className="w-2 h-2 ml-1 bg-accent animate-pulse inline-block rounded-full" />
        </div>

        {/* Write a subject button for admin only */}
        {user?.role === "Admin" && (
          <Link href="/write">
            <div className="flex justify-center items-center gap-1 bg-surface-elevated p-2 rounded-sm text-sm sm:text-base lg:text-lg text-white hover:bg-surface-alt/80 hover:opacity-80 transition-all duration-300 w-full sm:col-span-2 lg:w-auto lg:flex-none">
              <CirclePlus size={20} className="sm:w-6 sm:h-6" />
              <span className="whitespace-nowrap">Write a subject</span>
            </div>
          </Link>
        )}
        {user?.role === "Admin" && (
          <button onClick={logout}>
            <div className="flex justify-center items-center gap-1 bg-surface-elevated p-2 rounded-sm text-sm sm:text-base lg:text-lg text-red-300 hover:bg-surface-alt/80 hover:opacity-80 transition-all duration-300 w-full sm:col-span-2 lg:w-auto lg:flex-none">
              <LogOut />
              <span className="whitespace-nowrap">Logout</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
