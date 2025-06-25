import { notFound } from "next/navigation";
import { ElementType } from "react";
import CodeBlock from "@/components/ui/custom/CodeBlock";
import { typography } from "@/lib/typography";
import Image from "next/image";
import { getImageUrl } from "@/api/uploadImage";

interface MarkAttrs {
  color?: string;
  level?: number;
  language?: string;
}

interface TextMark {
  type: "bold" | "italic" | "highlight" | "code" | "link";
  attrs?: MarkAttrs;
}

interface TextBlock {
  type: string;
  text?: string;
  marks?: TextMark[];
}

interface ContentBlockAttrs {
  level?: number;
  language?: string;
  start?: number;
  color?: string;
  textAlign?: "left" | "center" | "right";
}

interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "codeBlock"
    | "bulletList"
    | "orderedList"
    | "alignLeft"
    | "alignCenter"
    | "alignRight";
  attrs?: ContentBlockAttrs;
  content?: TextBlock[];
}

interface TipTapContent {
  type: "doc";
  content?: ContentBlock[];
}

interface Article {
  title: string;
  content: string | TipTapContent;
  coverImage: string;
  createdAt: string;
}

interface Language {
  label: string;
  value: string;
}

const LANGUAGES: Language[] = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "python" },
  { label: "C++", value: "cpp" },
  { label: "CSS", value: "css" },
  { label: "HTML", value: "html" },
];

type Props = {
  params: Promise<{ idAndSlug: string }>;
};

const HeadingComponents: Record<number, ElementType> = {
  1: "h2",
  2: "h3",
};

export default async function ArticleDetailPage({ params }: Props) {
  // const [imageError, setImageError] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const resolvedParams = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${resolvedParams.idAndSlug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  const article: Article = await res.json();
  const content: TipTapContent =
    typeof article.content === "string"
      ? JSON.parse(article.content)
      : article.content;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-6xl font-medium mb-6">{article.title}</h1>
      <div className="relative w-full h-[400px] mb-8 rounded-sm overflow-hidden">
        <Image
          src={
            article.coverImage
              ? getImageUrl(article.coverImage)
              : "/assets/images/bg.jpg"
          }
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      <p className={`${typography.meta} mb-8`}>
        Published on {new Date(article.createdAt).toLocaleDateString()}
      </p>{" "}
      <div className="space-y-4">
        {content?.content?.map((block: ContentBlock, i: number) => {
          if (block.type === "paragraph") {
            const styles = [];
            styles.push(typography.body);
            styles.push("whitespace-pre-wrap");

            if (block.attrs?.textAlign === "center") {
              styles.push("text-center");
            } else if (block.attrs?.textAlign === "right") {
              styles.push("text-right");
            }

            return (
              <p key={i} className={styles.join(" ")}>
                {block.content?.map((textBlock: TextBlock, j: number) => {
                  const hasMarks =
                    textBlock.marks && textBlock.marks.length > 0;
                  if (!hasMarks) return textBlock.text;

                  const classes = [
                    textBlock.marks?.some((mark) => mark.type === "bold") &&
                      "font-bold",
                    textBlock.marks?.some((mark) => mark.type === "italic") &&
                      "italic",
                    textBlock.marks?.some(
                      (mark) => mark.type === "highlight"
                    ) && "bg-yellow-200 text-black rounded-sm px-1 font-medium",
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <span key={j} className={classes}>
                      {textBlock.text}
                    </span>
                  );
                })}
              </p>
            );
          }
          if (block.type === "heading") {
            const level = Math.min(Math.max(block.attrs?.level || 1, 1), 2); // Limit to level 1 or 2
            const headingStyle = level === 1 ? typography.h2 : typography.h3; // Use h2 and h3 since h1 is for article title
            const HeadingTag = HeadingComponents[level] || HeadingComponents[1]; // Fallback to h2 if invalid level

            let alignClass = "";
            if (block.attrs?.textAlign === "center") {
              alignClass = "text-center";
            } else if (block.attrs?.textAlign === "right") {
              alignClass = "text-right";
            }

            return (
              <HeadingTag key={i} className={`${headingStyle} ${alignClass}`}>
                {block.content?.[0]?.text || ""}
              </HeadingTag>
            );
          }
          if (block.type === "codeBlock") {
            const language = block.attrs?.language || "";
            const languageLabel = language
              ? LANGUAGES.find((l) => l.value === language)?.label || "Code"
              : ""; // Empty string triggers auto-detection in CodeBlock
            return (
              <CodeBlock
                key={i}
                code={block.content?.[0]?.text || ""}
                language={language}
                languageLabel={languageLabel}
              />
            );
          }
          if (block.type === "bulletList") {
            const styles = [];
            styles.push("list-none", "pl-8", "space-y-2", typography.body);

            if (block.attrs?.textAlign === "center") {
              styles.push("text-center");
            } else if (block.attrs?.textAlign === "right") {
              styles.push("text-right");
            }

            return (
              <ul key={i} className={styles.join(" ")}>
                {block.content?.map((item: TextBlock, j: number) => (
                  <li key={j} className="relative pl-2">
                    <span className="absolute -left-4 top-0">•</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "orderedList") {
            const styles = [];
            styles.push("list-none", "pl-8", "space-y-2", typography.body);

            if (block.attrs?.textAlign === "center") {
              styles.push("text-center");
            } else if (block.attrs?.textAlign === "right") {
              styles.push("text-right");
            }

            return (
              <ol key={i} className={styles.join(" ")}>
                {block.content?.map((item: TextBlock, j: number) => (
                  <li key={j} className="relative pl-2">
                    <span className="absolute -left-6 top-0">{j + 1}.</span>
                    {item.text}
                  </li>
                ))}
              </ol>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}
