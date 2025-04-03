"use client";

import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

const transactionTypes = ["Buy", "Sell", "Swap"];
const assets = ["BTC", "ETH", "SOL", "ADA", "NEAR", "USDT"];

const BuySellSwapModal = ({
  isOpen,
  onClose,
  defaultTab,
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultTab: string;
}) => {
  const [transactionType, setTransactionType] = useState(defaultTab || "Buy");
  const [selectedAsset, setSelectedAsset] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [toAsset, setToAsset] = useState("ETH"); // For swaps
  const [slippage, setSlippage] = useState("0.5"); // Default slippage tolerance
  const [estimatedReceive, setEstimatedReceive] = useState("");

  // Ensure defaultTab updates when modal opens
  useEffect(() => {
    if (defaultTab) {
      setTransactionType(defaultTab);
    }
  }, [defaultTab]);

  const handleTransaction = () => {
    console.log(`${transactionType} ${amount} ${selectedAsset}`);
    if (transactionType === "Swap") {
      console.log(`Swapping ${amount} ${selectedAsset} to ${toAsset}`);
    }
    // Call NEAR Intents function here
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${transactionType} Crypto`}>
      <div className="space-y-4">
        {/* Transaction Type Selection */}
        <div className="flex space-x-2">
          {transactionTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setTransactionType(type)}
              className={`w-1/3 ${
                transactionType === type ? "bg-violet-600 text-white" : "bg-gray-800 text-gray-400"
              } rounded-full`}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Token Selection for Buy/Sell */}
        {transactionType !== "Swap" && (
          <div className="relative">
            <label className="text-white text-xs">Select Asset</label>
            <select
              className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm appearance-none"
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              {assets.map((asset) => (
                <option key={asset} value={asset}>
                  {asset}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-8 text-gray-400" size={18} />
          </div>
        )}

        {/* Swap Section */}
        {transactionType === "Swap" && (
          <div className="space-y-4">
            {/* From Token Selection */}
            <div className="relative">
              <label className="text-white text-xs">From</label>
              <select
                className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm appearance-none"
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
              >
                {assets.map((asset) => (
                  <option key={asset} value={asset}>
                    {asset}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-8 text-gray-400" size={18} />
            </div>

            {/* To Token Selection */}
            <div className="relative">
              <label className="text-white text-xs">To</label>
              <select
                className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm appearance-none"
                value={toAsset}
                onChange={(e) => setToAsset(e.target.value)}
              >
                {assets.map(
                  (asset) =>
                    asset !== selectedAsset && (
                      <option key={asset} value={asset}>
                        {asset}
                      </option>
                    )
                )}
              </select>
              <ChevronDown className="absolute right-3 top-8 text-gray-400" size={18} />
            </div>
          </div>
        )}

        {/* Amount Input */}
        <div>
          <label className="text-white text-xs">Amount</label>
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm"
          />
        </div>

        {/* Estimated Receive Amount */}
        {transactionType !== "Sell" && (
          <div>
            <label className="text-white text-xs">Estimated Receive</label>
            <div className="w-full p-2 px-4 bg-gray-800 text-white rounded-full border border-gray-700 text-sm">
              {estimatedReceive || "0.00"} {transactionType === "Swap" ? toAsset : selectedAsset}
            </div>
          </div>
        )}

        {/* Slippage Tolerance (for Swap) */}
        {transactionType === "Swap" && (
          <div>
            <label className="text-white text-xs">Slippage Tolerance (%)</label>
            <Input
              type="number"
              placeholder="0.5"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-full p-2 px-4 bg-gray-900 text-white rounded-full border border-gray-700 focus:border-violet-500 outline-none text-sm"
            />
          </div>
        )}

        {/* Gas Fee Estimate */}
        <div className="flex justify-between text-gray-400 text-xs">
          <span>Estimated Gas Fee:</span>
          <span>~0.001 NEAR</span>
        </div>

        {/* Confirm Button */}
        <Button
          onClick={handleTransaction}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full text-sm"
        >
          Confirm {transactionType}
        </Button>
      </div>
    </Modal>
  );
};

export default BuySellSwapModal;
