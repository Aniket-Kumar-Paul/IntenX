"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md px-4 sm:px-6 lg:px-8 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking outside modal
        >
          <motion.div
            className="bg-[#0D0D12] p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl w-full max-w-sm sm:max-w-md lg:max-w-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white" onClick={onClose}>
              <X size={24} />
            </button>

            {/* Title */}
            {title && <h2 className="text-md sm:text-lg lg:text-xl font-bold text-white mb-4 text-center">{title}</h2>}

            {/* Modal Content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;