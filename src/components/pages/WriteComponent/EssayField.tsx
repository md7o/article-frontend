"use client";

import dynamic from "next/dynamic";
import TitleField from "./WriteUi/TitleField";
import Link from "next/link";
import { CircleUserRound, Goal } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ContentFieldHandle } from "./WriteUi/ContentLogics/ContentField";
import ContentTestField from "./WriteUi/ContentTestField";
import PublishDialog from "./WriteUi/PublishDialog";
const ContentField = dynamic(
  () => import("./WriteUi/ContentLogics/ContentField"),
  {
    ssr: false,
    loading: () => (
      <p className=" max-w-[40rem] mx-auto text-gray-300 p-5">
        Loading editor...
      </p>
    ),
  }
);

export default function EssayField() {
  const { user, loading } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const contentRef = useRef<ContentFieldHandle>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleSubmit = async (imageFilename: string) => {
    if (!title.trim()) return alert("Title is required");
    if (!content.trim()) return alert("Content is required");
    if (!imageFilename) return alert("Cover image is required");

    try {
      setSubmitting(true);

      const response = await fetch("http://localhost:4000/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          coverImage: imageFilename,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to post article");
      }

      const data = await response.json();
      router.push(`/articles/${data.id}`);
    } catch (err: any) {
      console.error("Submit Error:", err);
      alert(err.message || "Failed to publish article");
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
            content={content}
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
        textareaRef={textareaRef}
      />
      <ContentTestField
        label="Insert yout creativity"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        textareaRef={textareaRef}
      />
      {/* <ContentField ref={contentRef} label="Insert your creativity" /> */}
    </>
  );
}
