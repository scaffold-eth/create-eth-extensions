import { ContractInfo, EventInfo } from './parseFiles';

/**
 * Map Solidity types to GraphQL types
 */
function mapSolidityToGraphQLType(solidityType: string): string {
  const typeMap: Record<string, string> = {
    'address': 'String!',
    'string': 'String!',
    'bool': 'Boolean!',
    'uint8': 'BigInt!',
    'uint16': 'BigInt!',
    'uint32': 'BigInt!',
    'uint64': 'BigInt!',
    'uint128': 'BigInt!',
    'uint256': 'BigInt!',
    'int8': 'BigInt!',
    'int16': 'BigInt!',
    'int32': 'BigInt!',
    'int64': 'BigInt!',
    'int128': 'BigInt!',
    'int256': 'BigInt!',
    'bytes': 'String!',
    'bytes1': 'String!',
    'bytes2': 'String!',
    'bytes4': 'String!',
    'bytes8': 'String!',
    'bytes16': 'String!',
    'bytes32': 'String!',
  };

  // Handle arrays
  if (solidityType.endsWith('[]')) {
    const baseType = solidityType.slice(0, -2);
    const graphqlType = mapSolidityToGraphQLType(baseType);
    return `[${graphqlType}]!`;
  }

  // Handle fixed-size arrays
  const fixedArrayMatch = solidityType.match(/^(.+)\[(\d+)\]$/);
  if (fixedArrayMatch) {
    const baseType = fixedArrayMatch[1];
    const graphqlType = mapSolidityToGraphQLType(baseType);
    return `[${graphqlType}]!`;
  }

  return typeMap[solidityType] || 'String!';
}

/**
 * Generate GraphQL entity name from contract and event names
 */
function generateEntityName(contractName: string, eventName: string): string {
  return `${contractName}_${eventName}`;
}

/**
 * Generate GraphQL schema for a single event
 */
function generateEventSchema(contractName: string, event: EventInfo): string {
  const entityName = generateEntityName(contractName, event.name);
  
  let schema = `type ${entityName} {\n`;
  schema += `  id: ID!\n`;
  
  // Add event input parameters as entity fields
  event.inputs.forEach(input => {
    const fieldName = input.name || 'param';
    const graphqlType = mapSolidityToGraphQLType(input.type);
    schema += `  ${fieldName}: ${graphqlType}\n`;
  });
  
  schema += `}\n\n`;
  
  return schema;
}

/**
 * Generate complete GraphQL schema for all contracts
 */
export function generateGraphQLSchema(contracts: ContractInfo[]): string {
  let schema = '';
  
  // Create a map to track unique contract types (by name)
  const uniqueContracts = new Map<string, ContractInfo>();
  
  contracts.forEach(contract => {
    if (!uniqueContracts.has(contract.name)) {
      uniqueContracts.set(contract.name, contract);
    }
  });
  
  // Generate schema only for unique contract types
  uniqueContracts.forEach(contract => {
    contract.events.forEach(event => {
      schema += generateEventSchema(contract.name, event);
    });
  });
  
  return schema;
}

/**
 * Generate event handler for a single event
 */
function generateEventHandler(contractName: string, event: EventInfo): string {
  const entityName = generateEntityName(contractName, event.name);
  
  let handler = `${contractName}.${event.name}.handler(async ({ event, context }) => {\n`;
  handler += `  const entity: ${entityName} = {\n`;
  handler += `    id: \`\${event.chainId}_\${event.block.number}_\${event.logIndex}\`,\n`;
  
  // Add event parameters
  event.inputs.forEach(input => {
    const fieldName = input.name || 'param';
    handler += `    ${fieldName}: event.params.${fieldName},\n`;
  });
  
  handler += `  };\n\n`;
  handler += `  context.${entityName}.set(entity);\n`;
  handler += `});\n\n`;
  
  return handler;
}

/**
 * Generate complete event handlers file
 */
export function generateEventHandlers(contracts: ContractInfo[]): string {
  let handlers = `/*\n`;
  handlers += ` * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features\n`;
  handlers += ` * This file is auto-generated from scaffold-eth contracts\n`;
  handlers += ` */\n`;
  handlers += `import {\n`;
  
  // Create a map to track unique contract types (by name)
  const uniqueContracts = new Map<string, ContractInfo>();
  
  contracts.forEach(contract => {
    if (!uniqueContracts.has(contract.name)) {
      uniqueContracts.set(contract.name, contract);
    }
  });
  
  // Generate imports
  const imports = new Set<string>();
  uniqueContracts.forEach(contract => {
    imports.add(contract.name);
    contract.events.forEach(event => {
      const entityName = generateEntityName(contract.name, event.name);
      imports.add(entityName);
    });
  });
  
  handlers += Array.from(imports).map(imp => `  ${imp}`).join(',\n');
  handlers += `,\n} from "generated";\n\n`;
  
  // Generate handlers for unique contract types only
  uniqueContracts.forEach(contract => {
    contract.events.forEach(event => {
      handlers += generateEventHandler(contract.name, event);
    });
  });
  
  return handlers;
}

/**
 * Update schema.graphql file
 */
export function updateSchemaFile(schemaPath: string, contracts: ContractInfo[]): void {
  const schema = generateGraphQLSchema(contracts);
  
  console.log('Generated GraphQL schema:');
  console.log(schema);
  
  // Write to file
  require('fs').writeFileSync(schemaPath, schema, 'utf-8');
  console.log(`Updated schema file: ${schemaPath}`);
}

/**
 * Update EventHandlers.ts file
 */
export function updateEventHandlersFile(handlersPath: string, contracts: ContractInfo[]): void {
  const handlers = generateEventHandlers(contracts);
  
  console.log('Generated event handlers:');
  console.log(handlers);
  
  // Write to file
  require('fs').writeFileSync(handlersPath, handlers, 'utf-8');
  console.log(`Updated event handlers file: ${handlersPath}`);
}
