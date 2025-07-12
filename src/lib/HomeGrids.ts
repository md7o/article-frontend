export type GridSize = "small" | "long" | "large" | "huge";

// Then the interface
export interface IGridItem {
  id: string;
  title?: string;
  size: GridSize;
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
    size: "huge",
    background: "bg-gradient-to-br from-cyan-900 via-cyan-700 to-cyan-800",
    textColor: "text-white",
    buttonText: "Read More",
    tag: "#Blog",
  },

  {
    id: "about",
    title: "About",
    description: "Who I am and what I do.",
    link: "/about",
    size: "large",
    background: "bg-gradient-to-br from-amber-800 via-amber-600 to-amber-500",
    textColor: "text-white",
    buttonText: "Learn More",
    tag: "#About",
  },
  {
    id: "live-projects",
    title: "Live Projects",
    description: "Projects live on the web.",
    link: "live-projects",
    size: "small",
    background: "bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900",
    textColor: "text-white",
    buttonText: "View Live",
    tag: "#Live",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Get in touch with me.",
    link: "/contact",
    size: "small",
    background: "bg-gradient-to-br from-pink-900 via-pink-700 to-pink-900",
    textColor: "text-white",
    buttonText: "Contact Me",
    tag: "#Contact",
  },
  {
    id: "Education-Experience",
    title: "Education & Experience",
    description: "My educational and work experience.",
    link: "/education-experiences",
    size: "small",
    background: "bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900",
    textColor: "text-white",
    buttonText: "View Details",
    tag: "#Career",
  },
];
