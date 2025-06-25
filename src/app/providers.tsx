import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ArticlesProvider } from "@/context/ArticlesContext";
// import other providers here...

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ArticlesProvider>{children}</ArticlesProvider>
    </AuthProvider>
  );
}
