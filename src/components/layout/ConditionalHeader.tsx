"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const path = usePathname();
  if (path === "/write") {
    return null;
  } else if (path === "/") {
    return null;
  } else if (path === "/projects") {
    return null;
  } else if (path === "/live-projects") {
    return null;
  } else if (path === "/about") {
    return null;
  } else if (path === "/admin/login") {
    return null;
  } else if (path === "/admin/signup") {
    return null;
  }
  return <Header />;
}
