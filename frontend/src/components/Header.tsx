"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LoginModal from "./LoginModal";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <motion.header
      className="w-full py-4 px-6 flex justify-between items-center bg-[#0D0D12] shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="flex justify-between items-center gap-3">
        <Image src="/logo.png" width={40} height={40} alt="IntenX Logo" />
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
          onClick={isLoggedIn ? logout : () => setIsModalOpen(true)}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </Button>
      </motion.div>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.header>
  );
};

export default Header;
