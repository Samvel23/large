"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { NavBar } from "./components/nav-bar";
import { NewsPage } from "./components/news";
import { AboutPage } from "./components/about-us";

export default function Home() {
  // Close modal with Escape key

  return (
    <div className={styles.page}>
      {/* Modal */}

      {/* Rest of page */}
      <NavBar />
      <div style={{ height: "50px" }}></div>
      <NewsPage />
      <AboutPage />

      <style jsx>{`
        .modal-content {
          max-width: 90%;
          max-height: 90%;
          z-index: 999; /* Ensure it's above modal background */
          position: relative;
        }
        .modal-content img {
          display: block;
          width: auto;
          height: auto;
          max-height: 80vh;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}
