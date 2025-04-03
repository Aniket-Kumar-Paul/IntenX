import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BuySellSwapModal from "@/components/BuySellSwapModal";

const QuickActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<"Buy" | "Sell" | "Swap">("Buy");

  const openModal = (tab: "Buy" | "Sell" | "Swap") => {
    setDefaultTab(tab);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold text-white mb-2">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-2">
        <Button
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full"
          onClick={() => openModal("Buy")}
        >
          Buy
        </Button>
        <Button
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full"
          onClick={() => openModal("Sell")}
        >
          Sell
        </Button>
        <Button
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full"
          onClick={() => openModal("Swap")}
        >
          Swap
        </Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full">
          Rebalance
        </Button>
      </div>

      {/* Buy/Sell/Swap Modal */}
      <BuySellSwapModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={defaultTab}
      />
    </div>
  );
};

export default QuickActions;
