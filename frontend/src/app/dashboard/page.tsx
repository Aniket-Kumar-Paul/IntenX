"use client";

import React, { useState } from "react";
import PortfolioOverview from "@/components/dashboard/PortfolioOverview";
import QuickActions from "@/components/dashboard/QuickActions";
import PortfolioChart from "@/components/dashboard/PortfolioChart";

const Dashboard = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  return (
    <div className="container mx-auto flex flex-col items-center w-[90vw] h-full md:h-[80vh] p-6">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>

      <div className="flex flex-col md:flex-row w-full h-full gap-4">
        {/* Left Section */}
        <div className="flex flex-col md:w-1/2 h-full gap-4">
          {/* Portfolio Overview (2/3 height) */}
          <div className="h-[58%]">
            <PortfolioOverview setSelectedToken={setSelectedToken} />
          </div>

          {/* Quick Actions (1/3 height) */}
          <div className="h-[25%]">
            <QuickActions />
          </div>
        </div>

        {/* Right Section - Charts */}
        <div className="md:w-1/2 h-auto md:h-[90%]">
          <PortfolioChart selectedToken={selectedToken} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
