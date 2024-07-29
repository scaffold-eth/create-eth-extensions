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

  const { writeContractAsync: writeSE2TokenAsync } = useScaffoldWriteContract("SE2Token");

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center max-w-4xl">
          <h1 className="text-4xl font-bold">ERC-20 Token</h1>
          <div>
            <p>
              This extension introduces an ERC-20 token contract, and how to use it, like getting a user balance or
              transferring tokens.
            </p>
            <p>
              The ERC-20 introduces a standard for Fungible Tokens (
              <a
                target="_blank"
                href="https://eips.ethereum.org/EIPS/eip-20"
                className="underline font-bold text-nowrap"
              >
                EIP-20
              </a>
              ), in other words, they have a property that makes each Token be exactly the same (in type and value) as
              another Token.
            </p>
            <p>
              For example, an ERC-20 Token acts just like the ETH, meaning that 1 Token is and will always be equal to
              all the other Tokens.
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
              from the OpenZeppelin library, which is a library for secure smart contract development.
            </p>
          </div>

          <div className="divider my-0" />
          <h2 className="text-3xl font-bold mt-4">Getting Started</h2>
          <div>
            <p>
              <strong>Hardhat: </strong>set your burner wallet address in the deploy script at{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                packages / hardhat / deploy / 01_deploy_se2_token.ts
              </code>
              , line 25 (const frontendAddress).
            </p>
            <p>
              <strong>Foundry: </strong>set your burner wallet address in the deploy script at{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                packages / foundry / script / Deploy.s.sol
              </code>
              , line 30 (address frontendAddress).
            </p>
            <p>
              Deploy your contract running{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                yarn deploy
              </code>
            </p>
          </div>
          <div className="divider my-0" />

          <h2 className="text-3xl font-bold mt-4">Interact with the token</h2>

          <div>
            <p>Below you can see your token balance.</p>
            <p>Your balance should be 1000 tokens if you set your address before deploying the contract.</p>
            <p>
              You can also transfer tokens to another address. Just fill in the address and the amount of tokens you
              want to send and click the send button.
            </p>
            <p>
              You can test it by opening this page on an incognito window and sending tokens to this new burner wallet
              address.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row mb-6">
            <p className="my-2 mr-2 font-bold text-2xl">Balance:</p>
            <p className="text-xl">{balance ? formatEther(balance) : 0} tokens</p>
          </div>
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-2/4 rounded-3xl">
            <h3 className="text-2xl font-bold">Transfer Tokens</h3>
            <div className="flex items-center justify-between w-3/5 px-2 mt-4">
              <div className="font-bold">Send To:</div>
              <div>
                <AddressInput value={toAddress} onChange={setToAddress} placeholder="Address" />
              </div>
            </div>
            <div className="flex items-center justify-between w-3/5 p-2">
              <div>
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
                  await writeSE2TokenAsync({ functionName: "transfer", args: [toAddress, parseEther(amount)] });
                  setToAddress("");
                  setAmount("");
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
