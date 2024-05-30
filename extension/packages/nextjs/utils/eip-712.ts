import { Address, SignTypedDataReturnType } from "viem";

export const EIP_712_DOMAIN = {
  name: "EIP-712 Extension",
  version: "1",
} as const;

// The named list of all type definitions
export const EIP_712_TYPE = {
  Person: [
    { name: "name", type: "string" },
    { name: "wallet", type: "address" },
  ],
  Mail: [
    { name: "from", type: "Person" },
    { name: "to", type: "Person" },
    { name: "contents", type: "string" },
  ],
} as const;

export function generateMessageToBob({
  fromName,
  fromAddress,
  message,
}: {
  fromName: string;
  fromAddress?: string;
  message: string;
}) {
  return {
    from: {
      name: fromName,
      wallet: fromAddress || "",
    },
    to: {
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    },
    contents: message,
  };
}

export type VerifyRequestBody = {
  fromName: string;
  message: string;
  signature: SignTypedDataReturnType;
  signer: Address;
};
