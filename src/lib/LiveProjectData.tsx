export interface LiveProjectInterface {
  id: number;
  title: string;
  description: string;

  image: string;
  technologies: {
    name: string;
    icon: string;
  }[];
  link?: string;
  github?: string;
}

export const liveProjectData: LiveProjectInterface[] = [
  {
    id: 1,
    title: "EyadFilm",
    description:
      "A modern blog platform with rich text editing and real-time updates",
    image: "/assets/images/sd.png",
    technologies: [
      { name: "Next.js", icon: "/assets/images/nextjs.png" },
      { name: "Tailwind", icon: "/assets/images/tailwind.png" },
    ],
    link: "https://eyadfilm.com",
  },
  {
    id: 2,
    title: "Class Core",
    description:
      "Cross-platform mobile app for task management and collaboration",
    image: "/assets/images/classCore.jpg",
    technologies: [
      { name: "React", icon: "/assets/images/React.png" },
      { name: "Tailwind", icon: "/assets/images/tailwind.png" },
      { name: "Node.js", icon: "/assets/images/nodejs.png" },
      { name: "MongoDB", icon: "/assets/images/mongo.png" },
    ],
    link: "https://classcorewebsite.web.app",
  },
];
