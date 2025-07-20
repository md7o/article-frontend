"use client";

interface PageWithLoadingProps {
  children: React.ReactNode;
}

export default function PageWithLoading({ children }: PageWithLoadingProps) {
  return <>{children}</>;
}
