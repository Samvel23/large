"use client";
import React, { useState } from "react";
import Image from "next/image";
import zbaxmunq from "../icon/zbaxmunq.png";
import zbaxmunq3 from "../icon/zbaxmunq3.png";
import zbaxmunq4 from "../icon/zbaxmunq4.png";
import origami from "../icon/origami1.png";
import origami2 from "../icon/origami2.png";
import sqeyj from "../icon/sqeyj.png";
import sqeyj1 from "../icon/sqeyj1.png";
import uno from "../icon/uno.png";
import chess from "../icon/chess.png";
import storePic from "../icon/storePic.jpg";
import { useLanguage } from "../context/LanguageContext";

export const StorePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { lang } = useLanguage();

  const products = [
    {
      id: 1,
      name:
        lang === "eng" ? "Zbaxmunq" : lang === "ru" ? "Занятие" : "Զբաղմունք",
      description:
        lang === "eng"
          ? "Game to learn Artsakh dialect with 1000 words."
          : lang === "ru"
          ? "Игра для изучения арцахского диалекта."
          : "Խաղ Արցախի բարբառը սովորելու համար:",
      price: "4600֏",
      images: [zbaxmunq, zbaxmunq3, zbaxmunq4],
      details: { creator: "Dee Games", players: "4+", age: "8+" },
    },
    {
      id: 2,
      name: lang === "eng" ? "Origami" : lang === "ru" ? "Оригами" : "Օրիգամի",
      description:
        lang === "eng"
          ? "Origami. Requires creativity & precision."
          : lang === "ru"
          ? "Оригами. Требует креативности и точности."
          : "Օրգամի, զարգացնում է ձեռքի շնորհը",
      price: "3500֏",
      images: [origami, origami2],
      details: { players: "1+", age: "5+" },
    },
    {
      id: 3,
      name: lang === "eng" ? "Sqeyjd" : lang === "ru" ? "Скейдж" : "Սքեյջ",
      description:
        lang === "eng"
          ? "Sqeydj strategy game."
          : lang === "ru"
          ? "Скейдж — стратегическая игра."
          : "Սքեյջ՝ ռազմավարական խաղ։",
      price: "2900֏",
      images: [sqeyj, sqeyj1],
      details: {
        creator:
          lang === "eng" ? "De Games" : lang === "ru" ? "Де Гейм" : "Դը Գեյմ",
        players: "3-6",
        age: "12+",
      },
    },
    {
      id: 4,
      name:
        lang === "eng"
          ? "Other Products"
          : lang === "ru"
          ? "Другие продукты"
          : "Ուրիշ ապրանքներ",
      description:
        lang === "eng"
          ? "Other products for you"
          : lang === "ru"
          ? "Другие продукты для вас"
          : "Ուրիշ ապրանքներ ձեր համար",
      images: [uno, chess],
      price: "",
      details: { players: "6+", age: "8+" },
    },
  ];

  const [currentImages, setCurrentImages] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  const handleThumbnailClick = (id, index) => {
    setCurrentImages((prev) => ({ ...prev, [id]: index }));
  };

  return (
    <div className="container p-4">
      <h1 className="title has-text-centered" style={{ color: "white" }}>
        {lang === "eng"
          ? "Welcome to Our Store"
          : lang === "ru"
          ? "Добро пожаловать"
          : "Բարի գալուստ"}
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <Image
          src={storePic}
          alt="Store"
          width={800}
          height={300}
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      <h2
        className="title is-4 has-text-centered"
        style={{ color: "white", marginBottom: "1.5rem" }}
      >
        {lang === "eng"
          ? "Our Products"
          : lang === "ru"
          ? "Наши продукты"
          : "Մեր Ապրանքները"}
      </h2>

      <div
        className="columns is-multiline is-centered"
        style={{ justifyContent: "center" }}
      >
        {products.map((product) => (
          <div key={product.id} className="column is-3">
            <div
              className="card product-card"
              style={{
                backgroundColor: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-image">
                <figure className="image is-4by3">
                  {product.images[currentImages[product.id]] && (
                    <Image
                      src={product.images[currentImages[product.id]]}
                      alt={product.name}
                      width={300}
                      height={225}
                      style={{ objectFit: "fit", borderRadius: "4px",  }}
                    />
                  )}
                </figure>
              </div>

              <div
                className="thumbnails"
                style={{
                  display: "flex",
                  gap: "5px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                {product.images.map(
                  (img, index) =>
                    img && (
                      <Image
                        key={index}
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={40}
                        height={40}
                        style={{
                          cursor: "pointer",
                          border:
                            currentImages[product.id] === index
                              ? "2px solid black"
                              : "1px solid #ccc",
                        }}
                        onClick={() => handleThumbnailClick(product.id, index)}
                      />
                    )
                )}
              </div>

              <div className="card-content has-text-centered">
                <p className="title is-5" style={{ color: "black" }}>
                  {product.name}
                </p>
                <p className="subtitle is-6" style={{ color: "black" }}>
                  {product.description}
                </p>
                <p
                  className="price has-text-weight-bold"
                  style={{ color: "black" }}
                >
                  {product.price}
                </p>
              </div>

              <footer className="card-footer">
                <button
                  className="button is-warning card-footer-item"
                  onClick={() =>
                    alert(
                      lang === "eng"
                        ? "This Page is for only viewing, you can't order"
                        : lang === "ru"
                        ? "Эта страница только для просмотра, вы не можете заказать"
                        : "Այս էջը միայն դիտելու համար է, դուք չեք կարող պատվիրել"
                    )
                  }
                >
                  Place Order
                </button>
                <button
                  className="button is-link card-footer-item"
                  style={{ backgroundColor: "black", color: "white" }}
                  onClick={() => setSelectedProduct(product)}
                >
                  View
                </button>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              margin: "auto",
            }}
          >
            <h2 className="title" style={{ color: "black" }}>
              {selectedProduct.name}
            </h2>
            {selectedProduct.details.creator && (
              <p style={{ color: "black" }}>
                {lang === "eng"
                  ? "Creator:"
                  : lang === "ru"
                  ? "Создатель:"
                  : "Ստեղծող:"}{" "}
                {selectedProduct.details.creator}
              </p>
            )}
            <p style={{ color: "black" }}>
              {lang === "eng"
                ? "Players:"
                : lang === "ru"
                ? "Игроки:"
                : "Խաղացողներ:"}{" "}
              {selectedProduct.details.players}
            </p>
            <p style={{ color: "black" }}>
              {lang === "eng"
                ? "Required Age:"
                : lang === "ru"
                ? "Возраст:"
                : "Պահանջվող Տարիք:"}{" "}
              {selectedProduct.details.age}
            </p>
            {selectedProduct.price && (
              <p style={{ color: "black" }}>
                {lang === "eng" ? "Price:" : lang === "ru" ? "Цена:" : "Գին:"}{" "}
                {selectedProduct.price}
              </p>
            )}
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setSelectedProduct(null)}
          ></button>
        </div>
      )}
    </div>
  );
};
