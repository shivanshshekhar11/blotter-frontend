"use client";
import { Client, Account, ID } from "appwrite";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
      .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

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

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Get the form data
    const { name, email, password } = e.target;

    const client = new Client();

    const account = new Account(client);

    client
      .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT || "")
      .setProject(process.env.NEXT_PUBLIC_PROJECT || "");

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
          return "Some error occured signing you up ... look up console for more details";
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
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              name="name"
              placeholder="name"
              className="mt-5 text-black p-1 w-80"
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              className="mt-5 text-black p-1 w-80"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="mt-5 text-black p-1 w-80"
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
              <a href="/">Close</a>
            </button>
          </div>
        )}
      </div>
      <div>Sign Up</div>
    </main>
  );
}
