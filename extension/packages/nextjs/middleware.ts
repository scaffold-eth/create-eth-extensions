import { paymentProxy } from "@x402/next";
import { HTTPFacilitatorClient, x402ResourceServer } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";

const facilitatorUrl = process.env.NEXT_PUBLIC_FACILITATOR_URL;
const payTo = process.env.RESOURCE_WALLET_ADDRESS as `0x${string}`;
const network = process.env.NETWORK;

if (!facilitatorUrl) {
  throw new Error("NEXT_PUBLIC_FACILITATOR_URL environment variable is required");
}
if (!payTo) {
  throw new Error("RESOURCE_WALLET_ADDRESS environment variable is required");
}
if (!network) {
  throw new Error("NETWORK environment variable is required");
}

// CAIP-2 network type (e.g., "eip155:84532")
type Caip2Network = `${string}:${string}`;

// Convert legacy network names to CAIP-2 format for backwards compatibility
const networkToCaip2: Record<string, Caip2Network> = {
  "base-sepolia": "eip155:84532",
  base: "eip155:8453",
  ethereum: "eip155:1",
  sepolia: "eip155:11155111",
};

const caip2Network: Caip2Network = networkToCaip2[network] || (network as Caip2Network);
const isTestnet = caip2Network.includes("84532") || caip2Network.includes("11155111");

// Create facilitator client and resource server
const facilitatorClient = new HTTPFacilitatorClient({
  url: facilitatorUrl,
});

// Note: Export server and paywall if you need to use withX402 wrapper for API routes
const server = new x402ResourceServer(facilitatorClient);
registerExactEvmScheme(server);

// Create paywall for UI
const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withConfig({
    appName: "Next x402 Demo",
    appLogo: "/x402-icon-blue.png",
    testnet: isTestnet,
  })
  .build();

export const middleware = paymentProxy(
  {
    "/api/payment/builder": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.01",
          network: caip2Network,
          payTo,
        },
      ],
      description: "Access to protected API content",
      mimeType: "application/json",
    },
    "/payment/builder": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.01",
          network: caip2Network,
          payTo,
        },
      ],
      description: "Access to protected page content",
      mimeType: "text/html",
    },
  },
  server,
  undefined,
  paywall,
);

// Configure which paths the middleware should run on
export const config = {
  matcher: ["/api/payment/:path*", "/payment/:path*"],
};
