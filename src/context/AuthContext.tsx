"use client";

import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

export type User = {
  email: string;
  username: string;
  id?: string;
  role?: string;
};
export interface SignupData {
  username: string;
  email: string;
  password: string;
  adminSecret: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  validateSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  validateSession: async () => {},
});

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Initialize auth state from cookie
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await validateSession();
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const validateSession = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/auth/validateSession`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser({
          email: data.email,
          username: data.username,
          id: data.id,
          role: data.role,
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (!res.ok) throw new Error("Login failed");

        const { user } = await res.json();
        setUser(user);
        router.push("/");
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signup = useCallback(
    async (data: SignupData) => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/auth/admin/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          const errorMessage = errorData.message || "Signup failed";
          throw new Error(errorMessage);
        }

        const { user } = await res.json();
        setUser(user);
        router.push("/");
      } catch (error) {
        console.error("Signup error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, validateSession, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
