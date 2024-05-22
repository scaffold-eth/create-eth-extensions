import * as fs from "fs";
import chalk from "chalk";
const parseAndCorrectJSON = (input: string): any => {
  // Add double quotes around keys
  let correctedJSON = input.replace(/(\w+)(?=\s*:)/g, '"$1"');

  // Remove trailing commas
  correctedJSON = correctedJSON.replace(/,(?=\s*[}\]])/g, "");

  try {
    return JSON.parse(correctedJSON);
  } catch (error) {
    console.error("Failed to parse JSON", error);
    throw new Error("Failed to parse JSON");
  }
};

type Contract = {
  address: string;
  abi: any[];
};

const GRAPH_DIR = "./";

function publishContract(
  contractName: string,
  contractObject: Contract,
  networkName: string
) {
  try {
    const graphConfigPath = `${GRAPH_DIR}/networks.json`;
    let graphConfig = "{}";
    try {
      if (fs.existsSync(graphConfigPath)) {
        graphConfig = fs.readFileSync(graphConfigPath).toString();
      }
    } catch (e) {
      console.log(e);
    }

    let graphConfigObject = JSON.parse(graphConfig);
    if (!(networkName in graphConfigObject)) {
      graphConfigObject[networkName] = {};
    }
    if (!(contractName in graphConfigObject[networkName])) {
      graphConfigObject[networkName][contractName] = {};
    }
    graphConfigObject[networkName][contractName].address =
      contractObject.address;

    fs.writeFileSync(
      graphConfigPath,
      JSON.stringify(graphConfigObject, null, 2)
    );
    if (!fs.existsSync(`${GRAPH_DIR}/abis`)) fs.mkdirSync(`${GRAPH_DIR}/abis`);
    fs.writeFileSync(
      `${GRAPH_DIR}/abis/${networkName}_${contractName}.json`,
      JSON.stringify(contractObject.abi, null, 2)
    );

    return true;
  } catch (e) {
    console.log(
      "Failed to publish " + chalk.red(contractName) + " to the subgraph."
    );
    console.log(e);
    return false;
  }
}

const DEPLOYED_CONTRACTS_FILE = "../nextjs/contracts/deployedContracts.ts";
async function main() {
  const fileContent = fs.readFileSync(DEPLOYED_CONTRACTS_FILE, "utf8");

  const pattern = /const deployedContracts = ({[^;]+}) as const;/s;
  const match = fileContent.match(pattern);

  if (!match || !match[1]) {
    throw new Error(
      `Failed to find deployedContracts in the ${DEPLOYED_CONTRACTS_FILE}`
    );
  }
  const jsonString = match[1];

  // Parse the JSON string
  const deployedContracts = parseAndCorrectJSON(jsonString);
  const localContracts = deployedContracts[31337];

  if (!localContracts) {
    console.error("No contracts found for the local network.");
    return;
  }

  for (const contractName in localContracts) {
    const contractObject = localContracts[contractName];
    if (!contractObject) {
      console.error(
        `Contract ${contractName} does not have an ABI or address. Skipping.`
      );
      continue;
    }
    publishContract(contractName, contractObject, "localhost");
  }

  console.log("✅  Published contracts to the subgraph package.");
}
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
