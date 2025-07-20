const uploadImage = async (file: File): Promise<string> => {
  // Validate file type and size
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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/articles/upload`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${response.status} ${errorText}`);
  }

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  // Return the URL in order of preference
  return data.url || data.publicUrl || data.imageUrl || data.path;
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
  if (!imageUrl) return "/assets/images/NoImage.png";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const cleanFilename = imageUrl.split("/").pop() || imageUrl;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  return `${baseUrl}/uploads/${cleanFilename}`;
};

export default uploadImage;
