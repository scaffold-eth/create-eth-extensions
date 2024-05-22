export const extraContents = `## 🚀 Setup The Graph Integration

Now that we have spun up our blockchain, started our frontend application and deployed our smart contract, we can start setting up our subgraph and utilize The Graph!

> Before following these steps be sure Docker is running!

#### ✅ Step 1: Clean up any old data and spin up our docker containers ✅

First run the following to clean up any old data. Do this if you need to reset everything.

\`\`\`
yarn clean-node
\`\`\`

> We can now spin up a graph node by running the following command… 🧑‍🚀

\`\`\`
yarn run-node
\`\`\`

This will spin up all the containers for The Graph using docker-compose. You will want to keep this window open at all times so that you can see log output from Docker.

> As stated before, be sure to keep this window open so that you can see any log output from Docker. 🔎

> NOTE FOR LINUX USERS: If you are running Linux you will need some additional changes to the project.

##### Linux Only

**For hardhat**

Update your package.json in packages/hardhat with the following command line option for the hardhat chain.

\`\`\`
"chain": "hardhat node --network hardhat --no-deploy --hostname 0.0.0.0"
\`\`\`

**For foundry**

Update your package.json in packages/foundry with the following command line option for the anvil chain.

\`\`\`
"chain": "anvil --host 0.0.0.0 --config-out localhost.json",
\`\`\`

Save the file and then restart your chain in its original window.

\`\`\`
yarn chain
\`\`\`

Redeploy your smart contracts.

\`\`\`
yarn deploy
\`\`\`

You might also need to add a firewall exception for port 8432. As an example for Ubuntu... run the following command.

\`\`\`
sudo ufw allow 8545/tcp
\`\`\`

#### ✅ Step 2: Create and ship our subgraph ✅

Now we can open up a fifth window to finish setting up The Graph. 😅 In this fifth window we will create our local subgraph!

> Note: You will only need to do this once.

\`\`\`
yarn local-create
\`\`\`

> You should see some output stating your subgraph has been created along with a log output on your graph-node inside docker.

Next we will ship our subgraph! You will need to give your subgraph a version after executing this command. (e.g. 0.0.1).

\`\`\`
yarn local-ship
\`\`\`

> This command does the following all in one… 🚀🚀🚀

-   Copies the contracts ABI from the hardhat/deployments folder
-   Generates the networks.json file
-   Generates AssemblyScript types from the subgraph schema and the contract ABIs.
-   Compiles and checks the mapping functions.
-   … and deploy a local subgraph!

> If you get an error ts-node you can install it with the following command

\`\`\`
npm install -g ts-node
\`\`\`

You should get a build completed output along with the address of your Subgraph endpoint.

\`\`\`
Build completed: QmYdGWsVSUYTd1dJnqn84kJkDggc2GD9RZWK5xLVEMB9iP

Deployed to http://localhost:8000/subgraphs/name/scaffold-eth/your-contract/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/scaffold-eth/your-contract
\`\`\`

#### ✅ Step 3: Test your Subgraph ✅

Go ahead and head over to your subgraph endpoint and take a look!

> Here is an example query…

\`\`\`
  {
    greetings(first: 25, orderBy: createdAt, orderDirection: desc) {
      id
      greeting
      premium
      value
      createdAt
      sender {
        address
        greetingCount
      }
    }
  }
\`\`\`

> If all is well and you’ve sent a transaction to your smart contract then you will see a similar data output!

#### ✅ Side Quest: Run a Matchstick Test ✅

Matchstick is a [unit testing framework](https://thegraph.com/docs/en/developing/unit-testing-framework/), developed by [LimeChain](https://limechain.tech/), that enables subgraph developers to test their mapping logic in a sandboxed environment and deploy their subgraphs with confidence!

The project comes with a pre-written test located in \`packages/subgraph/tests/asserts.test.ts\`

To test simply type....

\`\`\`
yarn subgraph:test
\`\`\`

> This will run \`graph test\` and automatically download the needed files for testing.

You should receive the following output.

\`\`\`
Fetching latest version tag...
Downloading release from https://github.com/LimeChain/matchstick/releases/download/0.6.0/binary-macos-11-m1
binary-macos-11-m1 has been installed!

Compiling...

💬 Compiling asserts...

Igniting tests 🔥

asserts
--------------------------------------------------
  Asserts:
    √ Greeting and Sender entities - 0.102ms

All 1 tests passed! 😎

[Thu, 07 Mar 2024 15:10:26 -0800] Program executed in: 1.838s.
\`\`\`

> NOTE: If you get an error, you may trying passing \`-d\` flag \`yarn subgraph:test -d\`. This will run matchstick in docker container.

## Shipping to Subgraph Studio 🚀

> NOTE: This step requires [deployment of contract](https://docs.scaffoldeth.io/deploying/deploy-smart-contracts) to live network. Checkout list of [supported networks](https://thegraph.com/docs/networks).

1. Update the \`packages/subgraph/subgraph.yaml\` file with your contract address, network name, start block number(optional) :
   \`\`\`diff
   ...
   -     network: localhost
   +     network: sepolia
         source:
           abi: YourContract
   +       address: "0x54FE7f8Db97e102D3b7d86cc34D885B735E31E8e"
   +       startBlock: 5889410
   ...
   \`\`\`
  TIP: For \`startBlock\` you can use block number of your deployed contract, which can be found by visiting deployed transaction hash in blockexplorer.

2. Create a new subgraph on [Subgraph Studio](https://thegraph.com/studio) and get "SUBGRAPH SLUG" and "DEPLOY KEY".

3. Authenticate with the graph CLI:
   \`\`\`sh
   yarn graph auth --studio <DEPLOY KEY>
   \`\`\`

4. Deploy the subgraph to TheGraph Studio:
   \`\`\`sh
   yarn graph deploy --studio <SUBGRAPH SLUG>
   \`\`\`
   Once deployed, the CLI should output the Subgraph endpoints. Copy the HTTP endpoint and test your queries.

5. Update \`packages/nextjs/components/ScaffoldEthAppWithProviders.tsx\` to use the above HTTP subgraph endpoint:
   \`\`\`diff
   - const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
   + const subgraphUri = 'YOUR_SUBGRAPH_ENDPOINT';
   \`\`\`

## A list of all available commands

### run-node

\`\`\`sh
yarn run-node
\`\`\`

Spin up a local graph node (requires Docker).

### stop-node

\`\`\`sh
yarn stop-node
\`\`\`

Stop the local graph node.

### clean-node

\`\`\`sh
yarn clean-node
\`\`\`

Remove the data from the local graph node.

### local-create

\`\`\`sh
yarn local-create
\`\`\`

Create your local subgraph (only required once).

### local-remove

\`\`\`sh
yarn local-remove
\`\`\`

Delete a local subgprah.

### abi-copy

\`\`\`sh
yarn abi-copy
\`\`\`

Copy the contracts ABI from the hardhat/deployments folder. Generates the networks.json file too.

### codegen

\`\`\`sh
yarn codegen
\`\`\`

Generates AssemblyScript types from the subgraph schema and the contract ABIs.

### build

\`\`\`sh
yarn build
\`\`\`

Compile and check the mapping functions.

### local-deploy

\`\`\`sh
yarn local-deploy
\`\`\`

Deploy a local subgraph.

### local-ship

\`\`\`sh
yarn local-ship
\`\`\`

Run all the required commands to deploy a local subgraph (abi-copy, codegen, build and local-deploy).

### deploy

\`\`\`sh
yarn deploy
\`\`\`

Deploy a subgraph to TheGraph.`;
