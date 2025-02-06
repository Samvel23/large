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

export const AboutPage = () => {
  const [showContactText, setShowContactText] = useState(false);

  const toggleContactText = () => {
    setShowContactText(!showContactText);
  };

  const handleCopyPhoneNumber = () => {
    const phoneNumber = "+37491132400";
    navigator.clipboard.writeText(phoneNumber);
    alert(`Copied to clipboard: ${phoneNumber}`);
  };

  return (
    <div>
      <section className="hero is-warning">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop">
              About Us
            </h1>
            <p className="subtitle is-size-5-mobile is-size-4-tablet">
              Learn more about our company and values
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop">
              <h1 className="title is-4 highlighted-text">Working Hours</h1>
              <div className="columns">
                <span className="column title is-size-4">
                  Monday-Friday 09:00-23:00
                </span>
                <span className="column title is-size-4">
                  Saturday-Sunday 10:00-19:00
                </span>
              </div>
              <h1
                className="title is-4 highlighted-text"
                style={{ marginTop: "2rem" }}
              >
                About Large Art-Studio
              </h1>
              <span
                className="title is-size-4"
                style={{ marginBottom: "1rem" }}
              >
                Gor Demirkhanyan PE
              </span>
              <p>
                Large Art-Studio was founded in 2012. We initially provided
                video and photo filming, along with design services. In 2022, we
                underwent a rebranding and proudly opened our own office in
                2023.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns is-centered is-multiline">
            <div className="column is-12-mobile is-6-tablet is-4-desktop">
              <button
                className="button is-warning is-fullwidth"
                onClick={toggleContactText}
              >
                Contact Information
              </button>
            </div>
            <div className="column is-12-mobile is-6-tablet is-4-desktop">
              <button
                className="button is-fullwidth"
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`section contact-section ${showContactText ? "open" : ""}`}
      >
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop">
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
                    aria-label={href}
                  >
                    <button className="button is-large square-button">
                      <FontAwesomeIcon
                        icon={icon}
                        size="2x"
                        style={{ color: "black" }}
                      />
                    </button>
                  </a>
                ))}
              </div>
              <p style={{ cursor: "pointer" }} onClick={handleCopyPhoneNumber}>
                +37491132400
              </p>
              <p style={{ cursor: "pointer" }} onClick={handleCopyPhoneNumber}>
                gor.demirkhanyan@gmail.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="title is-4">Visit Us</h2>
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-10-desktop">
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
      </section>

      <style jsx global>{`
        .square-button {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          padding: 0;
          background-color: #e5e5e5;
          transition: background-color 0.3s ease;
        }

        .square-button:hover {
          background-color: #ccc;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .social-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <style jsx>{`
        .hero-body {
          background-color: #ff8c00;
          color: white;
        }

        .section {
          margin-top: 2rem;
          padding: 2rem 1rem;
        }

        .button {
          margin-top: 1rem;
        }

        .columns {
          margin-top: 1rem;
        }

        .highlighted-text {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ffcc00;
        }

        .contact-section {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 1.5s ease, opacity 1.5s ease;
        }

        .contact-section.open {
          max-height: 1500px;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hero-body {
            padding: 2rem 1rem;
          }

          .title {
            font-size: 1.5rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .highlighted-text {
            font-size: 1.3rem;
          }
        }

        @media (min-width: 769px) {
          .title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.25rem;
          }

          .highlighted-text {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
};
