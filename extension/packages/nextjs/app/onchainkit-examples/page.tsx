"use client";

import { OnchainKitIdentity } from "./_components/OnchainKitIdentity";
import { OnchainKitSwap } from "./_components/OnchainKitSwap";
import { OnchainKitTokens } from "./_components/OnchainKitTokens";
import { OnchainKitWallet } from "./_components/OnchainKitWallet";
import type { NextPage } from "next";

const OnchainKitExample: NextPage = () => {
  return (
    <div className="flex flex-col flex-grow items-center gap-2 px-5 pt-10">
      <h1 className="text-2xl font-bold">Onchainkit Examples</h1>

      <div className="text-lg">
        For detailed information, please visit the{" "}
        <a target="_blank" href="https://onchainkit.xyz/getting-started" className="underline">
          Onchainkit Documentation
        </a>
      </div>

      <div className="mt-6 text-xl text-center font-bold">Identity</div>
      <OnchainKitIdentity />

      <div className="mt-6 text-xl text-center font-bold">Swap</div>
      <OnchainKitSwap />

      <div className="mt-6 text-xl text-center font-bold">Tokens</div>
      <OnchainKitTokens />

      <div className="mt-6 text-xl text-center font-bold">Wallet</div>
      <OnchainKitWallet />
    </div>
  );
};

export default OnchainKitExample;
