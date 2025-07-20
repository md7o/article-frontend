"use client";

import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { homeGrids, type IGridItem } from "@/lib/HomeGrids";
import GridItem from "@/components/pages/HomeComponents/GridItem";
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
  const [, setIsLoading] = useState(false);

  // Reset loading state when component unmounts
  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <PageLoadingContext.Provider
      value={{
        isLoading: false,
        setIsLoading: () => {},
        handleGridItemClick: () => {},
      }}
    >
      {children}
      {/* Removed global loading overlay */}
    </PageLoadingContext.Provider>
  );
}

export default function HomeClient() {
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
  emailCopied,
  setEmailCopied,
  blogsItem,
  aboutItem,
  liveProjectsItem,
  contactItem,
  educationExperienceItem,
}: {
  emailCopied: boolean;
  setEmailCopied: (value: boolean) => void;
  blogsItem: IGridItem;
  aboutItem: IGridItem;
  liveProjectsItem: IGridItem;
  contactItem: IGridItem;
  educationExperienceItem: IGridItem;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <section className="w-full max-w-7xl">
        {/* Quick Links Grid Section */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-2">
            {/* Simple header */}
            <HomeHeader
              emailCopied={emailCopied}
              setEmailCopied={setEmailCopied}
            />
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
