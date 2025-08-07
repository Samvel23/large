"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const NewsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 769);
    };

    checkMobile();
    setHydrated(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!hydrated) return null;

  return (
    <div>
      {/* Mobile View */}
      {isMobile && (
        <div className="mobile-layout">
          <div className="smm-gallery">
            <div className="smm-image image-1 pop-up">
              <Link href="/construction">
                <Image
                  src="/photos/SMM1.jpg"
                  alt="SMM1"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <div className="smm-image image-2 pop-up">
              <Link href="/design">
                <Image
                  src="/photos/SMM2.jpg"
                  alt="SMM2"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
            <div className="smm-image image-3 pop-up">
              <Link href="/store">
                <Image
                  src="/photos/SMM3.jpg"
                  alt="SMM3"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
          </div>
          <Image
            src="/photos/shop1.jpg"
            alt="Shop"
            width={570}
            height={570}
            style={{
              minWidth: "100vw",
              maxHeight: "100vh",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {/* Desktop View */}
      {!isMobile && (
        <div className="desktop-layout">
          <div className="smm-gallery">
            <div className="smm-image image-1 pop-up">
              <Link href="/construction">
                <Image
                  src="/photos/SMM1.jpg"
                  alt="SMM1"
                  width={300}
                  height={300}
                />
              </Link>
            </div>
            <div className="smm-image image-2 pop-up">
              <Link href="/design">
                <Image
                  src="/photos/SMM2.jpg"
                  alt="SMM2"
                  width={300}
                  height={300}
                />
              </Link>
            </div>
            <div className="smm-image image-3 pop-up">
              <Link href="/store">
                <Image
                  src="/photos/SMM3.jpg"
                  alt="SMM3"
                  width={300}
                  height={300}
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .smm-gallery {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 2rem;
        }

        .smm-image {
          opacity: 0;
          transform: translateX(-100px);
          animation: slideInLeft 0.8s forwards ease-out;
        }

        .pop-up:hover {
          cursor: pointer;
        }

        .image-1 {
          animation-delay: 0.1s;
        }

        .image-2 {
          animation-delay: 0.3s;
        }

        .image-3 {
          animation-delay: 0.5s;
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .smm-gallery :global(img) {
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .smm-gallery {
            padding: 1rem;
            gap: 0.5rem;
          }
          .smm-gallery :global(img) {
            width: 100px !important;
            height: 100px !important;
          }
        }
      `}</style>
    </div>
  );
};
