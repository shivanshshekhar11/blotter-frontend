"use client";
import Image from "next/image";
import { Client, Databases, Account, ID } from "appwrite";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Get the form data
    const { text } = e.target;

    const client = new Client();

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const databases = new Databases(client);

    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE,
      process.env.NEXT_PUBLIC_BLOTS_COLLECTION,
      ID.unique(),
      {
        Text: text.value,
        User: user,
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="blot text" />
          <button type="submit">Submit</button>
        </form>
      </div>
      hello {user}
    </main>
  );
}
