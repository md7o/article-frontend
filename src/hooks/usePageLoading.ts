"use client";

import { useState } from "react";

export function usePageLoadingState() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const withLoading = async (asyncFunction: () => Promise<void>) => {
    try {
      startLoading();
      await asyncFunction();
    } catch (error) {
      console.error("Error during loading operation:", error);
    } finally {
      stopLoading();
    }
  };

  const navigateWithLoading = (url: string, timeout: number = 3000) => {
    startLoading();
    
    // Auto-reset loading state after timeout as fallback
    const timer = setTimeout(() => {
      stopLoading();
    }, timeout);

    // Navigate
    window.location.href = url;

    // Clean up timer if component unmounts
    return () => clearTimeout(timer);
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
    navigateWithLoading,
  };
}
