import { useState, useEffect, useMemo, useCallback } from "react";
import { useArticles } from "@/context/ArticlesContext";

export interface SearchableArticle {
  id: string;
  slug: string;
  title: string;
  content?: unknown;
  coverImage?: string;
  createdAt: string;
}

// TipTap content structure interfaces
interface TipTapTextNode {
  text?: string;
  type?: string;
}

interface TipTapContentBlock {
  type?: string;
  content?: TipTapTextNode[];
  text?: string;
}

interface TipTapContent {
  content?: TipTapContentBlock[];
}

export function useSearch() {
  const { articles } = useArticles();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter articles based on debounced search query
  const filteredArticles = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return articles;
    }

    const query = debouncedQuery.toLowerCase();

    return articles.filter((article) => {
      // Search in title (higher priority)
      if (article.title.toLowerCase().includes(query)) {
        return true;
      }

      // Search in content if it's a string
      if (
        typeof article.content === "string" &&
        article.content.toLowerCase().includes(query)
      ) {
        return true;
      }

      // Search in nested content structure
      if (article.content && typeof article.content === "object") {
        const contentText = extractTextFromContent(article.content);
        if (contentText.toLowerCase().includes(query)) {
          return true;
        }
      }

      return false;
    });
  }, [articles, debouncedQuery]);

  // Handle search loading state
  useEffect(() => {
    if (searchQuery.trim() && searchQuery !== debouncedQuery) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchQuery, debouncedQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    filteredArticles,
    isSearching,
    clearSearch,
    hasSearchQuery: searchQuery.trim().length > 0,
    resultsCount: filteredArticles.length,
    isActive: debouncedQuery.trim().length > 0,
  };
}

// Helper function to extract text from TipTap content structure
function extractTextFromContent(content: unknown): string {
  if (!content || typeof content !== "object") {
    return "";
  }

  try {
    const contentObj = content as TipTapContent;

    if (contentObj.content && Array.isArray(contentObj.content)) {
      return contentObj.content
        .map((block: TipTapContentBlock) => {
          if (block.content && Array.isArray(block.content)) {
            return block.content
              .map((item: TipTapTextNode) => item.text || "")
              .join(" ");
          }
          return block.text || "";
        })
        .join(" ");
    }

    return "";
  } catch (error) {
    console.warn("Error extracting text from content:", error);
    return "";
  }
}
