"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

export const ContactPage = () => {
  const { lang } = useLanguage();
  const [copyFeedback, setCopyFeedback] = useState("");

  const content = {
    eng: {
      contacts: "Contacts",
      partners: "Our Partners",
      visit: "Visit Us",
      copiedPhone: "Copied!",
      copiedEmail: "Email copied to clipboard!",
    },
    hy: {
      contacts: "Կոնտակտներ",
      partners: "Մեր Գործընկերները",
      visit: "Այցելեք մեզ",
      copiedPhone: "Պատճենված է!",
      copiedEmail: "Էլ. փոստը պատճենվել է!",
    },
    arm: {
      contacts: "Կոնտակտներ",
      partners: "Մեր Գործընկերները",
      visit: "Այցելեք մեզ",
      copiedPhone: "Պատճենված է!",
      copiedEmail: "Էլ. փոստը պատճենվել է!",
    },
    ru: {
      contacts: "Контакты",
      partners: "Наши партнёры",
      visit: "Посетите нас",
      copiedPhone: "Скопировано!",
      copiedEmail: "Электронная почта скопирована в буфер обмена!",
    },
  };

  const t = content[lang] || content.eng;

  const handleCopy = async (text, type) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopyFeedback(type);
      setTimeout(() => setCopyFeedback(""), 2500);
    } catch (err) {
      console.error("Copy failed", err);
    }
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

  const socialLinks = [
    {
      href: "https://www.instagram.com/large.art.studio/",
      icon: faInstagram,
      label: "Instagram",
    },
    {
      href: "https://www.youtube.com/@largeart-studio7134",
      icon: faYoutube,
      label: "YouTube",
    },
    {
      href: "https://www.facebook.com/largeartstudio2012",
      icon: faFacebook,
      label: "Facebook",
    },
    {
      href: "https://www.behance.net/gordemirkhanyan",
      icon: faBehance,
      label: "Behance",
    },
    { href: "https://t.me/+37444533133", icon: faTelegram, label: "Telegram" },
    { href: "https://wa.me/+37444533133", icon: faWhatsapp, label: "WhatsApp" },
    { href: "viber://chat?number=37444533133", icon: faViber, label: "Viber" },
    {
      href: "#",
      icon: faEnvelope,
      label: "Email",
      onClick: (e) => {
        e.preventDefault();
        handleCopy("info@largeart.org", "email");
      },
    },
  ];

  return (
    <div className="container py-5">
      {/* CONTACT INFO SECTION */}
      <section className="section has-text-centered py-4">
        <h2 className="title is-3 has-text-warning">{t.contacts}</h2>

        <div className="is-flex is-justify-content-center is-align-items-center">
          <p
            onClick={() => handleCopy("+37444533133", "phone")}
            className="is-size-4 has-text-white has-text-weight-semibold"
            style={{ cursor: "pointer", userSelect: "none" }}
          >
            +374 44 533 133
          </p>
          {copyFeedback === "phone" && (
            <span className="tag is-success is-light ml-3">
              {t.copiedPhone}
            </span>
          )}
        </div>

        {copyFeedback === "email" && (
          <div className="notification is-success is-light is-inline-block py-2 px-4 mt-3">
            {t.copiedEmail}
          </div>
        )}

        <div className="buttons is-centered mt-4">
          {socialLinks.map(({ href, icon, label, onClick }, idx) => (
            <a
              key={idx}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="button is-dark square-button"
              aria-label={label}
              onClick={onClick}
            >
              <FontAwesomeIcon icon={icon} />
            </a>
          ))}
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="section py-4 has-text-centered">
        <h2 className="title is-3 has-text-warning mb-5">{t.partners}</h2>
        <div className="columns is-multiline is-mobile is-centered">
          {partners.map((partner, idx) => {
            const hasValidHref = Boolean(
              partner.href && partner.href.trim() !== "",
            );
            return (
              <div
                key={idx}
                className="column is-6-mobile is-4-tablet is-3-desktop"
              >
                <div className="card partner-card">
                  <Link
                    href={hasValidHref ? partner.href : "#"}
                    target={hasValidHref ? "_blank" : "_self"}
                    rel={hasValidHref ? "noopener noreferrer" : ""}
                    onClick={(e) => {
                      if (!hasValidHref) e.preventDefault();
                    }}
                  >
                    <div className="card-image p-3 has-background-white">
                      <figure className="image is-4by3">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          style={{ objectFit: "contain", padding: "8px" }}
                        />
                      </figure>
                    </div>
                    <div className="card-content p-3 has-background-dark has-text-centered">
                      <p className="title is-6 has-text-white mb-1">
                        {partner.name}
                      </p>
                      <p className="subtitle is-7 has-text-grey-light">
                        {partner.description}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="section py-4">
        <h2 className="title is-3 has-text-warning has-text-centered mb-5">
          {t.visit}
        </h2>
        <div className="columns is-centered">
          <div className="column is-10-tablet is-8-desktop">
            <div className="box p-0 map-box">
              <iframe
                title="Yandex Map"
                width="100%"
                height="400"
                src="https://yandex.ru/map-widget/v1/-/CDHVnOIN?z=17"
                allowFullScreen
                loading="lazy"
                style={{ border: 0, display: "block" }}
              ></iframe>
            </div>
          </div>
        </div>

        <footer className="has-text-centered mt-6 pb-5">
          <p className="has-text-grey-light is-size-7">
            Copyright © {new Date().getFullYear()} Large Art-Studio. All Rights
            Reserved.
          </p>
        </footer>
      </section>

      <style jsx>{`
        .square-button {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          transition:
            transform 0.2s ease,
            background-color 0.2s ease;
        }
        .square-button:hover {
          transform: translateY(-3px);
          background-color: #ffcc33 !important;
          color: #000000 !important;
        }
        .partner-card {
          height: 100%;
          border-radius: 8px;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          background-color: #1a1a1a;
        }
        .partner-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        }
        .map-box {
          border-radius: 12px;
          overflow: hidden;
          background-color: transparent;
        }
      `}</style>
    </div>
  );
};
