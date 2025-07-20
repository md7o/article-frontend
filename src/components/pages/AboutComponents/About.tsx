"use client";

import Link from "next/link";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Compass,
  Target,
  FileText,
} from "lucide-react";
import Image from "next/image";

const sections = [
  {
    id: 1,
    title: "About Me",
    subtitle: "Developer",
    description:
      "Hi, I’m Mohammed — a passionate web developer who enjoys building clean, fast, and modern websites. I specialize in creating responsive interfaces and scalable backends using tools like React, Next.js, TypeScript, and NestJS.",
    image: "/assets/images/profile.jpg",
  },
  {
    id: 2,
    title: "My Journey",
    subtitle: "The Road So Far",
    description:
      "My journey in software development began with a strong curiosity for building digital experiences. Over time, I’ve worked on diverse projects that sharpened my understanding of what makes software intuitive, reliable, and impactful.",
    image: <Compass />,
  },
  {
    id: 3,
    title: "Vision & Goals",
    subtitle: "Looking Forward",
    description:
      "I believe in continuous learning and growth. My goal is to contribute to projects that not only challenge me but also have a positive impact on users. I’m excited about the future of web technologies and aim to be at the forefront of innovation.",
    image: <Target />,
  },
];

interface AboutProps {
  useIcon?: boolean; // Boolean to toggle between image and icon
}

export default function About({ useIcon = false }: AboutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  const navigateSection = (direction: "next" | "prev") => {
    const nextIndex =
      direction === "next"
        ? Math.min(currentIndex + 1, sections.length - 1)
        : Math.max(currentIndex - 1, 0);

    if (nextIndex !== currentIndex) {
      // Fade out current content
      const currentSection = sectionRefs.current[currentIndex];
      if (currentSection) {
        const content = currentSection.querySelector(".section-content");
        const title = content?.querySelector(".title-group");
        const image = content?.querySelector(".profile-image");
        const description = content?.querySelector(".description");

        if (title && image && description) {
          gsap
            .timeline()
            .to(title, {
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
              description,
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

      // Update index after animation
      setTimeout(() => {
        setCurrentIndex(nextIndex);

        // Fade in new content
        const nextSection = sectionRefs.current[nextIndex];
        if (nextSection) {
          const content = nextSection.querySelector(".section-content");
          const title = content?.querySelector(".title-group");
          const image = content?.querySelector(".profile-image");
          const description = content?.querySelector(".description");

          if (title && image && description) {
            gsap.set([title, image, description], { opacity: 0 });
            gsap.set(title, { y: direction === "next" ? 30 : -30 });
            gsap.set(image, { scale: 0.95 });
            gsap.set(description, { y: direction === "next" ? -30 : 30 });

            gsap
              .timeline()
              .to(title, {
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
                description,
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
      }, 400);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div>
        {/* Back To Home Button */}
        <Link href={"/"}>
          <div className="absolute left-4 md:left-8 top-4 md:top-8 cursor-pointer z-20 bg-white/10 backdrop-blur-sm rounded-sm w-10 h-10 flex justify-center items-center hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-6 h-6 text-white" />
          </div>
        </Link>

        {/* Cv Button */}
        <Link href={"/cv"}>
          <div className="absolute right-4 md:right-8 top-4 md:top-8 cursor-pointer z-20 bg-white/10 backdrop-blur-sm rounded-sm p-2 flex justify-center items-center hover:bg-white/20 transition-colors">
            <FileText className="w-6 h-6 text-white" />
            <span className="ml-2">CV Preview</span>
          </div>
        </Link>
      </div>

      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg1/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg1/50 to-bg1" />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3 md:gap-4">
        <button
          onClick={() => navigateSection("prev")}
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
          onClick={() => navigateSection("next")}
          className={`transform transition-all duration-300 ${
            currentIndex === sections.length - 1
              ? "opacity-20 scale-90"
              : "opacity-100 hover:scale-110"
          }`}
          disabled={currentIndex === sections.length - 1}
        >
          <div className="bg-white/10 backdrop-blur-sm p-2 md:p-4 rounded-full hover:bg-white/20 transition-colors">
            <ArrowDown className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </button>
      </div>

      {/* Sections Container */}
      <div className="relative w-full h-full">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => setSectionRef(el, index)}
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Section Content */}
            <div className="section-content relative z-10 h-full flex flex-col items-center justify-center">
              <div className="container mx-auto px-4 md:px-6 lg:px-8 text-center space-y-8 md:space-y-12">
                {/* Title Group */}
                <div className="title-group space-y-4">
                  <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white tracking-tight">
                    {section.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-300">
                    {section.subtitle}
                  </p>
                </div>

                {/* Profile Image */}
                <div className="profile-image relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-2xl">
                  {useIcon || typeof section.image !== "string" ? (
                    <div className="w-full h-full bg-white/10 flex items-center justify-center">
                      <div className="text-accent scale-[7]">
                        {section.image}
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={section.image}
                      alt={section.title}
                      width={800}
                      height={800}
                      priority
                      className="object-cover"
                    />
                  )}
                </div>

                {/* Description */}
                <div className="description max-w-3xl mx-auto">
                  <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Progress Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 md:w-2 h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6 md:w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
