"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faTag,
  faVideo,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";

const videoImages = ["/photos/video1.jpg", "/photos/video2.jpg"];
const photoImages = [
  "/photos/photoshoot1.jpg",
  "/photos/photoshoot2.jpg",
  "/photos/photoshoot3.jpg",
  "/photos/photoshoot4.jpg",
];

const translations = {
  eng: {
    videoTitle: "Video Production & Editing",
    videoDesc:
      "Professional video production and editing services for events, commercials, and brand storytelling.",
    photoTitle: "Photoshoot & Retouching",
    photoDesc:
      "High-end photography for products, events, and portraits, enhanced with expert color grading and retouching.",
    priceBtn: "Price List",
    alertMsg: "Price list will be available soon!",
  },
  ru: {
    videoTitle: "Видеопроизводство и монтаж",
    videoDesc:
      "Профессиональные услуги видеопроизводства и монтажа для мероприятий, рекламных роликов и многого другого.",
    photoTitle: "Фотосъёмка и обработка",
    photoDesc:
      "Профессиональная фотография для продуктов, мероприятий и портретов с глубокой ретушью и цветокоррекцией.",
    priceBtn: "Прайс-лист",
    alertMsg: "Прайс-лист будет доступен в ближайшее время!",
  },
  hy: {
    videoTitle: "Տեսանյութերի արտադրություն և մոնտաժ",
    videoDesc:
      "Մասնագիտական տեսանյութերի արտադրություն և մոնտաժման ծառայություններ միջոցառումների, գովազդային տեսանյութերի համար:",
    photoTitle: "Լուսանկարչություն և խմբագրում",
    photoDesc:
      "Մասնագիտական լուսանկարչություն ապրանքների, միջոցառումների և դիմանկարների համար՝ մասնագիտական վերամշակմամբ:",
    priceBtn: "Գնացուցակ",
    alertMsg: "Գնացուցակը շուտով հասանելի կլինի:",
  },
};

export const Content = () => {
  const { lang } = useLanguage();
  const normalizedLang = lang === "arm" ? "hy" : lang;
  const t = translations[normalizedLang] || translations.eng;

  const [videoIndex, setVideoIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [videoDir, setVideoDir] = useState(1);
  const [photoDir, setPhotoDir] = useState(1);

  const handleNext = (type) => {
    if (type === "video") {
      setVideoDir(1);
      setVideoIndex((prev) => (prev + 1) % videoImages.length);
    } else {
      setPhotoDir(1);
      setPhotoIndex((prev) => (prev + 1) % photoImages.length);
    }
  };

  const handlePrev = (type) => {
    if (type === "video") {
      setVideoDir(-1);
      setVideoIndex((prev) => (prev === 0 ? videoImages.length - 1 : prev - 1));
    } else {
      setPhotoDir(-1);
      setPhotoIndex((prev) => (prev === 0 ? photoImages.length - 1 : prev - 1));
    }
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="content-wrapper py-8 px-4">
      <div className="content-grid">
        {/* VIDEO PRODUCTION CARD */}
        <section className="showcase-card">
          <header className="card-header">
            <div className="icon-badge">
              <FontAwesomeIcon icon={faVideo} />
            </div>
            <h2 className="section-title">{t.videoTitle}</h2>
          </header>

          <div className="carousel-frame">
            <button
              className="nav-btn prev"
              onClick={() => handlePrev("video")}
              aria-label="Previous video slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="image-viewport">
              <AnimatePresence custom={videoDir} initial={false} mode="wait">
                <motion.div
                  key={videoIndex}
                  custom={videoDir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="motion-wrapper"
                >
                  <Image
                    src={videoImages[videoIndex]}
                    alt={`Video slide ${videoIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="nav-btn next"
              onClick={() => handleNext("video")}
              aria-label="Next video slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="dots-indicator">
            {videoImages.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${videoIndex === idx ? "active" : ""}`}
                onClick={() => {
                  setVideoDir(idx > videoIndex ? 1 : -1);
                  setVideoIndex(idx);
                }}
              />
            ))}
          </div>

          <p className="card-description">{t.videoDesc}</p>

          <button
            className="action-price-btn"
            onClick={() => alert(t.alertMsg)}
          >
            <FontAwesomeIcon icon={faTag} className="mr-2" />
            {t.priceBtn}
          </button>
        </section>

        {/* SECTION SEPARATOR */}
        <div className="grid-divider" />

        {/* PHOTOSHOOT CARD */}
        <section className="showcase-card">
          <header className="card-header">
            <div className="icon-badge">
              <FontAwesomeIcon icon={faCamera} />
            </div>
            <h2 className="section-title">{t.photoTitle}</h2>
          </header>

          <div className="carousel-frame">
            <button
              className="nav-btn prev"
              onClick={() => handlePrev("photo")}
              aria-label="Previous photo slide"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="image-viewport">
              <AnimatePresence custom={photoDir} initial={false} mode="wait">
                <motion.div
                  key={photoIndex}
                  custom={photoDir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="motion-wrapper"
                >
                  <Image
                    src={photoImages[photoIndex]}
                    alt={`Photoshoot slide ${photoIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className="nav-btn next"
              onClick={() => handleNext("photo")}
              aria-label="Next photo slide"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="dots-indicator">
            {photoImages.map((_, idx) => (
              <span
                key={idx}
                className={`dot ${photoIndex === idx ? "active" : ""}`}
                onClick={() => {
                  setPhotoDir(idx > photoIndex ? 1 : -1);
                  setPhotoIndex(idx);
                }}
              />
            ))}
          </div>

          <p className="card-description">{t.photoDesc}</p>

          <button
            className="action-price-btn"
            onClick={() => alert(t.alertMsg)}
          >
            <FontAwesomeIcon icon={faTag} className="mr-2" />
            {t.priceBtn}
          </button>
        </section>
      </div>

      <style jsx>{`
        .content-wrapper {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
        }

        .content-grid {
          display: flex;
          align-items: stretch;
          gap: 2rem;
          justify-content: center;
        }

        /* NEUTRAL GREY SURFACE PALETTE */
        .showcase-card {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #22252a;
          border: 1px solid #333740;
          border-radius: 16px;
          padding: 1.75rem;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .showcase-card:hover {
          border-color: #4a4f5c;
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.45);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255, 204, 51, 0.12);
          color: #ffcc33;
          font-size: 1.1rem;
        }

        .section-title {
          font-size: 1.35rem;
          color: #f1f3f5;
          font-weight: 700;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .grid-divider {
          width: 1px;
          background: linear-gradient(
            180deg,
            rgba(66, 72, 84, 0) 0%,
            #424854 50%,
            rgba(66, 72, 84, 0) 100%
          );
          flex-shrink: 0;
        }

        .carousel-frame {
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .image-viewport {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 12px;
          overflow: hidden;
          background: #181a1e;
          border: 1px solid #2d3139;
        }

        .motion-wrapper {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(24, 26, 30, 0.8);
          backdrop-filter: blur(4px);
          color: #f1f3f5;
          border: 1px solid rgba(255, 255, 255, 0.12);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .nav-btn.prev {
          left: 10px;
        }

        .nav-btn.next {
          right: 10px;
        }

        .nav-btn:hover {
          background: #ffcc33;
          color: #121316;
          border-color: #ffcc33;
        }

        .dots-indicator {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 1.25rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: #424854;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .dot.active {
          width: 24px;
          background: #ffcc33;
        }

        .card-description {
          color: #a0a6b2;
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
          flex-grow: 1;
        }

        .action-price-btn {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: #121316;
          background: #ffcc33;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            background-color 0.2s ease,
            transform 0.15s ease;
        }

        .action-price-btn:hover {
          background: #e6b800;
        }

        .action-price-btn:active {
          transform: scale(0.98);
        }

        .mr-2 {
          margin-right: 0.5rem;
        }

        @media (max-width: 900px) {
          .content-grid {
            flex-direction: column;
            gap: 1.5rem;
          }

          .grid-divider {
            width: 100%;
            height: 1px;
            background: linear-gradient(
              90deg,
              rgba(66, 72, 84, 0) 0%,
              #424854 50%,
              rgba(66, 72, 84, 0) 100%
            );
          }
        }
      `}</style>
    </div>
  );
};
