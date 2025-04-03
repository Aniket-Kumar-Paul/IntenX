import React from "react";
import Image from "next/image";

const portfolio = [
  {
    icon: "/logo.png",
    symbol: "BTC",
    amount: 0.5,
    invested: 25000,
    current: 30000,
  },
  {
    icon: "/logo.png",
    symbol: "ETH",
    amount: 2,
    invested: 6000,
    current: 7000,
  },
  {
    icon: "/logo.png",
    symbol: "SOL",
    amount: 10,
    invested: 1200,
    current: 1000,
  },
  {
    icon: "/logo.png",
    symbol: "ADA",
    amount: 100,
    invested: 300,
    current: 400,
  },
];

// Calculate totals
const totalInvested = portfolio.reduce((sum, asset) => sum + asset.invested, 0);
const totalCurrent = portfolio.reduce((sum, asset) => sum + asset.current, 0);
const totalProfitLoss =
  totalInvested > 0
    ? ((totalCurrent - totalInvested) / totalInvested) * 100
    : 0;

const PortfolioOverview = ({
  setSelectedToken,
}: {
  setSelectedToken: (token: string | null) => void;
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-4 rounded-2xl h-full flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-2">
        Portfolio Overview
      </h2>

      {/* Summary Section */}
      <div className="mb-4 text-white text-sm">
        {portfolio.length > 0 ? (
          <>
            <div
              className="flex justify-between border-b border-gray-600 pb-2 cursor-pointer hover:text-violet-400"
              onClick={() => setSelectedToken("Total")}
            >
              <span className="text-gray-400">Total Amount Invested:</span>
              <span>${totalInvested.toLocaleString()}</span>
            </div>
            <div
              className="flex justify-between mt-2 cursor-pointer hover:text-violet-400"
              onClick={() => setSelectedToken("Total")}
            >
              <span className="text-gray-400">Current Portfolio Value:</span>
              <span>
                ${totalCurrent.toLocaleString()}
                {totalInvested > 0 && (
                  <span
                    className={`ml-2 ${
                      totalProfitLoss >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    (
                    {totalProfitLoss >= 0
                      ? `+${totalProfitLoss.toFixed(2)}`
                      : totalProfitLoss.toFixed(2)}
                    %)
                  </span>
                )}
              </span>
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-sm text-center py-8">
            No assets yet.{" "}
            <span className="text-violet-400 cursor-pointer">Buy now</span> to
            get started!
          </p>
        )}
      </div>

      {/* Portfolio Table */}
      {portfolio.length > 0 ? (
        <div className="flex-grow overflow-y-auto">
          <table className="w-full text-white text-sm">
            <thead className="sticky top-0 bg-gray-900 z-10">
              <tr className="border-b border-gray-600">
                <th className="text-left py-2">Asset</th>
                <th className="text-right py-2">Amount</th>
                <th className="text-right py-2">Invested ($)</th>
                <th className="text-right py-2">Current Value ($)</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((asset) => {
                const profitLoss =
                  ((asset.current - asset.invested) / asset.invested) * 100;
                return (
                  <tr
                    key={asset.symbol}
                    className="cursor-pointer hover:bg-white/10 transition"
                    onClick={() => setSelectedToken(asset.symbol)}
                  >
                    <td className="flex items-center gap-2 py-2">
                      <Image
                        src={asset.icon}
                        alt={asset.symbol}
                        width={20}
                        height={20}
                      />
                      {asset.symbol}
                    </td>
                    <td className="text-right">{asset.amount}</td>
                    <td className="text-right">
                      ${asset.invested.toLocaleString()}
                    </td>
                    <td className="text-right">
                      ${asset.current.toLocaleString()}
                      <span
                        className={`ml-2 ${
                          profitLoss >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        (
                        {profitLoss >= 0
                          ? `+${profitLoss.toFixed(2)}`
                          : profitLoss.toFixed(2)}
                        %)
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default PortfolioOverview;
