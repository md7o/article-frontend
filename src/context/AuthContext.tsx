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
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const TOKEN_KEY = "token";

/** Decode JWT payload into our User shape */
function decodeToken(token: string): User | null {
  try {
    const [, payload] = token.split(".");
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const { email, username } = JSON.parse(atob(base64));
    return { email, username };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Initialize user from token
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userData = token && decodeToken(token);
    if (userData) {
      setUser(userData);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Login failed");

      const { access_token: token } = await res.json();
      const userData = decodeToken(token);
      if (!userData) throw new Error("Invalid token");

      localStorage.setItem(TOKEN_KEY, token);
      setUser(userData);
      router.push("/");
    },
    [router]
  );

  const signup = useCallback(
    async (data: SignupData) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Signup failed");

      const { access_token: token, user: returnedUser } = await res.json();
      const userData = returnedUser ?? decodeToken(token);
      if (!userData) throw new Error("Invalid server response");

      localStorage.setItem(TOKEN_KEY, token);
      setUser(userData);
      router.push("/");
    },
    [router]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
