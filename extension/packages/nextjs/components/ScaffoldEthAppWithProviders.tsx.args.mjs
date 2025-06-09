export const preContent = `
  import { createContext } from 'react';
  export const ExampleContext = createContext("");
`;
export const globalClassNames = "font-space-grotesk";

// Adding extra providers (extends default providers)
export const extraProviders = {
  'ExampleContext.Provider': {
    value: "Example"
  }
};

// WARNING: Do it with caution
// Since SE-2 fundamentally relies on WagmiProvider, QueryClientProvider, ProgressBar and RainbowKitProvider don't forgot to include them
// overrideProviders allows you to change the order or props passed to default providers
/* export const overrideProviders = {
  WagmiProvider: {
    config: "$$wagmiConfig$$"
  },
  'ExampleContext.Provider': {
    value: "Example",
    x: "$$123n$$"
  },
  QueryClientProvider: {
    client: "$$queryClient$$"
  },
  ProgressBar: {
    height: "3px",
    color: "#2299dd"
  },
  RainbowKitProvider: {
    avatar: "$$BlockieAvatar$$",
    theme: "$$mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()$$"
  }
}; */
