export const preContent = `
import { porto } from "porto/wagmi";
`;

export const configOverrides = {
  connectors: ["$$porto()$$", "$$...wagmiConnectors()$$"],
};
