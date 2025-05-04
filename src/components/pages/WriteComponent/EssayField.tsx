"use client";

import dynamic from "next/dynamic";
import TitleField from "./WriteUi/TitleField";
import Link from "next/link";
import { CircleUserRound, Goal } from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
const ContentField = dynamic(() => import("./WriteUi/ContentField"), {
  ssr: false,
  loading: () => (
    <p className=" max-w-[40rem] mx-auto text-gray-300 p-5">
      Loading editor...
    </p>
  ),
});

export default function EssayField() {
  const { user, loading } = useContext(AuthContext);

  const iconStyle =
    "flex justify-center items-center bg-secondary rounded-fully w-16 h-16 hover:scale-95 hover:bg-active cursor-pointer duration-300";
  return (
    <>
      <header className="w-full max-w-[100rem] mb-5 mt-10 flex justify-between items-center bg-primary rounded-fully p-2 mx-auto">
        {/* Logo and Search (left side) */}
        <div className="flex items-center gap-1">
          <Link href={"/"}>
            <h1 className="text-2xl p-4 font-black bg-secondary rounded-fully whitespace-nowrap">
              WebSite LOGO
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation (right side) */}
        <div className="hidden md:flex items-center gap-2">
          {/* === Write === */}
          <Link href={"/write"}>
            <div
              className={`flex justify-center items-center ${iconStyle} hover:opacity-70 duration-200 gap-2 w-auto px-4 group`}
            >
              <Goal className="group-hover:animate-pulse" size={30} />

              <p className="text-xl">Publish</p>
            </div>
          </Link>

          {/* === Profile === */}
          <Link href={user ? "/profile" : "/login"}>
            <div className={`${iconStyle} gap-2 w-auto px-4`}>
              <CircleUserRound size={30} />

              {user && loading ? (
                <div className="fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-lg w-full z-50">
                  <div className="w-14 h-14 border-2 border-t-primary border-gray-300 rounded-fully animate-spin" />
                </div>
              ) : (
                <p className="text-xl">{user ? user.username : "Signup"}</p>
              )}
            </div>
          </Link>
        </div>
      </header>
      <TitleField label="Title" type="text" />
      <ContentField label="Insert your creativity" />
    </>
  );
}
