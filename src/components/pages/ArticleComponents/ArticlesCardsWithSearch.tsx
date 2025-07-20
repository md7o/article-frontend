"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ArticlesCards from "./ArticlesCards";

function ArticlesCardsWithSearchParams() {
  const searchParams = useSearchParams();

  // Auto-focus search field when coming from home page search button
  useEffect(() => {
    const shouldFocus = searchParams.get("focus");
    if (shouldFocus === "search") {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        const searchField = document.querySelector(
          'input[type="text"]'
        ) as HTMLInputElement;
        if (searchField) {
          searchField.focus();
        }
      }, 100);
    }
  }, [searchParams]);

  return <ArticlesCards />;
}

export default ArticlesCardsWithSearchParams;
