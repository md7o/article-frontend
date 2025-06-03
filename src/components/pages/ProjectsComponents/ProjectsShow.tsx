"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { projects } from "@/lib/projectsData";
import {
  Laptop,
  Smartphone,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function ProjectsShow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setProjectRef = (el: HTMLDivElement | null, index: number) => {
    projectRefs.current[index] = el;
  };

  const navigateProject = (direction: "next" | "prev") => {
    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, projects.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      // Fade out current content
      const currentSection = projectRefs.current[currentIndex];
      if (currentSection) {
        gsap.to(currentSection.querySelector(".project-content"), {
          opacity: 0,
          y: direction === "next" ? -50 : 50,
          duration: 0.3,
        });
      }

      // Update index
      setCurrentIndex(nextIndex);

      // Fade in new content
      const nextSection = projectRefs.current[nextIndex];
      if (nextSection) {
        gsap.fromTo(
          nextSection.querySelector(".project-content"),
          {
            opacity: 0,
            y: direction === "next" ? 50 : -50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
          }
        );
      }
    }
  };

  const renderTypeIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="w-8 h-8 text-white" />;
      case "website":
        return <Laptop className="w-8 h-8 text-white" />;
      case "both":
        return (
          <div className="flex gap-2">
            <Smartphone className="w-8 h-8 text-white" />
            <Laptop className="w-8 h-8 text-white" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Back To Home Button */}
      <Link href={"/"}>
        <div className="absolute left-4 md:left-8 top-4 md:top-8 cursor-pointer z-20 bg-white/10 backdrop-blur-sm rounded-fully w-10 h-10 flex justify-center items-center hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </div>
      </Link>

      {/* Navigation Buttons */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 md:gap-4">
        <button
          onClick={() => navigateProject("prev")}
          className={`transform transition-all duration-300 ${
            currentIndex === 0
              ? "opacity-20 scale-90"
              : "opacity-100 hover:scale-110"
          }`}
          disabled={currentIndex === 0}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 md:p-4 rounded-full hover:bg-white/20 transition-colors">
            <ArrowUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </button>

        <button
          onClick={() => navigateProject("next")}
          className={`transform transition-all duration-300 ${
            currentIndex === projects.length - 1
              ? "opacity-20 scale-90"
              : "opacity-100 hover:scale-110"
          }`}
          disabled={currentIndex === projects.length - 1}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 md:p-4 rounded-full hover:bg-white/20 transition-colors">
            <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </button>
      </div>

      {/* Projects Container */}
      <div ref={containerRef} className="relative w-full h-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => setProjectRef(el, index)}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-bg1" />
              {/* <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              /> */}
            </div>

            {/* Content Container */}
            <div className="project-content relative z-10 h-full flex items-center">
              <div className="container mx-auto px-16 md:px-6 lg:px-52">
                <div className="max-w-2xl space-y-6 md:space-y-8 mx-auto">
                  {/* Project Title */}
                  <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white">
                    {project.title}
                  </h1>

                  {/* Project Type and Description */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-center gap-4">
                      {renderTypeIcon(project.type)}
                    </div>
                    <p className="text-base md:text-lg lg:text-xl text-gray-200">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 md:gap-4">
                    {project.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-5 h-5 md:w-6 md:h-6"
                        />
                        <span className="text-sm md:text-base text-white">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 md:px-6 md:py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-center text-sm md:text-base"
                      >
                        Visit Project
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 md:px-6 md:py-3 border border-white text-white rounded-full hover:bg-white/10 transition-colors text-center text-sm md:text-base"
                      >
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Progress Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              //   onClick={() => setCurrentIndex(index)}
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6 md:w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
