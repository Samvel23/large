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
      {/* ABOUT */}
      <section className="section py-1" style={{ marginBottom: "20px" }}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop">
              <h2
                className="title is-4 highlighted-text animate-slide-up mb-4"
                style={{ color: "orange" }}
              >
                {lang === "eng"
                  ? "Large Art-Studio"
                  : lang === "arm"
                  ? "Large Art-Studio"
                  : "Large Art-Studio"}
              </h2>
              <p
                className="title is-size-5 animate-slide-up-delay mb-3"
                style={{ color: "white" }}
              >
                {lang === "eng"
                  ? "Gor Demirkhanyan PE"
                  : lang === "arm"
                  ? "Գոռ Դեմիրխանյան ԱՁ"
                  : "Гор Демирханян ЧП"}
              </p>
              <p
                className="animate-slide-up-delay mb-4"
                style={{ color: "white" }}
              >
                {lang === "eng"
                  ? "Large Art-Studio was founded in 2012. In 2022, we underwent a rebranding and proudly opened our own office in 2023."
                  : lang === "arm"
                  ? "Large Art-Studio-ն հիմնադրվել է 2012 թվականին: 2022 թվականին մենք վերակազմակերպվել ենք և հպարտորեն բացել մեր սեփական գրասենյակը 2023 թվականին:"
                  : "Large Art-Studio был основан в 2012 году. В 2022 году мы прошли реорганизацию и с гордостью открыли свой офис в 2023 году."}
              </p>
              <p
                className="animate-slide-up-delay mb-4"
                style={{ color: "white" }}
              >
                {lang === "eng"
                  ? "Today we offer the following services:"
                  : lang === "arm"
                  ? "Այսօր մենք առաջարկում ենք հետևյալ ծառայությունները"
                  : "Сегодня мы предлагаем следующие услуги:"}
              </p>
              <div
                className="services-list"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                {[
                  lang === "eng"
                    ? "Photoshoots, video production and editing"
                    : lang === "arm"
                    ? "Ֆոտո և Վիդեո նկարահանումներ և մոնտաժ"
                    : "Фотосъемка, видеопроизводство и монтаж",
                  lang === "eng"
                    ? "Environmental design"
                    : lang === "arm"
                    ? "Միջավայրի դիզայն"
                    : "Дизайн пространства",
                  lang === "eng"
                    ? "Graphic design"
                    : lang === "arm"
                    ? "Գրաֆիկական դիզայն"
                    : "Графический дизайн",
                  lang === "eng"
                    ? "Data matrix printing"
                    : lang === "arm"
                    ? "Data matrix տպագրություն"
                    : "Data matrix печать",
                  lang === "eng"
                    ? "Multi-content printing"
                    : lang === "arm"
                    ? "Բարձրորակ տպագրություն"
                    : "Высококачественная печать",
                  lang === "eng"
                    ? "Stationery store"
                    : lang === "arm"
                    ? "Գրախանութ"
                    : "Магазин книг и канцтоваров",
                  lang === "eng"
                    ? "Hand-made products"
                    : lang === "arm"
                    ? "Ձեռագործ արտադրանքներ"
                    : "Изделия ручной работы",
                ].map((service, index) => (
                  <span
                    key={index}
                    className="service-item"
                    style={{
                      padding: "8px 15px",
                      borderRadius: "25px",
                      backgroundColor: "#333",
                      color: "white",
                      fontWeight: "500",
                      cursor: "default",
                      transition: "background-color 0.3s, color 0.3s",
                      userSelect: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "orange";
                      e.currentTarget.style.color = "#000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#333";
                      e.currentTarget.style.color = "white";
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
              <h2
                className="title is-4 highlighted-text animate-slide-up mb-4"
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
                    className="title is-size-5-mobile is-size-4-tablet mb-2"
                    style={{ color: "white" }}
                  >
                    {lang === "eng"
                      ? "Monday-Friday"
                      : lang === "arm"
                      ? "Երկուշաբթի-Ուրբաթ"
                      : "Понедельник-Пятница"}
                  </p>
                  <p
                    className="subtitle is-size-6-mobile is-size-5-tablet mb-2"
                    style={{ color: "white" }}
                  >
                    10:00 - 19:00, 21:00 - 23:00
                  </p>
                </div>
                <div className="column has-text-left animate-slide-up-delay">
                  <p
                    className="title is-size-5-mobile is-size-4-tablet mb-2"
                    style={{ color: "white" }}
                  >
                    {lang === "eng"
                      ? "Saturday-Sunday"
                      : lang === "arm"
                      ? "Շաբաթ-Կիրակի"
                      : "Суббота-Воскресенье"}
                  </p>
                  <p
                    className="subtitle is-size-6-mobile is-size-5-tablet mb-2"
                    style={{ color: "white" }}
                  >
                    10:00 - 19:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT HERO */}
      <section
        className="hero is-warning"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          padding: 0,
        }}
      >
        <div className="hero-body has-text-centered contact-hero py-5">
          <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop animate-fade-in">
            {lang === "eng"
              ? "Contacts"
              : lang === "arm"
              ? "Կոնտակտներ"
              : "Контакты"}
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section py-5">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-10-tablet is-8-desktop has-text-centered">
              <div className="contact-info mb-5 animate-fade-in">
                <p
                  onClick={() => handleCopyPhoneNumber("+37444533133")}
                  className="contact-text is-size-4-mobile is-size-3-tablet mb-3"
                  style={{ cursor: "pointer", color: "orange" }}
                >
                  +37444533133
                  {isCopied && (
                    <span
                      className="is-warning ml-2"
                      style={{ textDecoration: "underline" }}
                    >
                      Copied!
                    </span>
                  )}
                </p>
              </div>
              <h3
                className="title is-5 mb-5 animate-fade-in-delay"
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
                  { href: "www.behance.net/gordemirkhanyan", icon: faBehance },
                  { href: "https://t.me/+37444533133", icon: faTelegram },
                  { href: "https://wa.me/+37444533133", icon: faWhatsapp },
                  { href: "viber://chat?number=37444533133", icon: faViber },
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

      {/* Partners Section */}
      <section className="section py-5">
        <div className="container">
          <h2
            className="title is-4 has-text-centered animate-slide-up mb-5"
            style={{ color: "white" }}
          >
            {lang === "eng"
              ? "Our Partners"
              : lang === "arm"
              ? "Մեր Գործընկերները"
              : "Наши партнёры"}
          </h2>
          <div className="columns is-multiline is-centered is-mobile">
            {[
              {
                name: "emark",
                logo: "/photos/logo1.png",
                description:
                  lang === "eng"
                    ? "Official Partner"
                    : lang === "ru"
                    ? "Официальный партнер"
                    : "Պաշտոնական գործընկեր",
              },
              {
                name: "Yerevan City",
                logo: "/photos/logo2.png",
                description:
                  lang === "eng"
                    ? "Partners almost 1 year"
                    : lang === "ru"
                    ? "Партнеры почти 1 год"
                    : "Գործընկերներ գրեթե 1 տարի",
              },
              {
                name: "Viridian",
                logo: "/photos/logo3.png",
                description:
                  lang === "eng"
                    ? "Partners almost 1 year"
                    : lang === "ru"
                    ? "Партнеры почти 1 год"
                    : "Գործընկերներ գրեթե 1 տարի",
              },
              {
                name: "YereVibe",
                logo: "/photos/logo4.png",
                description:
                  lang === "eng"
                    ? "Partners almost 1 year"
                    : lang === "ru"
                    ? "Партнеры почти 1 год"
                    : "Գործընկերներ գրեթե 1 տարի",
              },
              {
                name: "Rozelita-Eltaroz",
                logo: "/photos/logo5.png",
                description:
                  lang === "eng"
                    ? "Partners almost 13 years"
                    : lang === "ru"
                    ? "Партнеры почти 13 лет"
                    : "Գործընկերներ գրեթե 13 տարի",
              },
              {
                name: "Velvet",
                logo: "/photos/logo6.png",
                description:
                  lang === "eng"
                    ? "Partners almost 7 years"
                    : lang === "ru"
                    ? "Партнеры почти 7 лет"
                    : "Գործընկերներ գրեթե 7 տարի",
              },
              {
                name: "Murzilka",
                logo: "/photos/logo7.png",
                description:
                  lang === "eng"
                    ? "Partners almost 4 years"
                    : lang === "ru"
                    ? "Партнеры почти 4 года"
                    : "Գործընկերներ գրեթե 4 տարի",
              },
              {
                name: "Sparapet",
                logo: "/photos/logo8.png",
                description:
                  lang === "eng"
                    ? "Partners almost 1 year"
                    : lang === "ru"
                    ? "Партнеры почти 1 год"
                    : "Գործընկերներ գրեթե 1 տարի",
              },
            ].map((partner, idx) => (
              <div
                key={idx}
                className="column is-4-mobile is-4-tablet is-3-desktop has-text-centered animate-fade-in-delay"
              >
                <div className="partner-card">
                  <div className="card">
                    <div className="card-image">
                      <figure className="image is-4by3">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          style={{
                            borderRadius: "8px",
                            background: "#fff",
                            padding: "8px",
                            objectFit: "contain",
                          }}
                        />
                      </figure>
                    </div>
                    <div className="card-content">
                      <p className="title is-6" style={{ color: "white" }}>
                        {partner.name}
                      </p>
                      <p className="subtitle is-7" style={{ color: "#ccc" }}>
                        {partner.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section py-5">
        <div className="container">
          <h2
            className="title is-4 has-text-centered animate-slide-up mb-4"
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
          <div className="has-text-centered mt-4 animate-fade-in-delay">
            <p style={{ color: "white" }}>
              Copyright © 2025 Large Art-Studio. All Rights Reserved. Made by
              Large Art-Studio
            </p>
          </div>
        </div>
      </section>

      {/* Global Styles */}
      <style jsx global>{`
        .contact-hero {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
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
        .partner-card .card {
          background-color: #1a1a1a;
          border-radius: 8px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .partner-card:hover .card {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
        .partner-card .card-image .image img {
          transition: opacity 0.3s ease;
        }
        .partner-card:hover .card-image .image img {
          opacity: 0.9;
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
            width: 40px;
            height: 40px;
          }
          .square-button .icon {
            font-size: 1rem;
          }
          .contact-info p {
            font-size: 1.1rem;
          }
          .partner-card .card {
            padding: 8px;
          }
          .columns.is-mobile > .column.is-4-mobile {
            width: 33.3333%;
            padding: 0.5rem;
          }
          .partner-card .card-content {
            padding: 0.5rem;
          }
          .partner-card .title.is-6 {
            font-size: 0.9rem;
          }
          .partner-card .subtitle.is-7 {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};
