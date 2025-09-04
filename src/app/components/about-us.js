"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faYoutube,
  faTelegram,
  faFacebook,
  faBehance,
  faViber,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";
import Link from "next/link";

export const AboutPage = () => {
  const { lang } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyPhoneNumber = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const partners = [
    {
      name: "emark",
      logo: "/photos/logo1.png",
      href: "https://www.e-mark.am/hy/prints#",
      description: "Official Partner",
    },
    {
      name: "Yerevan City",
      logo: "/photos/logo2.png",
      href: "",
      description: "Partners 1 year",
    },
    {
      name: "Viridian",
      logo: "/photos/logo3.png",
      href: "",
      description: "Partners 1 year",
    },
    {
      name: "Rozelita-Eltaroz",
      logo: "/photos/logo5.png",
      href: "",
      description: "Partners 13 years",
    },
    {
      name: "Velvet",
      logo: "/photos/logo6.png",
      href: "",
      description: "Partners 7 years",
    },
    {
      name: "YereVibe",
      logo: "/photos/logo4.png",
      href: "",
      description: "Partners 1 year",
    },
    {
      name: "Murzilka",
      logo: "/photos/logo7.png",
      href: "",
      description: "Partners 4 years",
    },
    {
      name: "Sparapet",
      logo: "/photos/logo8.png",
      href: "",
      description: "Partners 1 year",
    },
  ];

  return (
    <div className="about-page">
      {/* CONTACT INFO SECTION */}
      <section className="section py-5 has-text-centered">
        <h2 className="title" style={{ color: "orange" }}>
          {lang === "eng"
            ? "Contacts"
            : lang === "arm"
            ? "Կոնտակտներ"
            : "Контакты"}
        </h2>
        <p
          onClick={() => handleCopyPhoneNumber("+37444533133")}
          style={{ cursor: "pointer", color: "white", fontSize: "1.5rem" }}
        >
          +374 44 533 133
          {isCopied && <span style={{ marginLeft: "10px" }}>Copied!</span>}
        </p>
        <div className="social-buttons mt-4">
          {[
            {
              href: "https://www.instagram.com/large.art.studio/",
              icon: faInstagram,
            },
            {
              href: "https://www.youtube.com/@largeart-studio7134",
              icon: faYoutube,
            },
            {
              href: "https://www.facebook.com/largeartstudio2012",
              icon: faFacebook,
            },
            {
              href: "https://www.behance.net/gordemirkhanyan",
              icon: faBehance,
            },
            { href: "https://t.me/+37444533133", icon: faTelegram },
            { href: "https://wa.me/+37444533133", icon: faWhatsapp },
            { href: "viber://chat?number=37444533133", icon: faViber },
            {
              href: "mailto:info@largeart.org",
              icon: faEnvelope,
              onClick: (e) => {
                e.preventDefault();
                navigator.clipboard.writeText("info@largeart.org");
                alert(
                  lang === "eng"
                    ? "Email copied to clipboard!"
                    : lang === "ru"
                    ? "Электронная почта скопирована в буфер обмена!"
                    : "Էլ. փոստը պատճենվել է!"
                );
                setTimeout(() => setIsCopied(false), 2000);
              },
            },
          ].map(({ href, icon, onClick }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="button is-large square-button mx-2"
              onClick={onClick}
            >
              <FontAwesomeIcon icon={icon} className="icon" />
            </a>
          ))}
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="section py-5 has-text-centered">
        <h2 className="title" style={{ color: "orange" }}>
          {lang === "eng"
            ? "Our Partners"
            : lang === "arm"
            ? "Մեր Գործընկերները"
            : "Наши партнёры"}
        </h2>
        <div className="partners-grid">
          {partners.map((partner, idx) => (
            <div key={idx} className="partner-card">
              <Link href={partner.href || "#"} target="_blank">
                <div className="partner-logo">
                  <img src={partner.logo} alt={partner.name} />
                </div>
                <div className="partner-info">
                  <p className="partner-name">{partner.name}</p>
                  <p className="partner-description">{partner.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section py-5">
        <h2 className="title has-text-centered" style={{ color: "orange" }}>
          {lang === "eng"
            ? "Visit Us"
            : lang === "arm"
            ? "Այցելեք մեզ"
            : "Посетите нас"}
        </h2>
        <div className="columns is-centered">
          <div className="column is-10">
            <iframe
              title="Yandex Map"
              width="100%"
              height="400"
              src="https://yandex.ru/map-widget/v1/-/CDHVnOIN?z=17"
              allowFullScreen
              loading="lazy"
              className="map-iframe"
            ></iframe>
          </div>
        </div>
        <div className="copyright-wrapper">
          <p
            className="has-text-centered"
            style={{ color: "white", marginTop: "1rem" }}
          >
            Copyright © 2025 Large Art-Studio. All Rights Reserved. Made by
            Large Art-Studio
          </p>
        </div>
      </section>

      {/* GLOBAL STYLES */}
      <style jsx>{`
        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .partner-card {
          width: 180px;
          background-color: #1a1a1a;
          border-radius: 10px;
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .partner-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
        .partner-logo {
          width: 100%;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          padding: 8px;
        }
        .partner-logo img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .partner-info {
          padding: 8px;
          text-align: center;
        }
        .partner-name {
          color: white;
          font-weight: bold;
          margin: 0;
        }
        .partner-description {
          color: #ccc;
          font-size: 0.85rem;
          margin: 0;
        }
        .map-iframe {
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .square-button {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #808080;
          border: none;
          transition: background-color 0.3s ease, transform 0.2s ease;
          border-radius: 8px;
        }
        .square-button .icon {
          font-size: 1.3rem;
          color: #000000;
          transition: color 0.3s ease;
        }
        .square-button:hover {
          background-color: #000000;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        .square-button:hover .icon {
          color: #808080;
        }
        .social-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
        }
        .copyright-wrapper {
          margin-top: 1rem;
          padding-bottom: 5rem;
        }

        @media (max-width: 768px) {
          .partner-card {
            width: 140px;
          }
          .partner-logo {
            height: 80px;
          }
        }

        @media (max-width: 480px) {
          .partner-card {
            width: 120px;
          }
          .partner-logo {
            height: 70px;
          }
          .partner-description {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};
