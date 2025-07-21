"use client";

import Image from "next/image";
import Link from "next/link";
import { Linkedin, Github, Mail, Phone } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mohammed-alheraki-6bb97b247/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/md7o",
      icon: Github,
    },
    {
      name: "Email",
      href: "mailto:md7ohe@gmail.com",
      icon: Mail,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/0551227021",
      icon: Phone,
    },
  ];

  return (
    <footer className="w-full   mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: Logo and Website Name */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
              <Image
                src="/assets/images/Logo.png"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-lg md:text-xl">
                Mohammed Alheraki
              </span>
              <span className="text-light-span text-sm">
                Full Stack Developer
              </span>
            </div>
          </div>

          {/* Right: Social Media Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-surface-elevated hover:bg-accent hover:text-white rounded-sm transition-all duration-300 hover:-translate-y-1"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-4 pt-4 border-t border-surface-elevated text-center">
          <p className="text-light-span text-sm">
            © {new Date().getFullYear()} Mohammed Alheraki. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
