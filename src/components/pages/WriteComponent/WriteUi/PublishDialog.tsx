"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Loader2, ImageIcon } from "lucide-react";
import uploadImage from "@/lib/uploadImage";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (imageFilename: string) => void;
  isSubmitting: boolean;
  title: string;
  content: string;
}

export default function PublishDialog({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting,
  title,
  content,
}: PublishDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        console.log("Selected file:", file.name);
        setSelectedFile(file);
        try {
          setIsUploading(true);
          console.log("Starting upload...");
          const filename = await uploadImage(file);
          console.log("Upload successful, filename:", filename);
          setUploadedFilename(filename);
        } catch (error) {
          console.error("Failed to upload image:", error);
          alert("Failed to upload image. Please try again.");
          setSelectedFile(null);
        } finally {
          setIsUploading(false);
        }
      }
    },
    []
  );

  const handlePublish = useCallback(() => {
    if (uploadedFilename) {
      onConfirm(uploadedFilename);
    }
  }, [uploadedFilename, onConfirm]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6 rounded-2xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Select Cover Image
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Choose a cover image for your article
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col items-center">
          <div className="relative w-full min-h-[12rem] max-h-[24rem] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center hover:border-gray-400 transition-all duration-300 hover:shadow-md">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
            />
            {selectedFile ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={
                    uploadedFilename
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${uploadedFilename}`
                      : URL.createObjectURL(selectedFile)
                  }
                  alt="Preview"
                  className="max-w-full max-h-[20rem] rounded-lg object-contain shadow-lg transition-transform duration-300"
                />
                {isUploading ? (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedFile(null);
                      setUploadedFilename(null);
                    }}
                    className="absolute top-2 right-2 bg-gray-800/70 text-white rounded-full hover:bg-gray-900/90 transition-all duration-200 hover:scale-110 z-20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center text-gray-400 p-8">
                <ImageIcon className="h-12 w-12 mb-3" />
                <p className="mb-2 text-sm font-medium">
                  Click or drag image here
                </p>
                <span className="text-xs opacity-75">PNG, JPG up to 5MB</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-1">Title</p>
            <p className="text-lg font-semibold">{title}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-1">Content</p>
            <p className="line-clamp-3">{content}</p>
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting || isUploading}
            className="hover:bg-gray-100 transition-all duration-200 hover:scale-[0.98] active:scale-95"
          >
            Cancel
          </Button>
          <Button
            disabled={!uploadedFilename || isSubmitting || isUploading}
            onClick={handlePublish}
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
