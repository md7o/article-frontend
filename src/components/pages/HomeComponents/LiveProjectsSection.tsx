"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github, Rocket, Star, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

// Mock projects data - replace with your actual projects
const liveProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/username/ecommerce-platform",
    image: "/assets/images/nextjs.png",
    category: "Full Stack",
    status: "Live",
    featured: true,
    stats: {
      stars: 45,
      users: 150,
      commits: 120,
    },
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/username/task-manager",
    image: "/assets/images/React.png",
    category: "Web App",
    status: "Live",
    featured: true,
    stats: {
      stars: 32,
      users: 89,
      commits: 95,
    },
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts built with modern web technologies.",
    technologies: ["Vue.js", "TailwindCSS", "OpenWeather API"],
    liveUrl: "https://weather-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/username/weather-dashboard",
    image: "/assets/images/tailwind.png",
    category: "Frontend",
    status: "Live",
    featured: false,
    stats: {
      stars: 28,
      users: 67,
      commits: 78,
    },
  },
  {
    id: 4,
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.",
    technologies: ["Flutter", "Firebase", "Dart"],
    liveUrl: "https://play.google.com/store/apps/fitness-tracker",
    githubUrl: "https://github.com/username/fitness-tracker",
    image: "/assets/images/flutter.png",
    category: "Mobile",
    status: "Live",
    featured: true,
    stats: {
      stars: 67,
      users: 340,
      commits: 156,
    },
  },
];

const projectCategories = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "Web App",
];

export default function LiveProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);

  const filteredProjects =
    selectedCategory === "All"
      ? liveProjects
      : liveProjects.filter((project) => project.category === selectedCategory);

  // Stagger animation for projects
  useEffect(() => {
    setVisibleProjects([]);
    const timer = setTimeout(() => {
      filteredProjects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => [...prev, index]);
        }, index * 200);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory, filteredProjects]);

  return (
    <section
      className="py-20 bg-surface relative overflow-hidden"
      id="projects"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-accent animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                Live <span className="text-accent">Projects</span>
              </h2>
            </div>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Real-world applications and demos showcasing my development skills
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? "bg-accent text-white shadow-lg"
                    : "bg-surface-light text-text-secondary hover:text-primary hover:bg-accent/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group bg-surface-light rounded-2xl overflow-hidden border border-surface-dark hover:border-accent/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl ${
                  visibleProjects.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Project Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/images/bg.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-accent px-2 py-1 rounded-full text-xs text-white font-medium">
                      <Star className="w-3 h-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Status */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500 px-2 py-1 rounded-full text-xs text-white font-medium">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {project.status}
                  </div>

                  {/* Category */}
                  <div className="absolute bottom-4 left-4 bg-black/70 px-2 py-1 rounded-full text-xs text-white">
                    {project.category}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-primary font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Stats */}
                  <div className="flex items-center gap-4 text-xs text-text-secondary mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {project.stats.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {project.stats.users}
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-3 h-3" />
                      {project.stats.commits}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Live
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-accent text-accent hover:bg-accent hover:text-white font-medium rounded-lg transition-all duration-300"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center">
            <Button
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => {
                window.location.href = "/live-projects";
              }}
            >
              <Rocket className="w-5 h-5 mr-2" />
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
