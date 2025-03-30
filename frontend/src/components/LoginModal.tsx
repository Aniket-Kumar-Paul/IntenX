"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaEthereum } from "react-icons/fa";
import { SiNear } from "react-icons/si";
import { useAuth } from "@/context/AuthContext";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Modal from "@/components/ui/Modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithNear } = useAuth();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login to IntenX">
      <Button
        className="bg-[#5A5A5A] hover:bg-[#4A4A4A] rounded-3xl text-white w-full h-full flex items-center justify-center gap-2 my-7 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg"
        onClick={() => {
          loginWithNear();
          onClose();
        }}
      >
        <SiNear className="text-white" /> Login with NEAR
      </Button>

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

      <button
        className="mt-4 text-gray-400 hover:text-white text-sm sm:text-base lg:text-lg w-full text-center"
        onClick={onClose}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default LoginModal;
