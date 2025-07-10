export const preContent = `
import "../styles/font-color.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
`;

export const metadataOverrides = {
  title: "Scaffold-ETH 2 Example Extension App (ERC-20)",
  description: "Built with 🏗 Scaffold-ETH 2",
};

export const htmlClassNames = "${spaceGrotesk.variable}";
