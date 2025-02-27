"use client"
import styles from "./page.module.css";
import { NavBar } from "./components/nav-bar";
import { NewsPage } from "./components/news";
import { AboutPage } from "./components/about-us";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("eng");
  return (
    <div className={styles.page}>
      <NavBar lang={lang} setLang={setLang} />
      <div style={{ height: "50px" }}></div>
      <NewsPage lang={lang} setLang={setLang} />
      <div style={{ height: "100px" }}></div>
      <AboutPage lang={lang} setLang={setLang} />
    </div>
  );
}
