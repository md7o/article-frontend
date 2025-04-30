"use client";

import { Input } from "../ui/shadcn/InputField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleHalfStroke,
  faHeart,
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
  faBars,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Header() {
  const { user, loading, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const iconStyle =
    "flex justify-center items-center bg-secondary rounded-fully w-16 h-16 hover:scale-95 hover:bg-active cursor-pointer duration-300";

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header className="w-full max-w-[100rem] mb-5 mt-10 flex justify-between items-center bg-primary rounded-fully p-2 mx-auto">
        {/* Logo and Search (left side) */}
        <div className="flex items-center gap-1">
          <h1 className="text-2xl p-4 font-black bg-secondary rounded-fully whitespace-nowrap">
            WebSite LOGO
          </h1>
          <div className="hidden md:block">
            <Input
              placeholder="Search blogs..."
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            />
          </div>
        </div>

        {/* Desktop Navigation (right side) */}
        <div className="hidden md:flex items-center gap-2">
          <div className={iconStyle}>
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
          </div>
          <div className={iconStyle}>
            <FontAwesomeIcon icon={faCircleHalfStroke} className="text-xl" />
          </div>

          <Link href={user ? "/profile" : "/login"}>
            <div className={`${iconStyle} gap-2 w-auto px-4`}>
              <FontAwesomeIcon
                icon={faUser}
                className="p-4 rounded-fully bg-secondary text-xl"
              />
              {loading ? (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-80 backdrop-blur-sm w-full z-50 overflow-y-auto">
                  <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="w-14 h-14 border-2 border-t-primary border-gray-300 rounded-fully animate-spin" />
                  </div>
                </div>
              ) : (
                <h1>{user ? user?.username : "Signup"}</h1>
              )}
            </div>
          </Link>

          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-2 text-white hover:text-red-500"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button (only visible on mobile) */}
        <button
          className="md:hidden p-4 rounded-fully bg-secondary text-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faX : faBars} />
        </button>
      </header>

      {/* Mobile Menu (slides in from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-fully"
            >
              <FontAwesomeIcon icon={faX} className="text-xl" />
            </button>
          </div>

          <div className="flex flex-col gap-4 flex-grow">
            <div className="mb-4">
              <Input
                placeholder="Search blogs..."
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              />
            </div>

            <button className={`${iconStyle} justify-start gap-4 w-full px-4`}>
              <FontAwesomeIcon icon={faHeart} className="text-xl" />
              <span>Favorites</span>
            </button>

            <button className={`${iconStyle} justify-start gap-4 w-full px-4`}>
              <FontAwesomeIcon icon={faCircleHalfStroke} className="text-xl" />
              <span>Theme</span>
            </button>

            <Link href={user ? "/profile" : "/login"}>
              <div className={`${iconStyle} justify-start gap-4 w-full px-4`}>
                <FontAwesomeIcon
                  icon={faUser}
                  className="p-4 rounded-fully bg-secondary text-xl"
                />
                {loading ? (
                  <div className="w-5 h-5 border-2 border-t-primary border-gray-300 rounded-fully animate-spin" />
                ) : (
                  <span>{user ? user?.username : "Signup"}</span>
                )}
              </div>
            </Link>

            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 text-white hover:text-red-500 p-4"
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
