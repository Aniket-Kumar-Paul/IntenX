"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";
import ProfileUpdateModal from "./ProfileUpdateModal";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Header = () => {
  const { isLoggedIn, userProfile, fetchUserProfile, logout } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <motion.header
      className="w-full py-4 px-6 flex justify-between items-center bg-[#0D0D12] shadow-md"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" width={30} height={30} alt="IntenX Logo" />
        <motion.h1
          className="text-xl font-bold text-violet-400 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          IntenX
        </motion.h1>
      </Link>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Profile Picture Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  fetchUserProfile(); // Fetch latest profile before opening modal
                  setIsProfileModalOpen(true);
                }}
                className="w-8 h-8 border-violet-600 rounded-full text-white flex items-center justify-center text-md font-bold hover:border-violet-700 border-2"
              >
                {(userProfile &&
                  userProfile.username?.charAt(0).toUpperCase()) ||
                  "U"}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Profile</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Login/Logout Button */}
        <motion.div>
          <Button
            size={"sm"}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-lg"
            onClick={isLoggedIn ? logout : () => setIsLoginModalOpen(true)}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>
        </motion.div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      {/* Profile Update Modal */}
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </motion.header>
  );
};

export default Header;
