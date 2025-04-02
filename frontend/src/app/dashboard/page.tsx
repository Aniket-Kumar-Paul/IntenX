"use client";

import React, { useState } from "react";
import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import PortfolioChart from "@/components/dashboard/PortfolioChart";

const Dashboard = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  return (
    <div className="container mx-auto flex flex-col items-center w-full h-full p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>

      <div className="flex w-full h-full gap-4">
        {/* Left Section */}
        <div className="flex flex-col w-1/3 h-full gap-4">
          <PortfolioOverview setSelectedToken={setSelectedToken} />
          <QuickActions />
        </div>

        {/* Right Section - Charts */}
        <div className="w-2/3 h-full">
          <PortfolioChart selectedToken={selectedToken} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
