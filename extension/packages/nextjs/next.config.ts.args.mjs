export const preContent = `
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants";
`;

export const configOverrides = {
  serverExternalPackages: ["some-package"],
};

export const postConfigContent = `
const serwist = async (phase: string) => {

if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (dummyArg: any) => dummyArg;
    return withSerwist(nextConfig);
  }

return nextConfig;
}
`;

export const finalNextConfigName = "serwist";
