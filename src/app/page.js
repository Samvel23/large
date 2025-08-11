"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { NavBar } from "./components/nav-bar";
import { NewsPage } from "./components/news";
import { AboutPage } from "./components/about-us";

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(true); // show on page load

  // Optional: close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalActive(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.page}>
      {/* Modal */}
      <div className={`modal ${isModalActive ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={() => setIsModalActive(false)}
        ></div>
        <div
          className="modal-content"
          style={{ maxWidth: "90%", maxHeight: "90%" }}
        >
          <figure className="image">
            <img src="/photos/expo.jpg" alt="Expo" />
          </figure>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => setIsModalActive(false)}
        ></button>
      </div>

      {/* Rest of page */}
      <NavBar />
      <div style={{ height: "50px" }}></div>
      <NewsPage />
      <AboutPage />

      <style>{`
        /* Optional: adjust modal image for better responsiveness */
        .modal-content img {
          max-height: 80vh;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}
