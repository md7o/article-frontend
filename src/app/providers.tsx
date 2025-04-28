// app/providers.tsx
import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
