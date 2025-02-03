# SE-2 Ponder Extension

This extension allows to use Ponder (https://ponder.sh/) for event indexing on an SE-2 dapp.

Ponder is an open-source framework for blockchain application backends. With Ponder, you can rapidly build & deploy an API that serves custom data from smart contracts on any EVM blockchain.

## Config

Ponder config (`packages/ponder/ponder.config.ts`) is set automatically from the deployed contracts and using the first blockchain network setup at `packages/nextjs/scaffold.config.ts`.

## Design your schema

You can define your Ponder data schema on the file at `packages/ponder/ponder.schema.ts` following the Ponder documentation (https://ponder.sh/docs/schema).

## Indexing data

You can index events by adding files to `packages/ponder/src/` (https://ponder.sh/docs/indexing/write-to-the-database)

## Start the development server

Run `yarn ponder:dev` to start the Ponder development server, for indexing and serving the GraphQL API endpoint at http://localhost:42069

## Query the GraphQL API

With the dev server running, open http://localhost:42069 in your browser to use the GraphiQL interface. GraphiQL is a useful tool for exploring your schema and testing queries during development. (https://ponder.sh/docs/query/graphql)

You can query data on a page using `@tanstack/react-query`. Check the code at `packages/nextjs/app/greetings/page.ts` to get the greetings updates data and show it.

## Deploy

To deploy the Ponder indexer please refer to the Ponder Deploy documentation https://ponder.sh/docs/production/deploy

At **Settings** -> **Deploy** -> you must set **Custom Start Command** to `yarn ponder:start`.

For faster indexing, you can add the ***startBlock*** to each deployed contract on the file `packages/nextjs/contracts/deployedContracts.ts`.

And then you have to set up the `NEXT_PUBLIC_PONDER_URL` env variable on your SE-2 dapp to use the deployed ponder indexer.
