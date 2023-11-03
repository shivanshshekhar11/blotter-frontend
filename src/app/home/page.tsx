"use client";
import { Client, Databases, Account } from "appwrite";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.get();

    response.then(
      function (response) {
        console.log(response);
        setUser(response.$id);
      },
      function (error) {
        console.log(error);
      }
    );
  });

  const [Blots, setBlots] = useState<{ total: number; documents: Array<any> }>(
    null
  );

  const viewBlots = async () => {
    const client = new Client();

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const databases = new Databases(client);

    const blots = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_BLOTS_COLLECTION
    );

    console.log("blots---", blots);

    setBlots((prev) => {
      return { total: blots.total, documents: blots.documents };
    });

    console.log("Blots---", Blots);
  };

  const logoutSessions = async () => {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.deleteSessions();

    response.then(
      function (response) {
        console.log(response);
        setUser(null);
        //redirect
      },
      function (error) {
        console.log(error);
        //error alerts
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button onClick={viewBlots}>View Blots</button>
        <button onClick={logoutSessions}>Logout User</button>
      </div>
      <div>
        <h1>Blots</h1>
        {!!Blots &&
          Blots.documents.map((blot) => {
            return <p>{blot.Text}</p>;
          })}
      </div>
      hello {user}
    </main>
  );
}
