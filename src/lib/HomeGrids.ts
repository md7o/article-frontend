export type GridSize = "small" | "medium" | "large" | "huge";

// Then the interface
export interface IGridItem {
  id: string;
  title?: string;
  size: GridSize;
  image: string;
  description?: string;
  background: string;
  textColor?: string;
  buttonText?: string;
  tag?: string;
}

export const homeGrids: IGridItem[] = [
  {
    id: "blogs",
    title: "Blogs",
    description:
      "Discover articles tutorials, and insights on the latest topics.",
    image: "/assets/images/bg.jpg",
    size: "huge",
    background: "bg-[#0f0f0f]",
    textColor: "text-white",
    buttonText: "Discover",
    tag: "#Read",
  },
  {
    id: "all-projects",
    // title: "All Projects",
    description: "My projects that I have worked on.",
    image: "/assets/images/bg.jpg",
    size: "medium",
    background: "bg-[#FFF2D9FF]",
    textColor: "text-black",
    buttonText: "Take a look",
  },
  {
    id: "profile",
    title: "Contant us",
    image: "/assets/images/bg.jpg",
    size: "small",
    background: "bg-[#D6FFBCFF]",
    textColor: "text-black",
    buttonText: "Contact",
    tag: "#Ring",
  },
  {
    id: "settings",
    title: "Settings",
    description: "Refactor you setting",
    image: "/assets/images/bg.jpg",
    size: "medium",
    background: "bg-[#DCAFFEFF]",
    textColor: "text-black",
    buttonText: "Refactor",
  },
  {
    id: "live-projects",
    title: "Live Projects",
    description: "Lively projects on websites",
    image: "/assets/images/bg.jpg",
    size: "large",
    background: "bg-[#C9FFE8FF]",
    textColor: "text-black",
    buttonText: "Click here",
    tag: "#Live",
  },
];
