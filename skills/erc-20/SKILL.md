---
name: erc-20
description: "Add an ERC-20 token contract to a Scaffold-ETH 2 project. Use when the user wants to: create a fungible token, deploy an ERC-20, add token minting, build a token transfer UI, or work with ERC-20 tokens in SE-2."
---

# ERC-20 Token Integration for Scaffold-ETH 2

## Overview

[ERC-20](https://eips.ethereum.org/EIPS/eip-20) is the standard interface for fungible tokens on Ethereum. This skill covers adding an ERC-20 token contract to a Scaffold-ETH 2 project using [OpenZeppelin's ERC-20 implementation](https://docs.openzeppelin.com/contracts/5.x/erc20), along with deployment scripts and a frontend for interacting with the token.

For anything not covered here, refer to the [OpenZeppelin ERC-20 docs](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20) or search the web. This skill provides the SE-2-specific integration knowledge, not a complete ERC-20 reference.

## SE-2 Project Context

Scaffold-ETH 2 (SE-2) is a yarn (v3) monorepo for building dApps on Ethereum. It comes in two flavors based on the Solidity framework:

- **Hardhat flavor**: contracts at `packages/hardhat/contracts/`, deploy scripts at `packages/hardhat/deploy/`
- **Foundry flavor**: contracts at `packages/foundry/contracts/`, deploy scripts at `packages/foundry/script/`

Check which exists in the project to know the flavor. Both flavors share:

- **`packages/nextjs/`**: React frontend (Next.js App Router, Tailwind + DaisyUI, RainbowKit, Wagmi, Viem). Uses `~~` path alias for imports.
- **`packages/nextjs/contracts/deployedContracts.ts`**: auto-generated after `yarn deploy`, contains ABIs, addresses, and deployment block numbers for all contracts, keyed by chain ID.
- **`packages/nextjs/scaffold.config.ts`**: project config including `targetNetworks` (array of viem chain objects).
- **Root `package.json`**: monorepo scripts that proxy into workspaces (e.g. `yarn chain`, `yarn deploy`, `yarn start`).

An ERC-20 token is a standard smart contract, so it lives directly in the existing contracts package (Hardhat or Foundry). No new workspace is needed. The deployment scripts go alongside the existing deploy scripts, and the frontend page goes in the nextjs package. After deployment, `deployedContracts.ts` auto-generates the ABI and address, so the frontend can interact with the token using SE-2's scaffold hooks.

Look at the actual project structure and contracts before setting things up. Adapt to what's there rather than following this skill rigidly.

## Dependencies

OpenZeppelin contracts are already included in SE-2's Hardhat and Foundry setups, so no additional dependency installation is needed. If for some reason they're missing:

- **Hardhat**: `@openzeppelin/contracts` in `packages/hardhat/package.json`
- **Foundry**: installed via `forge install OpenZeppelin/openzeppelin-contracts`, with remapping `@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts/`

No new frontend dependencies are required. SE-2's existing scaffold hooks (`useScaffoldReadContract`, `useScaffoldWriteContract`) and components (`AddressInput`, `InputBase`) handle all the token interaction needs.

## Smart Contract

The token contract extends OpenZeppelin's `ERC20` base. Import path: `@openzeppelin/contracts/token/ERC20/ERC20.sol`. The constructor takes a token name and symbol. Beyond that, add whatever minting/access control logic the project needs.

Syntax reference for a basic token with open minting:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() ERC20("MyToken", "MTK") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
```

The AI should adapt the contract name, symbol, and minting logic based on the user's requirements. Common variations:

- **Capped supply**: use `ERC20Capped` from `@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol`
- **Burnable**: use `ERC20Burnable` from `@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol`
- **Pausable**: use `ERC20Pausable` from `@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol`
- **Access-controlled minting**: use `Ownable` or `AccessControl` from OpenZeppelin

See [OpenZeppelin's ERC-20 extensions](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#extensions) for the full list. The [Contracts Wizard](https://wizard.openzeppelin.com/) is useful for generating a starting template with specific features.

The contract file goes in:
- **Hardhat**: `packages/hardhat/contracts/`
- **Foundry**: `packages/foundry/contracts/`

## Deployment

### Hardhat

Deploy script goes in `packages/hardhat/deploy/`. SE-2 uses `hardhat-deploy`, so the script exports a `DeployFunction`. Syntax reference:

```ts
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MyToken", {
    from: deployer,
    log: true,
    autoMine: true,
  });
};

export default deployToken;

deployToken.tags = ["MyToken"];
```

Use a filename like `01_deploy_my_token.ts` (numbered to control deploy order). The `autoMine` flag speeds up local deployments.

### Foundry

For Foundry, add a deploy script in `packages/foundry/script/` and wire it into the main `Deploy.s.sol`. SE-2's Foundry setup uses a `ScaffoldETHDeploy` base contract and a `DeployHelpers.s.sol` helper.

Deploy script reference:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/MyToken.sol";
import "./DeployHelpers.s.sol";

contract DeployMyToken is ScaffoldETHDeploy {
  function run() external ScaffoldEthDeployerRunner {
    MyToken token = new MyToken();
    console.logString(
      string.concat("MyToken deployed at: ", vm.toString(address(token)))
    );
  }
}
```

Then in `Deploy.s.sol`, import and call the deploy script:

```solidity
import { DeployMyToken } from "./DeployMyToken.s.sol";

// Inside the run function:
DeployMyToken deployMyToken = new DeployMyToken();
deployMyToken.run();
```

## SE-2 Integration

### Header navigation

Add a navigation tab to the SE-2 header for the token page. Pick an appropriate icon from `@heroicons/react/24/outline` (e.g. `BanknotesIcon` or `CurrencyDollarIcon`). The header uses a `menuLinks` array in `packages/nextjs/components/Header.tsx`.

### Frontend page

Create a page (e.g. `packages/nextjs/app/erc20/page.tsx`) for interacting with the token. The page should let users:

- View the token's total supply
- View their own token balance
- Mint tokens (if the contract supports it)
- Transfer tokens to another address

SE-2's scaffold hooks handle all the contract interaction. Key patterns:

**Reading contract data** with `useScaffoldReadContract`:

```tsx
const { data: balance } = useScaffoldReadContract({
  contractName: "MyToken",
  functionName: "balanceOf",
  args: [connectedAddress],
});

const { data: totalSupply } = useScaffoldReadContract({
  contractName: "MyToken",
  functionName: "totalSupply",
});
```

**Writing to the contract** with `useScaffoldWriteContract`:

```tsx
const { writeContractAsync } = useScaffoldWriteContract("MyToken");

// Mint tokens
await writeContractAsync({
  functionName: "mint",
  args: [connectedAddress, parseEther("100")],
});

// Transfer tokens
await writeContractAsync({
  functionName: "transfer",
  args: [recipientAddress, parseEther(amount)],
});
```

Use `formatEther` and `parseEther` from `viem` for converting between wei and human-readable token amounts (assumes 18 decimals). Use `useAccount` from `wagmi` to get the connected wallet address.

For the transfer form, SE-2 provides `AddressInput` for address fields and `InputBase` for general inputs, both from `~~components/scaffold-eth`.

Build out the UI with DaisyUI + Tailwind. The specifics of layout and styling are up to the AI based on the project context.

## Development

1. `yarn chain` to start the local blockchain
2. `yarn deploy` to deploy the token contract (generates `deployedContracts.ts`)
3. `yarn start` to run the frontend

After deployment, the token page should be functional. Users can connect a wallet, mint tokens, check balances, and transfer tokens between addresses.
