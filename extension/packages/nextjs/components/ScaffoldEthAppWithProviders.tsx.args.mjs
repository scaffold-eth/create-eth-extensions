export const preConfigContent = `
  import { createContext } from 'react';
  export const ExampleContext = createContext("");
`;
export const globalClassNames = "font-space-grotesk";

export const extraProviders = [
  '$$createProvider(ExampleContext.Provider, {value: "Example"})$$'
]

// WARNING: Do it with caution
// Since SE-2 fundamentally relies on WagmiProvider, QueryClientProvider, ProgressBar and RainbowKitProvider don't forgot to include them
// overrideProviders allows you to change the order or props passed to default providers
/* export const overrideProviders = [
  '$$createProvider(WagmiProvider, { config: wagmiConfig })$$',
  '$$createProvider(ExampleContext.Provider, {value: "Example"})$$',
  '$$createProvider(QueryClientProvider, { client: queryClient })$$',
  '$$createProvider(ProgressBar, { height: "3px", color: "#2299dd" })$$',
  '$$createProvider(RainbowKitProvider, { avatar: BlockieAvatar, theme: mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme() })$$',
] */

