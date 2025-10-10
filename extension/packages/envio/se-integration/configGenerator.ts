import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { execSync } from 'child_process';
import { ParsedData } from './parseFiles';
import { updateSchemaFile, updateEventHandlersFile } from './schemaGenerator';

export interface EnvioConfig {
  name: string;
  contracts: EnvioContractDefinition[];
  networks: EnvioNetwork[];
  unordered_multichain_mode: boolean;
  preload_handlers: boolean;
}

export interface EnvioContractDefinition {
  name: string;
  handler: string;
  events: EnvioEvent[];
}

export interface EnvioNetwork {
  id: number;
  start_block: number;
  rpc_config?: {
    url: string;
  };
  contracts: EnvioNetworkContract[];
}

export interface EnvioNetworkContract {
  name: string;
  address: string[];
}


export interface EnvioEvent {
  event: string;
}

/**
 * Check if a chain is a local development chain that needs RPC configuration
 */
function isLocalDevelopmentChain(chainId: number): boolean {
  const localChains = [
    31337, // Hardhat
    1337,  // Alternative Hardhat port
    // Anvil and Foundry typically use the same chain ID as Hardhat (31337)
    // but can be configured differently
  ];
  
  return localChains.includes(chainId);
}

/**
 * Get default RPC URL for local development chains
 */
function getLocalRpcUrl(chainId: number): string {
  // Default to localhost:8545 for all local chains
  return 'http://localhost:8545';
}

/**
 * Generate envio config from parsed scaffold-eth data
 */
export function generateEnvioConfig(parsedData: ParsedData): EnvioConfig {
  // First, create unique contract definitions
  const contractMap = new Map<string, EnvioContractDefinition>();
  
  // Collect all unique contracts across all chains
  parsedData.chains.forEach(chain => {
    chain.contracts.forEach(contract => {
      if (!contractMap.has(contract.name)) {
        contractMap.set(contract.name, {
          name: contract.name,
          handler: 'src/EventHandlers.ts',
          events: contract.events.map(event => ({
            event: event.signature
          }))
        });
      }
    });
  });
  
  const contracts = Array.from(contractMap.values());
  
  // Then create networks that reference these contracts
  const networks: EnvioNetwork[] = [];
  
  parsedData.chains.forEach(chain => {
    // Skip chains with no contracts
    if (chain.contracts.length === 0) return;
    
    const networkContracts: EnvioNetworkContract[] = chain.contracts.map(contract => ({
      name: contract.name,
      address: [contract.address]
    }));
    
    // Determine RPC config first
    let rpcConfig: { url: string } | undefined;
    if (isLocalDevelopmentChain(chain.id)) {
      let rpcUrl: string;
      if (chain.rpcUrl) {
        rpcUrl = chain.rpcUrl;
      } else {
        rpcUrl = getLocalRpcUrl(chain.id);
      }
      
      rpcConfig = {
        url: rpcUrl
      };
    }
    
    // Create network with proper property order
    const network: EnvioNetwork = {
      id: chain.id,
      start_block: Math.min(...chain.contracts.map(c => c.deployedOnBlock)),
      ...(rpcConfig && { rpc_config: rpcConfig }),
      contracts: networkContracts
    };
    
    networks.push(network);
  });
  
  return {
    name: 'envio-indexer',
    contracts,
    networks,
    unordered_multichain_mode: true,
    preload_handlers: true
  };
}

/**
 * Update the envio config.yaml file
 */
export function updateEnvioConfig(
  configPath: string,
  parsedData: ParsedData
): void {
  console.log('Generating envio config...');
  
  const envioConfig = generateEnvioConfig(parsedData);
  
  console.log('Generated config:', JSON.stringify(envioConfig, null, 2));
  
  // Convert to YAML
  const yamlContent = yaml.dump(envioConfig, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  });
  
  // Write to file
  fs.writeFileSync(configPath, yamlContent, 'utf-8');
  console.log(`Updated config file: ${configPath}`);
}

/**
 * Run envio codegen after updating config
 */
export function runEnvioCodegen(envioDir: string): void {
  console.log('Running envio codegen...');
  
  try {
    const result = execSync('envio codegen', {
      cwd: envioDir,
      stdio: 'pipe',
      encoding: 'utf-8'
    });
    
    console.log('Envio codegen completed successfully');
    if (result) {
      console.log('Output:', result);
    }
  } catch (error: any) {
    console.error('Error running envio codegen:', error.message);
    if (error.stdout) {
      console.log('Stdout:', error.stdout);
    }
    if (error.stderr) {
      console.log('Stderr:', error.stderr);
    }
  }
}

/**
 * Main function to update config, schema, handlers and run codegen
 */
export function updateConfigAndCodegen(
  configPath: string,
  parsedData: ParsedData,
  envioDir: string
): void {
  // Update envio config
  updateEnvioConfig(configPath, parsedData);
  
  // Update GraphQL schema
  const schemaPath = path.join(envioDir, 'schema.graphql');
  updateSchemaFile(schemaPath, parsedData.contracts);
  
  // Update event handlers
  const handlersPath = path.join(envioDir, 'src/EventHandlers.ts');
  updateEventHandlersFile(handlersPath, parsedData.contracts);
  
  // Run envio codegen
  runEnvioCodegen(envioDir);
}
