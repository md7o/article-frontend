"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-3xl space-y-5">
      <p>Email: {user?.email}</p>
      <p>Username: {user?.username}</p>
    </div>
  );
}
