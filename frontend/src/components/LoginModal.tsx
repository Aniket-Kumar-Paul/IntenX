"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaEthereum } from "react-icons/fa";
import { SiNear } from "react-icons/si";
import { useAuth } from "@/context/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithNear } = useAuth();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking outside modal
        >
          <motion.div
            className="bg-[#0D0D12] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl w-full max-w-md sm:max-w-lg lg:max-w-xl text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-4">Login to IntenX</h2>

            <Button
              className="bg-[#5A5A5A] hover:bg-[#4A4A4A] rounded-3xl text-white w-full h-full flex items-center justify-center gap-2 my-7 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg"
              onClick={() => {
                loginWithNear();
                onClose();
              }}
            >
              <SiNear className="text-white" /> Login with NEAR
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="w-full">
                    <Button
                      className="bg-[#F6851B] text-white rounded-3xl w-full h-full flex items-center justify-center gap-2 py-2 sm:py-3 my-4 lg:py-4 text-sm sm:text-base lg:text-lg"
                      disabled
                    >
                      <FaEthereum className="text-white" /> Login with MetaMask
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <button className="mt-4 text-gray-400 hover:text-white text-sm sm:text-base lg:text-lg" onClick={onClose}>
              Cancel
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;