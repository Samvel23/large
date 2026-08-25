"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

const storePic = "/photos/storePic.jpg";
const largeLogo = "/photos/large.png";

export const AboutUs = () => {
  const { lang } = useLanguage();
  const normalizedLang = lang === "arm" ? "hy" : lang;

  const content = {
    eng: {
      title: "About Large-Art Studio",
      subtitle: "Design, printing, and creativity",
      description: "Large-Art Studio is a design studio.",
      visionTitle: "About Us",
      visionText:
        "We are constantly developing and expanding. The trust of our partners comes first for us.",
      storeTitle: "Store & Showroom",
      storeDesc: "Our store-showroom in Yerevan, 15 Margaryan St.",
      stats: [
        { label: "Years Experience", val: "13+" },
        { label: "Partners", val: "40+" },
        { label: "Employees", val: "4" },
        { label: "Working Hours", val: "24/7" },
      ],
    },
    ru: {
      title: "О студии Large-Art",
      subtitle: "Дизайн, печать и креативность",
      description: "Large-Art Studio — это дизайн-студия.",
      visionTitle: "О нас",
      visionText:
        "Мы постоянно развиваемся и расширяемся. Доверие партнеров для нас на первом месте.",
      storeTitle: "Магазин-шоурум",
      storeDesc: "Наш магазин-шоурум в Ереване, ул. Маргаряна 15",
      stats: [
        { label: "Лет опыта", val: "13+" },
        { label: "Партнеров", val: "40+" },
        { label: "Сотрудников", val: "4" },
        { label: "График работы", val: "24/7" },
      ],
    },
    hy: {
      title: "Large-art studio-ի մասին",
      subtitle: "Դիզայն, տպագրություն և կրեատիվություն",
      description: "Large-art studio-ն դիզայն ստուդիո է",
      visionTitle: "Մեր Մասին",
      visionText:
        "Մենք մշտապես զարգանում և ընդլայնվում ենք։ Գործընկերների վստահությունը մեզ համար առաջին տեղում է.",
      storeTitle: "Խանութ-Սրահ",
      storeDesc: "Մեր խանութն-ցուցասրահը Երևանում, Մարգարյան 15",
      stats: [
        { label: "Տարիների Փորձ", val: "13+" },
        { label: "Գործընկերներ", val: "40+" },
        { label: "Աշխատակիցներ", val: "4" },
        { label: "Աշխատանքային Գրաֆիկ", val: "24/7" },
      ],
    },
  };

  const t = content[normalizedLang] || content.eng;

  return (
    <div className="about-wrapper py-6">
      <div className="container px-4">
        {/* HERO HEADER */}
        <header className="has-text-centered mb-6">
          <h1 className="title is-1 has-text-warning has-text-weight-bold mb-3">
            {t.title}
          </h1>
          <p className="subtitle is-4 has-text-grey-light is-max-desktop mx-auto">
            {t.subtitle}
          </p>
        </header>

        {/* CENTERED STORE SHOWCASE FEATURE */}
        <section className="columns is-centered mb-6">
          <div className="column is-12-mobile is-10-tablet is-8-desktop">
            <div className="card showcase-card">
              <div className="card-image">
                <figure className="image is-16by9 media-frame">
                  <Image
                    src={storePic}
                    alt="Large Art Physical Store"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    style={{ objectFit: "cover" }}
                    priority
                  />
                  <div className="media-badge">{t.storeTitle}</div>
                </figure>
              </div>
              <div className="card-content has-background-dark">
                <h3 className="title is-4 has-text-white mb-2">
                  {t.storeTitle}
                </h3>
                <p className="has-text-grey-light is-size-5">{t.storeDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIPTION & VISION SECTION */}
        <section className="box content-box p-5 mb-6">
          <div className="columns is-vcentered">
            <div className="column is-7">
              <h2 className="title is-3 has-text-dark mb-3">{t.visionTitle}</h2>
              <p
                className="is-size-5 has-text-grey-dark mb-4"
                style={{ lineHeight: 1.7 }}
              >
                {t.description}
              </p>
              <blockquote className="vision-quote">"{t.visionText}"</blockquote>
            </div>

            {/* STATS METRICS GRID */}
            <div className="column is-5">
              <div className="columns is-multiline is-mobile">
                {t.stats.map((stat, idx) => (
                  <div key={idx} className="column is-6">
                    <div className="metric-card p-4 has-text-centered">
                      <span className="title is-3 has-text-warning-dark is-block mb-1">
                        {stat.val}
                      </span>
                      <span className="heading has-text-grey-dark mb-0">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-wrapper {
          min-height: 100vh;
        }
        .showcase-card {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #333333;
          background-color: #1a1a1a;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .showcase-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
        }
        .media-frame {
          position: relative;
        }
        .media-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(4px);
          color: #ffcc33;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid rgba(255, 204, 51, 0.3);
        }
        .content-box {
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .vision-quote {
          border-left: 4px solid #ffcc33;
          padding-left: 1rem;
          font-style: italic;
          color: #4a4a4a;
          margin: 0;
        }
        .metric-card {
          background-color: #f9f9f9;
          border-radius: 10px;
          border: 1px solid #eeeeee;
        }
        .gap-3 {
          gap: 0.75rem;
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>
    </div>
  );
};