export type GridSize = "small" | "medium" | "large" | "huge";

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
    id: "all-projects",
    title: "Projects",
    description: "Things I’ve built or contributed to.",
    link: "/projects",
    image: "/assets/images/bg.jpg",
    size: "medium",
    background: "bg-[#FFF2D9FF]",
    textColor: "text-black",
    buttonText: "Explore",
    tag: "#Build",
  },
  {
    id: "profile",
    title: "Contact",
    description: "Let’s work together.",
    link: "/contact",
    image: "/assets/images/bg.jpg",
    size: "small",
    background: "bg-[#D6FFBCFF]",
    textColor: "text-black",
    buttonText: "Get in Touch",
    tag: "#Contact",
  },
  {
    id: "about",
    title: "About",
    description: "Who I am and what I do.",
    link: "/about",
    image: "/assets/images/bg.jpg",
    size: "medium",
    background: "bg-[#DCAFFEFF]",
    textColor: "text-black",
    buttonText: "Learn More",
    tag: "#About",
  },
  {
    id: "live-projects",
    title: "Live Demos",
    description: "Projects live on the web.",
    link: "live-projects",
    image: "/assets/images/bg.jpg",
    size: "large",
    background: "bg-[#C9FFE8FF]",
    textColor: "text-black",
    buttonText: "View Live",
    tag: "#Live",
  },
];
