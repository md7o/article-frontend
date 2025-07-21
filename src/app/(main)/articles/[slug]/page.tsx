// ======================= Imports =======================
import { notFound } from "next/navigation";
import CodeBlock from "@/components/ui/custom/CodeBlock";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/api/uploadImage";
import type { Metadata } from "next";
import React from "react";
import { TextMark, TipTapContent, Article } from "@/lib/ReadInterfaces";

// ======================= Constants =======================
const LANGUAGES = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "CSS", value: "css" },
  { label: "HTML", value: "html" },
];
const HeadingComponents: { [key: string]: string } = {
  "1": "h2",
  "2": "h3",
};

// ======================= Helper Functions =======================
const getTextAlignClass = (align?: string) =>
  align === "RIGHT_ALIGN" || align === "right"
    ? "text-right"
    : align === "center"
      ? "text-center"
      : "text-left";
const getMarkClasses = (marks?: TextMark[]) =>
  [
    marks?.some((m) => m.type === "bold") && "font-bold",
    marks?.some((m) => m.type === "italic") && "italic",
    marks?.some((m) => m.type === "highlight") &&
      "bg-yellow-200 text-black rounded-sm px-1 font-medium",
  ]
    .filter(Boolean)
    .join(" ");

// ======================= Main Component =======================
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ----------- Data Fetching -----------
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return notFound();
  const article: Article = await res.json();
  const content: TipTapContent =
    typeof article.content === "string"
      ? JSON.parse(article.content)
      : article.content;

  // ----------- Render -----------
  // Count total words in content blocks
  const totalWords =
    content?.content?.reduce((acc, block) => {
      if (
        block.type === "paragraph" ||
        block.type === "heading" ||
        block.type === "codeBlock"
      ) {
        return (
          acc +
          (block.content?.reduce(
            (a, tb) => a + (tb.text ? tb.text.split(/\s+/).length : 0),
            0
          ) || 0)
        );
      }
      if (block.type === "bulletList" || block.type === "orderedList") {
        return (
          acc +
          (block.content?.reduce(
            (a, item) => a + (item.text ? item.text.split(/\s+/).length : 0),
            0
          ) || 0)
        );
      }
      return acc;
    }, 0) ?? 0;
  const contentFontSize = totalWords < 150 ? "text-3xl" : "text-xl";

  return (
    <article className="p-2 max-w-4xl mx-auto text-white">
      {/* Article Title */}
      <h1
        className={`text-4xl md:text-7xl font-bold mb-5 text-white ${getTextAlignClass(
          article.titleAlign
        )}`}
      >
        {article.title}
      </h1>

      {/* Author Info */}
      <Link href="/about">
        <div
          className={`flex items-center gap-2 mb-32 hover:translate-y-1 transition-transform duration-300 ${getTextAlignClass(
            article.titleAlign
          )}`}
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
            <Image
              src="/assets/images/profile.jpg"
              alt="avatar"
              width={300}
              height={300}
              priority
              className="object-cover rounded-full border-2 border-accent/30"
            />
          </div>
          <div
            className={`flex flex-col ${getTextAlignClass(article.titleAlign)}`}
          >
            <span className="text-white font-medium">Mohammed Alheraki</span>
            <span className="text-gray-400 text-sm">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>

      {/* Cover Image */}
      <div className="relative w-full h-[32rem] mt-20 rounded-sm overflow-hidden">
        <Image
          src={
            article.coverImage
              ? getImageUrl(article.coverImage)
              : "/assets/images/NoImage.png"
          }
          alt={article.coverImage}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>

      {/* Article Content Blocks */}
      <div className={`space-y-4 text-white mt-10 mb-32 `}>
        {content?.content?.map((block, i) => {
          // ----------- Paragraph Block -----------
          if (block.type === "paragraph") {
            return (
              <p
                key={i}
                className={`${contentFontSize} leading-relaxed text-white whitespace-pre-wrap ${getTextAlignClass(
                  block.attrs?.textAlign
                )}`}
              >
                {block.content?.map((textBlock, j) => {
                  const hasMarks = textBlock.marks?.length;
                  return hasMarks ? (
                    <span key={j} className={getMarkClasses(textBlock.marks)}>
                      {textBlock.text}
                    </span>
                  ) : (
                    textBlock.text
                  );
                })}
              </p>
            );
          }
          // ----------- Heading Block -----------
          if (block.type === "heading") {
            const level = Math.min(Math.max(block.attrs?.level || 1, 1), 2);
            const HeadingTag = HeadingComponents[level.toString()] || "h2";
            const headingStyle =
              level === 1
                ? "text-3xl font-bold text-white"
                : "text-2xl font-semibold text-white";
            return React.createElement(
              HeadingTag,
              {
                key: i,
                className: `${headingStyle} ${getTextAlignClass(
                  block.attrs?.textAlign
                )}`,
              },
              block.content?.[0]?.text || ""
            );
          }
          // ----------- Code Block -----------
          if (block.type === "codeBlock") {
            const language = block.attrs?.language || "";
            const languageLabel = language
              ? LANGUAGES.find((l) => l.value === language)?.label || "Code"
              : "";
            return (
              <CodeBlock
                key={i}
                code={block.content?.[0]?.text || ""}
                language={language}
                languageLabel={languageLabel}
              />
            );
          }
          // ----------- List Blocks -----------
          if (block.type === "bulletList" || block.type === "orderedList") {
            const ListTag = block.type === "bulletList" ? "ul" : "ol";
            return (
              <ListTag
                key={i}
                className={`list-none pl-8 space-y-2 text-base leading-relaxed text-white ${getTextAlignClass(
                  block.attrs?.textAlign
                )}`}
              >
                {block.content?.map((item, j) => (
                  <li key={j} className="relative pl-2 text-white">
                    <span
                      className={`absolute ${
                        block.type === "bulletList" ? "-left-4" : "-left-6"
                      } top-0 text-white`}
                    >
                      {block.type === "bulletList" ? "•" : `${j + 1}.`}
                    </span>
                    {item.text}
                  </li>
                ))}
              </ListTag>
            );
          }
          // ----------- Unknown Block -----------
          return null;
        })}
      </div>
    </article>
  );
}

// ======================= Metadata Function =======================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return { title: "Article Not Found" };
  const article: Article = await res.json();
  return { title: article.title };
}
