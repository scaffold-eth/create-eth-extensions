export const configOverrides = {
  compilerOptions: {
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    plugins: [
      {
        name: "next",
      },
      {
        name: "next-superjson-plugin",
      },
      {
        name: "@next/mdx",
      },
    ],
  },
};
