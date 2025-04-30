"use client";

import { Input } from "../ui/shadcn/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleHalfStroke,
  faHeart,
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Header() {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in</div>;

  const iconStyle =
    "flex justify-center items-center bg-secondary rounded-full w-16 h-16 hover:scale-95 hover:bg-active cursor-pointer duration-300";

  return (
    <header className="w-[100rem] mb-5 mt-10 flex justify-between items-center bg-primary rounded-full p-2 mx-auto">
      <div className="flex items-center gap-1">
        <h1 className="text-2xl p-4 font-black bg-secondary rounded-full">
          WebSite LOGO
        </h1>
        <Input
          placeholder="Search blogs..."
          icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className={iconStyle}>
          <FontAwesomeIcon icon={faHeart} className="text-xl" />
        </div>
        <div className={iconStyle}>
          <FontAwesomeIcon icon={faCircleHalfStroke} className="text-xl" />
        </div>

        <div className={`${iconStyle} gap-2 w-auto px-4`}>
          <FontAwesomeIcon
            icon={faUser}
            className="p-4 rounded-full bg-secondary text-xl"
          />
          <h1>{user?.username}</h1>
        </div>

        <button
          // variant="ghost"
          onClick={logout}
          className="flex items-center gap-2 text-white hover:text-red-500"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </header>
  );
}
