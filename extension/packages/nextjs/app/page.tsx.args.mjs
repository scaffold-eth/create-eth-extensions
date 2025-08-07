export const preContent = `import { RocketLaunchIcon } from '@heroicons/react/24/outline'`;

export const description = `
<div className="flex mt-4 bg-green-100 gap-2 p-4 justify-center items-center rounded-lg">
  ${"$$solidityFramework$$" === "hardhat" ? `This will start hardhat local chain` : `This will start foundry chain`}
  <RocketLaunchIcon className="h-8 w-8 fill-green-100" />
  <p>Your description block</p>
</div>
`;

export const externalExtensionName = "Example (ERC-20)";

// If this is passed it will override the full content of the page.tsx file
export const fullContentOverride = "";
