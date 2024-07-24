"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { gql, useQuery } from "urql";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

const Greetings: NextPage = () => {
  const GreetingsQuery = gql`
    query Greetings {
      greetings(orderBy: "timestamp", orderDirection: "desc") {
        items {
          id
          text
          setterId
          premium
          value
          timestamp
        }
      }
    }
  `;

  const [{ data: greetingsData }] = useQuery({
    query: GreetingsQuery,
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center">
          <h1 className="text-4xl font-bold">Ponder</h1>
          <div>
            <p>
              This extension allows using{" "}
              <a target="_blank" href="https://ponder.sh/" className="underline font-bold text-nowrap">
                Ponder
              </a>{" "}
              for event indexing on a SE-2 dapp.
            </p>
            <p>Ponder is an open-source framework for blockchain application backends.</p>
            <p>
              With Ponder, you can rapidly build & deploy an API that serves custom data from smart contracts on any EVM
              blockchain.
            </p>
          </div>

          <div className="divider my-0" />
          <h2 className="text-3xl font-bold mt-4">Getting Started</h2>
          <div>
            <p>
              Get started defining your data schema at{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                packages / ponder / ponder.schema.tsx
              </code>{" "}
              following the Ponder documentation at{" "}
              <a target="_blank" href="https://ponder.sh/docs/schema" className="underline font-bold text-nowrap">
                https://ponder.sh/docs/schema
              </a>
            </p>
            <p>
              Then index events by adding files to{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                packages / ponder / src /
              </code>{" "}
              (
              <a
                target="_blank"
                href="https://ponder.sh/docs/indexing/create-update-records"
                className="underline font-bold text-nowrap"
              >
                https://ponder.sh/docs/indexing/create-update-records
              </a>
              )
            </p>
            <p>
              Start the development Ponder server running{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                yarn ponder:dev
              </code>
            </p>
            <p>
              Finally, query your data using the Ponder GraphQL API (
              <a
                target="_blank"
                href="https://ponder.sh/docs/query/graphql"
                className="underline font-bold text-nowrap"
              >
                https://ponder.sh/docs/query/graphql
              </a>
              )
            </p>
            <p>
              You can find more information at{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all [word-spacing:-0.5rem] inline-block">
                packages / ponder / README.md
              </code>{" "}
              or the{" "}
              <a target="_blank" href="https://ponder.sh" className="underline font-bold text-nowrap">
                Ponder website
              </a>
            </p>
          </div>
          <div className="divider my-0" />

          <h2 className="text-3xl font-bold mt-4">Greetings example</h2>

          <div>
            <p>Below you can see a list of greetings fetched from Ponder GraphQL API.</p>
            <p>
              Add a greeting from the{" "}
              <Link href="/debug" passHref className="link">
                Debug Contracts
              </Link>{" "}
              tab, reload this page and the new greeting will appear here.
            </p>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <h2 className="text-center text-4xl font-bold">Greetings</h2>
          {!greetingsData && (
            <div className="flex items-center flex-col flex-grow pt-12">
              <div className="loading loading-dots loading-md"></div>
            </div>
          )}
          {greetingsData && !greetingsData.greetings.items.length && (
            <div className="flex items-center flex-col flex-grow pt-4">
              <p className="text-center text-xl font-bold">No greetings found</p>
            </div>
          )}
          {greetingsData && greetingsData.greetings.items.length && (
            <div className="flex flex-col items-center">
              {greetingsData.greetings.items.map((greeting: any) => (
                <div key={greeting.id} className="flex items-center space-x-2">
                  <p className="my-2 font-medium">{greeting.text}</p>
                  <p>from</p>
                  <Address address={greeting.setterId} />
                  <p>at</p>
                  <p className="my-2 font-medium">{new Date(greeting.timestamp * 1000).toLocaleString()}</p>
                  {greeting.premium && <p className="my-2 font-medium"> - Premium (Ξ{formatEther(greeting.value)})</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Greetings;
