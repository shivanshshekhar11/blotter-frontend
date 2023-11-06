"use client";
import { Client, Databases, Account } from "appwrite";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [Blots, setBlots] = useState<{ total: number; documents: Array<any> }>({
    total: 0,
    documents: [],
  });
  const client = new Client();

  useEffect(() => {
    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
      .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

    const response = account.get();

    response.then(
      function (response) {
        console.log(response);
        setUser(response.name);
        viewBlots();
      },
      function (error) {
        console.log(error);
        router.push("/");
      }
    );
  }, []);

  const viewBlots = async () => {
    const client = new Client();

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
      .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

    const databases = new Databases(client);

    const blots = databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE || "",
      process.env.NEXT_PUBLIC_BLOTS_COLLECTION || ""
    );

    blots.then(
      function (response) {
        setBlots((prev) => {
          return { total: response.total, documents: response.documents };
        });

        console.log("Blots---", Blots);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  const logoutSessions = async () => {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
      .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

    const response = account.deleteSessions();

    response.then(
      function (response) {
        console.log(response);
        setUser("");
        router.push("/");
      },
      function (error) {
        console.log(error);
        //error alerts
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button
          onClick={() => {
            router.push("/post");
          }}
        >
          Create a Blot
        </button>
        <button onClick={logoutSessions} className="ml-20">
          Logout User
        </button>
      </div>
      <div style={{ width: "75%" }}>
        {!!Blots &&
          Blots.documents.map((blot) => {
            return (
              <div
                key={blot.$id}
                className="mt-5 border-solid border-2 border-sky-500 p-3 rounded-lg"
              >
                <p>{blot.Text}</p>
                <hr className="mt-2" />
                <p>{blot.User}</p>
              </div>
            );
          })}
      </div>
      Hello {user} ...
    </main>
  );
}
