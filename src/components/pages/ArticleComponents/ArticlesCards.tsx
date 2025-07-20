"use client";

import { useState, useContext, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useArticles } from "@/context/ArticlesContext";
import { AuthContext } from "@/context/AuthContext";
import { useSearch } from "@/hooks/useSearch";
import Cards from "@/components/pages/ArticleComponents/Cards";
import SearchField from "@/components/ui/custom/SearchField";
import { ArticlesSkeleton } from "@/components/ui/custom/ArticlesSkeleton";
import { getImageUrl } from "@/api/uploadImage";
import LoadingSpinner from "@/components/ui/custom/LoadingSpinner";
import type { Article } from "@/context/ArticlesContext";

export default function ArticlesCards() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const { loading, error, deleteArticle, updateArticle } = useArticles() as {
    loading: boolean;
    error: string | null;
    deleteArticle: (id: string) => void;
    updateArticle: (id: string, data: Partial<Article>) => Promise<void>;
  };

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
  const [cachedArticles, setCachedArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!loading && filteredArticles.length > 0) {
      setCachedArticles(filteredArticles);
    }
  }, [loading, filteredArticles]);

  const articlesToShow = useMemo(
    () => (filteredArticles.length > 0 ? filteredArticles : cachedArticles),
    [filteredArticles, cachedArticles]
  );

  const getArticleDescription = (content: Article["content"]) => {
    if (typeof content === "string") return content;
    if (
      content &&
      typeof content === "object" &&
      "content" in content &&
      Array.isArray((content as any).content)
    ) {
      const first = (content as any).content?.[0]?.content?.[0]?.text;
      return first || "No content";
    }
    return "No content";
  };

  const handleArticleNavigation = (slug: string) => {
    setNavigatingToSlug(slug);
    setTimeout(() => {
      router.push(`/articles/${slug}`);
    }, 150);
  };

  if (loading && cachedArticles.length === 0) return <ArticlesSkeleton />;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8 relative">
      {/* Navigation Loading Overlay */}
      {navigatingToSlug && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-md">
          <div className="flex flex-col justify-center items-center h-full gap-4">
            <LoadingSpinner size="lg" />
            <p className="text-2xl text-white font-medium">Preparing...</p>
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
      {articlesToShow.length === 0 && !hasSearchQuery ? (
        <p className="text-gray-500 text-center">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articlesToShow.map((article) => {
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
                        : "/assets/images/NoImage.png"
                    }
                    title={article.title}
                    description={getArticleDescription(article.content)}
                    date={new Date(article.createdAt).toLocaleDateString()}
                    onEdit={
                      user
                        ? () => router.push(`/write?edit=${article.id}`)
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
