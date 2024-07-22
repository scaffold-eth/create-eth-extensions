import { PropsWithChildren } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";
import { useAccount } from "wagmi";

export const OnchainKitScaffoldProvider = ({ children }: PropsWithChildren) => {
  const { chain } = useAccount();

  return (
    <OnchainKitProvider chain={chain || base} apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}>
      {children}
    </OnchainKitProvider>
  );
};
