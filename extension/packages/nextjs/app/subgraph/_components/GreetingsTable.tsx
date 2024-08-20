"use client";

import { useEffect, useState } from "react";
import { Address } from "~~/components/scaffold-eth";

let GetGreetingsDocument: any, execute: any;
try {
  ({ GetGreetingsDocument, execute } = require("~~/.graphclient"));
} catch (err) {
  console.warn("Graph client not found, skipping data fetch.");
}

const GreetingsTable = () => {
  const [greetingsData, setGreetingsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!execute || !GetGreetingsDocument) {
        setLoading(false);
        return;
      }

      try {
        const { data: result } = await execute(GetGreetingsDocument, {});
        setGreetingsData(result);
        console.log(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
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
                  <Address address={greeting?.sender?.address} />
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