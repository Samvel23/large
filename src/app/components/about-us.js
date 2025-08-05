"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faWhatsapp,
  faYoutube,
  faTelegram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../context/LanguageContext";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export const AboutPage = () => {
  const { lang } = useLanguage();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyPhoneNumber = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="hero is-fullheight">
      {/* Hero Section - Fixed Full Width */}
      <section
        className="hero is-warning"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          padding: 0,
        }}
      >
        <div className="hero-body has-text-centered">
          <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop animate-fade-in">
            {lang === "eng"
              ? "Contact Us"
              : lang === "arm"
              ? "Կապնվեք Մեր Հետ"
              : "Свяжитесь с Нами"}
          </h1>
        </div>
      </section>

      {/* Working Hours & About Section */}
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop">
              <h2
                className="title is-4 highlighted-text animate-slide-up"
                style={{ color: "orange" }}
              >
                {lang === "eng"
                  ? "Working Hours"
                  : lang === "arm"
                  ? "Աշխատանքային Ժամեր"
                  : "Рабочие часы"}
              </h2>
              <div className="columns">
                <div className="column has-text-left animate-slide-up-delay">
                  <p
                    className="title is-size-5-mobile is-size-4-tablet"
                    style={{ color: "white" }}
                  >
                    {lang === "eng"
                      ? "Monday-Friday"
                      : lang === "arm"
                      ? "Երկուշաբթի-Ուրբաթ"
                      : "Понедельник-Пятница"}
                  </p>
                  <p
                    className="subtitle is-size-6-mobile is-size-5-tablet"
                    style={{ color: "white" }}
                  >
                    10:00 - 19:00
                    ,
                    21:00 - 23:00
                  </p>
                </div>
                <div className="column has-text-left animate-slide-up-delay">
                  <p
                    className="title is-size-5-mobile is-size-4-tablet"
                    style={{ color: "white" }}
                  >
                    {lang === "eng"
                      ? "Saturday-Sunday"
                      : lang === "arm"
                      ? "Շաբաթ-Կիրակի"
                      : "Суббота-Воскресенье"}
                  </p>
                  <p
                    className="subtitle is-size-6-mobile is-size-5-tablet"
                    style={{ color: "white" }}
                  >
                    10:00 - 19:00
                  </p>
                </div>
              </div>

              <h2
                className="title is-4 highlighted-text animate-slide-up"
                style={{ marginTop: "2rem", color: "orange" }}
              >
                {lang === "eng"
                  ? "About Large Art-Studio"
                  : lang === "arm"
                  ? "Large Art-Studio-ի մասին"
                  : "О Large Art-Studio"}
              </h2>
              <p
                className="title is-size-5 animate-slide-up-delay"
                style={{ color: "white" }}
              >
                {lang === "eng"
                  ? "Gor Demirkhanyan PE"
                  : lang === "arm"
                  ? "Գոռ Դեմիրխանյան ԱՁ"
                  : "Гор Демирханян ЧП"}
              </p>
              <p className="animate-slide-up-delay" style={{ color: "white" }}>
                {lang === "eng"
                  ? "Large Art-Studio was founded in 2012. We initially provided video and photo filming, along with design services. In 2022, we underwent a rebranding and proudly opened our own office in 2023."
                  : lang === "arm"
                  ? "Large Art-Studio-ը հիմնադրվել է 2012 թվականին: Մենք սկզբնականում մատուցել ենք վիդեո և ֆոտո նկարահանում, ինչպես նաև դիզայներական ծառայություններ: 2022 թվականին մենք վերակազմակերպվել ենք և հպարտորեն բացել մեր սեփական գրասենյակը 2023 թվականին:"
                  : "Large Art-Studio был основан в 2012 году. Изначально мы предоставляли услуги видео- и фотосъемки, а также дизайнерские услуги. В 2022 году мы прошли реорганизацию и с гордостью открыли свой офис в 2023 году."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop has-text-centered">
              <div className="contact-info mb-6 animate-fade-in">
                <p
                  onClick={() => handleCopyPhoneNumber("+37444533133")}
                  className="contact-text is-size-4-mobile is-size-3-tablet"
                  style={{ cursor: "pointer", color: "orange" }}
                >
                  +37444533133
                  {isCopied && (
                    <span className="has-text-success ml-2">Copied!</span>
                  )}
                </p>
              </div>
              <h3
                className="title is-5 mb-4 animate-fade-in-delay"
                style={{ color: "white" }}
              >
                {lang === "eng"
                  ? "Follow Us"
                  : lang === "arm"
                  ? "Հետևեք մեզ"
                  : "Подписывайтесь на нас"}
              </h3>
              <div className="social-buttons animate-fade-in-delay">
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
                    href: "https://t.me/+37444533133",
                    icon: faTelegram,
                  },
                  { href: "https://wa.me/+37444533133", icon: faWhatsapp },
                  { href: "mailto:info@largeart.org", icon: faEnvelope },
                ].map(({ href, icon }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button is-large square-button mx-2"
                  >
                    <FontAwesomeIcon icon={icon} className="icon" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section">
        <div className="container">
          <h2
            className="title is-4 has-text-centered animate-slide-up"
            style={{ color: "white" }}
          >
            {lang === "eng"
              ? "Visit Us"
              : lang === "arm"
              ? "Այցելեք մեզ"
              : "Посетите нас"}
          </h2>
          <div className="columns is-centered">
            <div className="column is-10 animate-fade-in">
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
          <div className="has-text-centered mt-6 animate-fade-in-delay">
            <p style={{ color: "white" }}>
              Copyright © 2025 Large Art-Studio. All Rights Reserved. Made by
              Large Art-Studio
            </p>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        .square-button {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #808080;
          border: none;
          transition: background-color 0.3s ease, transform 0.2s ease;
          border-radius: 8px;
        }

        .square-button .icon {
          font-size: 1.5rem;
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
          gap: 1rem;
        }

        .contact-info p {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
        }

        .contact-text:hover {
          color: #ff8c00;
        }

        .map-iframe {
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1s ease-in-out 0.3s;
          animation-fill-mode: both;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-in-out;
        }

        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-in-out 0.3s;
          animation-fill-mode: both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
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
