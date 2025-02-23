"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Header = () => {
  // Dummy state for authentication (to be replaced with real auth logic later)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simulate checking login state (replace with actual authentication logic later)
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleAuthAction = () => {
    if (isLoggedIn) {
      // Logout logic (replace with actual logout logic later)
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } else {
      // Dummy login (replace with real login/signup flow later)
      localStorage.setItem("user", "dummyUser");
      setIsLoggedIn(true);
    }
  };

  return (
    <motion.header
      className="w-full py-4 px-6 flex justify-between items-center bg-[#0D0D12] shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo & Name */}
      <Link href="/">
        <motion.h1
          className="text-2xl font-bold text-violet-400 cursor-pointer"
          whileHover={{ scale: 1.1 }}
        >
          IntenX
        </motion.h1>
      </Link>

      {/* Login/Logout Button (Dummy Logic) */}
      <motion.div whileHover={{ scale: 1.1 }}>
        <Button 
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-full shadow-md"
          onClick={handleAuthAction}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </motion.div>
    </motion.header>
  );
};

export default Header;
