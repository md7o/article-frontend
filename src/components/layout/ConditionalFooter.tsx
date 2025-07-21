"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const path = usePathname();

  // Pages where footer should NOT appear
  const hiddenPages = [
    "/",
    "/contact",
    "/live-projects",
    "/education-experiences",
    "/about",
    "/articles",
    "/write",
    "/admin/login",
    "/admin/signup",
  ];

  // Check if current path should hide footer
  if (hiddenPages.includes(path)) {
    return null;
  }

  return <Footer />;
}
