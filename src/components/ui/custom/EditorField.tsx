// utils/initEditor.ts
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Prism from "prismjs";
import CustomCodeTool from "../tools/CustomCodeTool";

interface InitEditorProps {
  holder: HTMLElement;
  placeholder?: string;
}

export const initEditor = ({
  holder,
  placeholder,
}: InitEditorProps): EditorJS => {
  const editor = new EditorJS({
    holder,
    placeholder,
    tools: {
      code: CustomCodeTool,
      image: {
        class: ImageTool,
        config: {
          uploader: {
            async uploadByFile(file: File) {
              const blobUrl = URL.createObjectURL(file);
              return {
                success: 1,
                file: { url: blobUrl },
              };
            },
            async uploadByUrl(url: string) {
              return {
                success: 1,
                file: { url },
              };
            },
          },
        },
      },
    },
    onReady: () => Prism.highlightAll(),
  });

  return editor;
};
