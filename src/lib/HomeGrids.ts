export type GridSize = "small" | "long" | "large" | "huge";

// Then the interface
export interface IGridItem {
  id: string;
  title?: string;
  size: GridSize;
  image: string;
  description?: string;
  link?: string;
  background: string;
  textColor?: string;
  buttonText?: string;
  tag?: string;
}

export const homeGrids: IGridItem[] = [
  {
    id: "blogs",
    title: "Blog",
    description: "Articles, guides, and dev insights.",
    link: "/articles",
    image: "/assets/images/bg.jpg",
    size: "huge",
    background: "bg-[#0f0f0f]",
    textColor: "text-white",
    buttonText: "Read More",
    tag: "#Blog",
  },

  {
    id: "about",
    title: "About",
    description: "Who I am and what I do.",
    link: "/about",
    image: "/assets/images/bg.jpg",
    size: "large",
    background: "bg-[#DCAFFEFF]",
    textColor: "text-black",
    buttonText: "Learn More",
    tag: "#About",
  },
  {
    id: "live-projects",
    title: "Live Projects",
    description: "Projects live on the web.",
    link: "live-projects",
    image: "/assets/images/bg.jpg",
    size: "long",
    background: "bg-[#C9FFE8FF]",
    textColor: "text-black",
    buttonText: "View Live",
    tag: "#Live",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with me.",
    link: "/contact",
    image: "/assets/images/bg.jpg",
    size: "small",
    background: "bg-[#FFE4B5FF]",
    textColor: "text-black",
    buttonText: "Contact Me",
    tag: "#Contact",
  },
];
