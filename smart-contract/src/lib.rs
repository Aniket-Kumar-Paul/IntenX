use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Risk level enum
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum RiskLevel {
    Low,
    Medium,
    High,
}

/// Represents a user's profile information.
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct UserProfile {
    pub username: String,
    pub email: String,
    pub risk_level: RiskLevel,
    pub rebalance_frequency: u64,  // Frequency in seconds
    pub last_rebalance_time: u64,  // Timestamp of the last rebalance
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
    /// Creates or updates a user profile.
    pub fn upsert_profile(
        &mut self,
        username: String,
        email: String,
        risk_level: RiskLevel,
        rebalance_frequency: u64,
    ) {
        let account_id = env::signer_account_id();
        let profile = self.profiles.entry(account_id.clone()).or_insert_with(|| UserProfile {
            username: username.clone(),
            email: email.clone(),
            risk_level: risk_level.clone(),
            rebalance_frequency,
            last_rebalance_time: 0, // New profiles start at 0
        });

        // Update fields (only if the profile already exists)
        profile.username = username;
        profile.email = email;
        profile.risk_level = risk_level;
        profile.rebalance_frequency = rebalance_frequency;
    }

    /// Updates the last rebalance time for the given user.
    pub fn update_last_rebalance_time(&mut self, account_id: AccountId) {
        if let Some(profile) = self.profiles.get_mut(&account_id) {
            profile.last_rebalance_time = env::block_timestamp();
        }
    }

    /// Retrieves the profile of the specified account.
    pub fn get_profile(&self, account_id: AccountId) -> Option<UserProfile> {
        self.profiles.get(&account_id).cloned()
    }

    /// Adds or updates an asset in the user's portfolio and records a trade.
    pub fn upsert_asset(&mut self, symbol: String, amount: f64) {
        let account_id = env::signer_account_id();
        let portfolio = self.portfolios.entry(account_id.clone()).or_insert_with(Vec::new);

        if let Some(asset) = portfolio.iter_mut().find(|a| a.symbol == symbol) {
            asset.amount = amount;
        } else {
            portfolio.push(Asset { symbol: symbol.clone(), amount });
        }

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

    /// Get list of users whose rebalance is due.
    pub fn get_due_users(&self) -> Vec<AccountId> {
        let current_time = env::block_timestamp();
        self.profiles
            .iter()
            .filter_map(|(account_id, profile)| {
                if current_time >= profile.last_rebalance_time + (profile.rebalance_frequency * 1_000_000_000) {
                    Some(account_id.clone())
                } else {
                    None
                }
            })
            .collect()
    }
}
