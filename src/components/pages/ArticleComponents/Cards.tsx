"use client";

import React, { useState } from "react";
import { Edit2, Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/shadcn/button";

interface ArticleCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  title,
  description,
  date,
  onEdit,
  onDelete,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="group bg-surface-alt rounded-sm overflow-hidden flex flex-col hover:ring-1 hover:ring-accent transition-all duration-300 ">
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden m-5 hover:scale-[102%] duration-300">
        {!imageError ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-600 border-t-accent rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`object-cover rounded-sm transition-all duration-500 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onError={() => {
                setImageError(true);
                setIsLoading(false);
              }}
              onLoadingComplete={() => setIsLoading(false)}
              priority
            />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700/50 transition-all duration-300 group-hover:bg-gray-600/50">
            <ImageIcon className="w-12 h-12 text-gray-500 group-hover:text-gray-400 transition-colors" />
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <Button
            size={"icon"}
            variant="transparency"
            onClick={(e) => {
              e.preventDefault();
              onEdit?.();
            }}
            className="hover:scale-110"
            aria-label="Edit article"
          >
            <Edit2 size={16} className="text-accent hover:text-accent-hover" />
          </Button>
          <Button
            size={"icon"}
            variant="transparency"
            onClick={(e) => {
              e.preventDefault();
              onDelete?.();
            }}
            className=" hover:scale-110"
            aria-label="Delete article"
          >
            <Trash2 size={16} className="text-red-400 hover:text-red-300" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-5 px-5 space-y-1 flex flex-col gap-2 transition-all duration-300 group-hover:translate-y-[-1px]">
        <p className="text-md text-light-span  transition-colors">
          By Mohammed
        </p>
        <h1 className="text-2xl font-semibold line-clamp-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-light-span line-clamp-2 group-hover:text-gray-300 transition-colors">
            {description}
          </p>
        )}
        <p className="text-md text-light-span mt-auto group-hover:text-gray-400 transition-colors">
          {date}
        </p>
      </div>
    </div>
  );
};

export default ArticleCard;
