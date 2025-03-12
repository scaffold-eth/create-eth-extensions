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
  targetNetworks: ["$$customChain$$"],
  pollingInterval: 12_345,
  onlyLocalBurnerWallet: false,
  customApiKey: "$$CUSTOM_API_KEY$$",
};
