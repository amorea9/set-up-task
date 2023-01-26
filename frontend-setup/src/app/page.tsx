"use client";
import { Inter } from "@next/font/google";
import "./globals.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  const [catFacts, setCatFacts] = useState([]);
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
  console.log(catFacts);
  type factObj = { _id: string; text: string };

  return (
    <main className="main">
      <p>{result}</p>
      {catFacts ? catFacts.map((fact: factObj) => <p key={fact._id}>{fact.text}</p>) : null}
      <button className="p-4 border-2 bg-transparent border-white rounded-md hover:bg-pink-800 transition-all" onClick={() => getCatFacts()}>
        Load cats facts for the day
      </button>
    </main>
  );
}
