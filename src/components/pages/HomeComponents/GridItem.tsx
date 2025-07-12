"use client";

import Link from "next/link";
import type { IGridItem } from "@/lib/HomeGrids";
import { ArrowUpRight, ArrowDown, Linkedin, Github, Mail } from "lucide-react";
import { usePageLoading } from "./HomeClient";

interface GridItemProps {
  item: IGridItem;
}

export default function GridItem({ item }: GridItemProps) {
  const { isLoading: pageLoading, handleGridItemClick } = usePageLoading();
  const sizeClasses = {
    huge: "col-span-2 row-span-1 h-[530px]",
    large: "col-span-2 row-span-1 h-[260px]",
    small: "col-span-1 row-span-1 h-[260px]",
    long: "col-span-1 row-span-1 h-[460px]",
  };

  const handleClick = (e: React.MouseEvent) => {
    if (item.link) {
      e.preventDefault();
      handleGridItemClick(item.link);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-xl border border-white/10 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01] ${sizeClasses[item.size]} ${item.id === "all-projects" ? "md:row-start-1 md:col-start-3" : ""} ${
        item.id === "profile" ? "md:row-start-2 md:col-start-3" : ""
      } ${pageLoading ? "pointer-events-none opacity-60 scale-95" : ""}`}
    >
      {item.link && (
        <Link
          href={item.link}
          className="absolute inset-0 z-50"
          aria-label={`Go to ${item.title}`}
          onClick={handleClick}
        />
      )}

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Background */}
      <div className={`absolute inset-0 ${item.background} backdrop-blur-sm`} />

      <div
        className={`relative z-10 h-full px-6 py-5 flex flex-col justify-between ${item.textColor} transition-all duration-300`}
      >
        {/* Top content */}
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-white/70 md:text-lg font-light opacity-85 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
            <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
          </div>
        </div>{" "}
        {/* Bottom content */}
        <div className="flex justify-between items-end">
          <div className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 rounded-xl px-6 py-3 border border-white/20 group-hover:border-white/40 shadow-md">
            <p className="font-semibold text-sm md:text-white/80 tracking-wide">
              {item.buttonText}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-xl md:text-2xl font-light opacity-50 group-hover:opacity-80 transition-all duration-300">
              {item.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle border effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
}
