export const preContent = `import { RocketLaunchIcon } from '@heroicons/react/24/outline'`;

export const description = ({ solidityFramework }) => `
<div className="flex mt-4 bg-green-100 gap-2 p-4 justify-center items-center rounded-lg">
  <RocketLaunchIcon className="h-8 w-8 fill-green-100" />
  <p>ERC-20 extension example using ${solidityFramework}</p>
</div>
`;

export const externalExtensionName = "Example (ERC-20)";

// If this is passed it will override the full content of the page.tsx file
export const fullContentOverride = "";
