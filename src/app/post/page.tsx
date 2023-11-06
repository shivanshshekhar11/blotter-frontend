"use client";
import { Client, Databases, Account, ID } from "appwrite";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
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
        setUser(response.name);
      },
      function (error) {
        console.log(error);
      }
    );
  });

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Get the form data
    const { text } = e.target;

    if (text.value.length < 1) {
      setAlertMsg((prev) => {
        return "Empty blot ... :-)";
      });
      setAlert((prev) => {
        return true;
      });
      return;
    }

    const client = new Client();

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const databases = new Databases(client);

    const response = databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_BLOTS_COLLECTION,
      ID.unique(),
      {
        Text: text.value,
        User: user,
      }
    );

    response.then(
      function (response) {
        console.log(response);
        //redirect
        router.push("/home");
      },
      function (error) {
        console.log(error);
        setAlertMsg((prev) => {
          return "Some error occured creating a post ... look up console";
        });
        setAlert((prev) => {
          return true;
        });
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {!alert && (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "75%",
              margin: "auto",
            }}
          >
            <textarea
              name="text"
              placeholder="blot text ... upto 280 chars"
              className="mt-5 text-black p-1 w-full h-20"
            />
            <button type="submit" className="mt-5 p-1">
              Submit
            </button>
          </form>
        )}
        {alert && (
          <div>
            <p>{alertMsg}</p>
            <button className="mt-5">
              <a href="/home">Close</a>
            </button>
          </div>
        )}
      </div>
      hello {user}
    </main>
  );
}
