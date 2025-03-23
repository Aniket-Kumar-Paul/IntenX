import { WalletConnection, Contract } from "near-api-js";
import { RiskLevel, TradeType, UserProfile, Asset, Trade } from "@/types/nearContractTypes";

const CONTRACT_ID = process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID || "";

export class IntenXContract {
  private contract: any;

  constructor(wallet: WalletConnection) {
    this.contract = new Contract(wallet.account(), CONTRACT_ID, {
      viewMethods: ["get_profile", "get_portfolio", "get_trade_history", "get_due_users"],
      changeMethods: ["upsert_profile", "update_last_rebalance_time", "upsert_asset_and_update_trade_history"],
      useLocalViewExecution: false
    });
  }

  async updateLastRebalanceTime(accountId: string) {
    if (!this.contract) throw new Error("Contract not initialized");
    return await this.contract.update_last_rebalance_time({ account_id: accountId });
  }

  async upsertProfile(profile: UserProfile) {
    if (!this.contract) throw new Error("Contract not initialized");
    await this.contract.upsert_profile({
      username: profile.username,
      email: profile.email,
      risk_level: profile.risk_level,
      rebalance_frequency: profile.rebalance_frequency,
      automatic_rebalance: profile.automatic_rebalance,
    });
  }

  async getProfile(accountId: string): Promise<UserProfile | null> {
    if (!this.contract) return null;
    return await this.contract.get_profile({ account_id: accountId });
  }

  async upsertAsset(symbol: string, quantity: number, amount: number, tradeType: TradeType) {
    if (!this.contract) throw new Error("Contract not initialized");
    await this.contract.upsert_asset_and_update_trade_history({
      symbol,
      quantity,
      amount,
      trade_type: tradeType,
    });
  }

  async getPortfolio(accountId: string): Promise<Asset[]> {
    if (!this.contract) return [];
    return await this.contract.get_portfolio({ account_id: accountId });
  }

  async getTradeHistory(accountId: string): Promise<Trade[]> {
    if (!this.contract) return [];
    return await this.contract.get_trade_history({ account_id: accountId });
  }

  async getDueUsers(): Promise<string[]> {
    if (!this.contract) return [];
    return await this.contract.get_due_users();
  }
}
