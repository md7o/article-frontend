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
      <DialogContent className="max-w-3xl w-full p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-6 border-b border-gray-100">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            🚀 Ready to Publish?
          </DialogTitle>
          <p className="text-gray-500 mt-2">
            Review your article before publishing
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Title Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800">Article Title</h3>
            </div>
            <p className="text-lg text-gray-700 font-medium leading-relaxed">
              {title || "Untitled Article"}
            </p>
          </div>

          {/* Content Preview Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800">Content Preview</h3>
            </div>
            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {content.content?.[0]?.content?.[0]?.text ||
                "No content available"}
            </p>
          </div>

          {/* Cover Image Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-800">Cover Image</h3>
              <span className="text-red-500 text-sm">*Required</span>
            </div>

            <div className="space-y-4">
              {/* File Input */}
              <div className="relative">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploading}
                  className="file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-blue-50 file:to-blue-100 file:text-blue-700 hover:file:from-blue-100 hover:file:to-blue-200 file:cursor-pointer border-2 border-dashed border-gray-200 hover:border-blue-300 transition-all duration-300 p-6 bg-gray-50/50 hover:bg-blue-50/50"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: JPG, PNG, GIF (Max 5MB)
                </p>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative group">
                  <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-green-800 mb-1">
                        Image Preview
                      </p>
                      <p className="text-sm text-green-700 mb-2">
                        {selectedImage?.name ||
                          (existingCoverImage
                            ? `${existingCoverImage}`
                            : "Uploaded image")}
                      </p>
                      {selectedImage && (
                        <p className="text-xs text-green-600">
                          Size: {(selectedImage.size / 1024 / 1024).toFixed(2)}{" "}
                          MB
                        </p>
                      )}
                    </div>
                    {uploadedFilename && (
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-700">
                          Uploaded
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Upload Status */}
              {isUploading && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Uploading image...
                    </p>
                    <p className="text-xs text-blue-600">
                      Please wait while we process your image
                    </p>
                  </div>
                </div>
              )}

              {/* Success Status */}
              {uploadedFilename && !isUploading && (
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Image uploaded successfully!
                    </p>
                    <p className="text-xs text-green-600">
                      Your cover image is ready for publishing
                    </p>
                  </div>
                </div>
              )}

              {/* Error Status */}
              {uploadError && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">
                        Upload failed
                      </p>
                      <p className="text-xs text-red-600">{uploadError}</p>
                    </div>
                  </div>

                  {/* Show login button for authentication errors */}
                  {(uploadError.includes("Authentication") ||
                    uploadError.includes("Session") ||
                    uploadError.includes("401")) && (
                    <Button
                      onClick={handleAuthError}
                      variant="outline"
                      className="w-full border-red-200 text-red-700 hover:bg-red-50 hover:border-red-300"
                    >
                      🔐 Login Again
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSubmitting || isUploading}
            className="px-8 py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-[0.98] active:scale-95 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            disabled={!uploadedFilename || isSubmitting || isUploading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white transition-all duration-200 
              hover:from-blue-700 hover:to-blue-800 hover:scale-[0.98] active:scale-95 
              disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:from-gray-400 disabled:to-gray-500
              shadow-lg hover:shadow-xl rounded-xl font-medium relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div className="relative flex items-center">
              {(isSubmitting || isUploading) && (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              )}
              {isUploading
                ? "Uploading..."
                : isSubmitting
                  ? "Publishing..."
                  : "🚀 Publish Article"}
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
