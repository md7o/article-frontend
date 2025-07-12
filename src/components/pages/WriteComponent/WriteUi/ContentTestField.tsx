"use client";

import "@/styles/Editor.css";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TextAlign from "@tiptap/extension-text-align";
import { common, createLowlight } from "lowlight";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Highlighter,
  List,
  ListOrdered,
  Code2,
  ImageIcon as LucideImage,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

// Import languages for code highlighting
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import cpp from "highlight.js/lib/languages/cpp";
import java from "highlight.js/lib/languages/java";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import swift from "highlight.js/lib/languages/swift";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import kotlin from "highlight.js/lib/languages/kotlin";
import scala from "highlight.js/lib/languages/scala";
import sql from "highlight.js/lib/languages/sql";
import shell from "highlight.js/lib/languages/shell";
import markdown from "highlight.js/lib/languages/markdown";
import { Button } from "@/components/ui/shadcn/button";

// Create lowlight instance with languages
const lowlight = createLowlight(common);
lowlight.register("js", javascript);
lowlight.register("ts", typescript);
lowlight.register("python", python);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("cpp", cpp);
lowlight.register("java", java);
lowlight.register("csharp", csharp);
lowlight.register("php", php);
lowlight.register("ruby", ruby);
lowlight.register("swift", swift);
lowlight.register("rust", rust);
lowlight.register("go", go);
lowlight.register("kotlin", kotlin);
lowlight.register("scala", scala);
lowlight.register("sql", sql);
lowlight.register("shell", shell);
lowlight.register("markdown", markdown);

const LANGUAGES = [
  // Web Development
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "PHP", value: "php" },

  // Systems & General Purpose
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C++", value: "cpp" },
  { label: "C#", value: "csharp" },
  { label: "Go", value: "go" },
  { label: "Rust", value: "rust" },

  // Mobile Development
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },

  // Other Popular Languages
  { label: "Ruby", value: "ruby" },
  { label: "Scala", value: "scala" },
  { label: "SQL", value: "sql" },

  // Documentation & Scripts
  { label: "Shell Script", value: "shell" },
  { label: "Markdown", value: "markdown" },
];

type Props = {
  onChange: (json: JSONContent) => void;
  initialContent?: JSONContent;
};

export default function TextEditor({ onChange, initialContent }: Props) {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // Disable default code block to use lowlight
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: "javascript",
      }),
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
      Highlight,
      TextAlign.configure({
        types: ["paragraph", "heading", "bulletList", "orderedList"],
        alignments: ["left", "center", "right"],
        defaultAlignment: "left",
      }),
    ],
    content: initialContent || {
      type: "doc",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg px-2 xl:prose-2xl focus:outline-none min-h-[200px] max-w-none prose-pre:bg-gray-800 prose-pre:text-black prose-pre:p-4 prose-pre:rounded-lg prose-code:text-pink-500",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    immediatelyRender: false,
  });

  const handleAddImage = () => {
    const url = prompt("Enter image URL");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  function CodeBlockButton() {
    return (
      <div className="relative" ref={langMenuRef}>
        <ToolbarButton
          onClick={() => setShowLangMenu(!showLangMenu)}
          active={editor?.isActive("codeBlock")}
          title="Code Block"
        >
          <div className="flex items-center gap-1">
            <Code2 size={16} />
            <ChevronDown size={12} />
          </div>
        </ToolbarButton>
        {showLangMenu && (
          <div className="absolute z-50 top-full mt-1 right-0 bg-gray-800 rounded-md shadow-lg py-1 min-w-[150px]">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.value}
                className="w-full px-4 py-2 text-sm text-left text-gray-100 hover:bg-gray-700"
                onClick={() => {
                  editor
                    ?.chain()
                    .focus()
                    .toggleCodeBlock({ language: lang.value })
                    .run();
                  setShowLangMenu(false);
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (!editor) return null;
  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-4 w-full max-w-4xl mx-auto">
      {/* Toolbar */}
      <div className="sticky top-4 z-50 bg-surface-alt border-2 border-light-span rounded-full">
        <div className="flex flex-wrap gap-1 p-2">
          <ToolbarSection>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
              title="Bold (Ctrl+B)"
            >
              <Bold size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
              title="Italic (Ctrl+I)"
            >
              <Italic size={16} />
            </ToolbarButton>

            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              active={editor.isActive("highlight")}
              title="Highlight"
            >
              <Highlighter size={16} />
            </ToolbarButton>
          </ToolbarSection>
          <ToolbarDivider />
          <ToolbarSection>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              active={editor.isActive("heading", { level: 1 })}
              title="Heading 1"
            >
              H1
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              active={editor.isActive("heading", { level: 2 })}
              title="Heading 2"
            >
              H2
            </ToolbarButton>
          </ToolbarSection>
          <ToolbarDivider />
          <ToolbarSection>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              active={editor.isActive("bulletList")}
              title="Bullet List"
            >
              <List size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              active={editor.isActive("orderedList")}
              title="Numbered List"
            >
              <ListOrdered size={16} />
            </ToolbarButton>
          </ToolbarSection>
          <ToolbarDivider />{" "}
          <ToolbarSection>
            <ToolbarButton
              onClick={() => editor.commands.setTextAlign("left")}
              active={editor.isActive({ textAlign: "left" })}
              title="Align Left"
            >
              <AlignLeft size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.commands.setTextAlign("center")}
              active={editor.isActive({ textAlign: "center" })}
              title="Align Center"
            >
              <AlignCenter size={16} />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.commands.setTextAlign("right")}
              active={editor.isActive({ textAlign: "right" })}
              title="Align Right"
            >
              <AlignRight size={16} />
            </ToolbarButton>
          </ToolbarSection>
          <ToolbarDivider />
          <ToolbarSection>
            <CodeBlockButton />
            <ToolbarButton onClick={handleAddImage} title="Insert Image">
              <LucideImage size={16} />
            </ToolbarButton>
          </ToolbarSection>
        </div>
      </div>

      {/* Editor */}
      <div className="min-h-[500px] text-2xl">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// Toolbar components
function ToolbarSection({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>;
}

function ToolbarDivider() {
  return <div className="w-0.5 bg-light-span mx-3" />;
}

function ToolbarButton({
  children,
  onClick,
  active = false,
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  title?: string;
}) {
  return (
    <Button
      variant={"transparency"}
      onClick={onClick}
      type="button"
      title={title}
      className={`p-2 cursor-pointer transition-colors hover:text-black hover:bg-gray-100 ${
        active ? "text-black bg-gray-100 " : ""
      }`}
    >
      {children}
    </Button>
  );
}
