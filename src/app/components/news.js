"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import web from "../icon/web.jpg";
import shop from "../icon/shop1.jpg";

import smm1 from "../icon/SMM1.jpg";
import smm2 from "../icon/SMM2.jpg";
import smm3 from "../icon/SMM3.jpg";
import Link from "next/link";

export const NewsPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Detect screen width on client side
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 769);
    };

    checkMobile();
    setHydrated(true);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!hydrated) return null; // Prevent rendering until client-side

  return (
    <div>
      {/* Mobile View Only */}
      {isMobile && (
        <div className="mobile-layout">
          <div>
            <Image
              src={web}
              alt="Services"
              width={570}
              height={570}
              style={{ minWidth: "100vw", maxHeight: "100vh" }}
            />
          </div>
          <Image src={shop} alt="Shop" width="100vw" height="100vh" />
        </div>
      )}

      {/* Desktop View Only */}
      {!isMobile && (
        <div className="desktop-layout">
          <div className="smm-gallery">
            <div className="smm-image image-1 pop-up">
              <Link href="/construction">
                <Image src={smm1} alt="SMM1" width={300} height={300} />
              </Link>
            </div>
            <div className="smm-image image-2 pop-up">
              <Link href="/construction">
                <Image
                  src={smm2}
                  alt="SMM2"
                  width={300}
                  height={300}
                  href="/design"
                />
              </Link>
            </div>
            <div className="smm-image image-3 pop-up">
              <Link href="/store">
                <Image src={smm3} alt="SMM3" width={300} height={300} />
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
      `}</style>
    </div>
  );
};
