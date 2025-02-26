"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleLoginNear = () => {
    localStorage.setItem("user", "nearUser");
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleLoginMetaMask = () => {
    localStorage.setItem("user", "metaMaskUser");
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  return (
    <motion.header
      className="w-full py-4 px-6 flex justify-between items-center bg-[#0D0D12] shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/">
        <motion.h1
          className="text-2xl font-bold text-violet-400 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          IntenX
        </motion.h1>
      </Link>
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button 
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg shadow-md"
          onClick={handleAuthAction}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </motion.div>
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLoginNear={handleLoginNear} 
        onLoginMetaMask={handleLoginMetaMask} 
      />
    </motion.header>
  );
};

export default Header;