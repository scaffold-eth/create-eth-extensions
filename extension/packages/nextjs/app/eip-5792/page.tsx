import { ContractReadVariables } from "./_components/ContractReadVariables";
import { EIP5792Example } from "./_components/EIp5792Example";

const EIP5792Page = () => {
  return (
    <div className="flex items-center space-y-4 flex-col flex-grow pt-10">
      <div className="px-5 mb-8 flex flex-col items-center max-w-5xl space-y-4">
        <h1 className="text-center my-0">
          <span className="block text-4xl font-bold">EIP-5792 example</span>
        </h1>
        <p className="my-0 text-center">
          This extension demonstrates how to use{" "}
          <a href="https://eips.ethereum.org/EIPS/eip-5792" className="underline-offset-1 underline" target="_blank">
            EIP-5792
          </a>{" "}
          wallet capabilities. This EIP introduces new JSON-RPC methods for communication between apps and wallets. This
          allows for more advanced interactions like submitting multiple onchain calls as part of a single transaction
          or sponsoring users transactions via ERC-4337 paymasters.
        </p>
        <p className="my-0 text-center">
          Below you can see an example of interacting with a contract using EIP-5792 compliant wallet (Coinbase Smart
          Wallet). We can change the state of the contract by setting new greetings or incrementing the counter
          individually or use the &quot;Batch(setGreetings + increment)&quot; button to send batched transaction.
        </p>
      </div>
      <ContractReadVariables />
      <EIP5792Example />
    </div>
  );
};

export default EIP5792Page;
