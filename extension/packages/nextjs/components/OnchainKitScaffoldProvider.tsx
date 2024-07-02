import { PropsWithChildren } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { useAccount } from "wagmi";

export const OnchainKitScaffoldProvider = ({ children }: PropsWithChildren) => {
  const { chain } = useAccount();

  return chain ? (
    <OnchainKitProvider chain={chain} apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}>
      {children}
    </OnchainKitProvider>
  ) : (
    children
  );
};
