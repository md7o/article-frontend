import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

interface CodeToolData {
  code: string;
  language: string;
}

class CustomCodeTool {
  static get toolbox() {
    return {
      title: "Code",
      icon: `<svg width="15" height="15" viewBox="0 0 20 20"><path d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/></svg>`,
    };
  }

  private data: CodeToolData;
  private wrapper!: HTMLDivElement;
  private codeElement: HTMLElement | null = null;
  private languageSelect: HTMLSelectElement | null = null;

  constructor({ data }: { data?: CodeToolData }) {
    this.data = data || { code: "", language: "javascript" };
    if (typeof window !== "undefined") Prism.manual = true;
  }

  render(): HTMLElement {
    this.wrapper = document.createElement("div");
    this.wrapper.classList.add(
      "editorjs-code-wrapper",
      "bg-gray-800",
      "w-[30rem]",
      "mx-auto",
      "rounded-2xl",
      "p-4",
      "shadow-sm",
      "mb-6"
    );

    this.languageSelect = document.createElement("select");
    this.languageSelect.classList.add(
      "p-2",
      "rounded-lg",
      "bg-gray-700",
      "text-white",
      "text-sm",
      "mb-4",
      "w-[10rem]"
    );

    [
      "javascript",
      "typescript",
      "python",
      "java",
      "css",
      "jsx",
      "bash",
    ].forEach((lang) => {
      const option = document.createElement("option");
      option.value = lang;
      option.textContent = lang;
      option.selected = lang === this.data.language;
      this.languageSelect!.appendChild(option);
    });

    this.codeElement = document.createElement("code");
    this.codeElement.contentEditable = "true";
    this.codeElement.textContent = this.data.code;
    this.codeElement.classList.add(
      "editorjs-code-editable",
      "block",
      "w-full",
      "outline-none",
      "p-2",
      "font-mono",
      "text-sm",
      "leading-relaxed",
      "bg-transparent",
      "text-gray-100",
      "whitespace-pre-wrap"
    );

    const preWrapper = document.createElement("pre");
    preWrapper.classList.add(
      "m-0",
      "p-0",
      "bg-transparent",
      "w-[10rem]",
      "line-numbers",
      "overflow-x-auto",
      "rounded-lg"
    );
    preWrapper.appendChild(this.codeElement);

    const handleInput = () => {
      const cursorPosition = this.getCursorPosition();
      this.highlightCode();
      this.restoreCursorPosition(cursorPosition);
    };

    this.codeElement.addEventListener("input", handleInput);
    this.languageSelect.addEventListener("change", handleInput);

    this.wrapper.appendChild(this.languageSelect);
    this.wrapper.appendChild(preWrapper);
    setTimeout(() => this.highlightCode(), 0);

    return this.wrapper;
  }

  private getCursorPosition(): number {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(this.codeElement!);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    return preSelectionRange.toString().length;
  }

  private restoreCursorPosition(position: number) {
    let node: Node = this.codeElement!;
    let offset = 0;

    const walker = document.createTreeWalker(
      this.codeElement!,
      NodeFilter.SHOW_TEXT,
      null
    );

    let currentPosition = 0;
    let found = false;

    while (walker.nextNode() && !found) {
      const textNode = walker.currentNode;
      const textLength = textNode.textContent?.length || 0;

      if (currentPosition + textLength >= position) {
        node = textNode;
        offset = position - currentPosition;
        found = true;
      } else {
        currentPosition += textLength;
      }
    }

    const range = document.createRange();
    range.setStart(node, offset);
    range.collapse(true);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  private highlightCode() {
    if (!this.codeElement) return;

    const code = this.codeElement.textContent || "";
    const language = this.languageSelect?.value || "javascript";

    const tempElement = document.createElement("code");
    tempElement.textContent = code;
    tempElement.className = `language-${language}`;
    Prism.highlightElement(tempElement);

    this.codeElement.innerHTML = tempElement.innerHTML;
  }

  save() {
    return {
      code: this.codeElement?.textContent || "",
      language: this.languageSelect?.value || "javascript",
    };
  }

  static get sanitize() {
    return { code: { br: true }, language: {} };
  }

  static get isReadOnlySupported() {
    return true;
  }
}

export default CustomCodeTool;
