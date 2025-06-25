const uploadImage = async (file: File) => {
  try {
    // Validate authentication first
    const isAuthenticated = await validateAuth();
    if (!isAuthenticated) {
      throw new Error("Authentication failed. Please log in and try again.");
    }

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
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    // Debug: Check if cookies are being sent
    console.log("Making request to:", `${baseUrl}/articles/upload`);
    console.log("Request credentials:", "include");

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
      console.error("Upload failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: `${baseUrl}/articles/upload`,
      });

      // Check if it's specifically a 401 error
      if (response.status === 401) {
        console.error("Authentication failed - user may need to log in again");
      }

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

// Helper function to validate authentication before upload
const validateAuth = async () => {
  try {
    // Debug cookies before making request
    debugCookies();

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
    const response = await fetch(`${baseUrl}/auth/validateSession`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Auth validation response:", response.status);

    if (!response.ok) {
      console.error(
        "Auth validation failed:",
        response.status,
        response.statusText
      );
      const errorText = await response.text();
      console.error("Auth error details:", errorText);
      return false;
    }

    const userData = await response.json();
    console.log("User authenticated:", userData);
    return true;
  } catch (error) {
    console.error("Auth validation error:", error);
    return false;
  }
};

// Debug function to check cookies
const debugCookies = () => {
  console.log("Current document cookies:", document.cookie);
  console.log(
    "All cookies:",
    document.cookie.split(";").map((c) => c.trim())
  );
};

export const getImageUrl = (filename: string) => {
  if (!filename) return "/assets/images/bg.jpg";
  // Make sure the filename doesn't include the full URL
  const cleanFilename = filename.split("/").pop() || filename;
  // Use the articles/images endpoint for retrieving images to match backend
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  return `${baseUrl}/articles/images/${cleanFilename}`;
};

export { validateAuth };
export default uploadImage;
