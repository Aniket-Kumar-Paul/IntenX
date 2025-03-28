"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { connect, WalletConnection, keyStores } from "near-api-js";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { IntenXContract } from "@/api/near";
import { showToast } from "@/components/ui/ToastNotifier";

interface AuthContextType {
  isLoggedIn: boolean;
  contract: IntenXContract | null;
  loginWithNear: () => void;
  loginWithMetaMask: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nearWallet, setNearWallet] = useState<WalletConnection | null>(null);
  const [contract, setContract] = useState<IntenXContract | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    setIsLoggedIn(!!cookies.user);

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
        setCookie(null, "user", wallet.getAccountId(), {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: true,
          sameSite: "lax",
        });
        setIsLoggedIn(true);
        setContract(new IntenXContract(wallet));
      }
    };

    initNear();
  }, []);

  // 👇 Handle Login Failure & Show Toast Notification
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("error") === "nearfail") {
      showToast("error", "NEAR login failed. Please try again.");
      router.replace(window.location.pathname); // Remove error from URL
    }
  }, []);

  const loginWithNear = () => {
    if (nearWallet) {
      nearWallet.requestSignIn({
        contractId: process.env.NEXT_PUBLIC_NEAR_CONTRACT_ID || "",
        successUrl: `${window.location.origin}/dashboard`,
        failureUrl: `${window.location.origin}/?error=nearfail`,
        keyType: "ed25519",
      });
    }
  };

  const loginWithMetaMask = () => {
    setCookie(null, "user", "metaMaskUser", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: true,
      sameSite: "lax",
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (nearWallet && nearWallet.isSignedIn()) {
      nearWallet.signOut();
    }
    destroyCookie(null, "user", { path: "/" });
    setIsLoggedIn(false);
    setContract(null);
    router.push("/");
    showToast("info", "Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, contract, loginWithNear, loginWithMetaMask, logout }}>
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