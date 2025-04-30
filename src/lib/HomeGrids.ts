export type GridSize = "small" | "medium" | "large" | "huge";

// Then the interface
export interface IGridItem {
  id: string;
  title: string;
  size: GridSize;
  image: string;
  description?: string;
}

export const homeGrids: IGridItem[] = [
  {
    id: "blogs",
    title: "Blogs",
    description:
      "Discover articles, tutorials, and insights on the latest topics.",
    image: "/assets/images/bg.jpg",
    size: "huge",
  },
  {
    id: "all-projects", // Fixed from 'all-projects' (was 'all-projects' in your find() call)
    title: "All Projects",
    description: "My projects that I have worked on.",
    image: "/assets/images/bg.jpg",
    size: "medium",
  },
  {
    id: "profile",
    title: "Profile",
    image: "/assets/images/bg.jpg",
    size: "small",
  },
  {
    id: "settings",
    title: "Settings",
    image: "/assets/images/bg.jpg",
    size: "medium",
  },
  {
    id: "live-projects",
    title: "Live Projects",
    image: "/assets/images/bg.jpg",
    size: "large",
  },
];
