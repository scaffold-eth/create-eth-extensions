export const providerNames = "URQLProvider";
export const providerSetups = `const urqlClient = new Client({
    url: process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069",
    exchanges: [cacheExchange, fetchExchange],
  });`;
export const providerImports = `import { Client, Provider as URQLProvider, cacheExchange, fetchExchange } from "urql";`;
export const providerProps = "value={urqlClient}";