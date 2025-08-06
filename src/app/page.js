"use client";
import styles from "./page.module.css";
import { NavBar } from "./components/nav-bar";
import { NewsPage } from "./components/news";
import { AboutPage } from "./components/about-us";

export default function Home() {
  return (
    <div className={styles.page}>
      <NavBar />
      <div style={{ height: "50px" }}></div>
      <NewsPage />
      <AboutPage />
    </div>
  );
}
