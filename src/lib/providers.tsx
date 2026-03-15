"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia, base } from "wagmi/chains";
import { coinbaseWallet, walletConnect, metaMask, injected } from "@wagmi/connectors";
import { OnchainKitProvider } from "@coinbase/onchainkit";

const queryClient = new QueryClient();

const WC_PROJECT_ID = "1e439b095c492eb318a357edd78151ff";

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  connectors: [
    // Coinbase Wallet + Smart Wallet + Base App + Farcaster embedded wallet
    coinbaseWallet({
      appName: "Workify",
      appLogoUrl: (process.env.NEXT_PUBLIC_URL || "") + "/logo.jpg",
      preference: "all", // "all" = smart wallet + EOA + Base App embedded
    }),
    // WalletConnect — Farcaster Frame wallet, Rainbow, Trust, etc.
    walletConnect({
      projectId: WC_PROJECT_ID,
      metadata: {
        name: "Workify",
        description: "Decentralized Freelance on Base",
        url: process.env.NEXT_PUBLIC_URL || "https://workify.vercel.app",
        icons: [(process.env.NEXT_PUBLIC_URL || "https://workify.vercel.app") + "/logo.jpg"],
      },
      showQrModal: true,
    }),
    // MetaMask & injected (browser extension wallets)
    metaMask(),
    injected(),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
});

export function Providers({ children }: { children: ReactNode }) {
  const paymasterUrl = process.env.NEXT_PUBLIC_CDP_PAYMASTER_URL;

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ""}
          chain={baseSepolia}
          config={{
            appearance: {
              mode: "dark",
              name: "Workify",
              logo: (process.env.NEXT_PUBLIC_URL || "") + "/logo.jpg",
            },
            paymaster: paymasterUrl || undefined,
            wallet: {
              display: "modal",
            },
          }}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
