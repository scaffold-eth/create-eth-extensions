export const providerNames = "ApolloProvider";
export const providerSetups = `const subgraphUri = "http://localhost:8000/subgraphs/name/scaffold-eth/your-contract";
  const apolloClient = new ApolloClient({
    uri: subgraphUri,
    cache: new InMemoryCache(),
  });`;
export const providerImports = `import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";`;
export const providerProps = "client={apolloClient}";
