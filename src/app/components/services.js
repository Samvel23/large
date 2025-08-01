"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import td from "../icon/3d.jpeg";
import design from "../icon/design.jpg";
import print from "../icon/print.jpg";
import store from "../icon/store.jpg";
import creating from "../icon/creating.jpg";
import gift from "../icon/gift.jpg";

const serviceImages = { td, design, print, store, creating, gift };

export const Services = () => {
  const { lang } = useLanguage();
  const [clickedService, setClickedService] = useState(null);

  const t = {
    eng: {
      pageTitle: "Services",
      pageDescription: "Explore our creative services",
      services: [
        ["3D Design", "Beautiful designs for your home", "td"],
        ["Print", "High-quality printing solutions", "print"],
        ["Graphic Design", "Design solutions for your brand", "design"],
        ["Studio Store", "Curated design assets", "store"],
        ["Content Creating", "Resonant content creation", "creating"],
        ["Giftboxes", "Custom gift boxes", "gift"],
      ],
    },
    ru: {
      pageTitle: "Услуги",
      pageDescription: "Ознакомьтесь с нашими услугами",
      services: [
        ["3Д Дизайн", "Красивые проекты для дома", "td"],
        ["Печать", "Качественная печать", "print"],
        ["Графический дизайн", "Решения для бренда", "design"],
        ["Магазин студии", "Дизайнерские активы", "store"],
        ["Создание контента", "Создание контента", "creating"],
        ["Гифтбоксы", "Индивидуальные гифтбоксы", "gift"],
      ],
    },
    hy: {
      pageTitle: "Ծառայություններ",
      pageDescription: "Բացահայտեք մեր ծառայությունները",
      services: [
        ["3Դ Դիզայն", "Գեղեցիկ դիզայն Ձեր տան համար", "td"],
        ["Տպագրություն", "Բարձրորակ տպագրություն", "print"],
        ["Գրաֆիկական դիզայն", "Դիզայն Ձեր բրենդի համար", "design"],
        ["Ստուդիայի խանութ", "Դիզայնի ակտիվներ", "store"],
        ["Կոնտենտի ստեղծում", "Համապատասխան կոնտենտ", "creating"],
        ["Նվերների տուփեր", "Հատուկ նվերների տուփեր", "gift"],
      ],
    },
  };

  const { pageTitle, pageDescription, services } = t[lang] || t.eng;

  return (
    <>
      <Head>
        <title>{pageTitle} | Large Art-Studio</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <section className="hero is-warning">
        <div className="hero-body has-text-centered">
          <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop animate-fade-in">
            {pageTitle}
          </h1>
        </div>
      </section>

      <section className="section py-4">
        <div className="container">
          <div className="columns is-multiline is-centered">
            {services.map(([title, description, key], index) => (
              <div
                key={index}
                className="column is-12-mobile is-6-tablet is-4-desktop animate-slide-up"
              >
                <motion.div
                  className="card service-card"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() =>
                    setClickedService({
                      title,
                      description,
                      image: serviceImages[key],
                    })
                  }
                >
                  <div className="card-image">
                    <figure className="image is-1by1">
                      <Image
                        src={serviceImages[key]}
                        alt={title}
                        width={300}
                        height={300}
                        className="service-image"
                        loading="lazy"
                        style={{ objectFit: "cover" }}
                      />
                    </figure>
                  </div>
                  <div className="card-content has-text-centered">
                    <p className="title is-5 service-title">{title}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {clickedService && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setClickedService(null)}
          ></div>
          <div className="modal-card animate-fade-in">
            <header className="modal-card-head">
              <p className="modal-card-title service-title">
                {clickedService.title}
              </p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setClickedService(null)}
              ></button>
            </header>
            <section className="modal-card-body has-text-centered">
              <figure
                className="image is-1by1 mb-4 mx-auto"
                style={{ maxWidth: "250px" }}
              >
                <Image
                  src={clickedService.image}
                  alt={clickedService.title}
                  width={250}
                  height={250}
                  className="modal-image"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                />
              </figure>
              <p className="service-description">
                {clickedService.description}
              </p>
            </section>
          </div>
        </div>
      )}

      <style jsx global>{`
        .hero {
          background-color: #2a2a2a;
        }

        .service-card {
          background-color: #2a2a2a;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.3s ease;
        }

        .service-card:hover {
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.25);
        }

        .service-title {
          color: #e0e0e0;
          font-weight: 600;
        }

        .service-description {
          color: #d0d0d0;
          font-size: 1rem;
          line-height: 1.6;
        }

        .modal-card,
        .modal-card-head,
        .modal-card-body {
          background-color: #2a2a2a;
        }

        .modal-card {
          border-radius: 10px;
          max-width: 450px;
          margin: auto;
        }

        .modal-image,
        .service-image {
          border-radius: 10px;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-in-out;
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
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .modal-card {
            width: 90%;
          }
        }

        @media (max-width: 480px) {
          .modal-card {
            width: 95%;
          }

          .service-description {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
};


