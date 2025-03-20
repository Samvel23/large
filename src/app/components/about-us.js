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
import { useLanguage } from "../context/LanguageContext";

export const AboutPage = () => {
  const [showContactText, setShowContactText] = useState(false);
  const { lang } = useLanguage();
  const toggleContactText = () => {
    setShowContactText(!showContactText);
  };

  const handleCopyPhoneNumber = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <section className="hero is-warning">
        <div className="hero-body has-text-centered" style={{ width: "100vw" }}>
          <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop">
            {lang === "eng"
              ? "About Us"
              : lang === "arm"
              ? "Մեր Մասին"
              : "О нас"}
          </h1>
          <p className="subtitle is-size-5-mobile is-size-4-tablet">
            {lang === "eng"
              ? "Learn more about our company and values"
              : lang === "arm"
              ? "Իմացեք ավելին մեր ընկերության և արժեքների մասին"
              : "Узнайте больше о нашей компании и ценностях"}
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
                {lang === "eng"
                  ? "Working Hours"
                  : lang === "arm"
                  ? "Աշխատանքային Ժամեր"
                  : "Рабочие часы"}
              </h1>
              <div className="columns">
                <div className="column has-text-left">
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
                    09:00 - 23:00
                  </p>
                </div>
                <div className="column has-text-left">
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
              <h1
                className="title is-4 highlighted-text"
                style={{ marginTop: "2rem", color: "orange" }}
              >
                {lang === "eng"
                  ? "About Large Art-Studio"
                  : lang === "arm"
                  ? "Large Art-Studio-ի մասին"
                  : "О Large Art-Studio"}
              </h1>
              <p className="title is-size-5" style={{ color: "white" }}>
                {lang === "eng"
                  ? "Gor Demirkhanyan PE"
                  : lang === "arm"
                  ? "Գոռ Դեմիրխանյան ԱՁ"
                  : "Гор Демирханян ЧП"}
              </p>
              <p style={{ color: "white" }}>
                {lang === "eng"
                  ? "Large Art-Studio was founded in 2012. We initially provided video and photo filming, along with design services. In 2022, we underwent a rebranding and proudly opened our own office in 2023."
                  : lang === "arm"
                  ? "Large Art-Studio-ը հիմնադրվել է 2012 թվականին: Մենք սկզբնականում մատուցել ենք վիդեո և ֆոտո նկարահանում, ինչպես նաև դիզայներական ծառայություններ: 2022 թվականին մենք վերակազմակերպվել ենք և հպարտորեն բացել մեր սեփական գրասենյակը 2023 թվականին:"
                  : "Large Art-Studio был основан в 2012 году: изначально мы предоставляли услуги видео и фото съемки, а также дизайнерские услуги. В 2022 году мы прошли реорганизацию и с гордостью открыли свой офис в 2023 году."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section has-text-centered">
        <button className="button is-warning" onClick={toggleContactText}>
          {lang === "eng"
            ? "Contact Information"
            : lang === "arm"
            ? "Կապի տվյալներ"
            : "Контактная информация"}
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
                  style={{ marginBottom: "40px" }}
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
                    href: "https://web.telegram.org/k/#950775250",
                    icon: faTelegram,
                  },
                  { href: "https://wa.me/+37491132400", icon: faWhatsapp },
                  // { href: "https://viber.com/your-profile", icon: faViber },
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
      <div className="container" style={{ padding: "20px" }}>
        <h2 className="title is-4 has-text-centered" style={{ color: "white" }}>
          {lang === "eng"
            ? "Visit Us"
            : lang === "arm"
            ? "Այցելեք մեզ"
            : lang === "ru"
            ? " Посетите нас"
            : ""}
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
        <div className="has-text-centered">
          <h2>
            Copyright © 2025 Large art-studio. All Rights Resirved. Made by
            Large art-studio
          </h2>
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
