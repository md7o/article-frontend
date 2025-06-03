"use client";

// Work on Admin Role ===================================================

import { useState } from "react";
import { useArticles } from "@/context/ArticlesContext";
import Cards from "@/components/pages/ArticleCards/Cards";
import Link from "next/link";
import { getImageUrl } from "@/lib/uploadImage";

export default function ArticlesPage() {
  const { articles, loading, error, deleteArticle, updateArticle } =
    useArticles();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  if (loading) return <p>Loading articles…</p>;
  if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 w-full 3xl:px-50 xl:px-20 px-5">
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
                  description={article.content}
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
