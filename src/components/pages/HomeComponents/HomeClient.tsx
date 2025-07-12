"use client";

import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { homeGrids } from "@/lib/HomeGrids";
import GridItem from "@/components/pages/HomeComponents/GridItem";
import LoadingSpinner from "@/components/ui/custom/LoadingSpinner";
import { Search, Mail, Github, Linkedin, MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip";
import HomeHeader from "@/components/layout/HomeHeader";

// Create a context for page loading state
interface PageLoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleGridItemClick: (link: string) => void;
}

const PageLoadingContext = createContext<PageLoadingContextType | undefined>(
  undefined
);

export const usePageLoading = () => {
  const context = useContext(PageLoadingContext);
  if (!context) {
    throw new Error("usePageLoading must be used within PageLoadingProvider");
  }
  return context;
};

interface PageLoadingProviderProps {
  children: ReactNode;
}

export function PageLoadingProvider({ children }: PageLoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

  const handleGridItemClick = (link: string) => {
    setIsLoading(true);

    // Add a minimum delay to ensure the spinner is visible
    const minLoadingTime = 800; // 800ms minimum loading time
    const startTime = Date.now();

    // Navigate using Next.js router
    setTimeout(() => {
      navigate.push(link);

      // Ensure minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);

      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    }, 100); // Small delay to ensure spinner shows
  };

  // Reset loading state when component unmounts
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <PageLoadingContext.Provider
      value={{ isLoading, setIsLoading, handleGridItemClick }}
    >
      {children}
      {/* Full page loading overlay with better visibility */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center animate-in fade-in duration-200">
          <div className="flex flex-col items-center gap-8 ">
            <div className="relative">
              <LoadingSpinner size="lg" />
            </div>
            <p className="text-3xl text-white font-semibold tracking-wide animate-pulse">
              Loading...
            </p>
          </div>
        </div>
      )}
    </PageLoadingContext.Provider>
  );
}

export default function HomeClient() {
  const router = useRouter();
  const [emailCopied, setEmailCopied] = useState(false);

  // Get individual items
  const blogsItem = homeGrids.find((item) => item.id === "blogs");
  const aboutItem = homeGrids.find((item) => item.id === "about");
  const liveProjectsItem = homeGrids.find(
    (item) => item.id === "live-projects"
  );
  const contactItem = homeGrids.find((item) => item.id === "contact");
  const educationExperienceItem = homeGrids.find(
    (item) => item.id === "Education-Experience"
  );

  if (
    !blogsItem ||
    !aboutItem ||
    !liveProjectsItem ||
    !contactItem ||
    !educationExperienceItem
  ) {
    return <div>Error: Missing grid items</div>;
  }

  return (
    <PageLoadingProvider>
      <HomeClientContent
        router={router}
        emailCopied={emailCopied}
        setEmailCopied={setEmailCopied}
        blogsItem={blogsItem}
        aboutItem={aboutItem}
        liveProjectsItem={liveProjectsItem}
        contactItem={contactItem}
        educationExperienceItem={educationExperienceItem}
      />
    </PageLoadingProvider>
  );
}

function HomeClientContent({
  router,
  emailCopied,
  setEmailCopied,
  blogsItem,
  aboutItem,
  liveProjectsItem,
  contactItem,
  educationExperienceItem,
}: {
  router: any;
  emailCopied: boolean;
  setEmailCopied: (value: boolean) => void;
  blogsItem: any;
  aboutItem: any;
  liveProjectsItem: any;
  contactItem: any;
  educationExperienceItem: any;
}) {
  const { handleGridItemClick } = usePageLoading();

  const handleSearchClick = () => {
    handleGridItemClick("/articles?focus=search");
  };

  const handleEmailClick = () => {
    const email = "md7ohe@gmail.com"; // Replace with your actual email
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setEmailCopied(true);
        // Hide tooltip after 2 seconds
        setTimeout(() => {
          setEmailCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  const handleGithubClick = () => {
    window.open("https://github.com/md7o", "_blank"); // Replace with your GitHub URL
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/mohammed-alheraki-6bb97b247/",
      "_blank"
    ); // Replace with your LinkedIn URL
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <section className="w-full max-w-7xl">
        {/* Quick Links Grid Section */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-2">
            {/* Simple header */}
            <HomeHeader emailCopied={emailCopied} setEmailCopied={setEmailCopied} />
            {/* First Row: Blogs and Live Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              <div className="lg:col-span-2">
                <GridItem item={blogsItem} />
              </div>
              <div className="lg:col-span-1 space-y-2">
                <GridItem item={liveProjectsItem} />
                <GridItem item={educationExperienceItem} />
              </div>
            </div>

            {/* Second Row: About and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="lg:col-span-1">
                <GridItem item={contactItem} />
              </div>
              <div className="lg:col-span-2">
                <GridItem item={aboutItem} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
