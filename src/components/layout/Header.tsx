"use client";

import { Input } from "../ui/custom/InputField";

import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { CircleUserRound, Palette, Hexagon } from "lucide-react";

export default function Header() {
  const { user, loading, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const headerPharagraph = [
    { text: "Search", link: "" },
    { text: "About", link: "/about" },
    { text: "Write", link: "/write" },
  ];

  const iconStyle =
    "flex justify-center items-center bg-secondary rounded-fully w-16 h-16 hover:scale-95 hover:bg-active cursor-pointer duration-300";

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header className="w-full flex justify-around items-center p-2 my-5">
        {/* Logo and Search (left side) */}
        <div className="flex items-center gap-1">
          <Link href={"/"}>
            <Hexagon
              size={50}
              className="hover:text-light-span hover:scale-95 duration-300 "
            />
          </Link>
        </div>{" "}
        <div className="flex gap-5 text-lg ">
          {headerPharagraph
            .filter((item) => {
              // Hide "Write" option if user is not logged in
              if (item.text === "Write" && !user) {
                return false;
              }
              return true;
            })
            .map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="relative pb-2 hover:text-accent transition-colors duration-300"
              >
                {item.text}
                <span className="absolute top-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100 rounded-b-lg" />
              </Link>
            ))}

          {/* Show Login button if user is not authenticated */}
          {!user && !loading && (
            <Link
              href="/admin/login"
              className="relative pb-2 hover:text-accent transition-colors duration-300 text-accent font-medium"
            >
              Login
              <span className="absolute top-0 left-0 w-full h-0.5 bg-accent origin-left scale-x-0 transition-transform duration-300 hover:scale-x-100 rounded-b-lg" />
            </Link>
          )}
        </div>
        {/* Mobile Menu Button (only visible on mobile) */}
        <button
          className="md:hidden p-4 rounded-fully bg-secondary text-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {/* <FontAwesomeIcon icon={isMobileMenuOpen ? faX : faBars} /> */}
        </button>
      </header>

      {/*========================================================================================================================================= */}
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
              {/* <FontAwesomeIcon icon={faX} className="text-xl" /> */}
            </button>
          </div>

          <div className="flex flex-col gap-4 flex-grow">
            <div className="mb-4">
              <Input
                placeholder="Search blogs..."
                // icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              />
            </div>

            <button className={`${iconStyle} justify-start gap-4 w-full px-4`}>
              <Palette fill="white" className="text-xl" />
              <span>Theme</span>
            </button>

            {user && (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-4 text-white hover:text-red-500 p-4"
              >
                {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
