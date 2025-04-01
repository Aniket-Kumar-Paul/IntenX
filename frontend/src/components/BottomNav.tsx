"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ReceiptText, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <Home size={26} /> },
  {
    name: "Transactions", path: "/transactions", icon: <ReceiptText size={26} />,
  },
  { name: "Sentiments", path: "/sentiments", icon: <Activity size={26} /> },
];

const BottomNav = () => {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      {isLoggedIn && (
        <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#2a2a34] rounded-full shadow-lg flex items-center px-5 py-2 gap-2 transition-all min-w-[200px]">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center justify-center gap-3 px-5 py-2 rounded-full transition-all 
            ${
              pathname === link.path
                ? "bg-violet-600 hover:bg-violet-700 text-white"
                : "text-gray-400 hover:bg-[#3e4347]"
            }
            ${hoveredIndex === null ? "pl-8" : ""}
          `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {link.icon}
              <span
                className={`hidden sm:inline-block transition-all duration-300 ease-in-out 
              ${
                hoveredIndex === index
                  ? "opacity-100 max-w-[200px] ml-2"
                  : "opacity-0 max-w-0 ml-0"
              }
              whitespace-nowrap overflow-hidden`}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default BottomNav;
