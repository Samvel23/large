"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { NavBar } from "./components/nav-bar";
import { NewsPage } from "./components/news";
import { AboutPage } from "./components/about-us";

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    // Check if the modal was shown before
    const hasSeenModal = localStorage.getItem("hasSeenExpoModal");

    if (!hasSeenModal) {
      setIsModalActive(true);
    }
  }, []);

  const closeModal = () => {
    setIsModalActive(false);
    // Save flag so it doesn't show again
    localStorage.setItem("hasSeenExpoModal", "true");
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={styles.page}>
      {/* Modal */}
      <div className={`modal ${isModalActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={closeModal}></div>
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
          onClick={closeModal}
        ></button>
      </div>

      {/* Rest of page */}
      <NavBar />
      <div style={{ height: "50px" }}></div>
      <NewsPage />
      <AboutPage />

      <style>{`
        .modal-content img {
          max-height: 80vh;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}
