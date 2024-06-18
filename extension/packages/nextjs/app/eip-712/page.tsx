"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { SignTypedDataReturnType } from "viem/accounts";
import { useAccount, useSignTypedData, useVerifyTypedData } from "wagmi";
import {
  EIP_712_DOMAIN,
  EIP_712_TYPE,
  VerifyRequestBody,
  generateMessageToBob,
} from "~~/utils/eip-712";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

const Eip712: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [signature, setSignature] = useState<SignTypedDataReturnType>();
  const [isLoading, setIsLoading] = useState(false);
  const { signTypedDataAsync } = useSignTypedData();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const typedData = {
    domain: EIP_712_DOMAIN,
    types: EIP_712_TYPE,
    primaryType: "Mail",
    message: generateMessageToBob({
      fromName: name,
      fromAddress: connectedAddress,
      message,
    }),
  } as const;

  const { data: verifiedOnFrontend } = useVerifyTypedData({
    ...typedData,
    address: connectedAddress,
    signature,
  });

  const signTypedData = async () => {
    try {
      const signature = await signTypedDataAsync(typedData);
      setSignature(signature);
      return signature;
    } catch (e) {
      const errorMessage = getParsedError(e);
      notification.error(errorMessage);
    }
  };

  const verifyOnFrontend = () => {
    if (verifiedOnFrontend) {
      notification.success("Success!");
      return;
    }

    notification.error("Verification failed");
  };

  const verifyOnBackend = async () => {
    if (!connectedAddress) {
      notification.info("Connect your wallet");
      return;
    }

    if (!signature) {
      notification.info("Typed data is not signed");
      return;
    }

    const requestBody: VerifyRequestBody = {
      fromName: name,
      message,
      signature,
      signer: connectedAddress,
    };

    setIsLoading(true);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Error verifying data on backend`);
      }
      notification.success("Success!");
    } catch (err) {
      const errorMessage = getParsedError(err);
      notification.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!connectedAddress) {
      setSignature(undefined);
    }
  }, [connectedAddress]);

  return (
    <div className="flex items-center flex-col flex-grow pt-10 px-8">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">EIP-712</h1>
          <div className="max-w-2xl">
            EIP-712 defines a standard for hashing and signing typed structured
            data in Ethereum. It enhances security and usability by enabling the
            creation of more readable and secure signed messages, reducing the
            risk of phishing attacks and user errors. For more details, visit
            the{" "}
            <a
              target="_blank"
              href="https://eips.ethereum.org/EIPS/eip-712"
              className="underline font-bold text-nowrap"
            >
              EIP-712 specification
            </a>
            .
          </div>

        <div className="divider my-0" />
        <div>
            Get started by editing{" "}
          <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
            packages / nextjs / app / eip-712.tsx
            </code>
        </div>
        <div className="divider my-0" />

        <div className="text-xl font-bold">
          Send message to Bob using EIP-712
        </div>
        <input
          placeholder="Your name"
          className="input input-bordered rounded-lg w-full sm:w-96"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Your message"
          className="textarea textarea-bordered rounded-lg w-full sm:w-96 text-base"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {!connectedAddress && <span>⚠️ Connect wallet to sign data</span>}

        <button
          className="btn btn-primary btn-sm"
          onClick={signTypedData}
          disabled={!connectedAddress}
        >
          Sign
        </button>
        {signature && (
          <div className="text-center max-w-2xl">
            <div className="font-bold">Signature:</div>
            <div className="break-all">{signature}</div>
          </div>
        )}
        <button
          className="btn btn-primary btn-sm"
          onClick={verifyOnFrontend}
          disabled={!signature}
        >
          Verify (frontend)
        </button>
        <button
          className={`btn btn-primary btn-sm`}
          onClick={verifyOnBackend}
          disabled={!signature || isLoading}
        >
          {isLoading && <span className="loading loading-spinner" />}
          Verify (backend)
        </button>
      </div>
    </div>
  );
};

export default Eip712;
