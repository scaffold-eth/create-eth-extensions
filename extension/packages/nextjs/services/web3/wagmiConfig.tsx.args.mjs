export const preContent = `
import { arbitrum } from "viem/chains";
`;

export const configOverrides = {
  client: `$$({chain})=>{const alchemyHttpUrl=chain.id==(arbitrum.id as number)?"http://127.0.0.1:8545":getAlchemyHttpUrl(chain.id);const rpcFallbacks=alchemyHttpUrl?[http(),http(alchemyHttpUrl)]:[http()];return createClient({chain,transport:fallback(rpcFallbacks)})}$$`,
};

// NOTE: While passing function you need to ensure it's in one line.
// You can use AI to format the code to one line. (check above example for reference)
/* export const configOverrides = {
  client: `$$({ chain }) => {
    const alchemyHttpUrl = chain.id == arbitrum.id ? "http://127.0.0.1:8545" : getAlchemyHttpUrl(chain.id);
    const rpcFallbacks = alchemyHttpUrl ? [http(), http(alchemyHttpUrl)] : [http()];

    return createClient({
      chain,
      transport: fallback(rpcFallbacks),
    });
  }$$`
} */
