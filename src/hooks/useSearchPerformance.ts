"use client";

import { useMemo } from "react";

// Search performance utilities
export function useSearchPerformance() {
  // Memoized search term processing
  const processSearchTerms = useMemo(() => {
    return (query: string) => {
      if (!query.trim()) return [];

      // Split query into terms and clean them
      const terms = query
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter((term) => term.length > 0)
        .map((term) => term.replace(/[^\w\s]/g, "")); // Remove special chars

      return [...new Set(terms)]; // Remove duplicates
    };
  }, []);

  // Scoring algorithm for search relevance
  const calculateRelevanceScore = (article: any, searchTerms: string[]) => {
    if (searchTerms.length === 0) return 0;

    let score = 0;
    const title = article.title?.toLowerCase() || "";
    const content =
      typeof article.content === "string"
        ? article.content.toLowerCase()
        : JSON.stringify(article.content || {}).toLowerCase();

    searchTerms.forEach((term) => {
      // Title matches are worth more
      if (title.includes(term)) {
        score +=
          title === term
            ? 100 // Exact title match
            : title.startsWith(term)
              ? 50 // Title starts with term
              : 20; // Title contains term
      }

      // Content matches
      if (content.includes(term)) {
        const contentLength = content.length;
        const termLength = term.length;
        const density =
          (content.match(new RegExp(term, "g")) || []).length / contentLength;
        score += Math.min(density * 1000, 10); // Cap content score
      }

      // Boost for multiple term matches
      const allTermsInTitle = searchTerms.every((t) => title.includes(t));
      const allTermsInContent = searchTerms.every((t) => content.includes(t));

      if (allTermsInTitle) score += 30;
      if (allTermsInContent) score += 10;
    });

    return score;
  };

  // Advanced search with fuzzy matching
  const fuzzySearch = (articles: any[], query: string, threshold = 0.6) => {
    const searchTerms = processSearchTerms(query);

    if (searchTerms.length === 0) return articles;

    const results = articles
      .map((article) => ({
        ...article,
        _searchScore: calculateRelevanceScore(article, searchTerms),
      }))
      .filter((article) => article._searchScore > 0);

    // Sort by relevance score
    return results.sort((a, b) => b._searchScore - a._searchScore);
  };

  // Search highlighting with context
  const getSearchContext = (
    text: string,
    searchTerms: string[],
    contextLength = 150
  ) => {
    if (searchTerms.length === 0) return text.slice(0, contextLength);

    const lowerText = text.toLowerCase();
    let bestMatch = { index: -1, term: "" };

    // Find the first occurrence of any search term
    searchTerms.forEach((term) => {
      const index = lowerText.indexOf(term.toLowerCase());
      if (index !== -1 && (bestMatch.index === -1 || index < bestMatch.index)) {
        bestMatch = { index, term };
      }
    });

    if (bestMatch.index === -1) return text.slice(0, contextLength);

    // Extract context around the match
    const start = Math.max(0, bestMatch.index - contextLength / 2);
    const end = Math.min(text.length, bestMatch.index + contextLength / 2);

    let context = text.slice(start, end);
    if (start > 0) context = "..." + context;
    if (end < text.length) context = context + "...";

    return context;
  };

  return {
    processSearchTerms,
    calculateRelevanceScore,
    fuzzySearch,
    getSearchContext,
  };
}

// Search performance monitoring
export function useSearchMetrics() {
  const trackSearchPerformance = (
    searchQuery: string,
    resultsCount: number,
    searchTime: number,
    totalArticles: number
  ) => {
    const metrics = {
      query: searchQuery,
      resultsCount,
      searchTime,
      totalArticles,
      efficiency: resultsCount / totalArticles,
      timestamp: Date.now(),
    };

    // Log performance metrics for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("Search Performance:", metrics);
    }

    return metrics;
  };

  const getSearchSuggestions = (query: string, allArticles: any[]) => {
    if (query.length < 2) return [];

    // Extract unique words from all article titles and content
    const allWords = new Set<string>();

    allArticles.forEach((article) => {
      const title = article.title?.toLowerCase() || "";
      const content =
        typeof article.content === "string"
          ? article.content.toLowerCase()
          : "";

      title.split(/\s+/).forEach((word) => {
        if (word.length > 2) allWords.add(word);
      });

      content
        .split(/\s+/)
        .slice(0, 100)
        .forEach((word) => {
          // Limit content words
          if (word.length > 3) allWords.add(word);
        });
    });

    // Find words that start with the query
    const suggestions = Array.from(allWords)
      .filter((word) => word.startsWith(query.toLowerCase()))
      .sort()
      .slice(0, 5);

    return suggestions;
  };

  return {
    trackSearchPerformance,
    getSearchSuggestions,
  };
}
