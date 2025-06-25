"use client";

import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  MapPin,
  Coffee,
} from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";

export default function HeroSection() {
  const { isVisible, typingText, scrollToNext, downloadCV } =
    useHeroAnimation();

  return (
    <section className="min-h-screen flex items-center justify-center ">
      <div className="container mx-auto px-4 text-center">
        <div
          className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Profile Image */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-accent shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/images/profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/128x128?text=Profile";
                }}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Hi, I'm <span className="text-accent">Mohammed</span>
            </h1>

            <div className="h-16 flex items-center justify-center">
              <h2 className="text-xl md:text-2xl text-light-span font-medium">
                I'm a{" "}
                <span className="text-accent font-semibold transition-all duration-500">
                  {typingText}
                  <span className="animate-pulse">|</span>
                </span>
              </h2>
            </div>

            <p className="text-lg text-light-span max-w-2xl mx-auto leading-relaxed">
              Passionate about creating beautiful, functional, and user-centered
              digital experiences. I bring ideas to life through clean code and
              thoughtful design.
            </p>

            {/* Location & Status */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-light-span">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Based in Saudi</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available for work</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-accent" />
                <span>Coffee enthusiast</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                className="bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() =>
                  document
                    .getElementById("skills")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
              </Button>

              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={downloadCV}
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-8">
              <a
                href="https://github.com/mohammedalheraki"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface-elevated hover:bg-accent transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://linkedin.com/in/mohammedalheraki"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-surface-elevated hover:bg-accent transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
              <a
                href="mailto:mohammed.alheraki@example.com"
                className="p-3 rounded-full bg-surface-elevated hover:bg-accent transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                aria-label="Send Email"
              >
                <Mail className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <button
          onClick={scrollToNext}
          className="animate-bounce p-2 rounded-full bg-surface-elevated hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>
  );
}
