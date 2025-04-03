import React from "react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-4 rounded-2xl">
      <h2 className="text-lg font-semibold text-white mb-2">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-2">
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full">Buy</Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full">Sell</Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full">Swap</Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-full">Rebalance</Button>
      </div>
    </div>
  );
};

export default QuickActions;
