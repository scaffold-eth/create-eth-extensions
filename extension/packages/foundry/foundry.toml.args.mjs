export const extraProfileDefaults = `via_ir = true`;
export const extraRpcEndpoints = `
myFakeNetwork = "https://my-fake-network.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"
myFakeNetwork2 = "https://my-fake-network2.alchemyapi.io/v2/\${ALCHEMY_API_KEY}"
`;

export const extraEthercsanConfig = `base = { key = "\${BASESCAN_API_KEY}" }`;

export const extraFormattingConfig = `wrap_comments = true`;

export const extraConfig = `
[doc]
title = "SE-2 Foundry"
`;
