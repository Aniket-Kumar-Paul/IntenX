import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy Data
const portfolioData: Record<string, { date: string; value: number }[]> = {
  BTC: [
    { date: "2024-03-25", value: 55000 },
    { date: "2024-03-26", value: 98500 },
    { date: "2024-03-27", value: 78000 },
  ],
  ETH: [
    { date: "2024-03-25", value: 2500 },
    { date: "2024-03-26", value: 3500 },
    { date: "2024-03-27", value: 4200 },
  ],
  SOL: [
    { date: "2024-03-25", value: 104 },
    { date: "2024-03-26", value: 9 },
    { date: "2024-03-27", value: 57 },
  ],
  ADA: [
    { date: "2024-03-25", value: 2 },
    { date: "2024-03-26", value: 28 },
    { date: "2024-03-27", value: 93 },
  ],
  Total: [
    { date: "2024-03-25", value: 5000 },
    { date: "2024-03-26", value: 15000 },
    { date: "2024-03-27", value: 38000 },
  ],
};

const PortfolioChart = ({
  selectedToken,
}: {
  selectedToken: string | null;
}) => {
  const data = selectedToken
    ? portfolioData[selectedToken]
    : portfolioData["Total"];

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/20 p-4 rounded-2xl h-full flex flex-col">
      <h2 className="text-lg font-semibold text-white mb-2">
        {selectedToken
          ? `${selectedToken} Price History`
          : "Total Portfolio Value"}
      </h2>

      <div className="flex-1">
        {data && data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.2)"
              />
              <XAxis dataKey="date" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400 text-sm text-center py-8">
            {selectedToken
              ? "No data available for this asset."
              : "Select a token to view chart"}
          </p>
        )}
      </div>
    </div>
  );
};

export default PortfolioChart;
