import {
  useImperativeHandle,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import EditorJS from "@editorjs/editorjs";
import { initEditor } from "./EditorField";

interface InputProps {
  label: string;
}

export interface ContentFieldHandle {
  getContent: () => Promise<any>;
}

const ContentField = forwardRef<ContentFieldHandle, InputProps>(
  ({ label }, ref) => {
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

    useImperativeHandle(ref, () => ({
      async getContent() {
        if (editorInstance.current) {
          return await editorInstance.current.save();
        }
        return null;
      },
    }));

    return (
      <div className="group mb-4 w-full max-w-[40rem] mx-auto">
        <div ref={editorRef} className="min-h-[200px] bg-transparent p-4" />
      </div>
    );
  }
);

ContentField.displayName = "ContentField";
export default ContentField;
