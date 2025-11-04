"use client";

import { useEffect, useState } from "react";
import { Address } from "@scaffold-ui/components";
import { hardhat } from "viem/chains";
import { GetGreetingsDocument, execute } from "~~/.graphclient";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";

const GreetingsTable = () => {
  const [greetingsData, setGreetingsData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { targetNetwork } = useTargetNetwork();

  useEffect(() => {
    const fetchData = async () => {
      if (!execute || !GetGreetingsDocument) {
        return;
      }
      try {
        const { data: result } = await execute(GetGreetingsDocument, {});
        setGreetingsData(result);
        console.log(result);
      } catch (err) {
        setError(err);
      } finally {
      }
    };

    fetchData();
  }, []);

  if (error) {
    return null;
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="overflow-x-auto shadow-2xl rounded-xl">
        <table className="table bg-base-100 table-zebra">
          <thead>
            <tr className="rounded-xl">
              <th className="bg-primary"></th>
              <th className="bg-primary">Sender</th>
              <th className="bg-primary">Greetings</th>
            </tr>
          </thead>
          <tbody>
            {greetingsData?.greetings?.map((greeting: any, index: number) => (
              <tr key={greeting.id}>
                <th>{index + 1}</th>
                <td>
                  <Address
                    address={greeting?.sender?.address}
                    chain={targetNetwork}
                    blockExplorerAddressLink={
                      targetNetwork.id === hardhat.id
                        ? `/blockexplorer/address/${greeting?.sender?.address}`
                        : undefined
                    }
                  />
                </td>
                <td>{greeting.greeting}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GreetingsTable;
