"use client";

import { useState, useEffect } from "react";
import { Code2, Sparkles, Monitor, Server, Database, Wrench } from "lucide-react";

// Frontend Technologies
const frontendTechnologies = [
  {
    name: "React",
    src: "/assets/images/React.png",
    description: "Building interactive UIs",
  },
  {
    name: "Next.js",
    src: "/assets/images/nextjs.png",
    description: "Full-stack React framework",
  },
  {
    name: "Tailwind CSS",
    src: "/assets/images/tailwind.png",
    description: "Utility-first CSS",
  },
];

// Backend Technologies
const backendTechnologies = [
  {
    name: "Node.js",
    src: "/assets/images/nodejs.png",
    description: "Server-side JavaScript",
  },
];

// Database Technologies
const databaseTechnologies = [
  {
    name: "MongoDB",
    src: "/assets/images/mongo.png",
    description: "NoSQL database",
  },
];

// Other Technologies
const otherTechnologies = [
  {
    name: "Flutter",
    src: "/assets/images/flutter.png",
    description: "Cross-platform mobile",
  },
];

// Additional skills by category
const additionalSkills = {
  frontend: ["TypeScript", "JavaScript", "Vue.js", "HTML5", "CSS3"],
  backend: ["Express.js", "NestJS", "Python", "REST APIs", "GraphQL"],
  database: ["PostgreSQL", "MySQL", "Redis", "Firebase"],
  other: ["Docker", "AWS", "Git", "Figma", "VS Code"]
};

export default function SkillsSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [visibleSkills, setVisibleSkills] = useState<number[]>([]);

  // All skills combined for animation
  const allAdditionalSkills = [
    ...additionalSkills.frontend,
    ...additionalSkills.backend,
    ...additionalSkills.database,
    ...additionalSkills.other
  ];

  // Stagger animation for skills
  useEffect(() => {
    const timer = setTimeout(() => {
      allAdditionalSkills.forEach((_, index) => {
        setTimeout(() => {
          setVisibleSkills((prev) => [...prev, index]);
        }, index * 100);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const renderTechCard = (tech: any, index: number) => (
    <div
      key={tech.name}
      className="group relative"
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setHoveredTech(tech.name)}
      onMouseLeave={() => setHoveredTech(null)}
    >
      <div className="bg-surface-elevated rounded-2xl p-6 border border-surface-light hover:border-accent/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up">
        {/* Tech Image */}
        <div className="w-16 h-16 mx-auto mb-4 relative">
          <img
            src={tech.src}
            alt={tech.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.classList.remove('hidden');
                fallback.classList.add('flex');
              }
            }}
          />
          {/* Fallback */}
          <div className="hidden w-full h-full bg-accent/20 rounded-lg items-center justify-center">
            <span className="text-accent font-bold text-lg">
              {tech.name.slice(0, 2)}
            </span>
          </div>
        </div>
        
        {/* Tech Name */}
        <h3 className="text-white font-semibold text-center text-sm mb-1">
          {tech.name}
        </h3>

        {/* Hover Description */}
        {hoveredTech === tech.name && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-black/90 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20 animate-fade-in">
            {tech.description}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      className="py-20 bg-surface-alt relative overflow-hidden"
      id="skills"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Tech Stack
              </h2>
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <p className="text-light-span text-lg max-w-2xl mx-auto">
              Technologies I love working with
            </p>
          </div>

          {/* Frontend Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Monitor className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold text-white">Frontend</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {frontendTechnologies.map((tech, index) => renderTechCard(tech, index))}
            </div>
            <div className="flex flex-wrap gap-2">
              {additionalSkills.frontend.map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-elevated rounded-full text-light-span hover:text-white hover:bg-accent/20 text-sm transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Server className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold text-white">Backend</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {backendTechnologies.map((tech, index) => renderTechCard(tech, index))}
            </div>
            <div className="flex flex-wrap gap-2">
              {additionalSkills.backend.map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-elevated rounded-full text-light-span hover:text-white hover:bg-accent/20 text-sm transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Database Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Database className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold text-white">Database</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {databaseTechnologies.map((tech, index) => renderTechCard(tech, index))}
            </div>
            <div className="flex flex-wrap gap-2">
              {additionalSkills.database.map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-elevated rounded-full text-light-span hover:text-white hover:bg-accent/20 text-sm transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Other Technologies Section */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Wrench className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-semibold text-white">Other Technologies</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
              {otherTechnologies.map((tech, index) => renderTechCard(tech, index))}
            </div>
            <div className="flex flex-wrap gap-2">
              {additionalSkills.other.map((skill, index) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface-elevated rounded-full text-light-span hover:text-white hover:bg-accent/20 text-sm transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full border border-accent/20">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-accent font-medium">Always learning & exploring new tech</span>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
