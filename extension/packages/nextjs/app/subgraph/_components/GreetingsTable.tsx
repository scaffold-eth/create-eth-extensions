"use client";

import { useEffect, useState } from "react";
import { Address } from "~~/components/scaffold-eth";
import { GetGreetingsDocument, execute } from "~~/.graphclient";

interface Greeting {
  id: string;
  sender: {
    address: string;
  };
  greeting: string;
}

const GreetingsTable = () => {
  const [greetingsData, setGreetingsData] = useState<{ greetings: Greeting[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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
            {greetingsData?.greetings?.map((greeting, index) => (
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
