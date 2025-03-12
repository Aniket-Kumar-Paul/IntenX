"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { connect, WalletConnection, keyStores } from "near-api-js";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  loginWithNear: () => void;
  loginWithMetaMask: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nearWallet, setNearWallet] = useState<WalletConnection | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    // Initialize NEAR connection
    const initNear = async () => {
      const config = {
        networkId: "testnet",
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://testnet.mynearwallet.com/",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
      };
      const near = await connect(config);
      const wallet = new WalletConnection(near, "intenx");
      setNearWallet(wallet);

      if (wallet.isSignedIn()) {
        localStorage.setItem("user", wallet.getAccountId());
        setIsLoggedIn(true);
      }
    };

    initNear();
  }, []);

  const loginWithNear = () => {
    if (nearWallet) {
      nearWallet.requestSignIn({
        contractId: process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID || "", // Replace with your contract ID
        successUrl: `${window.location.origin}/dashboard`,
        failureUrl: window.location.href,
        keyType: 'ed25519'
      });
    }
  };

  const loginWithMetaMask = () => {
    // MetaMask login logic here
    localStorage.setItem("user", "metaMaskUser");
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (nearWallet && nearWallet.isSignedIn()) {
      nearWallet.signOut();
    }
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home page
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loginWithNear, loginWithMetaMask, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
