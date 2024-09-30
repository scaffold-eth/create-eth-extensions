"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ERC20: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { data: balance } = useScaffoldReadContract({
    contractName: "SE2Token",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "SE2Token",
    functionName: "totalSupply",
  });

  const { writeContractAsync: writeSE2TokenAsync } = useScaffoldWriteContract("SE2Token");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center max-w-4xl">
          <h1 className="text-4xl font-bold">ERC-20 Token</h1>
          <div>
            <p>
              This extension introduces an ERC-20 token contract and demonstrates how to use interact with it, including
              getting a holder balance and transferring tokens.
            </p>
            <p>
              The ERC-20 Token Standard introduces a standard for Fungible Tokens (
              <a
                target="_blank"
                href="https://eips.ethereum.org/EIPS/eip-20"
                className="underline font-bold text-nowrap"
              >
                EIP-20
              </a>
              ), in other words, each Token is exactly the same (in type and value) as any other Token.
            </p>
            <p>
              The ERC-20 token contract is implemented using the{" "}
              <a
                target="_blank"
                href="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol"
                className="underline font-bold text-nowrap"
              >
                ERC-20 token implementation
              </a>{" "}
              from OpenZeppelin.
            </p>
          </div>

          <div className="divider my-0" />

          <h2 className="text-3xl font-bold mt-4">Interact with the token</h2>

          <div>
            <p>Below you can see the total token supply (total amount of minted tokens) and your token balance.</p>
            <p>
              You can use the <strong>Mint 100 Tokens</strong> button to get 100 new tokens (for free! Check the
              contract implementation)
            </p>
            <p>
              You can also transfer tokens to another address. Just fill in the address and the amount of tokens you
              want to send and click the send button. Test it by opening this page on an incognito window and sending
              tokens to the new generated burner wallet address.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 mr-2 font-bold text-2xl">Total Supply:</p>
            <p className="text-xl">{totalSupply ? formatEther(totalSupply) : 0} tokens</p>
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="y-2 mr-2 font-bold text-2xl">Your Balance:</p>
            <p className="text-xl">{balance ? formatEther(balance) : 0} tokens</p>
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row mb-6">
            <button
              className="btn btn-accent text-lg px-12 mt-2"
              onClick={async () => {
                try {
                  await writeSE2TokenAsync({ functionName: "mint", args: [connectedAddress, parseEther("100")] });
                } catch (e) {
                  console.error("Error while minting token", e);
                }
              }}
            >
              Mint 100 Tokens
            </button>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-2/4 rounded-3xl mt-10">
            <h3 className="text-2xl font-bold">Transfer Tokens</h3>
            <div className="flex flex-col items-center justify-between w-full lg:w-3/5 px-2 mt-4">
              <div className="font-bold mb-2">Send To:</div>
              <div>
                <AddressInput value={toAddress} onChange={setToAddress} placeholder="Address" />
              </div>
            </div>
            <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
              <div className="flex gap-2 mb-2">
                <div className="font-bold">Amount:</div>
                <div>
                  <button
                    disabled={!balance}
                    className="btn btn-secondary text-xs h-6 min-h-6"
                    onClick={() => {
                      if (balance) {
                        setAmount(formatEther(balance));
                      }
                    }}
                  >
                    Max
                  </button>
                </div>
              </div>
              <div>
                <InputBase value={amount} onChange={setAmount} placeholder="0" />
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary text-lg px-12 mt-2"
                disabled={!toAddress || !amount}
                onClick={async () => {
                  try {
                    await writeSE2TokenAsync({ functionName: "transfer", args: [toAddress, parseEther(amount)] });
                    setToAddress("");
                    setAmount("");
                  } catch (e) {
                    console.error("Error while transfering token", e);
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ERC20;
