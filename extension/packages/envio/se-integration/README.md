# Scaffold-Eth to Envio Integration

This integration generates a boilerplate Envio indexer based on your deployed Scaffold-ETH contracts.

## Overview

The integration consists of three main components:

1. **`parseFiles.ts`** - Parses deployedContracts.ts to extract contract and chain information
2. **`configGenerator.ts`** - Generates envio config.yaml, schema.graphql, and EventHandlers.ts from parsed data
3. **`updateEnvio.ts`** - Manual update script that can be triggered from the frontend

## Usage

### Manual Update (Recommended)
The integration is designed to be triggered manually from the Scaffold-ETH frontend:

1. Deploy your contracts using `yarn deploy`
2. Go to the Envio page in your Scaffold-ETH app
3. Click "Regenerate Boilerplate Indexer" button

### Command Line Update
You can also run the update manually from the command line:

```bash
# From the packages/envio directory
pnpm update
```

### Custom Paths
```bash
# Specify custom scaffold-eth path
pnpm run update -- --scaffold-path=/path/to/your/scaffold-eth

# Specify custom envio directory
pnpm run update -- --envio-dir=/path/to/your/envio
```

## What Files Are Parsed

The integration reads only one scaffold-eth file:
- `packages/nextjs/contracts/deployedContracts.ts` - Contract addresses, ABIs, events, and chain information

This file contains all the necessary information including:
- Chain IDs (from the object keys)
- Contract addresses and ABIs
- Event signatures (extracted from ABIs)
- Deployment block numbers

## Generated Files

The integration generates these Envio files:

### config.yaml
```yaml
name: envio-indexer
networks:
  - id: 31337  # Chain ID from scaffold.config.ts
    start_block: 1  # Minimum deployed block
    contracts:
      - name: YourContract  # Contract name
        address:
          - '0x...'  # Contract address
        handler: src/EventHandlers.ts
        events:
          - event: EventName(type1 param1, type2 param2)  # Event signatures
unordered_multichain_mode: true
preload_handlers: true
```

### schema.graphql
GraphQL schema with entity definitions for each contract event.

### src/EventHandlers.ts
TypeScript event handlers for processing blockchain events.

## Features

- **Automatic Event Detection**: Extracts event signatures from contract ABIs
- **Multi-Chain Support**: Handles multiple networks from scaffold.config.ts
- **Boilerplate Generation**: Creates complete indexer setup files
- **Error Handling**: Graceful error handling with detailed logging
- **TypeScript Support**: Full TypeScript support with proper type definitions

## Requirements

- Node.js 18+
- pnpm (or npm/yarn)
- TypeScript
- envio CLI
- Docker (for running the indexer)

## Dependencies

- `js-yaml` - YAML generation
- `typescript` - TypeScript parsing

## Next Steps

After running the update:

1. Run `pnpm codegen` to generate TypeScript types
2. Run `pnpm dev` to start the indexer
3. Access the Envio console at http://localhost:9898
4. Access the Hasura console at http://localhost:8080

## Troubleshooting

### Envio Codegen Errors
If you see errors about missing RPC endpoints or HyperSync configuration, this is expected for local networks like hardhat. You may need to:

1. Add RPC configuration to your envio config
2. Use a different network that has HyperSync support
3. Configure historical sync with RPC URLs

### File Not Found Errors
Make sure the scaffold-eth path is correct and the expected files exist:
- `packages/nextjs/contracts/deployedContracts.ts`
- `packages/nextjs/scaffold.config.ts`

### TypeScript Compilation Errors
Ensure all dependencies are installed:
```bash
pnpm install
```

## Development

### Testing Individual Components
```bash
# Test parser only
ts-node se-integration/parseFiles.ts

# Test config generation
ts-node se-integration/updateConfig.ts
```

### Adding New Chain Support
Edit the `getDefaultRpcUrl` function in `parseFiles.ts` to add support for new chains.

### Customizing Config Generation
Modify the `generateEnvioConfig` function in `configGenerator.ts` to customize the generated config structure.