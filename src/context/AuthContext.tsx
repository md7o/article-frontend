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

  const validateSession = useCallback(async () => {
    // Check if cookies exist before making the request
    if (!document.cookie || document.cookie.trim() === "") {
      setUser(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      return;
    }
    try {
      const token = localStorage.getItem("auth_token");
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const res = await fetch(`${API_URL}/auth/validateSession`, {
        credentials: "include",
        headers,
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        localStorage.setItem("auth_user", JSON.stringify(data));
      } else {
        const storedUser = localStorage.getItem("auth_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
        if (!storedUser) {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      }
    } catch {
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
      if (!storedUser) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      const storedUser = localStorage.getItem("auth_user");
      if (storedUser) setUser(JSON.parse(storedUser));
      await new Promise((r) => setTimeout(r, 100));
      await validateSession();
      setLoading(false);
    })();
  }, [validateSession]);

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
        localStorage.setItem("auth_user", JSON.stringify(user));
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
        const res = await fetch(`${API_URL}/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        });
        if (!res.ok)
          throw new Error(
            (await res.json().catch(() => ({}))).message || "Signup failed"
          );
        const { user, token } = await res.json();
        setUser(user);
        localStorage.setItem("auth_user", JSON.stringify(user));
        if (token) localStorage.setItem("auth_token", token);
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
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, validateSession, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
