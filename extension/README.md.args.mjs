export const extraContents = `## 🚀 Setup ERC-20 Token Extension

This extension introduces an ERC-20 token contract, and how to use it, like getting a user balance or transferring tokens.

The ERC-20 introduces a standard for Fungible Tokens ([EIP-20](https://eips.ethereum.org/EIPS/eip-20)), in other words, they have a property that makes each Token be exactly the same (in type and value) as another Token.

For example, an ERC-20 Token acts just like the ETH, meaning that 1 Token is and will always be equal to all the other Tokens.

The ERC-20 token contract is implemented using the [ERC-20 token implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) from the OpenZeppelin library, which is a library for secure smart contract development.

### Setup

**Hardhat:** set your burner wallet address in the deploy script at \`\`\`packages/hardhat/deploy/01_deploy_se2_token.ts\`\`\`, line 25 (const frontendAddress).

**Foundry:** set your burner wallet address in the deploy script at \`\`\`packages/foundry/script/Deploy.s.sol\`\`\`, line 30 (address frontendAddress).

Deploy your contract running \`\`\`yarn deploy\`\`\`

### Interact with the token

Start frontend with \`\`\`yarn start\`\`\` and go to */erc20* to interact with your deployed ERC-20 token.

You can check the code at \`\`\`packages/nextjs/app/erc20/page.tsx\`\`\`.

`;
