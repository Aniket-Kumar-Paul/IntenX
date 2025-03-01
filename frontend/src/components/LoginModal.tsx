"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaEthereum } from "react-icons/fa";
import { SiNear } from "react-icons/si";
import { useAuth } from "@/context/AuthContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithNear, loginWithMetaMask } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking outside modal
        >
          <motion.div
            className="bg-[#0D0D12] p-6 rounded-2xl shadow-xl w-80 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-xl font-bold text-white mb-4">Login to IntenX</h2>
            
            <Button
              className="bg-[#5A5A5A] hover:bg-[#4A4A4A] text-white w-full flex items-center justify-center gap-2 mb-3"
              onClick={() => {
                loginWithNear();
                onClose();
              }}
            >
              <SiNear className="text-white" /> Login with NEAR
            </Button>

            <Button
              className="bg-[#F6851B] hover:bg-[#E2761B] text-white w-full flex items-center justify-center gap-2"
              onClick={() => {
                loginWithMetaMask();
                onClose();
              }}
            >
              <FaEthereum className="text-white" /> Login with MetaMask
            </Button>

            <button className="mt-4 text-gray-400 hover:text-white" onClick={onClose}>
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
