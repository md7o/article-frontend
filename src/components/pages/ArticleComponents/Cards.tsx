"use client";

import React, { useState } from "react";
import { Edit2, Trash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/shadcn/dialog";

// Separate component for the card content (image + text)
const CardContent: React.FC<{
  imageUrl: string;
  title: string;
  description?: string;
  date: string;
  imageError: boolean;
  isLoading: boolean;
  setImageError: (error: boolean) => void;
  setIsLoading: (loading: boolean) => void;
}> = ({
  imageUrl,
  title,
  description,
  date,
  imageError,
  isLoading,
  setImageError,
  setIsLoading,
}) => (
  <>
    {/* Image Container */}
    <div className=" relative aspect-video overflow-hidden m-5 group-hover:scale-[102%] duration-300">
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
    </div>

    {/* Content */}
    <div className="pb-5 px-5 space-y-1 flex flex-col gap-2 transition-all duration-300 group-hover:translate-y-[-1px]">
      <p className="text-md text-light-span  transition-colors">By Mohammed</p>
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
  </>
);

interface ArticleCardProps {
  imageUrl: string;
  title: string;
  description?: string;
  date: string;
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
  articleSlug?: string;
  onArticleClick?: () => void;
  isNavigating?: boolean;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  title,
  description,
  date,
  onEdit,
  onDelete,
  showActions = true,
  articleSlug,
  onArticleClick,
  isNavigating = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeleteDialog(false);
    if (onDelete) {
      onDelete();
    }
  };

  const handleArticleClick = (e: React.MouseEvent) => {
    if (articleSlug && onArticleClick) {
      e.preventDefault();
      onArticleClick();
    }
  };

  return (
    <div
      className={`group bg-surface-alt rounded-sm overflow-hidden flex flex-col hover:ring-1 hover:ring-accent transition-all duration-300 relative ${
        isNavigating ? "pointer-events-none opacity-75" : ""
      }`}
    >
      {/* Action Buttons - Positioned absolutely to be outside Link */}
      {showActions && (onEdit || onDelete) && (
        <div className="absolute top-7 right-7 flex gap-2 z-10">
          {onEdit && (
            <Button
              size={"icon"}
              variant="dark"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit();
              }}
              className="hover:scale-110"
              aria-label="Edit article"
            >
              <Edit2
                size={16}
                className="text-accent hover:text-accent-hover"
              />
            </Button>
          )}
          {onDelete && (
            <Button
              size={"icon"}
              variant="dark"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDeleteDialog(true);
              }}
              className=" hover:scale-110"
              aria-label="Delete article"
            >
              <Trash2 size={16} className="text-red-400 hover:text-red-300" />
            </Button>
          )}
        </div>
      )}

      {/* Main Content - Clickable div with navigation loading */}
      {articleSlug ? (
        <div
          onClick={handleArticleClick}
          className="flex flex-col flex-1 cursor-pointer"
        >
          <CardContent
            imageUrl={imageUrl}
            title={title}
            description={description}
            date={date}
            imageError={imageError}
            isLoading={isLoading}
            setImageError={setImageError}
            setIsLoading={setIsLoading}
          />
        </div>
      ) : (
        <CardContent
          imageUrl={imageUrl}
          title={title}
          description={description}
          date={date}
          imageError={imageError}
          isLoading={isLoading}
          setImageError={setImageError}
          setIsLoading={setIsLoading}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Article</DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to delete "{title}"? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleDeleteConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArticleCard;
