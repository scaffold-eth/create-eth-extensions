"use client";

import { OnchainKitIdentity } from "./_components/OnchainKitIdentity";
import { OnchainKitSwap } from "./_components/OnchainKitSwap";
import { OnchainKitTokens } from "./_components/OnchainKitTokens";
import { OnchainKitWallet } from "./_components/OnchainKitWallet";
import type { NextPage } from "next";

const OnchainKitExample: NextPage = () => {
  return (
    <div className="flex flex-col flex-grow items-center gap-8 px-5 pt-10">
      <a target="_blank" href="https://onchainkit.xyz/identity/introduction" className="text-2xl underline">
        Identity
      </a>
      <OnchainKitIdentity />

      <a target="_blank" href="https://onchainkit.xyz/swap/swap" className="text-2xl underline">
        Swap
      </a>
      <OnchainKitSwap />

      <a target="_blank" href="https://onchainkit.xyz/token/introduction" className="text-2xl underline">
        Tokens
      </a>
      <OnchainKitTokens />

      <a target="_blank" href="https://onchainkit.xyz/wallet/wallet" className="text-2xl underline">
        Wallet
      </a>
      <OnchainKitWallet />
    </div>
  );
};

export default OnchainKitExample;
