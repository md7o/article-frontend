import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ idAndSlug: string }>;
};

export default async function ArticleDetailPage({ params }: Props) {
  const hello = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${hello.idAndSlug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const article = await res.json();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        Published on {new Date(article.createdAt).toLocaleDateString()}
      </p>
      <img
        src={article.imageUrl || "/assets/images/bg.jpg"}
        alt={article.title}
        className="w-full h-auto rounded mb-6"
      />
      <div className="prose prose-lg">{article.content}</div>
    </div>
  );
}
