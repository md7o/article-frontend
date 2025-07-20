// src/context/ArticlesContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: unknown;
  createdAt: string;
  coverImage?: string; // The filename of the uploaded image
}

interface ArticlesContextValue {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchArticles: () => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  updateArticle: (
    id: string,
    data: Partial<Pick<Article, "title">>
  ) => Promise<void>;
  refreshArticles: () => Promise<void>;
}

const ArticlesContext = createContext<ArticlesContextValue | undefined>(
  undefined
);

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = `${process.env.NEXT_PUBLIC_API_URL || "https://article-backend.fly.dev"}/articles`;

  // GET
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setArticles(data);
      setError(null);
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  // DELETE
  const deleteArticle = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // PATCH (update title)
  const updateArticle = async (
    id: string,
    data: Partial<Pick<Article, "title">>
  ) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // Include cookies for authentication
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
    } catch (err: unknown) {
      console.error(err);
      setError(err instanceof Error ? err.message : String(err));
    }
  };

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);
  const refreshArticles = async () => {
    await fetchArticles();
  };

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        error,
        fetchArticles,
        deleteArticle,
        updateArticle,
        refreshArticles,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const ctx = useContext(ArticlesContext);
  if (!ctx) throw new Error("useArticles must be used within ArticlesProvider");
  return ctx;
}
