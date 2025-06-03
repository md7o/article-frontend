// src/context/ArticlesContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface Article {
  id: string;
  slug: string;
  title: string;
  content: any;
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
}

const ArticlesContext = createContext<ArticlesContextValue | undefined>(
  undefined
);

export function ArticlesProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "http://localhost:4000/articles";

  // GET
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const data = await res.json();
      setArticles(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const deleteArticle = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      console.error(err);
      setError(err.message);
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
      });
      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  // Initial load
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <ArticlesContext.Provider
      value={{
        articles,
        loading,
        error,
        fetchArticles,
        deleteArticle,
        updateArticle,
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
