export enum RiskLevel {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export enum TradeType {
  Buy = "Buy",
  Sell = "Sell",
}

export interface UserProfile {
  username: string;
  email: string;
  risk_level: RiskLevel;
  rebalance_frequency: number;
  last_rebalance_time: number;
  automatic_rebalance: boolean;
}

export interface Asset {
  symbol: string;
  quantity: number;
  invested_amount: number;
}

export interface Trade {
  asset_symbol: string;
  quantity: number;
  trade_type: TradeType;
  timestamp: number;
}
