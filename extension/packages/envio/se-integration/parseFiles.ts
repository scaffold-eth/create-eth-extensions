import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

export interface ContractInfo {
  name: string;
  address: string;
  abi: any[];
  events: EventInfo[];
  deployedOnBlock: number;
  chainId: number;
}

export interface EventInfo {
  name: string;
  signature: string;
  inputs: Array<{
    name: string;
    type: string;
    indexed: boolean;
  }>;
}

export interface ChainInfo {
  id: number;
  rpcUrl?: string;
  contracts: ContractInfo[];
}

export interface ParsedData {
  contracts: ContractInfo[];
  chains: ChainInfo[];
}

/**
 * Get default RPC URL for a chain ID
 */
function getDefaultRpcUrl(chainId: number): string | undefined {
  const rpcUrls: Record<number, string> = {
    31337: 'http://localhost:8545', // Hardhat
    1337: 'http://localhost:8545', // Alternative Hardhat
  };
  
  return rpcUrls[chainId];
}


/**
 * Parse the deployedContracts.ts file to extract contract information
 */
export function parseDeployedContracts(filePath: string): ContractInfo[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Deployed contracts file not found: ${filePath}`);
  }

  const sourceCode = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(
    filePath,
    sourceCode,
    ts.ScriptTarget.Latest,
    true
  );

  const contracts: ContractInfo[] = [];

  function visit(node: ts.Node) {
    if (ts.isPropertyAssignment(node) && ts.isNumericLiteral(node.name)) {
      // This is a chain ID property (e.g., 31337: { ... })
      const chainId = parseInt(node.name.text);
      
      if (ts.isObjectLiteralExpression(node.initializer)) {
        // Iterate through contracts in this chain
        node.initializer.properties.forEach(property => {
          if (ts.isPropertyAssignment(property) && ts.isIdentifier(property.name)) {
            const contractName = property.name.text;
            
            if (ts.isObjectLiteralExpression(property.initializer)) {
              const contract = parseContractObject(contractName, property.initializer, chainId);
              if (contract) {
                contracts.push(contract);
              }
            }
          }
        });
      }
    }
    
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return contracts;
}

/**
 * Parse a contract object from the deployedContracts structure
 */
function parseContractObject(
  contractName: string, 
  contractObj: ts.ObjectLiteralExpression,
  chainId: number
): ContractInfo | null {
  let address = '';
  let abi: any[] = [];
  let deployedOnBlock = 0;

  contractObj.properties.forEach(prop => {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const propName = prop.name.text;
      
      if (propName === 'address' && ts.isStringLiteral(prop.initializer)) {
        address = prop.initializer.text;
      } else if (propName === 'abi' && ts.isArrayLiteralExpression(prop.initializer)) {
        abi = parseAbiArray(prop.initializer);
      } else if (propName === 'deployedOnBlock' && ts.isNumericLiteral(prop.initializer)) {
        deployedOnBlock = parseInt(prop.initializer.text);
      }
    }
  });

  if (!address || abi.length === 0) {
    return null;
  }

  const events = extractEventsFromAbi(abi);

  return {
    name: contractName,
    address,
    abi,
    events,
    deployedOnBlock,
    chainId
  };
}

/**
 * Parse ABI array from TypeScript AST
 */
function parseAbiArray(abiArray: ts.ArrayLiteralExpression): any[] {
  const abi: any[] = [];
  
  abiArray.elements.forEach(element => {
    if (ts.isObjectLiteralExpression(element)) {
      const abiItem = parseAbiItem(element);
      if (abiItem) {
        abi.push(abiItem);
      }
    }
  });
  
  return abi;
}

/**
 * Parse individual ABI item from TypeScript AST
 */
function parseAbiItem(item: ts.ObjectLiteralExpression): any {
  const abiItem: any = {};
  
  item.properties.forEach(prop => {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const propName = prop.name.text;
      
      if (propName === 'name' && ts.isStringLiteral(prop.initializer)) {
        abiItem.name = prop.initializer.text;
      } else if (propName === 'type' && ts.isStringLiteral(prop.initializer)) {
        abiItem.type = prop.initializer.text;
      } else if (propName === 'anonymous' && ts.isLiteralExpression(prop.initializer)) {
        abiItem.anonymous = prop.initializer.text === 'true';
      } else if (propName === 'inputs' && ts.isArrayLiteralExpression(prop.initializer)) {
        abiItem.inputs = parseAbiInputs(prop.initializer);
      } else if (propName === 'outputs' && ts.isArrayLiteralExpression(prop.initializer)) {
        abiItem.outputs = parseAbiInputs(prop.initializer);
      } else if (propName === 'stateMutability' && ts.isStringLiteral(prop.initializer)) {
        abiItem.stateMutability = prop.initializer.text;
      }
    }
  });
  
  return abiItem;
}

/**
 * Parse ABI inputs/outputs array
 */
function parseAbiInputs(inputsArray: ts.ArrayLiteralExpression): any[] {
  const inputs: any[] = [];
  
  inputsArray.elements.forEach(element => {
    if (ts.isObjectLiteralExpression(element)) {
      const input: any = {};
      
      element.properties.forEach(prop => {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const propName = prop.name.text;
          
          if (propName === 'name' && ts.isStringLiteral(prop.initializer)) {
            input.name = prop.initializer.text;
          } else if (propName === 'type' && ts.isStringLiteral(prop.initializer)) {
            input.type = prop.initializer.text;
          } else if (propName === 'indexed') {
            if (ts.isLiteralExpression(prop.initializer)) {
              input.indexed = prop.initializer.text === 'true';
            } else if (ts.isIdentifier(prop.initializer)) {
              input.indexed = prop.initializer.text === 'true';
            } else if (prop.initializer.kind === ts.SyntaxKind.TrueKeyword) {
              input.indexed = true;
            } else if (prop.initializer.kind === ts.SyntaxKind.FalseKeyword) {
              input.indexed = false;
            }
          } else if (propName === 'internalType' && ts.isStringLiteral(prop.initializer)) {
            input.internalType = prop.initializer.text;
          }
        }
      });
      
      inputs.push(input);
    }
  });
  
  return inputs;
}

/**
 * Extract events from ABI
 */
function extractEventsFromAbi(abi: any[]): EventInfo[] {
  return abi
    .filter(item => item.type === 'event')
    .map(event => ({
      name: event.name,
      signature: generateEventSignature(event),
      inputs: event.inputs || []
    }));
}

/**
 * Generate event signature for envio config
 */
function generateEventSignature(event: any): string {
  const params = (event.inputs || []).map((input: any) => {
    const indexed = input.indexed ? ' indexed' : '';
    return `${input.type}${indexed} ${input.name}`;
  }).join(', ');
  
  return `${event.name}(${params})`;
}

/**
 * Main function to parse deployedContracts.ts only
 */
export function parseScaffoldEthFiles(
  deployedContractsPath: string,
  scaffoldConfigPath: string
): ParsedData {
  const contracts = parseDeployedContracts(deployedContractsPath);
  
  // Group contracts by chain ID
  const contractsByChain: Record<number, ContractInfo[]> = {};
  contracts.forEach(contract => {
    if (!contractsByChain[contract.chainId]) {
      contractsByChain[contract.chainId] = [];
    }
    contractsByChain[contract.chainId].push(contract);
  });
  
  // Create chain info from the contracts
  const chains: ChainInfo[] = Object.keys(contractsByChain).map(chainIdStr => {
    const chainId = parseInt(chainIdStr);
    return {
      id: chainId,
      rpcUrl: getDefaultRpcUrl(chainId),
      contracts: contractsByChain[chainId]
    };
  });
  
  return {
    contracts,
    chains
  };
}