"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  const [catFacts, setCatFacts] = useState([]);
  const [payload, setPayload] = useState({ username: "", password: "", email: "default@mail.com" } as payloadObj);
  type factObj = { _id: string; text: string };
  type payloadObj = { username: string; password: string; email: string };
  const theForm = useRef<any>(null);
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((data) => {
        setResult(data);
      });
  }, []);

  const getCatFacts = () => {
    fetch("http://localhost:3001/catsfacts/catfact")
      .then((res) => res.json())
      .then((data) => {
        setCatFacts(data);
      });
  };

  function handleEntry(e: React.FormEvent<HTMLInputElement>) {
    // let username = e.target.value;
    setPayload({ ...payload, username: theForm.current.elements.username.value, password: theForm.current.elements.password.value } as payloadObj);
    console.log(payload);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/create", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(data);
      fetch("http://localhost:3001/users/")
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="main">
      <p>{result}</p>
      {catFacts ? catFacts.map((fact: factObj) => <p key={fact._id}>{fact.text}</p>) : null}

      <form onSubmit={handleSubmit} ref={theForm}>
        <label htmlFor="username">
          Username
          <input id="username" name="username" type="text" placeholder="Enter your username" onChange={(e) => handleEntry(e)} />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" name="password" type="text" placeholder="Enter your password" onChange={(e) => handleEntry(e)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <button className="p-4 border-2 bg-transparent border-white rounded-md hover:bg-pink-800 transition-all" onClick={() => getCatFacts()}>
        Load cats facts for the day
      </button>
    </main>
  );
}
