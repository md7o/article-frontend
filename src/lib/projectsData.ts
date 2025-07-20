export interface Project {
  id: number;
  title: string;
  description: string;
  type: "mobile" | "website" | "both";
  image: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Article Platform",
    description:
      "A modern blog platform with rich text editing and real-time updates",
    type: "website",
    image: "/assets/images/bg.jpg",
    technologies: [
      { name: "React", icon: "/assets/images/React.png" },
      { name: "Next.js", icon: "/assets/images/nextjs.png" },
      { name: "Node.js", icon: "/assets/images/nodejs.png" },
      { name: "Flutter", icon: "/assets/images/flutter.png" },
    ],
    link: "https://articles.demo.com",
    github: "https://github.com/yourusername/articles",
  },
  {
    id: 2,
    title: "Task Manager",
    description:
      "Cross-platform mobile app for task management and collaboration",
    type: "mobile",
    image: "/assets/images/bg.jpg",
    technologies: [
      { name: "React", icon: "/assets/images/React.png" },
      { name: "Next.js", icon: "/assets/images/nextjs.png" },
      { name: "Node.js", icon: "/assets/images/nodejs.png" },
    ],
    link: "https://taskmanager.demo.com",
    github: "https://github.com/yourusername/taskmanager",
  },
  {
    id: 3,
    title: "E-Commerce Dashboard",
    description: "Responsive admin dashboard with real-time analytics",
    type: "both",
    image: "/assets/images/bg.jpg",
    technologies: [
      { name: "React", icon: "/assets/images/React.png" },
      { name: "Node.js", icon: "/assets/images/nodejs.png" },
      { name: "Flutter", icon: "/assets/images/flutter.png" },
    ],
    link: "https://dashboard.demo.com",
    github: "https://github.com/yourusername/dashboard",
  },
];
