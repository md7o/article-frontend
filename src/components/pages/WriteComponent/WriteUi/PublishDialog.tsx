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
import uploadImage, { getImageUrl } from "@/api/uploadImage";
import { useRouter } from "next/navigation";
import { JSONContent } from "@tiptap/react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

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

  useEffect(() => {
    if (existingCoverImage) {
      setUploadedFilename(existingCoverImage);
      setImagePreview(getImageUrl(existingCoverImage));
    } else {
      setUploadedFilename(null);
      setImagePreview(null);
      setSelectedImage(null);
    }
  }, [existingCoverImage, open]);

  const resetDialog = useCallback(() => {
    setSelectedImage(null);
    setUploadError(null);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!existingCoverImage) {
      setUploadedFilename(null);
      setImagePreview(null);
    }
  }, [existingCoverImage]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open && !existingCoverImage) resetDialog();
      onOpenChange(open);
    },
    [onOpenChange, resetDialog, existingCoverImage]
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setUploadError(null);
      // Don't upload here, just validate and preview
      if (!file) {
        setSelectedImage(null);
        setImagePreview(null);
        setUploadedFilename(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setUploadError("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setUploadError("Please select an image file");
        return;
      }
      setSelectedImage(file);
      setUploadedFilename(null);
      try {
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.onerror = () => setUploadError("Failed to preview image");
        reader.readAsDataURL(file);
      } catch {
        setUploadError("Failed to preview image");
        return;
      }
    },
    []
  );

  const handlePublish = useCallback(async () => {
    // If no uploadedFilename, but selectedImage exists, upload now
    if (!uploadedFilename && selectedImage) {
      setIsUploading(true);
      try {
        if (!user) throw new Error("You must be logged in to upload images");
        await validateSession();
        const filename = await uploadImage(selectedImage);
        setUploadedFilename(filename);
        await onConfirm(filename);
        if (!isSubmitting) router.push("/articles");
      } catch (error: unknown) {
        let msg = "Failed to upload image. Please try again.";
        if (
          typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as { message?: string }).message === "string"
        ) {
          const message = (error as { message: string }).message;
          if (message.includes("401") || message.includes("Unauthorized"))
            msg = "Authentication failed. Please log out and log back in.";
          else if (message.includes("Session expired"))
            msg = "Your session has expired. Please log in again.";
          else if (message.includes("413"))
            msg = "File too large. Please select a smaller image.";
          else if (message.includes("403"))
            msg = "Permission denied. You don't have access to upload images.";
          else if (message.includes("500"))
            msg = "Server error. Please try again later.";
          else msg = message;
        }
        setUploadError(msg);
        setSelectedImage(null);
        setImagePreview(null);
      }
      setIsUploading(false);
      return;
    }
    // If no image at all
    if (!uploadedFilename) {
      setUploadError("Please upload a cover image first");
      return;
    }
    try {
      await onConfirm(uploadedFilename);
      if (!isSubmitting) router.push("/articles");
    } catch {
      setUploadError("Failed to publish article. Please try again.");
    }
  }, [
    uploadedFilename,
    selectedImage,
    onConfirm,
    router,
    isSubmitting,
    user,
    validateSession,
  ]);

  const handleAuthError = useCallback(async () => {
    try {
      await logout();
    } finally {
      router.push("/admin/login");
    }
  }, [logout, router]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:"))
        URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const renderImageInput = () => (
    <Input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      disabled={isUploading}
      className={
        imagePreview
          ? "file:py-2 file:px-5 file:rounded-full file:border-0 file:text-xs file:bg-accent file:text-white hover:file:from-[var(--color-accent-hover)] hover:file:to-[var(--color-accent)] file:cursor-pointer file:transition-all file:duration-300 file:shadow-lg hover:file:shadow-xl file:hover:scale-105 file:transform file:uppercase file:tracking-wider border-0 p-0 bg-transparent text-transparent cursor-pointer group"
          : "border-1 border-dotted file:text-white hover:bg-white/30 cursor-pointer text-white"
      }
    />
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-sm min-w-80 w-full mx-4 p-6 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-white/10 shadow-2xl [&>button]:hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-bold text-white gap-2">
            🚀 Publish Article
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-surface-elevated p-3 rounded-sm border border-white/10 flex-shrink-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full" />
              <span className="text-xs font-medium text-[var(--color-light-span)] uppercase tracking-wide">
                Title
              </span>
            </div>
            <p className="font-medium text-light-span text-sm line-clamp-2 break-words overflow-hidden max-w-sm overflow-x-auto">
              {title || "Untitled Article"}
            </p>
          </div>
          <div className="bg-surface-elevated p-3 rounded-sm border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full flex-shrink-0" />
              <span className="text-xs font-medium text-[var(--color-light-span)] uppercase tracking-wide">
                Content
              </span>
            </div>
            <p className="text-sm text-light-span leading-relaxed line-clamp-2 break-words truncate overflow-clip max-w-sm overflow-x-auto">
              {content.content?.[0]?.content?.[0]?.text ||
                "No content available"}
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">
                Cover Image
              </span>
              <span className="text-xs text-red-400">Required</span>
            </div>
            {imagePreview ? (
              <div className="relative bg-gradient-to-br from-[var(--color-surface-elevated)] to-[var(--color-surface-elevated)]/80 p-5 rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-white/30 backdrop-blur-sm">
                <div className="flex items-center gap-5">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/20 relative shadow-2xl bg-gradient-to-br from-white/10 to-white/5 group-hover:border-[var(--color-accent)]/50 transition-all duration-300">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        sizes="96px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] rounded-full border-2 border-white/20 shadow-lg flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full animate-pulse" />
                        <p className="text-sm text-white font-bold truncate tracking-wide max-w-[15rem] line-clamp-2">
                          {selectedImage?.name ||
                            existingCoverImage ||
                            "Cover Image"}
                        </p>
                      </div>
                      {selectedImage && (
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-[var(--color-light-span)] bg-gradient-to-r from-white/10 to-white/5 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 border border-white/10 shadow-sm">
                            <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                            {(selectedImage.size / 1024).toFixed(1).length <= 4
                              ? `${(selectedImage.size / 1024).toFixed(1)} KB`
                              : `${(selectedImage.size / 1024 / 1024).toFixed(2)} MB`}
                          </div>
                          <div className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                            ✓ Uploaded
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative">
                      {renderImageInput()}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-white/10 bg-[var(--color-surface-elevated)] rounded-sm px-5 py-2">
                {renderImageInput()}
                <p className="text-xs text-[var(--color-light-span)] mt-2">
                  Max 5MB • JPG, PNG, GIF
                </p>
              </div>
            )}
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
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            className="flex-1 bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] rounded-[var(--radius-sm)] disabled:opacity-50 disabled:bg-[var(--color-light-span)]"
          >
            {/* Show loading spinner if submitting or uploading */}
            {(isSubmitting || isUploading) && (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            )}
            {/* Button text changes based on state */}
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
