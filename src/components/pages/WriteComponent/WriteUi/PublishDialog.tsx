"use client";

import { useRef, useState, useCallback, useContext, useEffect } from "react";
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
import { AuthContext } from "@/context/AuthContext";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (imageFilename: string) => void;
  isSubmitting: boolean;
  title: string;
  content: JSONContent;
  existingCoverImage?: string;
}

export default function PublishDialog({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting,
  title,
  content,
  existingCoverImage,
}: PublishDialogProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { user, validateSession, logout } = useContext(AuthContext);

  // Initialize with existing cover image when in edit mode
  useEffect(() => {
    if (existingCoverImage) {
      setUploadedFilename(existingCoverImage);
      // Set preview to the full URL for existing images
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      setImagePreview(`${baseUrl}/articles/images/${existingCoverImage}`);
    } else {
      // Reset state when creating new article
      setUploadedFilename(null);
      setImagePreview(null);
      setSelectedImage(null);
    }
  }, [existingCoverImage, open]);

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setUploadError(null);

      if (file) {
        // Validate file size (5MB limit)
        const MAX_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
          setUploadError("File size must be less than 5MB");
          return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
          setUploadError("Please select an image file");
          return;
        }

        console.log("Selected file:", file.name);
        setSelectedImage(file);

        // Create image preview with proper error handling
        try {
          const previewUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              if (e.target?.result) {
                resolve(e.target.result as string);
              } else {
                reject(new Error("Failed to read file"));
              }
            };
            reader.onerror = () => {
              reject(new Error("Error reading file"));
            };
            reader.readAsDataURL(file);
          });
          setImagePreview(previewUrl);
        } catch (previewError) {
          console.error("Failed to create image preview:", previewError);
          setUploadError("Failed to preview image");
          return;
        }

        try {
          setIsUploading(true);

          // Check if user is authenticated
          if (!user) {
            throw new Error("You must be logged in to upload images");
          }

          // Validate session before upload to ensure fresh authentication
          try {
            await validateSession();
          } catch (sessionError) {
            console.error("Session validation failed:", sessionError);
            throw new Error("Session expired. Please log in again.");
          }

          console.log("Starting upload...");
          const filename = await uploadImage(file);
          console.log("Upload successful, filename:", filename);
          setUploadedFilename(filename);
        } catch (error) {
          console.error("Failed to upload image:", error);
          console.log("Current user:", user);
          console.log("Error details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            type: error?.constructor?.name,
            stack: error instanceof Error ? error.stack : undefined,
          });

          let errorMessage = "Failed to upload image. Please try again.";

          if (error instanceof Error) {
            if (
              error.message.includes("401") ||
              error.message.includes("Unauthorized")
            ) {
              errorMessage =
                "Authentication failed. Please log out and log back in.";
            } else if (error.message.includes("Session expired")) {
              errorMessage = "Your session has expired. Please log in again.";
            } else if (error.message.includes("413")) {
              errorMessage = "File too large. Please select a smaller image.";
            } else if (error.message.includes("403")) {
              errorMessage =
                "Permission denied. You don't have access to upload images.";
            } else if (error.message.includes("500")) {
              errorMessage = "Server error. Please try again later.";
            } else {
              errorMessage = error.message;
            }
          }

          setUploadError(errorMessage);
          setSelectedImage(null);
          setImagePreview(null);
        } finally {
          setIsUploading(false);
        }
      } else {
        setSelectedImage(null);
        setImagePreview(null);
        setUploadedFilename(null);
      }
    },
    [user, validateSession]
  );
  const handlePublish = useCallback(async () => {
    if (!uploadedFilename) {
      setUploadError("Please upload a cover image first");
      return;
    }

    try {
      await onConfirm(uploadedFilename);
      if (!isSubmitting && !isUploading) {
        router.push("/articles");
      }
    } catch (error) {
      console.error("Failed to publish article:", error);
      setUploadError("Failed to publish article. Please try again.");
    }
  }, [uploadedFilename, onConfirm, router, isSubmitting, isUploading]);

  const resetDialog = useCallback(() => {
    setSelectedImage(null);
    setUploadError(null);
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Only reset image state if not in edit mode with existing cover image
    if (!existingCoverImage) {
      setUploadedFilename(null);
      setImagePreview(null);
    }
  }, [existingCoverImage]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !existingCoverImage) {
        resetDialog();
      }
      onOpenChange(open);
    },
    [onOpenChange, resetDialog, existingCoverImage]
  );

  const handleAuthError = useCallback(async () => {
    try {
      await logout();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
      router.push("/admin/login");
    }
  }, [logout, router]);

  // Cleanup effect to handle component unmount
  useEffect(() => {
    return () => {
      // Cleanup any pending operations
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm min-w-80 w-full mx-4 p-6 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-white/10 shadow-2xl [&>button]:hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-white gap-2">
            🚀 Publish Article
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title Preview */}
          <div className="bg-surface-elevated p-3 rounded-sm border border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full "></div>
              <span className="text-xs font-medium text-[var(--color-light-span)] uppercase tracking-wide ">
                Title
              </span>
            </div>
            <p className="font-medium text-light-span text-sm line-clamp-2 break-words overflow-hidden">
              {title || "Untitled Article"}
            </p>
          </div>

          {/* Content Preview */}
          <div className="bg-[var(--color-surface-elevated)] p-3 rounded-[var(--radius-sm)] border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full flex-shrink-0"></div>
              <span className="text-xs font-medium text-[var(--color-light-span)] uppercase tracking-wide">
                Content
              </span>
            </div>
            <p className="text-sm text-[var(--color-light-span)] leading-relaxed line-clamp-2 break-words overflow-hidden">
              {content.content?.[0]?.content?.[0]?.text ||
                "No content available"}
            </p>
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Cover Image
              </span>
              <span className="text-xs text-red-400">Required</span>
            </div>

            {imagePreview ? (
              /* Image Preview with Replace Option */
              <div className="relative bg-[var(--color-surface-elevated)] p-3 rounded-[var(--radius-sm)] border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-sm overflow-hidden border border-white/10">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {selectedImage?.name ||
                        (existingCoverImage ? existingCoverImage : "Uploaded")}
                    </p>
                    {selectedImage && (
                      <p className="text-xs text-[var(--color-light-span)]">
                        {(selectedImage.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    )}
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={isUploading}
                      className="mt-1 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-[var(--color-accent)] file:text-white hover:file:bg-[var(--color-accent-hover)] file:cursor-pointer border-0 p-0 bg-transparent text-transparent"
                    />
                  </div>
                  {uploadedFilename && (
                    <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full"></div>
                  )}
                </div>
              </div>
            ) : (
              /* Initial File Input */
              <div className="border border-white/10 bg-[var(--color-surface-elevated)] rounded-sm px-5 py-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploading}
                  className=" border-3 border-dotted file:text-white hover:bg-white/30 cursor-pointer  text-white "
                />
                <p className="text-xs text-[var(--color-light-span)] mt-2">
                  Max 5MB • JPG, PNG, GIF
                </p>
              </div>
            )}

            {/* Status Messages */}
            {isUploading && (
              <div className="flex items-center gap-2 text-sm text-[var(--color-accent)]">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Uploading...</span>
              </div>
            )}

            {uploadError && (
              <div className="space-y-2">
                <div className="text-sm text-red-400 bg-red-400/10 p-2 rounded border border-red-400/20">
                  {uploadError}
                </div>
                {(uploadError.includes("Authentication") ||
                  uploadError.includes("Session") ||
                  uploadError.includes("401")) && (
                  <Button
                    onClick={handleAuthError}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-red-400/30 text-red-400 hover:bg-red-400/10"
                  >
                    Login Again
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting || isUploading}
            className="flex-1 "
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!uploadedFilename || isSubmitting || isUploading}
            className="flex-1 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-[var(--radius-sm)] disabled:opacity-50 disabled:bg-[var(--color-light-span)]"
          >
            {(isSubmitting || isUploading) && (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            )}
            {isUploading
              ? "Uploading..."
              : isSubmitting
                ? "Publishing..."
                : "Publish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
