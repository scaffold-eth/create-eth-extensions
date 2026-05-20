export const preContent = `
import { arbitrum } from "viem/chains";
`;

export const configOverrides = {
  client: `$$({chain})=>{const mainnetFallbackWithDefaultRPC=[http("https://mainnet.rpc.buidlguidl.com")];let rpcFallbacks=[...(chain.id===mainnet.id?mainnetFallbackWithDefaultRPC:[]),http()];if(chain.id===(arbitrum.id as number)){rpcFallbacks=[http("http://127.0.0.1:8545"),...rpcFallbacks];}const rpcOverrideUrl=(scaffoldConfig.rpcOverrides as ScaffoldConfig["rpcOverrides"])?.[chain.id];if(rpcOverrideUrl){rpcFallbacks=[http(rpcOverrideUrl),...rpcFallbacks];}else{const alchemyHttpUrl=getAlchemyHttpUrl(chain.id);if(alchemyHttpUrl){const isUsingDefaultKey=scaffoldConfig.alchemyApiKey===DEFAULT_ALCHEMY_API_KEY;rpcFallbacks=isUsingDefaultKey?[...rpcFallbacks,http(alchemyHttpUrl)]:[http(alchemyHttpUrl),...rpcFallbacks];}}return createClient({chain,transport:fallback(rpcFallbacks),...(chain.id!==(hardhat as Chain).id?{pollingInterval:scaffoldConfig.pollingInterval}:{})});}$$`,
};

// NOTE: While passing function you need to ensure it's in one line.
// You can use AI to format the code to one line. (check above example for reference)
/* export const configOverrides = {
  client: `$$({ chain }) => {
    // Extra fallback for mainnet.
    const mainnetFallbackWithDefaultRPC = [http("https://mainnet.rpc.buidlguidl.com")];
    let rpcFallbacks = [...(chain.id === mainnet.id ? mainnetFallbackWithDefaultRPC : []), http()];

    // Custom RPC for Arbitrum (extension example).
    if (chain.id === (arbitrum.id as number)) {
      rpcFallbacks = [http("http://127.0.0.1:8545"), ...rpcFallbacks];
    }

    const rpcOverrideUrl = (scaffoldConfig.rpcOverrides as ScaffoldConfig["rpcOverrides"])?.[chain.id];

    if (rpcOverrideUrl) {
      rpcFallbacks = [http(rpcOverrideUrl), ...rpcFallbacks];
    } else {
      const alchemyHttpUrl = getAlchemyHttpUrl(chain.id);
      if (alchemyHttpUrl) {
        const isUsingDefaultKey = scaffoldConfig.alchemyApiKey === DEFAULT_ALCHEMY_API_KEY;
        // If using default Scaffold-ETH 2 API key, we prioritize the default RPC
        rpcFallbacks = isUsingDefaultKey
          ? [...rpcFallbacks, http(alchemyHttpUrl)]
          : [http(alchemyHttpUrl), ...rpcFallbacks];
      }
    }

    return createClient({
      chain,
      transport: fallback(rpcFallbacks),
      ...(chain.id !== (hardhat as Chain).id ? { pollingInterval: scaffoldConfig.pollingInterval } : {}),
    });
  }$$`
} */
