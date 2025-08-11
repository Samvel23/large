"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";

export const Content = () => {
  const { lang } = useLanguage();
  const [videoIndex, setVideoIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);

  const videoImages = ["/photos/video1.jpg", "/photos/video2.jpg"];
  const photoImages = [
    "/photos/photoshoot1.jpg",
    "/photos/photoshoot2.jpg",
    "/photos/photoshoot3.jpg",
    "/photos/photoshoot4.jpg",
  ];

  const handleNext = (type) => {
    if (type === "video") {
      setVideoIndex((prev) => (prev + 1) % videoImages.length);
    } else {
      setPhotoIndex((prev) => (prev + 1) % photoImages.length);
    }
  };

  const handlePrev = (type) => {
    if (type === "video") {
      setVideoIndex((prev) => (prev === 0 ? videoImages.length - 1 : prev - 1));
    } else {
      setPhotoIndex((prev) => (prev === 0 ? photoImages.length - 1 : prev - 1));
    }
  };

  const handlePriceClick = () => {
    alert("Price list will be available soon!");
  };

  return (
    <div className="content-wrapper">
      <div className="content-sections">
        {/* Video Section */}
        <div className="content-box">
          <h2 className="section-title">
            {lang === "eng"
              ? "Video Production and Montage"
              : lang === "ru"
              ? "Видеопроизводство и монтаж"
              : "Տեսանյութերի արտադրություն և մոնտաժ"}
          </h2>
          <div className="carousel">
            <button
              className="nav-btn"
              onClick={() => handlePrev("video")}
              aria-label="Previous video"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="image-wrapper">
              <Image
                src={videoImages[videoIndex]}
                alt={`Video ${videoIndex + 1}`}
                width={800}
                height={480}
                className="gallery-image"
              />
            </div>
            <button
              className="nav-btn"
              onClick={() => handleNext("video")}
              aria-label="Next video"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <p style={{ color: "#fff" }}>
            {lang === "eng"
              ? "Professional video production and editing services for events, commercials, and more."
              : lang === "ru"
              ? "Профессиональные услуги видеопроизводства и монтажа для мероприятий, рекламных роликов и многого другого."
              : "Մասնագիտական տեսանյութերի արտադրություն և մոնտաժման ծառայություններ միջոցառումների, գովազդային տեսանյութերի և այլնի համար."}
          </p>
          <button
            className="price-button has-background-warning"
            onClick={handlePriceClick}
          >
            {lang === "eng"
              ? "Price List"
              : lang === "ru"
              ? "Прайс-лист"
              : "Գնացուցակ"}
          </button>
        </div>

        {/* Divider */}
        <div className="separator" />

        {/* Photoshoot Section */}
        <div className="content-box">
          <h2 className="section-title">
            {lang === "eng"
              ? "Photoshoot and Editing"
              : lang === "ru"
              ? "Фотосъёмка и монтаж"
              : "Լուսանկարչություն և խմբագրում"}
          </h2>
          <div className="carousel">
            <button
              className="nav-btn"
              onClick={() => handlePrev("photo")}
              aria-label="Previous photo"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="image-wrapper">
              <Image
                src={photoImages[photoIndex]}
                alt={`Photoshoot ${photoIndex + 1}`}
                width={800}
                height={480}
                className="gallery-image"
              />
            </div>
            <button
              className="nav-btn"
              onClick={() => handleNext("photo")}
              aria-label="Next photo"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
          <p style={{ color: "#fff" }}>
            {lang === "eng"
              ? "Professional photography for products, events, and portraits, enhanced with expert editing and retouching."
              : lang === "ru"
              ? "Профессиональная фотография для продуктов, мероприятий и портретов с профессиональной обработкой и ретушью."
              : "Մասնագիտական լուսանկարչություն ապրանքների, միջոցառումների և դիմանկարների համար, որը համալրված է մասնագիտական մոնտաժով և վերամշակմամբ."}
          </p>
          <button
            className="price-button has-background-warning"
            onClick={handlePriceClick}
          >
            {lang === "eng"
              ? "Price List"
              : lang === "ru"
              ? "Прайс-лист"
              : "Գնացուցակ"}
          </button>
        </div>
      </div>

      <style jsx>{`
        * {
          font-family: "Noto Sans Armenian", sans-serif;
        }
        .content-wrapper {
          padding: 2rem 1rem;
          max-width: 1400px;
          margin: auto;
          width: 100%;
          box-sizing: border-box;
        }

        .content-sections {
          display: flex;
          gap: 2rem;
          align-items: stretch;
          flex-wrap: wrap;
          justify-content: center;
        }

        .content-box {
          flex: 1;
          min-width: 320px;
          max-width: 800px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          justify-content: space-between;
        }

        .section-title {
          font-size: 1.8rem;
          color: #fff;
          margin: 0;
          font-weight: 600;
        }

        /* Divider line */
        .separator {
          width: 4px;
          background: #666;
          border-radius: 2px;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .carousel {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .image-wrapper {
          width: 100%;
          max-width: 800px;
          aspect-ratio: 5 / 3;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .nav-btn {
          background: #f9a825;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          font-size: 1.2rem;
          transition: background 0.3s;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-btn:hover {
          background: #f57f17;
        }

        .gallery-image {
          border-radius: 8px;
          object-fit: cover;
          width: 100%;
          height: 100%;
          max-width: 800px;
          max-height: 480px;
        }

        p {
          margin: 0;
          line-height: 1.6;
          font-size: 1rem;
        }

        .price-button {
          padding: 0.8rem 1.4rem;
          font-size: 1rem;
          color: black;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s ease;
          margin-top: auto;
        }

        @media (max-width: 1024px) {
          .content-box {
            max-width: 500px;
          }

          .image-wrapper {
            max-width: 600px;
            max-height: 360px;
          }

          .gallery-image {
            max-width: 600px;
            max-height: 360px;
          }
        }

        @media (max-width: 768px) {
          .content-sections {
            flex-direction: column;
            gap: 2rem;
          }

          .separator {
            width: 100%;
            height: 4px;
            border-radius: 2px;
            box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
          }

          .content-box {
            min-width: 100%;
            max-width: 100%;
          }

          .image-wrapper {
            max-width: 100%;
            height: auto;
          }

          .gallery-image {
            max-width: 100%;
            max-height: none;
          }

          .section-title {
            font-size: 1.6rem;
          }

          .nav-btn {
            padding: 0.5rem 0.8rem;
            font-size: 1rem;
          }

          .price-button {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .content-wrapper {
            padding: 1.5rem 0.5rem;
          }

          .section-title {
            font-size: 1.4rem;
          }

          .carousel {
            gap: 0.5rem;
          }

          .nav-btn {
            padding: 0.4rem 0.7rem;
            font-size: 0.9rem;
          }

          p {
            font-size: 0.9rem;
          }

          .price-button {
            padding: 0.6rem 1rem;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};
