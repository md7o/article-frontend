"use client";

import TitleField from "./WriteUi/TitleField";
import axios from "axios";
import Link from "next/link";
import { CircleUserRound, Goal } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useArticles } from "@/context/ArticlesContext";
import { useContext, useState } from "react";
import ContentTestField from "./WriteUi/ContentTestField";
import PublishDialog from "./WriteUi/PublishDialog";
import { JSONContent } from "@tiptap/react";

export default function EssayField() {
  const { user, loading } = useContext(AuthContext);
  const { refreshArticles } = useArticles();
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState<JSONContent>({
    type: "doc",
    content: [{ type: "paragraph" }],
  });
  const [submitting, setSubmitting] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const handleSubmit = async (imageFilename: string) => {
    if (!title.trim()) return alert("Title is required");
    if (!editorContent.content?.length) return alert("Content is required");
    if (!imageFilename) return alert("Cover image is required");

    try {
      setSubmitting(true);
      // Convert TipTap content to HTML or handle it as needed for your backend
      await axios.post(process.env.NEXT_PUBLIC_API_URL + "/articles", {
        title,
        content: editorContent,
        coverImage: imageFilename,
      });
      await refreshArticles(); // Refresh the articles list after successful creation
    } catch (err: unknown) {
      console.error("Submit Error:", err);
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to publish article");
      } else {
        alert("Failed to publish article");
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
      <header className="w-full max-w-[100rem] mb-5 mt-10 flex justify-between items-center bg-primary rounded-fully p-2 mx-auto">
        <div className="flex items-center gap-1">
          <Link href={"/"}>
            <h1 className="text-2xl p-4 font-black bg-secondary rounded-fully whitespace-nowrap">
              WebSite LOGO
            </h1>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div
            onClick={() => setShowPublishDialog(true)}
            className={`flex justify-center items-center ${iconStyle} hover:opacity-70 duration-200 gap-2 w-auto px-4 group`}
          >
            <Goal className="group-hover:animate-pulse" size={30} />
            <p className="text-xl">Publish</p>
          </div>

          <PublishDialog
            open={showPublishDialog}
            onOpenChange={setShowPublishDialog}
            onConfirm={handleSubmit}
            isSubmitting={submitting}
            title={title}
            content={editorContent}
          />

          <Link href={user ? "/profile" : "/login"}>
            <div className={`${iconStyle} gap-2 w-auto px-4`}>
              <CircleUserRound size={30} />
              {user && loading ? (
                <div className="w-5 h-5 border-2 border-t-primary border-gray-300 rounded-full animate-spin" />
              ) : (
                <p className="text-xl">{user ? user.username : "Signup"}</p>
              )}
            </div>
          </Link>
        </div>
      </header>
      <TitleField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ContentTestField
        onChange={setEditorContent}
        initialContent={editorContent}
      />
    </>
  );
}
