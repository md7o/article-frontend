"use client";

import { useRef, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Loader2 } from "lucide-react";
import uploadImage from "@/api/uploadImage";
import { useRouter } from "next/navigation";
import { JSONContent } from "@tiptap/react";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (imageFilename: string) => void;
  isSubmitting: boolean;
  title: string;
  content: JSONContent;
}

export default function PublishDialog({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting,
  title,
  content,
}: PublishDialogProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        console.log("Selected file:", file.name);
        setSelectedImage(file);
        try {
          setIsUploading(true);
          console.log("Starting upload...");
          const filename = await uploadImage(file);
          console.log("Upload successful, filename:", filename);
          setUploadedFilename(filename);
        } catch (error) {
          console.error("Failed to upload image:", error);
          alert("Failed to upload image. Please try again.");
          setSelectedImage(null);
        } finally {
          setIsUploading(false);
        }
      }
    },
    []
  );
  const handlePublish = useCallback(async () => {
    if (uploadedFilename) {
      await onConfirm(uploadedFilename);
      if (!isSubmitting && !isUploading) {
        router.push("/articles");
      }
    }
  }, [uploadedFilename, onConfirm, router, isSubmitting, isUploading]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-full p-6 rounded-lighter truncate">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Publish Article
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 truncate">
          <h3 className="font-semibold mb-1">Title</h3>
          <p className="truncate max-w-full text-gray-600">{title}</p>
        </div>

        <div className="mt-4 truncate">
          <h3 className="font-semibold mb-1">Content Preview</h3>
          <p className=" text-gray-600">
            {content.content?.[0]?.content?.[0]?.text || "No content"}
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-1">Cover Image</h3>
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1"
          />
          {selectedImage && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {selectedImage.name}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="hover:bg-gray-100 transition-all duration-200 hover:scale-[0.98] active:scale-95"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!selectedImage || isSubmitting}
            className="relative flex items-center bg-button text-white transition-all duration-200 
              hover:bg-button/90 hover:scale-[0.98] active:scale-95 
              disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100
              shadow-sm hover:shadow-md"
          >
            {(isSubmitting || isUploading) && (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            )}
            {isUploading ? "Uploading..." : "Publish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
