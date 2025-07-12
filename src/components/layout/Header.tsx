"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function Header() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="w-full flex justify-start gap-2 items-center p-4">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center justify-center cursor-pointer bg-surface-alt hover:opacity-60 hover:-translate-y-1 rounded-sm px-4 py-2 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span>Back</span>
      </button>

      {/* Home Button */}
      <Link
        href="/"
        className="flex items-center justify-center bg-surface-alt  hover:opacity-60 hover:-translate-y-1 rounded-sm px-4 py-2 transition-all duration-300"
      >
        <Home className="w-5 h-5 mr-2" />
        <span>Home</span>
      </Link>
    </header>
  );
}
