import { notFound } from "next/navigation";
import { ElementType } from "react";
import CodeBlock from "@/components/ui/custom/CodeBlock";
import Image from "next/image";
import { getImageUrl } from "@/api/uploadImage";
import Link from "next/link";

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
  titleAlign?: string;
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
  params: Promise<{ slug: string }>;
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
    `${process.env.NEXT_PUBLIC_API_URL}/articles/${resolvedParams.slug}`,
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

  // Determine title alignment class
  const titleAlignClass =
    article.titleAlign === "RIGHT_ALIGN" ? "text-right" : "text-left";

  return (
    <article className="p-6 max-w-4xl mx-auto text-white">
      <h1
        className={`text-4xl md:text-6xl font-medium mb-5 text-white ${titleAlignClass}`}
      >
        {article.title}
      </h1>

      {/* User Avatar Section */}
      <Link href="/about">
        <div
          className={`flex items-center gap-2 mb-12 hover:translate-y-1 transition-transform duration-300 ${article.titleAlign === "RIGHT_ALIGN" ? "justify-start flex-row-reverse" : "justify-start"}`}
        >
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center ">
            <Image
              src={"/assets/images/profile.jpg"}
              alt={"avatar"}
              width={300}
              height={300}
              priority
              className="object-cover rounded-full border-2 border-accent/30"
            />

            {/* <User className="w-6 h-6 text-white" /> */}
          </div>
          <div
            className={`flex flex-col ${article.titleAlign === "RIGHT_ALIGN" ? "text-right" : "text-left"}`}
          >
            <span className="text-white font-medium">Mohammed Alheraki</span>
            <span className="text-gray-400 text-sm">
              Published on {new Date(article.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="relative w-full h-[400px] mb-5 mt-20 rounded-sm overflow-hidden">
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

      <div className="space-y-4 text-white">
        {content?.content?.map((block: ContentBlock, i: number) => {
          if (block.type === "paragraph") {
            const styles = [];
            styles.push("text-base leading-relaxed text-white");
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
            const headingStyle =
              level === 1
                ? "text-3xl font-bold text-white"
                : "text-2xl font-semibold text-white"; // Use normal text sizes with white color
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
            styles.push(
              "list-none",
              "pl-8",
              "space-y-2",
              "text-base leading-relaxed text-white"
            );

            if (block.attrs?.textAlign === "center") {
              styles.push("text-center");
            } else if (block.attrs?.textAlign === "right") {
              styles.push("text-right");
            }

            return (
              <ul key={i} className={styles.join(" ")}>
                {block.content?.map((item: TextBlock, j: number) => (
                  <li key={j} className="relative pl-2 text-white">
                    <span className="absolute -left-4 top-0 text-white">•</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "orderedList") {
            const styles = [];
            styles.push(
              "list-none",
              "pl-8",
              "space-y-2",
              "text-base leading-relaxed text-white"
            );

            if (block.attrs?.textAlign === "center") {
              styles.push("text-center");
            } else if (block.attrs?.textAlign === "right") {
              styles.push("text-right");
            }

            return (
              <ol key={i} className={styles.join(" ")}>
                {block.content?.map((item: TextBlock, j: number) => (
                  <li key={j} className="relative pl-2 text-white">
                    <span className="absolute -left-6 top-0 text-white">
                      {j + 1}.
                    </span>
                    {item.text}
                  </li>
                ))}
              </ol>
            );
          }

          return null;
        })}
      </div>
    </article>
  );
}
