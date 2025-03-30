"use client";

import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const commonStyles = {
  padding: "4px 20px",
  borderRadius: "8px",
  width: "120%",
};

const toastTheme = {
  error: {
    background: "#1A1A2E", // Dark blue/gray
    color: "#E94560", // Red
    ...commonStyles,
  },
  success: {
    background: "#16213E", // Deep blue
    color: "#C8F5C1", // Light Green
    ...commonStyles,
  },
  info: {
    background: "#1B263B", // Dark navy
    color: "#FFFFFF", // White 
    ...commonStyles,
  },
};

export const showToast = (type: "success" | "error" | "info", message: string) => {
  const options: ToastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
    style: toastTheme[type],
  };

  toast(
    <div className="text-center w-full text-sm font-semibold">
      {message}
    </div>,
    { ...options, type }
  );
};

const ToastNotifier = () => {
  return <ToastContainer />;
};

export default ToastNotifier;