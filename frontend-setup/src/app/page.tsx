"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  const [catFacts, setCatFacts] = useState([]);
  const [name, setName] = useState("");
  type factObj = { _id: string; text: string };
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

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    let username = e.target.value;
    setName(username);
    console.log(username);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/create", {
        method: "POST",
        body: JSON.stringify({ username: name, password: "default122", email: "default@mail.com" }),
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

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input type="text" placeholder="Enter your name" onChange={(e) => handleName(e)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <button className="p-4 border-2 bg-transparent border-white rounded-md hover:bg-pink-800 transition-all" onClick={() => getCatFacts()}>
        Load cats facts for the day
      </button>
    </main>
  );
}
