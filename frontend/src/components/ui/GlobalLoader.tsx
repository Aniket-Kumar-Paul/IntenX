"use client";

import React from "react";
import { useLoading } from "@/context/LoadingContext";
import Image from "next/image";

const GlobalLoader = () => {
  const { isPageLoading } = useLoading();

  if (!isPageLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-50">
      <div className="relative w-24 h-24">
        {/* Logo */}
        <Image src="/logo.png" alt="Loading" width={96} height={96} />

        {/* Spinning Border */}
        <div className="absolute inset-0 border-4 border-transparent border-t-violet-600 border-b-violet-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default GlobalLoader;