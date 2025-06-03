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
import { liveProjectData } from "@/lib/LiveProjectData";

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
        ? Math.min(currentIndex + 1, liveProjectData.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      // Fade out current content
      const currentSection = projectRefs.current[currentIndex];
      if (currentSection) {
        const content = currentSection.querySelector(".project-content");
        const title = content?.querySelector("h1");
        const image = content?.querySelector(".project-image");
        const button = content?.querySelector(".explore-button");

        if (title && image && button) {
          // Create a timeline for smooth animation sequence
          const tl = gsap.timeline();

          // Animate current content out
          tl.to(title, {
            opacity: 0,
            y: direction === "next" ? -30 : 30,
            duration: 0.4,
            ease: "power2.inOut",
          })
            .to(
              image,
              {
                opacity: 0,
                scale: 0.95,
                duration: 0.4,
                ease: "power2.inOut",
              },
              "-=0.3"
            )
            .to(
              button,
              {
                opacity: 0,
                y: direction === "next" ? 30 : -30,
                duration: 0.4,
                ease: "power2.inOut",
              },
              "-=0.3"
            );
        }
      }

      // Update index after current content fades out
      setTimeout(() => {
        setCurrentIndex(nextIndex);

        // Fade in new content
        const nextSection = projectRefs.current[nextIndex];
        if (nextSection) {
          const content = nextSection.querySelector(".project-content");
          const title = content?.querySelector("h1");
          const image = content?.querySelector(".project-image");
          const button = content?.querySelector(".explore-button");

          if (title && image && button) {
            // Set initial positions
            gsap.set([title, image, button], { opacity: 0 });
            gsap.set(title, { y: direction === "next" ? 30 : -30 });
            gsap.set(image, { scale: 0.95 });
            gsap.set(button, { y: direction === "next" ? -30 : 30 });

            // Create timeline for entrance animation
            const tl = gsap.timeline();

            // Animate new content in with staggered timing
            tl.to(title, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            })
              .to(
                image,
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              )
              .to(
                button,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                "-=0.3"
              );
          }
        }
      }, 400); // Wait for exit animation to complete
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
        {liveProjectData.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => setProjectRef(el, index)}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-bg1/50" />
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover blur-xl opacity-25"
              />
            </div>

            {/* Content Container */}
            <div className="project-content relative z-10 h-full flex flex-col items-center justify-center">
              <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center space-y-8 md:space-y-12">
                {/* Big Title */}
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tight">
                  {project.title}
                </h1>

                {/* Project Image */}
                <div className="project-image relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                <p className="text-base md:text-lg lg:text-xl text-gray-200">
                  {project.description}
                </p>

                {/* Explore Button */}
                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="explore-button inline-flex items-center px-8 py-4 text-lg font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors duration-300"
                  >
                    Explore
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Progress Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
          {liveProjectData.map((_, index) => (
            <button
              key={index}
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
