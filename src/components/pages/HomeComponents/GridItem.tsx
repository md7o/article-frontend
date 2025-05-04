"use client";

import Link from "next/link";
import type { IGridItem } from "@/lib/HomeGrids";
import { ArrowUpRight, ArrowDown, Linkedin, Github, Mail } from "lucide-react";

interface GridItemProps {
  item: IGridItem;
}

// type SocialLink = {
//   name: string;
//   socialLink: string;
//   icon: React.ReactNode;
// };

export default function GridItem({ item }: GridItemProps) {
  const sizeClasses = {
    huge: "col-span-2 row-span-1 h-[510px]",
    large: "col-span-2 row-span-1 h-[300px]",
    medium: "col-span-1 row-span-1 h-[300px]",
    small: "col-span-1 row-span-1 h-[200px]",
  };

  // const socialLinks: SocialLink[] = [
  //   {
  //     name: "LinkedIn",
  //     socialLink: "https://www.linkedin.com/in/mohammed-alheraki-6bb97b247/",
  //     icon: <Linkedin />,
  //   },
  //   {
  //     name: "GitHub",
  //     socialLink: "https://github.com/md7o",
  //     icon: <Github aria-hidden="true" />,
  //   },
  //   {
  //     name: "Email",
  //     socialLink: "mailto:eyadfilm99@gmail.com",
  //     icon: <Mail />,
  //   },
  // ];

  return (
    <div
      className={`relative overflow-hidden rounded-light group cursor-pointer hover:opacity-80 duration-200  ${
        sizeClasses[item.size]
      } ${item.id === "all-projects" ? "md:row-start-1 md:col-start-3" : ""} ${
        item.id === "profile" ? "md:row-start-2 md:col-start-3" : ""
      }`}
    >
      <Link
        href={`/profile`}
        className="absolute inset-0"
        aria-label={`Go to ${item.title}`}
      />
      <div
        className={`absolute inset-0 px-10 py-6 flex flex-col justify-between ${item.background} ${item.textColor} bg-opacity-30 group duration-200`}
      >
        {/* Top content */}
        <div className="space-y-4">
          <ArrowUpRight className="absolute right-6 text-2xl w-14 h-14 group-hover:scale-125 duration-200" />
          <h3 className="pt-10 text-3xl font-light">{item.title}</h3>
          {item.description && (
            <p className="text-5xl font-light">{item.description}</p>
          )}
        </div>

        {/* Bottom content */}
        <div className="space-y-4 flex justify-between items-center">
          <button className="bg-white group-hover:bg-black text-black group-hover:text-white duration-200 cursor-pointer rounded-fully w-[15rem] p-1 flex justify-between items-center">
            <p className="text-lg px-4 font-medium">{item.buttonText}</p>
            <ArrowDown
              className="bg-black group-hover:bg-white rounded-fully text-white group-hover:text-black p-2 "
              size={40}
            />
          </button>

          <p className="lg:text-4xl text-3xl font-extralight">{item.tag}</p>

          {/* {item.id === "blogs" && (
            <div className="flex space-x-3 ">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-400/90 hover:bg-red-400/50 backdrop-blur-sm rounded-full px-5 h-10 flex items-center justify-center transition-all duration-300"
                  aria-label={social.name}
                  onClick={(e) => e.stopPropagation()}
                >
                  {social.icon}
                  <span className="px-1">{social.name}</span>
                </a>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
