"use client";

// Work on Admin Role ===================================================

import { useState } from "react";
import { useArticles } from "@/context/ArticlesContext";
import Cards from "@/components/pages/ArticleComponents/Cards";
import Link from "next/link";
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
  const { articles, loading, error, deleteArticle, updateArticle } =
    useArticles() as {
      articles: Article[];
      loading: boolean;
      error: string | null;
      deleteArticle: (id: string) => void;
      updateArticle: (id: string, data: Partial<Article>) => Promise<void>;
    };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error) return <p className="text-red-600">Error: {error}</p>;

  if (!articles || articles.length === 0)
    return <p className="text-gray-500">No articles found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-2xl mx-auto px-4 py-8">
      {articles.map((article) => {
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
              <Link href={`/articles/${article.slug}`}>
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
                      : article.content?.content?.[0]?.content?.[0]?.text ||
                        "No content"
                  }
                  date={new Date(article.createdAt).toLocaleDateString()}
                  onEdit={() => {
                    setEditingId(article.id);
                    setNewTitle(article.title);
                  }}
                  onDelete={() => deleteArticle(article.id)}
                />
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
