"use client";

import type { NextPage } from "next";
import { useBlockNumber } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useEffect, useState } from "react";
import { createPublicClient, http, keccak256, toHex, toRlp } from "viem";
import scaffoldConfig from "~~/scaffold.config";
import { notification } from "~~/utils/scaffold-eth";

const Randao: NextPage = () => {
  const [targetBlockNumber, setTargetBlockNumber] = useState<bigint>();
  const { data: currentBlockNumber } = useBlockNumber({ watch: true });

  const publicClient = createPublicClient({
    chain: scaffoldConfig.targetNetworks[0],
    transport: http(),
  });

  const { writeContractAsync: writeAsync } = useScaffoldWriteContract("RandomGenerator");

  const { data: futureBlocks } = useScaffoldReadContract({
    contractName: "RandomGenerator",
    functionName: "futureBlocks",
  });

  const { data: blockNumber } = useScaffoldReadContract({
    contractName: "RandomGenerator",
    functionName: "blockNumber",
  });

  const { data: randomNumber } = useScaffoldReadContract({
    contractName: "RandomGenerator",
    functionName: "randomNumber",
  });

  useEffect(() => {
    if (blockNumber && futureBlocks) {
      setTargetBlockNumber(blockNumber + futureBlocks);
    }
  }, [blockNumber, futureBlocks]);

  const generateRandomNumber = async () => {
    await writeAsync(
      {
        functionName: "generateRandomNumber",
      },
      {
        onBlockConfirmation: (txnReceipt: any) => {
          console.log("Transaction blockHash", txnReceipt.blockHash);
          notification.success("Random number generated. Wait for the future block and get the number.");
        },
      },
    );
  }

  const getRandomNumber = async () => {
    console.log("currentBlockNumber: ", currentBlockNumber);
    console.log("targetBlockNumber: ", targetBlockNumber);

    const blockData = await publicClient.getBlock({ blockNumber: targetBlockNumber });

    console.log("blockData: ", blockData);

    const values: `0x${string}`[] = [];
    values.push(blockData.parentHash);
    values.push(blockData.sha3Uncles);
    values.push(blockData.miner as `0x${string}`);
    values.push(blockData.stateRoot);
    values.push(blockData.transactionsRoot);
    values.push(blockData.receiptsRoot);
    values.push(blockData.logsBloom);
    values.push(`0x${blockData.difficulty.toString(16)}`);
    values.push(`0x${blockData.number.toString(16)}`);
    values.push(`0x${blockData.gasLimit.toString(16)}`);
    values.push(`0x${blockData.gasUsed.toString(16)}`);
    values.push(`0x${blockData.timestamp.toString(16)}`);
    values.push(blockData.extraData);
    values.push(blockData.mixHash);
    values.push(blockData.nonce);
    if ("baseFeePerGas" in blockData && blockData.baseFeePerGas !== null) {
      values.push(`0x${blockData.baseFeePerGas.toString(16)}`);
    }
    if ("withdrawalsRoot" in blockData && blockData.withdrawalsRoot !== undefined) {
      values.push(blockData.withdrawalsRoot);
    } else {
      values.push("0x");
    }
    if ("blobGasUsed" in blockData && blockData.blobGasUsed !== undefined && blockData.blobGasUsed !== null) {
      values.push(toHex(blockData.blobGasUsed));
    }
    if ("excessBlobGas" in blockData && blockData.excessBlobGas !== undefined && blockData.excessBlobGas !== null) {
      values.push(toHex(blockData.excessBlobGas));
    }
    if (
      "parentBeaconBlockRoot" in blockData &&
      blockData.parentBeaconBlockRoot !== undefined &&
      blockData.parentBeaconBlockRoot !== null
    ) {
      values.push(blockData.parentBeaconBlockRoot as `0x${string}`);
    }

    console.log("blockData values: ", values);
    for (let i = 0; i < values.length; i++) {
      if (values[i] === "0x0") {
        values[i] = "0x";
      }
      if (values[i].length % 2 === 1) {
        values[i] = ("0x0" + values[i].substring(2)) as `0x${string}`;
      }
    }
    console.log("blockData values after: ", values);

    const rlpEncodedValues = toRlp(values);
    console.log("blockData RLP: ", rlpEncodedValues);

    const blockHash = keccak256(rlpEncodedValues);
    console.log("blockData hash: ", blockHash);

    if (blockHash !== blockData.hash) {
      notification.error("Block hash mismatch");
      return;
    }

    await writeAsync(
      {
        functionName: "getRandomNumber",
        args: [rlpEncodedValues],
      },
      {
        onBlockConfirmation: (txnReceipt: any) => {
          console.log("Transaction blockHash", txnReceipt.blockHash);
        },
      },
    );
  };

  const getRandomNumberDisabled = currentBlockNumber === undefined || targetBlockNumber === undefined || currentBlockNumber <= targetBlockNumber;

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center max-w-4xl">
          <h1 className="text-4xl font-bold">On-chain randomness using RANDAO</h1>
          <div>
            <p>
              This extension shows how to use on-chain randomness using RANDAO for truly on-chain unpredictable random sources.
            </p>
            <p>
              Ethereum PoS introduces randomness using block.mixHash (prevRandao). Look at{" "}
              <a
                target="_blank"
                href="https://eips.ethereum.org/EIPS/eip-4399"
                className="underline font-bold text-nowrap"
              >EIP-4399</a>{" "}
              for more information.
            </p>
            <p className="mt-8">
              The randomness must be generated in two steps:
              <ol className="list-decimal">
                <li className="mt-4">
                  First, a block in the future must be set from where the block.mixHash value will be used as the random source.
                  For this, the user has to call a function in our contract.
                </li>
                <li className="mt-4">
                  Then, after this future block is mined, the user needs to call again to get the random number, passing the whole block header as the parameter.
                  The function uses the block header and the block hash to validate the header and use the block.mixHash value as a randomness source.
                </li>
              </ol>
            </p>
            <p className="mt-8">
              This strategy can be used to generate random numbers for games, lotteries, etc., but also to generate random traits for NFTs, for example, avoiding centralized oracles.
            </p>
            <p className="mt-8">
              <em>Foundry Note:</em> if you are using Anvil from Foundry, the random number will always be the same because Anvil always sets mixHash to zero.
            </p>
          </div>

          <div className="divider my-0" />

          <h2 className="text-3xl font-bold mt-4">Testing the random generator</h2>

          <div>
            <p>Using the button below you can call <strong>Generate Random Number</strong>.</p>
            <p>
              The function on the contract will set a future block number (set to 2 blocks into the future) to generate the random number.
            </p>
            <p>
              After this block is mined, you can call the <strong>Get Random Number</strong> button to get the random number.
            </p>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-8 px-8 pt-6 pb-12">
          <p className="text-center text-lg">
            <button
              className="btn btn-primary mt-2"
              onClick={generateRandomNumber}
            >
              Generate Random Number
            </button>
          </p>
          <p className="text-center text-lg">
            Current Block Number: {currentBlockNumber?.toString()}
          </p>
          {targetBlockNumber && (
            <p className="text-center text-lg">
              Waiting for Block Number: {(targetBlockNumber + 1n).toString()}
            </p>
          )}
          <p className="text-center text-lg">
            <button
              className="btn btn-primary mt-2"
              onClick={getRandomNumber}
              disabled={getRandomNumberDisabled}
            >
              Get Random Number
            </button>
          </p>
          <p className="text-center text-lg">
            Random Number: <strong>{randomNumber?.toString()}</strong>
          </p>
        </div>
      </div >
    </>
  );
};

export default Randao;
