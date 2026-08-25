"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHammer, faGem, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useLanguage } from "../context/LanguageContext";

const telmekhLogo = "/photos/telmekh.png";
const mainProductPic = "/photos/tel1.jpg";

const content = {
  eng: {
    badge: "Handcrafted String Art",
    title: "TelMekh Wood & Thread Crafts",
    description:
      "This handcrafted wooden board features meticulously hammered nails and precision threading. Each piece is unique, crafted with care, and perfect for home decoration or a memorable personal gift.",
    features: [
      {
        icon: faHammer,
        title: "Precision Handcraft",
        desc: "Meticulously placed nails and tension-tuned threading built to last.",
      },
      {
        icon: faGem,
        title: "Exclusive Artistry",
        desc: "Every wooden board carries distinct grain patterns and custom thread layouts.",
      },
      {
        icon: faHeart,
        title: "Thoughtful Gifts",
        desc: "Ideal accent pieces for modern interiors, corporate spaces, and celebrations.",
      },
    ],
    cta: "Instagram",
  },
  ru: {
    badge: "Ручное искусство из нитей",
    title: "Деревянные изделия TelMekh",
    description:
      "Эта деревянная доска ручной работы украшена тщательно вбитыми гвоздями и точным переплетением нитей. Каждое изделие TelMekh уникально и идеально подходит для украшения дома или особенного подарка.",
    features: [
      {
        icon: faHammer,
        title: "Ручная работа",
        desc: "Тщательно забитые гвозди и точное натяжение нитей для безупречного вида.",
      },
      {
        icon: faGem,
        title: "Эксклюзивный дизайн",
        desc: "Уникальная текстура дерева и оригинальные узоры нитей в каждом изделии.",
      },
      {
        icon: faHeart,
        title: "Особенный подарок",
        desc: "Идеальное решение для современного интерьера и памятных событий.",
      },
    ],
    cta: "Instagram",
  },
  hy: {
    badge: "Ձեռագործ Թել-Մեխ Արվեստ",
    title: "TelMekh Փայտյա Ձեռագործ Աշխատանքներ",
    description:
      "Այս ձեռագործ փայտե տախտակը պատրաստված է մանրակրկիտ մշակված մեխերով և ճշգրիտ թելային հյուսվածքով։ Յուրաքանչյուր TelMekh աշխատանք եզակի է և հիանալի նվեր է ձեր հարազատներին։",
    features: [
      {
        icon: faHammer,
        title: "Մանրակրկիտ Աշխատանք",
        desc: "Ճշգրիտ ամրացված մեխեր և բարձրորակ թելերի կատարյալ հյուսվածք։",
      },
      {
        icon: faGem,
        title: "Բացառիկ Դիզայն",
        desc: "Յուրաքանչյուր փայտե հիմք ունի իր անկրկնելի տեքստուրան և նախշերը։",
      },
      {
        icon: faHeart,
        title: "Յուրահատուկ Նվեր",
        desc: "Իդեալական լուծում տան ինտերիերի ձևավորման և անմոռանալի նվերների համար։",
      },
    ],
  },
  cta: "Instagram",
};

export const TelMekh = () => {
  const { lang } = useLanguage();
  const normalizedLang = lang === "arm" ? "hy" : lang;
  const t = content[normalizedLang] || content.eng;

  return (
    <div className="telmekh-container py-8 px-4">
      <div className="content-wrapper">
        <div className="main-grid">
          {/* PRODUCT VISUAL SHOWCASE */}
          <div className="media-column">
            <div className="image-frame">
              <Image
                src={mainProductPic}
                alt="TelMekh String Art Crafts"
                fill
                sizes="(max-width: 900px) 100vw, 550px"
                style={{ objectFit: "cover" }}
                priority
              />
              <div className="art-badge">{t.badge}</div>
            </div>
          </div>

          {/* BRAND CONTENT & FEATURES */}
          <div className="info-column">
            <div className="logo-wrapper mb-4">
              <Image
                src={telmekhLogo}
                alt="TelMekh Brand Logo"
                width={220}
                height={80}
                style={{ objectFit: "contain" }}
                priority
              />
            </div>

            <h1 className="brand-title mb-3">{t.title}</h1>
            <p className="brand-description mb-6">{t.description}</p>

            {/* CRAFTSMANSHIP HIGHLIGHTS GRID */}
            <div className="features-grid mb-6">
              {t.features.map((item, idx) => (
                <div key={idx} className="feature-card">
                  <div className="feature-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div className="feature-text">
                    <h3 className="feature-title">{item.title}</h3>
                    <p className="feature-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* INSTAGRAM CONVERSION CTA */}
            <a
              href="https://www.instagram.com/telmekh/"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-cta-btn"
            >
              <FontAwesomeIcon icon={faInstagram} className="cta-icon" />
              <span>{t.cta}</span>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .telmekh-container {
          min-height: 80vh;
          display: flex;
          align-items: center;
          padding-top: 6rem;
          padding-bottom: 4rem;
          justify-content: center;
        }

        .content-wrapper {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
        }

        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 3rem;
          align-items: center;
        }

        .media-column {
          width: 100%;
        }

        .image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          border-radius: 20px;
          overflow: hidden;
          background: #1e2229;
          border: 1px solid #333740;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .art-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(18, 19, 22, 0.85);
          backdrop-filter: blur(8px);
          color: #ffcc33;
          padding: 8px 18px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          border: 1px solid rgba(255, 204, 51, 0.3);
        }

        .info-column {
          display: flex;
          flex-direction: column;
        }

        .logo-wrapper {
          display: flex;
          justify-content: flex-start;
        }

        .brand-title {
          font-size: 2rem;
          font-weight: 800;
          color: #f1f3f5;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .brand-description {
          font-size: 1.05rem;
          color: #a0a6b2;
          line-height: 1.7;
        }

        .features-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-card {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          background: #22252a;
          border: 1px solid #333740;
          padding: 1.25rem;
          border-radius: 14px;
          transition:
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        .feature-card:hover {
          transform: translateX(4px);
          border-color: #4a4f5c;
        }

        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(255, 204, 51, 0.12);
          color: #ffcc33;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 700;
          color: #f1f3f5;
          margin: 0;
        }

        .feature-desc {
          font-size: 0.875rem;
          color: #a0a6b2;
          margin: 0;
          line-height: 1.5;
        }

        .instagram-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 700;
          color: #121316;
          background: linear-gradient(135deg, #ffcc33 0%, #e6b800 100%);
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(255, 204, 51, 0.25);
          transition: all 0.25s ease;
          width: fit-content;
        }

        .instagram-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 204, 51, 0.4);
          background: linear-gradient(135deg, #ffd65c 0%, #ffcc33 100%);
        }

        .cta-icon {
          font-size: 1.4rem;
        }

        .mb-3 {
          margin-bottom: 0.75rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }

        @media (max-width: 900px) {
          .telmekh-container {
            padding-bottom: 4rem;
          }
          .main-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }

          .logo-wrapper {
            justify-content: center;
          }

          .brand-title,
          .brand-description {
            text-align: center;
          }

          .instagram-cta-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
