import { useCallback } from "react";
import { Swap, SwapAmountInput, SwapButton, SwapMessage, SwapToggleButton } from "@coinbase/onchainkit/swap";
import type { BuildSwapTransaction } from "@coinbase/onchainkit/swap";
import type { Token } from "@coinbase/onchainkit/token";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount, useSendTransaction } from "wagmi";

export function OnchainKitSwap() {
  const { address } = useAccount();
  const { sendTransaction } = useSendTransaction();

  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image: null,
  };

  const USDCToken: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
    image: null,
  };

  const swappableTokens: Token[] = [ETHToken, USDCToken];

  const onSubmit = useCallback(
    async (swapTransaction: BuildSwapTransaction) => {
      const { transaction } = swapTransaction;
      console.log("Prepared swapTransaction:", transaction);
      // Transaction submission sample code
      const result = await sendTransaction({
        to: transaction.to,
        value: transaction.value,
        data: transaction.data,
      });
      console.log(result);
    },
    [sendTransaction],
  );

  return address ? (
    <Swap address={address}>
      <SwapAmountInput label="Sell" swappableTokens={swappableTokens} token={ETHToken} type="from" />
      <SwapToggleButton />
      <SwapAmountInput label="Buy" swappableTokens={swappableTokens} token={USDCToken} type="to" />
      <SwapButton onSubmit={onSubmit} />
      <SwapMessage />
    </Swap>
  ) : (
    <ConnectWallet />
  );
}
