import React from "react";
import { Skeleton } from "@/components/ui/shadcn/skeleton";
import LoadingSpinner from "./LoadingSpinner";

interface ArticlesSkeletonProps {
  count?: number;
  showSearchField?: boolean;
}

const ArticlesSkeleton: React.FC<ArticlesSkeletonProps> = ({
  count = 6,
  showSearchField = true,
}) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      {/* Search Field Skeleton */}
      {showSearchField && (
        <div className="mb-8">
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      )}

      {/* Loading Spinner */}
      <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-xs flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </div>

      {/* Articles Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(count)].map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

const ArticleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-surface-alt rounded-sm overflow-hidden">
      {/* Image Skeleton */}
      <div className="m-5">
        <Skeleton className="aspect-video w-full rounded-sm" />
      </div>

      {/* Content Skeleton */}
      <div className="pb-5 px-5 space-y-3">
        {/* Author */}
        <Skeleton className="h-4 w-24" />

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Date */}
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
};

export { ArticlesSkeleton, ArticleCardSkeleton };
