import * as chains from "viem/chains";

// customChain
export const customChain = {
  id: 12345,
  name: "Custom Chain",
  nativeCurrency: { name: "Custom", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.customchain.io"] },
    public: { http: ["https://rpc.customchain.io"] },
  },
  blockExplorers: {
    default: { name: "Customscan", url: "https://customscan.io" },
  },
} as const satisfies chains.Chain;
