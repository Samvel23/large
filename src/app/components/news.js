"use client";
import { useEffect } from "react";
import Image from "next/image";
import smm1 from "../icon/SMM1.jpg";
import smm2 from "../icon/SMM2.jpg";
import smm3 from "../icon/SMM3.jpg";

export const NewsPage = () => {
  const imgArr = [smm1, smm2, smm3];

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollOffset = window.innerWidth <= 768 ? 300 : 600;
      window.scrollBy({
        top: scrollOffset, // Scroll down by 300px or 600px
        behavior: "smooth", // Smooth scrolling effect
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="image-container">
      {imgArr.map((image, index) => (
        <div key={index} className="image-wrapper">
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            className="carousel-item"
            width={570}
            height={570}
          />
        </div>
      ))}

      <style jsx>{`
        .image-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .image-wrapper {
          margin-bottom: 1rem;
          max-width: 100%; /* Ensure the images don't exceed container width */
        }

        .carousel-item {
          width: 100%; /* Make images responsive */
          height: auto;
          object-fit: cover; /* Maintain aspect ratio */
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .image-wrapper {
            margin-bottom: 0.5rem;
          }

          .carousel-item {
            width: 100%; /* Automatically adjust image size for smaller screens */
          }
        }

        @media (max-width: 480px) {
          .image-container {
            padding: 0.5rem; /* Reduce padding for very small screens */
          }

          .carousel-item {
            width: 100%; /* Full width on small devices */
          }
        }
      `}</style>
    </div>
  );
};
