import React from "react";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl h-1/2">
      <h2 className="text-lg font-semibold text-white mb-2">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-2">
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">Buy</Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">Sell</Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">Swap</Button>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white">Rebalance</Button>
      </div>
    </div>
  );
};

export default QuickActions;
