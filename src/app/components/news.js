"use client";
import { useEffect } from "react";
import Image from "next/image";
import smm1 from "../icon/SMM1.jpg";
import smm2 from "../icon/SMM2.jpg";
import smm3 from "../icon/SMM3.jpg";
import shop from "../icon/shop1.jpg";
export const NewsPage = () => {
  const imgArr = [smm1, smm2, smm3];

  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollOffset = window.innerWidth <= 768 ? 1160 : 570;
      window.scrollBy({
        top: scrollOffset, // Scroll down by 300px or 600px
        behavior: "smooth", // Smooth scrolling effect
      });
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="image-container">
        {imgArr.map((image, index) => (
          <div key={index} className="image-wrapper">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="carousel-item"
              width={570}
              height={570}
              style={{ maxWidth: "100vw", maxHeight: "100vh" }}
            />
          </div>
        ))}
        <Image src={shop} alt="Shop" width="100vw" height="100vh" />
      </div>

      <style jsx>{`
        .image-container {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .image-wrapper {
          margin-bottom: 1rem;
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
            max-width: 33.33%; /* Make images smaller on smaller screens */
            height: auto;
          }
        }

        @media (max-width: 480px) {
          .carousel-item {
            max-width: 50%; /* Make images even smaller on very small devices */
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};
