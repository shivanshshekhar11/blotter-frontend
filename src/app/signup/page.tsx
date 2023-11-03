"use client";
import { Client, Account, ID } from "appwrite";
//import { redirect } from "next/dist/server/api-utils";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  /*useEffect(() => {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.get();

    response.then(
      function (response) {
        console.log(response);
        redirect("/home");
      },
      function (error) {
        console.log(error);
      }
    );
  });*/

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Get the form data
    const { name, email, password } = e.target;

    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
      .setProject(process.env.NEXT_PUBLIC_PROJECT);

    const response = account.create(
      ID.unique(),
      email.value,
      password.value,
      name.value
    );

    response.then(
      function (response) {
        console.log(response);
        setAlertMsg((prev) => {
          return "Account created ... You can now log in";
        });
        setAlert((prev) => {
          return true;
        });
      },
      function (error) {
        console.log(error);
        setAlertMsg((prev) => {
          return "Some error occured signing you up ...";
        });
        setAlert((prev) => {
          return true;
        });
      }
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {!alert && (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" />
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Submit</button>
          </form>
        )}
        {alert && (
          <div>
            <p>{alertMsg}</p>
            <button>
              <a href="/">Close</a>
            </button>
          </div>
        )}
      </div>
      <div>Sign Up</div>
    </main>
  );
}
