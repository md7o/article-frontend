const uploadImage = async (file: File) => {
  try {
    // Validate file size (5MB limit)
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > MAX_SIZE) {
      throw new Error("File size exceeds 5MB limit");
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    const formData = new FormData();
    formData.append("image", file);

    console.log("Uploading image:", {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      type: file.type,
    });

    // Upload endpoint
    const response = await fetch("http://localhost:4000/articles/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      });
      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("Upload successful:", data);

    // Check for filename in the response
    if (!data.filename) {
      console.error("Server response missing filename:", data);
      throw new Error("Server response missing filename");
    }

    return data.filename;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

export const getImageUrl = (filename: string) => {
  if (!filename) return "/assets/images/bg.jpg";
  // Make sure the filename doesn't include the full URL
  const cleanFilename = filename.split("/").pop() || filename;
  // Use the images endpoint for retrieving images
  return `http://localhost:4000/images/${cleanFilename}`;
};

export default uploadImage;
