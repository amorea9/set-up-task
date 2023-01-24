"use client";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import { useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home(props: any) {
  const [result, setResult] = useState("");
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => res.text())
      .then((data) => {
        setResult(data);
      });
  }, []);

  return <main className={styles.main}>{result}</main>;
}
