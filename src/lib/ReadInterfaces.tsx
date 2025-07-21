export interface MarkAttrs {
  color?: string;
  level?: number;
  language?: string;
}
export interface TextMark {
  type: "bold" | "italic" | "highlight" | "code" | "link";
  attrs?: MarkAttrs;
}
export interface TextBlock {
  type: string;
  text?: string;
  marks?: TextMark[];
}
export interface ContentBlockAttrs {
  level?: number;
  language?: string;
  start?: number;
  color?: string;
  textAlign?: "left" | "center" | "right";
}
export interface ContentBlock {
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
export interface TipTapContent {
  type: "doc";
  content?: ContentBlock[];
}
export interface Article {
  title: string;
  titleAlign?: string;
  content: string | TipTapContent;
  coverImage: string;
  createdAt: string;
}
