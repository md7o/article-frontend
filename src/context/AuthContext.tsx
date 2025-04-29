"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type User = { email: string; username: string };
export interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;               // ← add loading state
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  me: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,                  // initial loading
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  me: async () => {},
});

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);   // ← loading starts true
  const router = useRouter();

  const me = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser({ email: data.email, username: data.username });
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);                          // ← turn off loading
    }
  }, []);

  // 🔔 call me() once when provider mounts
  useEffect(() => {
    me();
  }, [me]);

  // ✅ 2. Login
  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // <=== send cookie
      });

      if (!res.ok) throw new Error("Login failed");

      const { user } = await res.json();
      setUser(user);

      router.push("/");
    },
    [router]
  );

  // ✅ 3. Signup
  const signup = useCallback(
    async (data: SignupData) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Signup failed");

      const { user } = await res.json();
      setUser(user);

      router.push("/");
    },
    [router]
  );
  

  // ✅ 4. Logout (call backend to clear cookie)
  const logout = useCallback(async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include", // <--- to send cookie so backend can clear it
    });

    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, me, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
