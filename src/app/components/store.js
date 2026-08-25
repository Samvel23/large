"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const serviceData = [
  {
    id: 1,
    name: { eng: "Zbaxmunq", ru: "Занятие", hy: "Զբաղմունք" },
    description: {
      eng: "Game to learn Artsakh dialect with 1000 words.",
      ru: "Игра для изучения арцахского диалекта.",
      hy: "Խաղ Արցախի բարբառը սովորելու համար:",
    },
    price: "4,600 ֏",
    images: [
      "/photos/zbaxmunq.png",
      "/photos/zbaxmunq3.png",
      "/photos/zbaxmunq4.png",
    ],
    details: { creator: "Dee Games", players: "4+", age: "8+" },
  },
  {
    id: 2,
    name: { eng: "Origami", ru: "Оригами", hy: "Օրիգամի" },
    description: {
      eng: "Origami set fostering spatial precision & creative dexterity.",
      ru: "Оригами. Требует креативности и точности.",
      hy: "Օրիգամի, զարգացնում է ձեռքի շնորհը:",
    },
    price: "3,500 ֏",
    images: ["/photos/origami1.png", "/photos/origami2.png"],
    details: { creator: "Large Art", players: "1+", age: "5+" },
  },
  {
    id: 3,
    name: { eng: "Sqeydj", ru: "Скейдж", hy: "Սքեյջ" },
    description: {
      eng: "Tactical Sqeydj strategy game for competitive player matches.",
      ru: "Скейдж — стратегическая игра.",
      hy: "Սքեյջ՝ ռազմավարական խաղ։",
    },
    price: "2,900 ֏",
    images: ["/photos/sqeyj.png", "/photos/sqeyj1.png"],
    details: { creator: "De Games", players: "3-6", age: "12+" },
  },
  {
    id: 4,
    name: {
      eng: "Custom Collection",
      ru: "Другие Продукты",
      hy: "Ուրիշ Ապրանքներ",
    },
    description: {
      eng: "Curated tabletop classics, strategy sets, and specialty editions.",
      ru: "Другие продукты и настольные игры для вас.",
      hy: "Ուրիշ տախտակային խաղեր և ապրանքներ ձեզ համար:",
    },
    price: "Custom",
    images: ["/photos/uno.png", "/photos/chess.png"],
    details: { creator: "Various", players: "2+", age: "8+" },
  },
];

const translations = {
  eng: {
    heroTitle: "Store",
    heroSubtitle:
      "Explore flagship board games, artisanal craftsmanship, and visual media.",
    sectionTitle: "Curated Board Games",
    orderBtn: "Place Order",
    detailsBtn: "View Details",
    alertMsg:
      "This page is for catalog viewing only. Direct online ordering is currently disabled.",
    modalLabels: {
      creator: "Creator",
      players: "Players",
      age: "Age",
      price: "Price",
    },
  },
  ru: {
    heroTitle: "Магазин",
    heroSubtitle:
      "Настольные игры, авторские проекты и эксклюзивная полиграфия.",
    sectionTitle: "Каталог Игр",
    orderBtn: "Заказать",
    detailsBtn: "Подробнее",
    alertMsg:
      "Страница работает в режиме каталога. Онлайн-заказ временно недоступен.",
    modalLabels: {
      creator: "Создатель",
      players: "Игроки",
      age: "Возраст",
      price: "Цена",
    },
  },
  hy: {
    heroTitle: "Խանութ",
    heroSubtitle:
      "Բացահայտեք հեղինակային սեղանի խաղերն ու էքսկլյուզիվ տպագրությունը:",
    sectionTitle: "Խաղերի Տեսականի",
    orderBtn: "Պատվիրել",
    detailsBtn: "Մանրամասն",
    alertMsg:
      "Այս էջը միայն ցուցադրության համար է, առցանց պատվերը ժամանակավորապես անհասանելի է:",
    modalLabels: {
      creator: "Ստեղծող",
      players: "Խաղացողներ",
      age: "Տարիք",
      price: "Գին",
    },
  },
};

export const StorePage = () => {
  const { lang } = useLanguage();
  const normalizedLang = lang === "arm" ? "hy" : lang;
  const t = translations[normalizedLang] || translations.eng;

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImages, setCurrentImages] = useState(
    serviceData.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImages((prev) => {
        const nextState = { ...prev };
        serviceData.forEach((p) => {
          nextState[p.id] = (prev[p.id] + 1) % p.images.length;
        });
        return nextState;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleThumbnailClick = (id, idx) => {
    setCurrentImages((prev) => ({ ...prev, [id]: idx }));
  };

  return (
    <div className="store-page py-6">
      <div className="container px-4">
        {/* HEADER SHOWCASE (STOREPIC REMOVED) */}
        <header className="hero-header has-text-centered mb-6 pt-2">
          <h1 className="title is-2-desktop is-3-tablet hero-title mb-3">
            {t.heroTitle}
          </h1>
          <p className="subtitle is-5 hero-subtitle mx-auto">
            {t.heroSubtitle}
          </p>
        </header>

        {/* CATALOG GRID */}
        <section>
          <div className="columns is-multiline is-centered">
            {serviceData.map((product) => {
              const activeIdx = currentImages[product.id] || 0;
              const prodName = product.name[normalizedLang] || product.name.eng;
              const prodDesc =
                product.description[normalizedLang] || product.description.eng;

              return (
                <div
                  key={product.id}
                  className="column is-12-mobile is-6-tablet is-3-desktop is-flex"
                >
                  <div className="product-card">
                    {/* Media Frame */}
                    <div className="card-media-frame">
                      <Image
                        src={product.images[activeIdx]}
                        alt={prodName}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        style={{ objectFit: "cover" }}
                        className="product-image"
                      />
                      <span className="price-tag">{product.price}</span>
                    </div>

                    {/* Thumbnail Selector Bar */}
                    <div className="thumbnail-bar px-3 pt-3">
                      {product.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          className={`thumb-btn ${
                            activeIdx === idx ? "active" : ""
                          }`}
                          onClick={() => handleThumbnailClick(product.id, idx)}
                          aria-label={`Select thumbnail ${idx + 1}`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            sizes="40px"
                            style={{ objectFit: "cover" }}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Content Block */}
                    <div className="card-content-block p-4">
                      <h3 className="title is-5 product-title mb-2">
                        {prodName}
                      </h3>
                      <p className="product-desc">{prodDesc}</p>
                    </div>

                    {/* Action Bar */}
                    <div className="card-action-footer p-3">
                      <button
                        className="store-btn primary-btn"
                        onClick={() => alert(t.alertMsg)}
                      >
                        {t.orderBtn}
                      </button>
                      <button
                        className="store-btn secondary-btn"
                        onClick={() => setSelectedProduct(product)}
                      >
                        {t.detailsBtn}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="modal is-active modal-wrapper">
              <motion.div
                className="modal-background"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProduct(null)}
              />
              <motion.div
                className="modal-card modal-surface"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <header className="modal-card-head modal-header">
                  <p className="modal-card-title modal-heading">
                    {selectedProduct.name[normalizedLang] ||
                      selectedProduct.name.eng}
                  </p>
                  <button
                    className="delete"
                    aria-label="close"
                    onClick={() => setSelectedProduct(null)}
                  />
                </header>
                <section className="modal-card-body modal-body">
                  <div className="modal-info-grid">
                    {selectedProduct.details.creator && (
                      <div className="info-row">
                        <span className="info-label">
                          {t.modalLabels.creator}:
                        </span>
                        <span className="info-val">
                          {selectedProduct.details.creator}
                        </span>
                      </div>
                    )}
                    <div className="info-row">
                      <span className="info-label">
                        {t.modalLabels.players}:
                      </span>
                      <span className="info-val">
                        {selectedProduct.details.players}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{t.modalLabels.age}:</span>
                      <span className="info-val">
                        {selectedProduct.details.age}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">{t.modalLabels.price}:</span>
                      <span className="info-val price-highlight">
                        {selectedProduct.price}
                      </span>
                    </div>
                  </div>
                </section>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .store-page {
          min-height: 100vh;
        }
        .hero-title {
          color: #ffffff;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .hero-subtitle {
          color: #a1a1aa;
          max-width: 580px;
          line-height: 1.6;
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        /* GRID FLEX STRETCH */
        :global(.column.is-flex) {
          display: flex !important;
        }

        /* HIGH-CONTRAST LIGHT CARD DESIGN */
        .product-card {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }
        .product-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .card-media-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f1f5f9;
        }
        .price-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #0f172a;
          color: #f59e0b;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 4px 12px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        /* THUMBNAIL SELECTOR BAR */
        .thumbnail-bar {
          display: flex;
          gap: 8px;
          justify-content: center;
        }
        .thumb-btn {
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid #e2e8f0;
          background: #f8fafc;
          cursor: pointer;
          padding: 0;
          transition:
            border-color 0.2s ease,
            transform 0.2s ease;
        }
        .thumb-btn.active {
          border-color: #f59e0b;
          transform: scale(1.05);
        }

        /* CARD CONTENT BLOCK */
        .card-content-block {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .product-title {
          color: #0f172a;
          font-weight: 700;
          min-height: 2.8rem;
          display: flex;
          align-items: center;
        }
        .product-desc {
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.5;
          flex-grow: 1;
          min-height: 4.25rem;
        }

        /* ACTION FOOTER */
        .card-action-footer {
          display: flex;
          gap: 8px;
          background: #f8fafc;
          border-top: 1px solid #f1f5f9;
          margin-top: auto;
        }
        .store-btn {
          flex: 1;
          padding: 0.6rem 0.5rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          border: none;
          transition:
            background-color 0.2s ease,
            transform 0.15s ease;
        }
        .store-btn:active {
          transform: scale(0.98);
        }
        .primary-btn {
          background-color: #0f172a;
          color: #ffffff;
        }
        .primary-btn:hover {
          background-color: #1e293b;
        }
        .secondary-btn {
          background-color: #ffffff;
          color: #0f172a;
          border: 1px solid #cbd5e1;
        }
        .secondary-btn:hover {
          background-color: #f1f5f9;
        }

        /* MODAL STYLING */
        .modal-wrapper {
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        :global(.modal-background) {
          background-color: rgba(15, 23, 42, 0.6) !important;
        }
        .modal-surface {
          width: 90%;
          max-width: 460px;
          background: #ffffff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }
        .modal-header {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 1rem 1.25rem;
        }
        .modal-heading {
          color: #0f172a;
          font-weight: 700;
        }
        .modal-body {
          background: #ffffff;
          padding: 1.25rem;
        }
        .modal-info-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 8px;
        }
        .info-label {
          color: #64748b;
          font-size: 0.9rem;
        }
        .info-val {
          color: #0f172a;
          font-weight: 600;
          font-size: 0.9rem;
        }
        .price-highlight {
          color: #d97706;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};
