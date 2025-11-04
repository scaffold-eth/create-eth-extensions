"use client";

import { useState } from "react";
import { AllNfts } from "./components/AllNfts";
import { MyNfts } from "./components/MyNfts";
import { AddressInput } from "@scaffold-ui/components";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ERC721: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [toAddress, setToAddress] = useState<string>("");

  const { writeContractAsync: writeSE2TokenAsync } = useScaffoldWriteContract("SE2NFT");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center max-w-4xl">
          <h1 className="text-4xl font-bold">ERC-721 NFT</h1>
          <div>
            <p>
              This extension introduces an ERC-721 token contract and demonstrates how to use it, including getting the
              total supply and holder balance, listing all NFTs from the collection and NFTs from the connected address,
              and how to transfer NFTs.
            </p>
            <p>
              The ERC-721 Token Standard introduces a standard for Non-Fungible Tokens (
              <a
                target="_blank"
                href="https://eips.ethereum.org/EIPS/eip-721"
                className="underline font-bold text-nowrap"
              >
                EIP-721
              </a>
              ), in other words, each token is unique.
            </p>
            <p>
              The ERC-721 token contract is implemented using the{" "}
              <a
                target="_blank"
                href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol"
                className="underline font-bold text-nowrap"
              >
                ERC-721 token implementation
              </a>{" "}
              from OpenZeppelin.
            </p>
            <p>
              The ERC-721 token implementation uses the{" "}
              <a
                target="_blank"
                href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Enumerable.sol"
                className="underline font-bold text-nowrap"
              >
                ERC-721 Enumerable extension
              </a>{" "}
              from OpenZeppelin to list all tokens from the collection and all the tokens owned by an address. You can
              remove this if you plan to use an indexer, like a Subgraph or Ponder (
              <a target="_blank" href="https://scaffoldeth.io/extensions" className="underline font-bold text-nowrap">
                extensions available
              </a>
              ).
            </p>
          </div>

          <div className="divider my-0" />

          <h2 className="text-3xl font-bold mt-4">Interact with the NFT</h2>

          <div>
            <p>Below you can mint an NFT for yourself or to another address.</p>
            <p>
              You can see your balance and your NFTs, and below that, you can see the total supply and all the NFTs
              minted.
            </p>
            <p>
              Check the code under <em>packages/nextjs/app/erc721</em> to learn more about how to interact with the
              ERC721 contract.
            </p>
          </div>
        </div>

        {connectedAddress ? (
          <div className="flex flex-col justify-center items-center bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
            <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row mb-2">
              <button
                className="btn btn-accent text-lg px-12 mt-2"
                onClick={async () => {
                  try {
                    await writeSE2TokenAsync({ functionName: "mintItem", args: [connectedAddress] });
                  } catch (e) {
                    console.error("Error while minting token", e);
                  }
                }}
              >
                Mint token to your address
              </button>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-2/4 rounded-3xl mt-5 mb-8">
              <h3 className="text-2xl font-bold">Mint token to another address</h3>
              <div className="flex flex-col items-center justify-between w-full lg:w-3/5 px-2 mt-4">
                <div className="font-bold mb-2">To:</div>
                <div>
                  <AddressInput value={toAddress} onChange={setToAddress} placeholder="Address" />
                </div>
              </div>
              <div>
                <button
                  className="btn btn-primary text-lg px-12 mt-2"
                  disabled={!toAddress}
                  onClick={async () => {
                    try {
                      await writeSE2TokenAsync({ functionName: "mintItem", args: [toAddress] });
                      setToAddress("");
                    } catch (e) {
                      console.error("Error while minting token", e);
                    }
                  }}
                >
                  Mint
                </button>
              </div>
            </div>
            <MyNfts />
            <AllNfts />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
            <p className="text-xl font-bold">Please connect your wallet to interact with the token.</p>
            <RainbowKitCustomConnectButton />
          </div>
        )}
      </div>
    </>
  );
};

export default ERC721;
