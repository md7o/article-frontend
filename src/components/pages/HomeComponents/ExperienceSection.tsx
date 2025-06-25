"use client";

import { useState } from "react";
import { ExternalLink, Github, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

const experiences = [
  {
    id: 1,
    company: "Tech Solutions Inc",
    position: "Senior Full Stack Developer",
    period: "Jan 2023 - Present",
    location: "Remote",
    type: "Full-time",
    description:
      "Lead development of web applications using React, Node.js, and MongoDB. Collaborated with cross-functional teams to deliver high-quality software solutions.",
    technologies: ["React", "Node.js", "MongoDB", "TypeScript", "AWS"],
    achievements: [
      "Increased application performance by 40%",
      "Led a team of 5 developers",
      "Implemented CI/CD pipelines",
    ],
  },
  {
    id: 2,
    company: "Digital Agency Pro",
    position: "Frontend Developer",
    period: "Jun 2021 - Dec 2022",
    location: "New York, NY",
    type: "Full-time",
    description:
      "Developed responsive web applications and collaborated with design teams to create pixel-perfect user interfaces.",
    technologies: ["React", "Next.js", "Tailwind CSS", "JavaScript"],
    achievements: [
      "Delivered 15+ client projects",
      "Improved code quality standards",
      "Mentored junior developers",
    ],
  },
  {
    id: 3,
    company: "StartupXYZ",
    position: "Full Stack Developer",
    period: "Mar 2020 - May 2021",
    location: "San Francisco, CA",
    type: "Contract",
    description:
      "Built the entire web platform from scratch using modern technologies and best practices.",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Docker"],
    achievements: [
      "Built MVP in 3 months",
      "Implemented real-time features",
      "Optimized database queries",
    ],
  },
];

const education = [
  {
    id: 1,
    institution: "University of Technology",
    degree: "Bachelor of Computer Science",
    period: "2016 - 2020",
    location: "California, USA",
    description:
      "Focused on software engineering, algorithms, and data structures.",
    gpa: "3.8/4.0",
  },
  {
    id: 2,
    institution: "Code Academy",
    degree: "Full Stack Web Development Bootcamp",
    period: "2019",
    location: "Online",
    description:
      "Intensive 6-month program covering modern web development technologies.",
    gpa: "95%",
  },
];

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState("experience");

  return (
    <section className="py-20 bg-base" id="experience">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Experience & <span className="text-accent">Education</span>
            </h2>
            <p className="text-light-span text-lg max-w-2xl mx-auto">
              My professional journey and educational background
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-surface-elevated rounded-full p-1">
              <button
                onClick={() => setActiveTab("experience")}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "experience"
                    ? "bg-accent text-white shadow-lg"
                    : "text-light-span hover:text-white"
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab("education")}
                className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === "education"
                    ? "bg-accent text-white shadow-lg"
                    : "text-light-span hover:text-white"
                }`}
              >
                Education
              </button>
            </div>
          </div>

          {/* Experience Content */}
          {activeTab === "experience" && (
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="bg-surface-alt p-8 rounded-xl border border-surface-elevated hover:border-accent transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {exp.position}
                      </h3>
                      <h4 className="text-accent font-semibold text-lg mb-3">
                        {exp.company}
                      </h4>
                      <p className="text-light-span leading-relaxed mb-4">
                        {exp.description}
                      </p>
                    </div>

                    <div className="lg:ml-8 lg:text-right">
                      <div className="flex items-center text-light-span mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-light-span mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                      <span className="inline-block bg-accent px-3 py-1 rounded-full text-white text-sm font-medium">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h5 className="text-white font-semibold mb-3">
                      Technologies Used:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-surface-elevated px-3 py-1 rounded-full text-accent text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="text-white font-semibold mb-3">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start text-light-span"
                        >
                          <span className="text-accent mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Content */}
          {activeTab === "education" && (
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div
                  key={edu.id}
                  className="bg-surface-alt p-8 rounded-xl border border-surface-elevated hover:border-accent transition-all duration-300 transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {edu.degree}
                      </h3>
                      <h4 className="text-accent font-semibold text-lg mb-3">
                        {edu.institution}
                      </h4>
                      <p className="text-light-span leading-relaxed">
                        {edu.description}
                      </p>
                    </div>

                    <div className="lg:ml-8 lg:text-right mt-4 lg:mt-0">
                      <div className="flex items-center text-light-span mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {edu.period}
                      </div>
                      <div className="flex items-center text-light-span mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        {edu.location}
                      </div>
                      <span className="inline-block bg-accent px-3 py-1 rounded-full text-white text-sm font-medium">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button
              className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={() => window.open("/resume.pdf", "_blank")}
            >
              View Full Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
