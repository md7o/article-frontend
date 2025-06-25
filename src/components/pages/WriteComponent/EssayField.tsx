"use client";

import TitleField from "./WriteUi/TitleField";
import axios from "axios";
import Link from "next/link";
import { CircleUserRound, Goal, Hexagon } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useArticles } from "@/context/ArticlesContext";
import { useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ContentTestField from "./WriteUi/ContentTestField";
import PublishDialog from "./WriteUi/PublishDialog";
import { JSONContent } from "@tiptap/react";

export default function EssayField() {
  const { user, loading } = useContext(AuthContext);
  const { refreshArticles } = useArticles();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [{ type: "paragraph" }],
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [originalCoverImage, setOriginalCoverImage] = useState<string>("");
  const [isLoadingArticle, setIsLoadingArticle] = useState(false);

  // Load article data when in edit mode
  useEffect(() => {
    const loadArticle = async () => {
      if (editId) {
        setIsLoadingArticle(true);
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/articles/${editId}`,
            { withCredentials: true }
          );
          const article = response.data;
          setTitle(article.title);

          // Ensure content is in proper TipTap JSON format
          let content;
          if (article.content && typeof article.content === "object") {
            content = article.content;
          } else if (article.content && typeof article.content === "string") {
            // If content is a string, wrap it in proper TipTap structure
            content = {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: article.content,
                    },
                  ],
                },
              ],
            };
          } else {
            content = {
              type: "doc",
              content: [{ type: "paragraph" }],
            };
          }

          setEditorContent(content);
          setOriginalCoverImage(article.coverImage || "");
          setIsEditMode(true);
        } catch (error) {
          console.error("Failed to load article:", error);
          alert("Failed to load article for editing");
        } finally {
          setIsLoadingArticle(false);
        }
      }
    };

    loadArticle();
  }, [editId]);

  const handleSubmit = async (imageFilename: string) => {
    if (!title.trim()) return alert("Title is required");
    if (!editorContent.content?.length) return alert("Content is required");
    if (!imageFilename) return alert("Cover image is required");
    try {
      setSubmitting(true);

      if (isEditMode && editId) {
        // Update existing article
        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/articles/${editId}`,
          {
            title,
            content: editorContent,
            coverImage: imageFilename,
          },
          {
            withCredentials: true,
          }
        );
      } else {
        // Create new article
        await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/articles",
          {
            title,
            content: editorContent,
            coverImage: imageFilename,
          },
          {
            withCredentials: true,
          }
        );
      }

      await refreshArticles(); // Refresh the articles list after successful creation/update

      // Clear the form
      setTitle("");
      setEditorContent({
        type: "doc",
        content: [{ type: "paragraph" }],
      });
      setIsEditMode(false);
      setOriginalCoverImage("");

      // Redirect back to articles page
      router.push("/articles");
    } catch (err: unknown) {
      console.error("Submit Error:", err);
      if (axios.isAxiosError(err)) {
        alert(
          err.response?.data?.message ||
            `Failed to ${isEditMode ? "update" : "publish"} article`
        );
      } else {
        alert(`Failed to ${isEditMode ? "update" : "publish"} article`);
      }
    } finally {
      setSubmitting(false);
      setShowPublishDialog(false);
    }
  };

  const iconStyle =
    "flex justify-center items-center bg-secondary rounded-fully w-16 h-16 hover:scale-95 hover:bg-active cursor-pointer duration-300";
  return (
    <>
      <header className="w-full my-5 flex justify-around items-center bg-primary rounded-fully p-2 mx-auto">
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-1">
            <Link href={"/"}>
              <Hexagon
                size={50}
                className="hover:text-light-span hover:scale-95 duration-300 "
              />
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div
            onClick={() => setShowPublishDialog(true)}
            className={`flex justify-center items-center ${iconStyle} hover:opacity-70 duration-200 gap-2 w-auto px-4 group`}
          >
            <Goal className="group-hover:animate-pulse" size={30} />
            <p className="text-xl">{isEditMode ? "Update" : "Publish"}</p>
          </div>

          <PublishDialog
            open={showPublishDialog}
            onOpenChange={setShowPublishDialog}
            onConfirm={handleSubmit}
            isSubmitting={submitting}
            title={title}
            content={editorContent}
            existingCoverImage={isEditMode ? originalCoverImage : undefined}
          />
        </div>
      </header>
      <TitleField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {/* Only render the editor when not loading article data */}
      {(!editId || !isLoadingArticle) && (
        <ContentTestField
          key={isEditMode ? `edit-${editId}` : "new"} // Force remount when switching between edit and new
          onChange={setEditorContent}
          initialContent={editorContent}
        />
      )}
      {/* Show loading spinner when loading article for editing */}
      {editId && isLoadingArticle && (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-gray-600 border-t-accent rounded-full animate-spin" />
          <span className="ml-3 text-gray-400">Loading article content...</span>
        </div>
      )}
    </>
  );
}
