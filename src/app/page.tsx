"use client";
import { Client, Account } from "appwrite";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
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
        //redirect("/home");
        router.push("/home");
      },
      function (error) {
        console.log(error);
      }
    );
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href="/signup">Sign Up</Link>
        <Link href="/login" style={{ marginLeft: "5em" }}>
          Log In
        </Link>
      </div>
      <div>
        <h1 className="text-3xl" style={{ textAlign: "center" }}>
          Welcome to Blotter
        </h1>
      </div>
    </main>
  );
}
