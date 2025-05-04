"use client";

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function ProfileComponent() {
  const { user } = useContext(AuthContext);

  return (
    <div className="">
      <div className=" ">
        <h1 className="text-2xl mb-2">Profile Dashboard</h1>
        <p>{user?.username}</p>
        <p>{user?.email}</p>
      </div>
    </div>
  );
}
