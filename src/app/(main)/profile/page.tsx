"use client";

import AccountComponent from "@/components/pages/settings/Account";
import AppearanceComponent from "@/components/pages/settings/Appearance";
import ProfileComponent from "@/components/pages/settings/Profile";
import { AuthContext } from "@/context/AuthContext";
import { Home, Moon, User, LogOut } from "lucide-react";
import { useState, JSX, useContext } from "react";

const items = [
  { title: "Profile", component: <ProfileComponent />, icon: Home },
  { title: "Account", component: <AccountComponent />, icon: User },
  { title: "Appearance", component: <AppearanceComponent />, icon: Moon },
];

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(
    items[0].component
  );
  const { logout } = useContext(AuthContext);

  return (
    <div className=" flex items-start justify-center">
      {/* Sidebar */}
      <nav className=" w-44 overflow-hidden border-r h-[30rem] flex flex-col">
        <div className="px-4 pb-5 ">
          <span className=" text-xl font-semibold">Settings</span>
        </div>
        <ul className="flex-1 flex flex-col overflow-y-auto">
          <div>
            {items.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => setActiveComponent(item.component)}
                  className="w-ful text-lg text-left flex items-center gap-3 px-4 py-2 rounded-lighter cursor-pointer hover:bg-primary transition"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </div>
          <button
            onClick={() => logout()}
            className="mt-auto flex w-full items-center gap-3 px-4 py-2 rounded-lighter cursor-pointer text-red-300 30 hover:bg-red-300/40 transition"
          >
            <LogOut className="w-5 h-5" />
            <p>Logout</p>
          </button>
        </ul>
      </nav>

      <div className="w-80 p-6 bg-[hsl(var(--color-bg1))] text-[hsl(var(--color-text))]">
        {activeComponent}
      </div>
    </div>
  );
}
