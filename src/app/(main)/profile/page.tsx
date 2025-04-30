"use client";

import AccountComponent from "@/components/settings/Account";
import AppearanceComponent from "@/components/settings/Appearance";
import ProfileComponent from "@/components/settings/Profile";
import { Calendar, Home, Moon, User } from "lucide-react";
import { useState, useEffect, JSX } from "react";

const items = [
  { title: "Profile", component: <ProfileComponent />, icon: Home },
  { title: "Account", component: <AccountComponent />, icon: User },
  { title: "Appearance", component: <AppearanceComponent />, icon: Moon },
];

export default function Profile() {
  const [activeComponent, setActiveComponent] = useState<JSX.Element>(
    items[0].component
  );

  return (
    <div className=" flex items-center justify-center">
      {/* Sidebar */}
      <nav className=" w-52 overflow-hidden">
        <div className="px-4 py-5 ">
          <span className=" text-xl font-semibold">Settings</span>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.title}>
              <button
                onClick={() => setActiveComponent(item.component)}
                className="w-full text-left flex items-center gap-3 px-4 py-2 rounded-lighter cursor-pointer hover:bg-primary transition"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-80 p-6 bg-[hsl(var(--color-bg1))] text-[hsl(var(--color-text))]">
        {activeComponent}
      </div>
    </div>
  );
}
