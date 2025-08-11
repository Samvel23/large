"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const images = [
  "/photos/tel1.jpg",
  "/photos/tel2.jpg",
  "/photos/tel3.jpg",
  "/photos/tel4.jpg",
];

export const TelMekh = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { lang } = useLanguage();

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="hero is-fullheight telmekh-hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered is-multiline">
            {/* Image Slider Column */}
            <div className="column is-6 fade-in-left">
              <div className="image-slider">
                <Image
                  src={images[currentIndex]}
                  alt={`TelMekh image ${currentIndex + 1}`}
                  width={500}
                  height={600}
                  className="is-rounded main-img"
                  priority
                />
                <div className="slider-controls">
                  <button onClick={prevImage} className="button is-small">
                    ◀
                  </button>
                  <button onClick={nextImage} className="button is-small">
                    ▶
                  </button>
                </div>
                <div className="thumbnails">
                  {images.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={60}
                      height={60}
                      className={`thumbnail ${
                        idx === currentIndex ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Text Content with Logo */}
            <div className="column is-6 fade-in-right">
              <div className="telmekh-logo fade-in-logo">
                <Image
                  src="/photos/telmekh.png"
                  alt="TelMekh Logo"
                  width={250}
                  height={100}
                  priority
                />
              </div>
              <p className="content is-size-5">
                {lang === "eng"
                  ? "This handcrafted wooden board features meticulously hammered nails and precision threading. When woven with thread, these nails form an intricate picture. Each piece is unique, crafted with care, and perfect for home decoration or a personal gift."
                  : lang === "ru"
                  ? "Эта деревянная доска ручной работы украшена тщательно вбитыми гвоздями и точной резьбой. В сочетании с нитями эти гвозди образуют замысловатый рисунок. Каждое изделие TelMekh уникально, изготовлено с заботой и идеально подходит для украшения дома или личного подарка."
                  : "Այս ձեռագործ փայտե տախտակը պատրաստված է մանրակրկիտ մշակված մեխերով և ճշգրիտ թելերով։ Թելով հյուսված այս մեխերը ստեղծում են բարդ պատկեր։ Յուրաքանչյուր TelMekh եզակի է, պատրաստված խնամքով և շատ լավ նվեր ընկերոջը կամ հարազատին։"}
              </p>
              <ul className="content is-size-5 list-animate">
                <li>
                  {lang === "eng"
                    ? "Handmade from quality wood"
                    : lang === "ru"
                    ? "Изготовлено вручную из качественной древесины."
                    : "Ձեռագործ՝ որակյալ փայտից"}
                </li>
              </ul>
              <a href="https://www.instagram.com/telmekh/">
                <button className="button is-warning is-medium pulse-btn mt-4">
                  {lang === "eng"
                    ? "Visit TelMekh on Instagram"
                    : lang === "ru"
                    ? "Посетите TelMekh в Instagram"
                    : "Այցելեք TelMekh-ը Instagram-ում"}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        * {
          font-family: "Noto Sans Armenian", sans-serif;
        }
        .telmekh-hero {
          color: #ffffff;
        }
        .telmekh-logo {
          margin-bottom: 1rem;
        }
        .fade-in-logo {
          opacity: 0;
          transform: translateY(-10px);
          animation: fadeInLogo 1s ease forwards;
          animation-delay: 0.2s;
        }
        @keyframes fadeInLogo {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .gradient-text {
          background: linear-gradient(90deg, #ffb347 0%, #ffcc33 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        .image-slider {
          position: relative;
          text-align: center;
        }
        .main-img {
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
          transition: opacity 1s ease-in-out;
        }
        .slider-controls {
          margin-top: 10px;
        }
        .thumbnails {
          margin-top: 12px;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .thumbnail {
          cursor: pointer;
          border-radius: 8px;
          border: 2px solid transparent;
          transition: transform 0.3s, border 0.3s;
        }
        .thumbnail:hover {
          transform: scale(1.1);
        }
        .thumbnail.active {
          border: 2px solid #ffcc33;
        }
        .fade-in-left,
        .fade-in-right {
          opacity: 0;
          transform: translateX(40px);
          animation: fadeInX 1s ease forwards;
        }
        .fade-in-left {
          transform: translateX(-40px);
          animation-delay: 0.2s;
        }
        .fade-in-right {
          animation-delay: 0.4s;
        }
        @keyframes fadeInX {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .list-animate li {
          opacity: 0;
          transform: translateY(20px);
          animation: listFadeIn 0.6s ease forwards;
        }
        .list-animate li:nth-child(1) {
          animation-delay: 0.6s;
        }
        .list-animate li:nth-child(2) {
          animation-delay: 0.8s;
        }
        .list-animate li:nth-child(3) {
          animation-delay: 1s;
        }
        @keyframes listFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .pulse-btn {
          animation: pulse 1.5s infinite;
          box-shadow: 0 2px 16px rgba(255, 204, 51, 0.2);
          border-radius: 8px;
          font-weight: 600;
          letter-spacing: 0.03em;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 204, 51, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(255, 204, 51, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 51, 0);
          }
        }
        .content {
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        @media (max-width: 768px) {
          .columns {
            text-align: center;
          }
          .content ul {
            display: inline-block;
            text-align: left;
            max-width: 300px;
          }
          .main-img {
            width: 90vw !important;
            height: auto !important;
          }
          .thumbnails {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};
