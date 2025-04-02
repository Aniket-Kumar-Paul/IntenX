"use client";

import { useState, useRef, useEffect } from "react";
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
  const [position, setPosition] = useState({ x: 0, isDragging: false });
  const [isHoveringHandle, setIsHoveringHandle] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current) return;

    // Center the nav initially
    const navWidth = navRef.current.offsetWidth;
    setPosition(prev => ({ ...prev, x: window.innerWidth / 2 - navWidth / 2 }));
  }, [isLoggedIn]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    setPosition(prev => ({ ...prev, isDragging: true }));
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!position.isDragging || !navRef.current) return;

    const navWidth = navRef.current.offsetWidth;
    let newX = e.clientX - navWidth / 2;

    // Constrain to viewport boundaries
    newX = Math.max(0, Math.min(newX, window.innerWidth - navWidth));

    setPosition(prev => ({ ...prev, x: newX }));
  };

  const handleMouseUp = () => {
    setPosition(prev => ({ ...prev, isDragging: false }));
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  useEffect(() => {
    if (position.isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position.isDragging]);

  // Determine if we should show the glowing effect
  const shouldGlow = isHoveringHandle || position.isDragging;

  return (
    <>
      {isLoggedIn && (
        <div 
          className="fixed bottom-5"
          style={{
            transform: `translateX(${position.x}px)`,
          }}
        >
          <nav
            ref={navRef}
            className="bg-[#2a2a34] rounded-full shadow-lg flex items-center px-5 py-2 gap-2 transition-all min-w-[200px] mx-auto"
          >
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
          {/* Drag handle (dot) with enhanced glowing effect */}
          <div
            ref={dragHandleRef}
            className={`w-2 h-2 rounded-full mx-auto mt-2 cursor-grab active:cursor-grabbing transition-all duration-200
              ${shouldGlow ? 
                "bg-white shadow-[0_0_10px_3px_rgba(173,139,255,0.9)]" : 
                "bg-gray-500 opacity-50 shadow-none"}
              ${position.isDragging ? "scale-110" : "scale-100"}
            `}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsHoveringHandle(true)}
            onMouseLeave={() => setIsHoveringHandle(false)}
          />
        </div>
      )}
    </>
  );
};

export default BottomNav;