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
      "A modern and fast website for a film production that showcases their portfolio and services.",
    image: "/assets/images/EyadFilm.png",
    technologies: [
      { name: "Next.js", icon: "/assets/images/nextjs.png" },
      { name: "Tailwind", icon: "/assets/images/tailwind.png" },
    ],
    link: "https://eyadfilm.com",
  },
  {
    id: 2,
    title: "Shafrah",
    description:
      "Landing page for a Saudi Arabian company that provides various services including web development and digital marketing.",
    image: "/assets/images/Shafrah.png",
    technologies: [
      { name: "Next.js", icon: "/assets/images/nextjs.png" },
      { name: "Tailwind", icon: "/assets/images/tailwind.png" },
    ],
    link: "https://shafrah.sa",
  },
  {
    id: 3,
    title: "Class Core",
    description:
      "Demo University dashboard with full control over courses, students, and grades",
    image: "/assets/images/classCore.jpg",
    technologies: [
      { name: "React", icon: "/assets/images/React.png" },
      { name: "Tailwind", icon: "/assets/images/tailwind.png" },
      { name: "Node.js", icon: "/assets/images/nodejs.png" },
      { name: "MongoDB", icon: "/assets/images/mongo.png" },
    ],
    link: "https://classcorewebsite.web.app",
  },
  {
    id: 4,
    title: "Portfolio",
    description:
      "About this website, my personal portfolio that showcases my projects and skills.",
    image: "/assets/images/MinePortfolio.png",
    technologies: [
      { name: "Next.js", icon: "/assets/images/nextjs.png" },
      { name: "Tailwind", icon: "/assets/images/tailwind.png" },
      { name: "Nest.js", icon: "/assets/images/nestjs.png" },
      { name: "PostgreSQL", icon: "/assets/images/postgre.png" },
    ],
    link: "https://classcorewebsite.web.app",
  },
];
