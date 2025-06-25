"use client";

import Link from "next/link";
import type { IGridItem } from "@/lib/HomeGrids";
import { ArrowUpRight, ArrowDown, Linkedin, Github, Mail } from "lucide-react";

interface GridItemProps {
  item: IGridItem;
}

export default function GridItem({ item }: GridItemProps) {
  const sizeClasses = {
    huge: "col-span-2 row-span-1 h-[540px]",
    large: "col-span-2 row-span-1 h-[270px]",
    small: "col-span-1 row-span-1 h-[270px]",
    long: "col-span-1 row-span-1 h-[540px]",
  };

  return (
    <div
      className={`relative overflow-hidden rounded-md group cursor-pointer shadow-md hover:-translate-y-2 hover:opacity-80 duration-300 ${sizeClasses[item.size]} ${item.id === "all-projects" ? "md:row-start-1 md:col-start-3" : ""} ${
        item.id === "profile" ? "md:row-start-2 md:col-start-3" : ""
      }`}
    >
      {item.link && (
        <Link
          href={item.link}
          className="absolute inset-0 z-50"
          aria-label={`Go to ${item.title}`}
        />
      )}
      <div
        className={`absolute inset-0 px-10 py-6 flex flex-col justify-between ${item.background} ${item.textColor} bg-opacity-30 group duration-200`}
      >
        {/* Top content */}
        <div className="space-y-4">
          <ArrowUpRight className="absolute right-6 text-2xl w-14 h-14 group-hover:scale-125 duration-200" />
          <h3 className="pt-5 text-3xl font-light">{item.title}</h3>
          {item.description && (
            <p className="text-4xl font-light">{item.description}</p>
          )}
        </div>

        {/* Bottom content */}
        <div className="space-y-4 flex justify-between items-center">
          <button className="bg-white group-hover:bg-black text-black group-hover:text-white duration-200 cursor-pointer rounded-full w-[15rem] p-1 flex justify-between items-center">
            <p className="text-lg px-4 font-medium">{item.buttonText}</p>
            <ArrowDown
              className="bg-black group-hover:bg-white rounded-full text-white group-hover:text-black p-2 "
              size={40}
            />
          </button>

          <p className="lg:text-4xl text-3xl font-extralight">{item.tag}</p>
        </div>
      </div>
    </div>
  );
}
