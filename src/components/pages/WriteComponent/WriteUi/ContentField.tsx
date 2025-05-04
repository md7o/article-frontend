"use client";

import { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { initEditor } from "../../../../components/ui/custom/EditorField";

interface InputProps {
  label: string;
}

export default function ContentField({ label }: InputProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<EditorJS | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !editorRef.current) return;

    try {
      editorInstance.current = initEditor({
        holder: editorRef.current,
        placeholder: label,
      });
    } catch (err) {
      console.error("EditorJS init failed:", err);
    }

    return () => {
      if (
        editorInstance.current &&
        typeof editorInstance.current.destroy === "function"
      ) {
        editorInstance.current.destroy();
      }
    };
  }, [mounted, label]);

  return (
    <div className="group mb-4 w-full max-w-[40rem] mx-auto">
      <div ref={editorRef} className="min-h-[200px] bg-transparent p-4" />
    </div>
  );
}
