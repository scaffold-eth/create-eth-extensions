"use client";

import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import type { NextPage } from "next";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";

type Greeting = {
  id: string;
  text: string;
  setterId: `0x${string}`;
  premium: boolean;
  value: bigint;
  timestamp: number;
};

type GreetingsData = { greetings: { items: Greeting[] } };

const Greetings: NextPage = () => {
  const fetchGreetings = async () => {
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
    const data = await request<GreetingsData>(
      process.env.NEXT_PUBLIC_PONDER_URL || "http://localhost:42069",
      GreetingsQuery
    );
    return data;
  };

  const { data: greetingsData } = useQuery<GreetingsData>({
    queryKey: ["greetings"],
    queryFn: fetchGreetings,
  });

  if (!greetingsData) {
    return (
      <div className="flex items-center flex-col flex-grow pt-20">
        <div className="loading loading-dots loading-md"></div>
      </div>
    );
  }

  if (!greetingsData.greetings.items.length) {
    return (
      <div className="flex items-center flex-col flex-grow pt-20">
        <h1 className="text-center text-4xl font-bold">No greetings found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-20">
        <h1 className="text-center text-4xl font-bold">Greetings</h1>
        <div className="flex flex-col">
          {greetingsData.greetings.items.map((greeting: Greeting) => (
            <div key={greeting.id} className="flex items-center space-x-2">
              <p className="my-2 font-medium">{greeting.text}</p>
              <p>from</p>
              <Address address={greeting.setterId} />
              <p>at</p>
              <p className="my-2 font-medium">
                {new Date(greeting.timestamp * 1000).toLocaleString()}
              </p>
              {greeting.premium && (
                <p className="my-2 font-medium">
                  {" "}
                  - Premium (Ξ{formatEther(greeting.value)})
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Greetings;
