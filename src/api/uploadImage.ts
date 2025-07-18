const uploadImage = async (file: File): Promise<string> => {
  try {
    // Validate file
    if (!file.type.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error("File size exceeds 5MB limit");
    }

    // Check authentication
    const isAuthenticated = await validateAuth();
    if (!isAuthenticated) {
      throw new Error("Authentication failed. Please log in and try again.");
    }

    // Upload file
    const formData = new FormData();
    formData.append("image", file);

    console.log("Uploading image:", {
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
      type: file.type,
    });

    // Upload endpoint - using Supabase storage via backend
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    const response = await fetch(`${baseUrl}/articles/upload`, {
      method: "POST",
      body: formData,
      credentials: "include", // Include cookies for authentication
    });

    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      Object.fromEntries(response.headers.entries())
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Upload failed with status:", response.status);
      console.error("Error response:", errorText);
      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError);
      const responseText = await response.text();
      console.error("Raw response:", responseText);
      throw new Error(`Invalid JSON response from server: ${responseText}`);
    }

    console.log("Upload response data:", data);

    // Check for URL in the response (Supabase storage URL)
    if (!data.url && !data.publicUrl && !data.imageUrl && !data.path) {
      console.error("Server response missing URL:", data);
      console.error("Expected properties: url, publicUrl, imageUrl, or path");
      throw new Error(
        `Server response missing URL. Received: ${JSON.stringify(data)}`
      );
    }

    // Return the URL in order of preference
    return data.url || data.publicUrl || data.imageUrl || data.path;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

// Helper function to validate authentication before upload
const validateAuth = async (): Promise<boolean> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/auth/validateSession`, {
      credentials: "include",
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const getImageUrl = (imageUrl: string) => {
  if (!imageUrl) return "/assets/images/bg.jpg";

  // If it's already a full URL (Supabase storage or any CDN), return it directly
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // Fallback for local files (if needed)
  const cleanFilename = imageUrl.split("/").pop() || imageUrl;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  return `${baseUrl}/uploads/${cleanFilename}`;
};

export default uploadImage;
