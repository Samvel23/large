"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const serviceImages = {
  td: {
    image: "/photos/3d.jpeg",
    href: "/consturction"
  },
  design: {
    image: "/photos/design.jpg",
    href: "/construction"
  },
  print: {
    image: "/photos/print.jpg",
    href: "/print"
  },
};


const translations = {
  eng: {
    pageTitle: "Design & Print",
    pageDescription: "Explore our design and print services",
    services: [
      ["Visual Design", "Beautiful designs for your home", "td"],
      ["Print", "High-quality printing solutions", "print"],
      ["Graphic Design", "Design solutions for your brand", "design"],
    ],
  },
  ru: {
    pageTitle: "Дизайн и Печать",
    pageDescription: "Исследуйте наши услуги дизайна и печати",
    services: [
      ["Визуальный Дизайн", "Красивые проекты для дома", "td"],
      ["Печать", "Качественная печать", "print"],
      ["Графический дизайн", "Решения для бренда", "design"],
    ],
  },
  arm: {
    pageTitle: "Դիզայն և Տպագրություն",
    pageDescription: "Մեր դիզայն և տպագրության ծառայությունները",
    services: [
      ["Վիզուալ Դիզայն", "Գեղեցիկ դիզայն Ձեր տան համար", "td"],
      ["Տպագրություն", "Բարձրորակ տպագրություն", "print"],
      ["Գրաֆիկական դիզայն", "Դիզայն Ձեր բրենդի համար", "design"],
    ],
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const Design = () => {
  const { lang } = useLanguage();

  const { pageTitle, services } = translations[lang] || translations.eng;

  return (
    <>
      <section className="hero is-warning">
        <div className="hero-body has-text-centered">
          <h1
            className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop animate-fade-in"
            style={{ color: "#2A2A2A" }}
          >
            {pageTitle}
          </h1>
        </div>
      </section>

      <section className="section py-6">
        <div className="container">
          <div className="columns is-multiline is-centered">
            {services.map(([title, description, key], idx) => (
              <div
                key={idx}
                className="column is-12-mobile is-6-tablet is-4-desktop"
              >
                <motion.div
                  className="card service-card"
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  }}
                  transition={{ type: "spring", stiffness: 250 }}
                  tabIndex={0}
                  role="button"
                  aria-label={title}
                >
                  <div className="card-image">
                    <Link href={serviceImages[key].href}>
                      <figure className="image is-1by1">
                        <Image
                          src={serviceImages[key].image}
                          alt={title}
                          width={600}
                          height={600}
                          className="service-image"
                          loading="lazy"
                          style={{ objectFit: "cover" }}
                        />
                      </figure>
                    </Link>
                  </div>
                  <div className="card-content has-text-centered">
                    <p className="title is-5 service-title">{title}</p>
                    <p className="service-description-short">{description}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .service-card {
          background: #232323;
          border-radius: 14px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.13);
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.3s;
          outline: none;
        }
        .service-card:focus {
          box-shadow: 0 0 0 2px orange;
        }
        .service-title {
          color: orange;
          font-weight: 700;
          margin-bottom: 0.5em;
        }
        .service-description-short {
          color: #bdbdbd;
          font-size: 0.95rem;
          margin-top: 0.25em;
        }
        .service-image {
          border-radius: 12px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
