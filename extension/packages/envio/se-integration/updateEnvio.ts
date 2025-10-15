import * as path from 'path';
import { parseScaffoldEthFiles } from './parseFiles';
import { updateConfigAndCodegen } from './configGenerator';

interface UpdateOptions {
  scaffoldEthPath: string;
  envioDir: string;
}

export class EnvioUpdater {
  private scaffoldEthPath: string;
  private envioDir: string;
  private configPath: string;

  constructor(options: UpdateOptions) {
    this.scaffoldEthPath = options.scaffoldEthPath;
    this.envioDir = options.envioDir;
    this.configPath = path.join(this.envioDir, 'config.yaml');
  }

  /**
   * Get the path to the deployed contracts file
   */
  private getDeployedContractsPath() {
    return path.join(this.scaffoldEthPath, 'packages/nextjs/contracts/deployedContracts.ts');
  }

  /**
   * Update the envio config based on current scaffold-eth files
   */
  public async updateConfig(): Promise<{ success: boolean; message: string; error?: string }> {
    try {
      console.log('\n🔄 Updating envio config...');
      
      const deployedContractsPath = this.getDeployedContractsPath();
      const parsedData = parseScaffoldEthFiles(deployedContractsPath, ''); // scaffoldConfigPath no longer needed
      
      console.log(`📊 Found ${parsedData.chains.length} chains and ${parsedData.contracts.length} contracts`);
      
      updateConfigAndCodegen(this.configPath, parsedData, this.envioDir);
      
      console.log('✅ Config update completed');
      
      return {
        success: true,
        message: `Successfully updated config with ${parsedData.chains.length} chains and ${parsedData.contracts.length} contracts`
      };
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Error updating config:', errorMessage);
      
      return {
        success: false,
        message: 'Failed to update config',
        error: errorMessage
      };
    }
  }
}

/**
 * CLI interface
 */
async function main() {
  // Get the current working directory and construct relative paths
  const currentDir = process.cwd();
  const scaffoldEthPath = path.resolve(currentDir, '../..');
  const envioDir = currentDir; // Current directory is packages/envio

  console.log('🔧 Scaffold-Eth to Envio Config Updater');
  console.log(`📁 Scaffold-Eth path: ${scaffoldEthPath}`);
  console.log(`📁 Envio dir: ${envioDir}`);

  const updater = new EnvioUpdater({
    scaffoldEthPath,
    envioDir
  });

  const result = await updater.updateConfig();
  
  if (result.success) {
    console.log(`✅ ${result.message}`);
    process.exit(0);
  } else {
    console.error(`❌ ${result.message}`);
    if (result.error) {
      console.error(`Error details: ${result.error}`);
    }
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main().catch(console.error);
}
