import { Suspense } from "react";
import ArticlesCardsWithSearch from "@/components/pages/ArticleComponents/ArticlesCardsWithSearch";

export default function ArticlesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <ArticlesCardsWithSearch />
    </Suspense>
  );
}
