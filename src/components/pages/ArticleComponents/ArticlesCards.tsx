"use client";

import { useState, useContext, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useArticles } from "@/context/ArticlesContext";
import { AuthContext } from "@/context/AuthContext";
import { useSearch } from "@/hooks/useSearch";
import Cards from "@/components/pages/ArticleComponents/Cards";
import SearchField from "@/components/ui/custom/SearchField";
import LoadingSpinner from "@/components/ui/custom/LoadingSpinner";
import { getImageUrl } from "@/api/uploadImage";

type ArticleContent = {
  content?: { content?: { text?: string }[] }[];
};

type Article = {
  id: string;
  slug: string;
  title: string;
  content?: string | ArticleContent;
  coverImage?: string;
  createdAt: string;
};

export default function ArticlesCards() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const { loading, error, deleteArticle, updateArticle } = useArticles() as {
    loading: boolean;
    error: string | null;
    deleteArticle: (id: string) => void;
    updateArticle: (id: string, data: Partial<Article>) => Promise<void>;
  };

  // Use the search hook
  const {
    searchQuery,
    setSearchQuery,
    filteredArticles,
    isSearching,
    clearSearch,
    hasSearchQuery,
    resultsCount,
  } = useSearch();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [navigatingToSlug, setNavigatingToSlug] = useState<string | null>(null);

  // Handle article navigation with loading
  const handleArticleNavigation = (slug: string) => {
    setNavigatingToSlug(slug);

    // Add a small delay to ensure the spinner is visible
    setTimeout(() => {
      router.push(`/articles/${slug}`);
    }, 150);
  };

  // Auto-focus search field when coming from home page search button
  useEffect(() => {
    const shouldFocus = searchParams.get("focus");
    if (shouldFocus === "search" && searchFieldRef.current) {
      // Small delay to ensure the component is fully rendered
      setTimeout(() => {
        searchFieldRef.current?.focus();
      }, 100);
    }
  }, [searchParams]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8 relative">
      {/* Navigation Loading Overlay */}
      {navigatingToSlug && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <LoadingSpinner size="lg" />
            <p className="text-2xl text-white font-medium">
              Loading article...
            </p>
          </div>
        </div>
      )}

      {/* Search Field */}
      <div className="mb-8">
        <SearchField
          ref={searchFieldRef}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={clearSearch}
          isSearching={isSearching}
          placeholder="Search articles by title or content..."
          resultsCount={resultsCount}
          hasSearchQuery={hasSearchQuery}
        />
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 && !hasSearchQuery ? (
        <p className="text-gray-500 text-center">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => {
            const isEditing = editingId === article.id;

            return (
              <div key={article.id} className="relative">
                {isEditing ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <input
                      className="w-full p-2 border rounded mb-2"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded mr-2"
                      onClick={async () => {
                        await updateArticle(article.id, { title: newTitle });
                        setEditingId(null);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="px-3 py-1 bg-gray-400 text-white rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <Cards
                    imageUrl={
                      article.coverImage
                        ? getImageUrl(article.coverImage)
                        : "/assets/images/bg.jpg"
                    }
                    title={article.title}
                    description={
                      typeof article.content === "string"
                        ? article.content
                        : (article.content as ArticleContent)?.content?.[0]
                            ?.content?.[0]?.text || "No content"
                    }
                    date={new Date(article.createdAt).toLocaleDateString()}
                    onEdit={
                      user
                        ? () => {
                            // Navigate to write page with article ID for editing
                            router.push(`/write?edit=${article.id}`);
                          }
                        : undefined
                    }
                    onDelete={
                      user ? () => deleteArticle(article.id) : undefined
                    }
                    showActions={!!user}
                    articleSlug={article.slug}
                    onArticleClick={() => handleArticleNavigation(article.slug)}
                    isNavigating={navigatingToSlug === article.slug}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
