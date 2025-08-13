"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import { NavBar } from "./components/nav-bar";
import { NewsPage } from "./components/news";
import { AboutPage } from "./components/about-us";

export default function Home() {
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    // Check if the modal was shown during this browser tab session
    const hasSeenModal = sessionStorage.getItem("hasSeenExpoModal");

    if (!hasSeenModal) {
      setIsModalActive(true);
      sessionStorage.setItem("hasSeenExpoModal", "true");
    }
  }, []);

  const closeModal = () => {
    setIsModalActive(false);
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
        <div className="modal-content">
          <figure className="image">
            <Image
              src="/photos/expo.jpg"
              alt="Expo"
              width={1200}
              height={800}
              style={{ maxHeight: "80vh", objectFit: "contain" }}
              priority
            />
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
