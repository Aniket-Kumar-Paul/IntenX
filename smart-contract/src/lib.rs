use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Represents a user's profile information.
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct UserProfile {
    pub username: String,
    pub email: String,
}

/// Represents an asset within a user's portfolio.
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Asset {
    pub symbol: String,
    pub amount: f64,
}

/// Represents a trade record for a user.
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct Trade {
    pub asset_symbol: String,
    pub amount: f64,
    pub trade_type: String, // "buy" or "sell"
    pub timestamp: u64,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Default)]
pub struct IntenX {
    /// Mapping from user accounts to their profiles.
    pub profiles: HashMap<AccountId, UserProfile>,
    /// Mapping from user accounts to their portfolios.
    pub portfolios: HashMap<AccountId, Vec<Asset>>,
    /// Mapping from user accounts to their trade histories.
    pub trade_histories: HashMap<AccountId, Vec<Trade>>,
}

#[near_bindgen]
impl IntenX {
    /// Sets or updates the user's profile.
    pub fn set_profile(&mut self, username: String, email: String) {
        let account_id = env::signer_account_id();
        let profile = UserProfile { username, email };
        self.profiles.insert(account_id, profile);
    }

    /// Retrieves the profile of the specified account.
    pub fn get_profile(&self, account_id: AccountId) -> Option<UserProfile> {
        self.profiles.get(&account_id).cloned()
    }

    /// Adds or updates an asset in the user's portfolio.
    pub fn upsert_asset(&mut self, symbol: String, amount: f64) {
        let account_id = env::signer_account_id();
        let portfolio = self.portfolios.entry(account_id.clone()).or_insert_with(Vec::new);

        // Check if the asset already exists in the portfolio
        if let Some(asset) = portfolio.iter_mut().find(|a| a.symbol == symbol) {
            asset.amount = amount;
        } else {
            portfolio.push(Asset { symbol: symbol.clone(), amount });
        }

        // Record the trade
        let trade = Trade {
            asset_symbol: symbol,
            amount,
            trade_type: if amount >= 0.0 { "buy".to_string() } else { "sell".to_string() },
            timestamp: env::block_timestamp(),
        };
        self.trade_histories.entry(account_id).or_insert_with(Vec::new).push(trade);
    }

    /// Retrieves the portfolio of the specified account.
    pub fn get_portfolio(&self, account_id: AccountId) -> Vec<Asset> {
        self.portfolios.get(&account_id).cloned().unwrap_or_default()
    }

    /// Retrieves the trade history of the specified account.
    pub fn get_trade_history(&self, account_id: AccountId) -> Vec<Trade> {
        self.trade_histories.get(&account_id).cloned().unwrap_or_default()
    }
}