"use client";

import React, { useState } from "react";
import { Edit2, Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ArticleCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const Cards: React.FC<ArticleCardProps> = ({
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
    <div className="bg-primary rounded-lighter shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative ">
        {!imageError ? (
          <>
            {isLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={imageUrl}
              alt={title}
              // fill
              className={`wobject-cover transition-transform duration-300 group-hover:scale-105 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onError={() => {
                console.error("Failed to load image:", imageUrl);
                setImageError(true);
                setIsLoading(false);
              }}
              onLoad={() => setIsLoading(false)}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              onEdit?.();
            }}
            className="w-8 h-8 hover:opacity-80 cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center shadow-sm transform hover:scale-105 transition-transform"
          >
            <Edit2 size={16} className="text-blue-500" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete?.();
            }}
            className="w-8 h-8 hover:opacity-80 cursor-pointer bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center shadow-sm transform hover:scale-105 transition-transform"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1 group-hover:text-primary-dark transition-colors">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
        )}
        <span className="text-gray-400 text-xs">{date}</span>
      </div>
    </div>
  );
};

export default Cards;
