'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export type User = { email: string };

export interface SignupData { username: string; email: string; password: string; }

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
}


export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { email } = JSON.parse(atob(token.split('.')[1]));
      setUser({ email });
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const { access_token } = await res.json();
    localStorage.setItem('token', access_token);
    const { email: e } = JSON.parse(atob(access_token.split('.')[1]));
    setUser({ email: e });
    router.push('/dashboard');
  }

  async function signup(data: SignupData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Signup failed');
    const { access_token } = await res.json();
    localStorage.setItem('token', access_token);
    const { email } = JSON.parse(atob(access_token.split('.')[1]));
    setUser({ email });
    router.push('/dashboard');
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}
