import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "spinner" | "banner";
  position?: "top" | "bottom";
}

// Loading component with spinner and banner stripe variants
export default function LoadingSpinner({
  size = "md",
  className = "",
  variant = "banner",
  position = "top",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: variant === "banner" ? "h-0.5" : "w-4 h-4",
    md: variant === "banner" ? "h-0.5" : "w-6 h-6",
    lg: variant === "banner" ? "h-0.5" : "w-8 h-8",
  };

  const positionClasses = {
    top: "top-0",
    bottom: "bottom-0",
  };

  if (variant === "banner") {
    return (
      <div
        className={`fixed ${positionClasses[position]} left-0 w-full ${sizeClasses[size]}  backdrop-blur-sm overflow-hidden z-50 ${className}`}
        role="progressbar"
        aria-label="Loading..."
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent to-transparent animate-stripe-slide"
          style={{
            animation: "stripe-slide 2.5s linear infinite",
          }}
        />
      </div>
    );
  }

  // Fallback spinner variant
  return (
    <div
      className={`inline-block animate-spin rounded-full border-4 border-accent border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading..."
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
