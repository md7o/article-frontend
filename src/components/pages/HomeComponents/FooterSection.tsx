"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export default function FooterSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-dark text-text-on-dark py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Mohammed Alheraki
            </h3>
            <p className="text-text-secondary mb-6 max-w-md">
              Full Stack Developer passionate about creating innovative
              solutions and beautiful user experiences. Always learning, always
              building.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-text-on-dark hover:text-primary hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://github.com/mohammedalheraki"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-text-on-dark hover:text-primary hover:bg-primary/10"
                asChild
              >
                <a
                  href="https://linkedin.com/in/mohammedalheraki"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-text-on-dark hover:text-primary hover:bg-primary/10"
                asChild
              >
                <a
                  href="mailto:mohammed.alheraki@example.com"
                  aria-label="Send Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-text-on-dark mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/articles"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="/live-projects"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Live Projects
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-text-on-dark mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-text-secondary">Web Development</span>
              </li>
              <li>
                <span className="text-text-secondary">UI/UX Design</span>
              </li>
              <li>
                <span className="text-text-secondary">
                  Full Stack Solutions
                </span>
              </li>
              <li>
                <span className="text-text-secondary">
                  Technical Consulting
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-surface-light pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm text-center md:text-left mb-4 md:mb-0">
            © {currentYear} Mohammed Alheraki. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <span className="text-text-secondary text-sm">
              Built with Next.js & ❤️
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="text-text-secondary hover:text-primary hover:bg-primary/10"
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              Top
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
