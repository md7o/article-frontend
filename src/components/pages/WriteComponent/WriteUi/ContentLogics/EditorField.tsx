import EditorJS, { OutputData } from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import Prism from "prismjs";
import CustomCodeTool from "./CustomCodeTool";

interface InitEditorProps {
  holder: string | HTMLElement;
  placeholder?: string;
  data?: OutputData;
  onReady?: () => void;
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
