export const extraConfig = `
  // https://github.com/ipfs/js-ipfs-utils/issues/277#issuecomment-1839980004
  experimental: {
    serverComponentsExternalPackages: ["ipfs-utils"],
  }
`;

export const ignoreTsAndLintBuildErrors = 'true';