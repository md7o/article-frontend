"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const path = usePathname();
  if (path === "/write") {
    return null;
  }
  return <Header />;
}
