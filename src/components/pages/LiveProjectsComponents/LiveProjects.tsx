"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import {
  SquareArrowOutUpRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { liveProjectData } from "@/lib/LiveProjectData";
import { Button } from "@/components/ui/shadcn/button";

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

        // Animate elements that exist
        const elementsToAnimate = [title, image, button].filter(Boolean);

        if (elementsToAnimate.length > 0) {
          // Create a timeline for smooth animation sequence
          const tl = gsap.timeline();

          // Animate current content out
          if (title) {
            tl.to(title, {
              opacity: 0,
              y: direction === "next" ? -30 : 30,
              duration: 0.4,
              ease: "power2.inOut",
            });
          }

          if (image) {
            tl.to(
              image,
              {
                opacity: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.inOut",
              },
              title ? "-=0.3" : 0
            );
          }

          if (button) {
            tl.to(
              button,
              {
                opacity: 0,
                y: direction === "next" ? 30 : -30,
                duration: 0.4,
                ease: "power2.inOut",
              },
              title || image ? "-=0.3" : 0
            );
          }
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

          // Get elements that exist
          const elementsToAnimate = [title, image, button].filter(Boolean);

          if (elementsToAnimate.length > 0) {
            // Set initial positions for existing elements
            if (title) {
              gsap.set(title, {
                opacity: 0,
                y: direction === "next" ? 30 : -30,
              });
            }
            if (image) {
              gsap.set(image, { opacity: 0, scale: 0.95 });
            }
            if (button) {
              gsap.set(button, {
                opacity: 0,
                y: direction === "next" ? -30 : 30,
              });
            }

            // Create timeline for entrance animation
            const tl = gsap.timeline();

            // Animate new content in with staggered timing
            if (title) {
              tl.to(title, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
              });
            }

            if (image) {
              tl.to(
                image,
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.5,
                  ease: "power2.out",
                },
                title ? "-=0.3" : 0
              );
            }

            if (button) {
              tl.to(
                button,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                },
                title || image ? "-=0.3" : 0
              );
            }
          }
        }
      }, 400); // Wait for exit animation to complete
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary">
      {/* Back To Home Button */}
      <Link href={"/"}>
        <div className="absolute left-4 md:left-8 top-4 md:top-8 cursor-pointer z-20 bg-white/10 backdrop-blur-sm rounded-full w-10 h-10 flex justify-center items-center hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </div>
      </Link>

      {/* Navigation Buttons - Desktop (Right side) */}
      <div className="hidden md:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-3 md:gap-4">
        <button
          onClick={() => navigateProject("prev")}
          className={`transform transition-all duration-300 cursor-pointer ${
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
          className={`transform transition-all duration-300 cursor-pointer ${
            currentIndex === liveProjectData.length - 1
              ? "opacity-20 scale-90"
              : "opacity-100 hover:scale-110"
          }`}
          disabled={currentIndex === liveProjectData.length - 1}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 md:p-4 rounded-full hover:bg-white/20 transition-colors">
            <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </button>
      </div>

      {/* Navigation Buttons - Mobile (Bottom) */}
      <div className="md:hidden absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 z-20 flex flex-row gap-4 sm:gap-6">
        <button
          onClick={() => navigateProject("prev")}
          className={`transform transition-all duration-300 cursor-pointer ${
            currentIndex === 0
              ? "opacity-20 scale-90"
              : "opacity-100 hover:scale-110"
          }`}
          disabled={currentIndex === 0}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-8 h-8 text-white" />
          </div>
        </button>

        <button
          onClick={() => navigateProject("next")}
          className={`transform transition-all duration-300 cursor-pointer ${
            currentIndex === liveProjectData.length - 1
              ? "opacity-20 scale-90"
              : "opacity-100 hover:scale-110"
          }`}
          disabled={currentIndex === liveProjectData.length - 1}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full hover:bg-white/20 transition-colors">
            <ArrowRight className="w-8 h-8  text-white" />
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
            {/* Content Container */}
            <div className="project-content relative z-10 h-full flex flex-col items-center justify-center">
              <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center space-y-6 md:space-y-8">
                {/* Smaller Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight ">
                  {project.title}
                </h1>

                {/* Project Image */}
                <div className="project-image relative w-full max-w-4xl mx-auto rounded-sm overflow-hidden my-10">
                  <Link
                    href={project.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group cursor-pointer"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={1200}
                      height={600}
                      priority
                      style={{ objectFit: "cover" }}
                      className=" transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-colors duration-300"></div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm rounded-full p-4">
                        <SquareArrowOutUpRight className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Description */}
                <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto">
                  {project.description}
                </p>

                {/* Technologies Tags */}
                <div className="flex flex-wrap gap-3 justify-center max-w-2xl mx-auto">
                  {project.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 border border-white/20"
                    >
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={20}
                        height={20}
                      />
                      <span className="text-sm text-white font-medium">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="explore-button ">
                  <Button asChild size="lg">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Explore Project
                    </a>
                  </Button>
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
