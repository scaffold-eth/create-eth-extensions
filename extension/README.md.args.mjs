export const skipQuickStart = true;

export const extraContents = ({ solidityFramework }) => `# Example Extension (ERC-20)

## Checkpoint 0: 📦 Environment 📚

> Start your local ${solidityFramework} network (a local instance of a blockchain):

\`\`\`
yarn chain
\`\`\`

> in a second terminal window, 🛰 deploy your contract (locally):

\`\`\`
yarn deploy
\`\`\`

> in a third terminal window, start your 📱 frontend:

\`\`\`
yarn start
\`\`\`

📱 Open [http://localhost:3000](http://localhost:3000) to see the app.
`;

// If this is passed it will override the full content of the README file
export const fullContentOverride = "";
