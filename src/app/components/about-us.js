"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faYoutube,
  faViber,
  faTelegram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import copy from "../icon/copy.png";
import Image from "next/image";

export const AboutPage = () => {
  const [showContactText, setShowContactText] = useState(false);

  const toggleContactText = () => {
    setShowContactText(!showContactText);
  };

  const handleCopyPhoneNumber = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <section className="hero is-warning">
        <div className="hero-body has-text-centered">
          <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop">
            About Us
          </h1>
          <p className="subtitle is-size-5-mobile is-size-4-tablet">
            Learn more about our company and values
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop">
              <h1
                className="title is-4 highlighted-text"
                style={{ color: "orange" }}
              >
                Working Hours
              </h1>
              <div className="columns">
                <div className="column has-text-left">
                  <p
                    className="title is-size-5-mobile is-size-4-tablet"
                    style={{ color: "white" }}
                  >
                    Monday-Friday
                  </p>
                  <p
                    className="subtitle is-size-6-mobile is-size-5-tablet"
                    style={{ color: "white" }}
                  >
                    09:00 - 23:00
                  </p>
                </div>
                <div className="column has-text-left">
                  <p
                    className="title is-size-5-mobile is-size-4-tablet"
                    style={{ color: "white" }}
                  >
                    Saturday-Sunday
                  </p>
                  <p
                    className="subtitle is-size-6-mobile is-size-5-tablet"
                    style={{ color: "white" }}
                  >
                    10:00 - 19:00
                  </p>
                </div>
              </div>
              <h1
                className="title is-4 highlighted-text"
                style={{ marginTop: "2rem", color: "orange" }}
              >
                About Large Art-Studio
              </h1>
              <p className="title is-size-5" style={{ color: "white" }}>
                Gor Demirkhanyan PE
              </p>
              <p style={{ color: "white" }}>
                Large Art-Studio was founded in 2012. We initially provided
                video and photo filming, along with design services. In 2022, we
                underwent a rebranding and proudly opened our own office in
                2023.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section has-text-centered">
        <button className="button is-warning" onClick={toggleContactText}>
          Contact Information
        </button>
      </section>

      <section
        className={`section contact-section ${showContactText ? "open" : ""}`}
      >
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop has-text-centered">
              <div className="contact-info">
                <p onClick={() => handleCopyPhoneNumber("+37491132400")}>
                  <span className="contact-text">+37491132400</span>
                  <Image
                    src={copy}
                    alt="copy"
                    width={25}
                    height={25}
                    className="copy-icon"
                  />
                </p>
                <p
                  onClick={() =>
                    handleCopyPhoneNumber("gor.demirkhanyan@gmail.com")
                  }
                  style={{ marginBottom: 0 }}
                >
                  <span className="contact-text">
                    gor.demirkhanyan@gmail.com
                  </span>
                  <Image
                    src={copy}
                    alt="copy"
                    width={25}
                    height={25}
                    className="copy-icon"
                  />
                </p>
              </div>
              <div className="social-buttons">
                {[
                  {
                    href: "https://www.instagram.com/your-profile",
                    icon: faInstagram,
                  },
                  {
                    href: "https://www.youtube.com/your-channel",
                    icon: faYoutube,
                  },
                  { href: "https://wa.me/+37491132400", icon: faWhatsapp },
                  { href: "https://viber.com/your-profile", icon: faViber },
                  { href: "https://t.me/your-profile", icon: faTelegram },
                  {
                    href: "https://www.facebook.com/your-profile",
                    icon: faFacebook,
                  },
                ].map(({ href, icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="button is-large square-button">
                      <FontAwesomeIcon icon={icon} className="icon" />
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section"> */}
        <div className="container">
          <h2
            className="title is-4 has-text-centered"
            style={{ color: "white" }}
          >
            Visit Us
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
              ></iframe>
            </div>
          </div>
        </div>
      {/* </section> */}

      <style jsx global>{`
        .square-button {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: grey;
          border: none;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .square-button .icon {
          font-size: 1.5rem;
          color: black;
          transition: color 0.3s ease;
        }
        .square-button:hover {
          background-color: black;
          transform: scale(1.1);
        }
        .square-button:hover .icon {
          color: grey;
        }
        .social-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
        }
        .contact-info p {
          font-size: 1.5rem;
          cursor: pointer;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-text {
          color: orange;
        }
        .copy-icon {
          margin-left: 10px;
          cursor: pointer;
        }
        .contact-section {
          max-height: 0;
          opacity: 0;
          transition: max-height 1s ease, opacity 1s ease;
        }
        .contact-section.open {
          max-height: 500px;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .square-button {
            width: 50px;
            height: 50px;
          }
          .square-button .icon {
            font-size: 1.2rem;
          }
          .contact-info p {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};
