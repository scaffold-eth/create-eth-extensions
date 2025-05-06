export const extraConfigTypeName = "ExtraConfig";

export const preConfigContent = `
import { customChain } from "./utils/customChain";

// Custom variables
const CUSTOM_API_KEY = process.env.CUSTOM_API_KEY;

export type ${extraConfigTypeName} = {
  // Random comment
  customApiKey: string | undefined;
}
`;

export const configOverrides = {
  targetNetworks: ["$$customChain$$", "$$chains.sepolia$$"],
  pollingInterval: 12_345,
  onlyLocalBurnerWallet: false,
  customApiKey: "$$CUSTOM_API_KEY$$",
};

// (default false) If true, then selected solidityFramework network will not be added in targetNetworks array.
export const skipLocalChainInTargetNetworks = false;
