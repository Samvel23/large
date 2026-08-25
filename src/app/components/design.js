"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

const serviceData = {
  td: {
    image: "/photos/3d.jpeg",
    href: "/construction",
    badge: "3D & Render",
  },
  print: {
    image: "/photos/print.jpg",
    href: "/construction",
    badge: "Production",
  },
  design: {
    image: "/photos/design.jpg",
    href: "/construction",
    badge: "Branding",
  },
};

const translations = {
  eng: {
    badge: "LARGE ART SERVICES",
    pageTitle: "Design & High-End Print",
    pageSubtitle:
      "Bespoke visual solutions, interior 3D modeling, and premium print craftsmanship.",
    ctaText: "Explore Project",
    services: [
      {
        id: "td",
        title: "Visual & 3D Design",
        description:
          "Photorealistic 3D modeling, interior visualizations, and spatial art.",
      },
      {
        id: "print",
        title: "Precision Printing",
        description:
          "Bespoke print media, large-format production, and luxury finishes.",
      },
      {
        id: "design",
        title: "Graphic & Brand Identity",
        description:
          "Comprehensive brand identity, vector graphics, and digital design.",
      },
    ],
  },
  ru: {
    badge: "УСЛУГИ LARGE ART",
    pageTitle: "Дизайн и Премиум Печать",
    pageSubtitle:
      "Индивидуальные визуальные решения, 3D-моделирование и профессиональная полиграфия.",
    ctaText: "Подробнее",
    services: [
      {
        id: "td",
        title: "3D и Визуальный Дизайн",
        description:
          "Фотореалистичное 3D-моделирование, интерьеры и пространственный арт.",
      },
      {
        id: "print",
        title: "Высокоточная Печать",
        description:
          "Широкоформатная печать, фирменная полиграфия и премиум материалы.",
      },
      {
        id: "design",
        title: "Графический Дизайн и Брендинг",
        description:
          "Разработка айдентики, брендинг, векторная графика и дизайн.",
      },
    ],
  },
  hy: {
    badge: "LARGE ART ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ",
    pageTitle: "Դիզայն և Տպագրություն",
    pageSubtitle:
      "Անհատական դիզայներական լուծումներ, 3D մոդելավորում և բարձրորակ տպագրություն:",
    ctaText: "Տեսնել Ավելին",
    services: [
      {
        id: "td",
        title: "3D և Վիզուալ Դիզայն",
        description:
          "Ֆոտոռեալիստիկ 3D մոդելավորում, ինտերիեր դիզայն և վիզուալիզացիա:",
      },
      {
        id: "print",
        title: "Բարձրորակ Տպագրություն",
        description:
          "Լայնաֆորմատ տպագրություն, պոլիգրաֆիա և պրեմիում տպագրական լուծումներ:",
      },
      {
        id: "design",
        title: "Գրաֆիկական Դիզայն և Բրենդինգ",
        description: "Բրենդի այսբերգ, լոգոների ստեղծում և կորպորատիվ ոճ:",
      },
    ],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const Design = () => {
  const { lang } = useLanguage();
  const normalizedLang = lang === "arm" ? "hy" : lang;
  const t = translations[normalizedLang] || translations.eng;

  return (
    <div className="design-page py-6">
      <div className="container px-4">
        {/* HERO SECTION */}
        <header className="hero-section has-text-centered mb-6 pt-5">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow-badge mb-3">{t.badge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="title is-1-desktop is-2-tablet is-3-mobile luxury-title mb-4"
          >
            {t.pageTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="subtitle is-5-desktop is-6-tablet has-text-grey-light luxury-subtitle mx-auto"
          >
            {t.pageSubtitle}
          </motion.p>
        </header>

        {/* SERVICES CARDS GRID */}
        <section className="mt-6">
          <motion.div
            className="columns is-multiline is-centered"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {t.services.map(({ id, title, description }, idx) => {
              const meta = serviceData[id] || serviceData.design;
              return (
                <div
                  key={id}
                  className="column is-12-mobile is-6-tablet is-4-desktop"
                >
                  <motion.div variants={cardVariants} className="h-100">
                    <Link href={meta.href} className="editorial-card-link">
                      <div className="editorial-card">
                        {/* Image Showcase Frame */}
                        <div className="image-frame">
                          <Image
                            src={meta.image}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                            className="card-media"
                            priority={idx === 0}
                          />
                          <div className="gradient-overlay" />
                          <span className="category-pill">{meta.badge}</span>
                        </div>

                        {/* Card Content Block */}
                        <div className="card-body p-5">
                          <h2 className="title is-4 card-heading mb-2">
                            {title}
                          </h2>
                          <p className="has-text-grey-light is-size-6 card-desc mb-4">
                            {description}
                          </p>

                          <div className="cta-link">
                            <span>{t.ctaText}</span>
                            <svg
                              className="arrow-icon"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                              <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </section>
      </div>

      <style jsx>{`
        .design-page {
          min-height: 100vh;
        }
        .eyebrow-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #ffcc33;
          background: rgba(255, 204, 51, 0.1);
          border: 1px solid rgba(255, 204, 51, 0.25);
          padding: 6px 16px;
          border-radius: 30px;
        }
        .luxury-title {
          color: #ffffff;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .luxury-subtitle {
          max-width: 620px;
          line-height: 1.6;
        }
        .editorial-card-link {
          display: block;
          height: 100%;
          text-decoration: none;
          outline: none;
        }
        .editorial-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: rgba(20, 20, 20, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(12px);
          transition:
            transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s ease,
            box-shadow 0.4s ease;
        }
        .editorial-card-link:hover .editorial-card,
        .editorial-card-link:focus-visible .editorial-card {
          transform: translateY(-8px);
          border-color: rgba(255, 204, 51, 0.4);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.6),
            0 0 25px rgba(255, 204, 51, 0.12);
        }
        .image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #111;
        }
        .card-media {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .editorial-card-link:hover .card-media {
          transform: scale(1.08);
        }
        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(20, 20, 20, 1) 0%,
            rgba(20, 20, 20, 0.4) 40%,
            rgba(20, 20, 20, 0) 100%
          );
          pointer-events: none;
        }
        .category-pill {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(0, 0, 0, 0.75);
          backdrop-filter: blur(8px);
          color: #ffcc33;
          border: 1px solid rgba(255, 204, 51, 0.3);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 4px 12px;
          border-radius: 20px;
          text-transform: uppercase;
        }
        .card-body {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .card-heading {
          color: #ffffff;
          font-weight: 700;
          transition: color 0.3s ease;
        }
        .editorial-card-link:hover .card-heading {
          color: #ffcc33;
        }
        .card-desc {
          line-height: 1.6;
          flex-grow: 1;
        }
        .cta-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #ffcc33;
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: auto;
        }
        .arrow-icon {
          transition: transform 0.3s ease;
        }
        .editorial-card-link:hover .arrow-icon {
          transform: translateX(6px);
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        .h-100 {
          height: 100%;
        }
      `}</style>
    </div>
  );
};
