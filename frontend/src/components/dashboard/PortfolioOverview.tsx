import React from "react";
import Image from "next/image";

// Dummy Portfolio Data
const portfolio = [
  { icon: "/logo.png", symbol: "BTC", amount: 0.5, value: 30000 },
  { icon: "/logo.png", symbol: "ETH", amount: 2, value: 7000 },
  { icon: "/logo.png", symbol: "SOL", amount: 10, value: 1000 },
];

const PortfolioOverview = ({
  setSelectedToken,
}: {
  setSelectedToken: (token: string) => void;
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-2xl h-1/2 overflow-hidden">
      <h2 className="text-lg font-semibold text-white mb-2">Portfolio Overview</h2>

      <div className="overflow-y-auto max-h-[calc(100%-2rem)]">
        {portfolio.length > 0 ? (
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2">Asset</th>
                <th className="text-right py-2">Amount</th>
                <th className="text-right py-2">Value ($)</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((asset) => (
                <tr
                  key={asset.symbol}
                  className="cursor-pointer hover:bg-white/10 transition"
                  onClick={() => setSelectedToken(asset.symbol)}
                >
                  <td className="flex items-center gap-2 py-2">
                    <Image src={asset.icon} alt={asset.symbol} width={20} height={20} />
                    {asset.symbol}
                  </td>
                  <td className="text-right">{asset.amount}</td>
                  <td className="text-right">${asset.value.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">No assets owned yet.</p>
        )}
      </div>
    </div>
  );
};

export default PortfolioOverview;
