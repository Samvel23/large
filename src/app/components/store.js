"use client";
import React, { useState } from "react";
import Image from "next/image";
import shoe from "../icon/shoe.png"; // Replace with the actual path to your image
import zbaxmunq from "../icon/zbaxmunq.png";
import { useLanguage } from "../context/LanguageContext";
export const StorePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const { lang } = useLanguage();
  const products = [
    {
      id: 1,
      name:
        lang === "eng"
          ? "Zbaxmunq"
          : lang === "ru"
          ? "Занятие"
          : lang === "arm"
          ? "Զբաղմունք"
          : " ",
      description:
        lang === "eng"
          ? "This is a great product."
          : lang === "ru"
          ? "Это отличный продукт."
          : lang === "arm"
          ? "Այս մեծ ապրանք է."
          : " ",
      price: "$19.99",
      image: zbaxmunq,
    },
    {
      id: 2,
      name:
        lang === "eng"
          ? "Product 2"
          : lang === "ru"
          ? "Товар 2"
          : lang === "arm"
          ? "Ապրանք 2"
          : " ",
      description:
        lang === "eng"
          ? "This is another great product."
          : lang === "ru"
          ? "Это еще один отличный продукт."
          : lang === "arm"
          ? "Սա մեծ այլ ապրանք է."
          : " ",
      price: "$29.99",
      image: shoe,
    },
    {
      id: 3,
      name:
        lang === "eng"
          ? "Product 3"
          : lang === "ru"
          ? "Товар 3"
          : lang === "arm"
          ? "Ապրանք 3"
          : " ",
      description:
        lang === "eng"
          ? "The best product in our store."
          : lang === "ru"
          ? "Лучший продукт в нашем магазине."
          : lang === "arm"
          ? "Մեր խանութում լավագույն ապրանքն է."
          : " ",
      price: "$39.99",
      image: shoe,
    },
    {
      id: 4,
      name:
        lang === "eng"
          ? "Product 4"
          : lang === "ru"
          ? "Товар 4"
          : lang === "arm"
          ? "Ապրանք 4"
          : " ",
      description:
        lang === "eng"
          ? "A must-have item!"
          : lang === "ru"
          ? "Обязательный товар!"
          : lang === "arm"
          ? "Պարտադիր ապրանք!"
          : " ",
      price: "$49.99",
      image: shoe,
    },
  ];

  const handleAddToCart = (product) => {
    alert("The store is currently unavailable. You can only view products.");
  };

  return (
    <div className="container p-4">
      <h1
        className="title has-text-centered is-size-3-mobile is-size-2-tablet"
        style={{ color: "white" }}
      >
        {lang === "eng"
          ? "Welcome to Our Store"
          : lang === "ru"
          ? "Добро пожаловать в наш магазин"
          : lang === "arm"
          ? "Բարի գալուս մեր խանութ"
          : " "}
      </h1>
      <p className="has-text-centered has-text-white">
        {lang === "eng"
          ? "The store is currently unavailable. You can only view products."
          : lang === "ru"
          ? "Магазин в данный момент недоступен. Вы можете только просматривать товары."
          : lang === "arm"
          ? "Խանութն այս պահին անհասանելի է։ Դուք կարող եք դիտել միայն ապրանքները:"
          : " "}
      </p>
      <div className="columns is-multiline is-centered">
        {products.map((product) => (
          <div
            key={product.id}
            className="column is-12-mobile is-6-tablet is-4-desktop"
          >
            <div
              className="card product-card"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0px 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="card-image">
                <figure className="image is-4by3">
                  <Image
                    src={product.image || "/default-image.jpg"}
                    alt={product.name}
                    width={300}
                    height={225}
                    className="product-image"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </figure>
              </div>
              <div className="card-content has-text-centered">
                <p
                  className="title is-5"
                  style={{ color: "black", wordBreak: "break-word" }}
                >
                  {product.name}
                </p>
                <p
                  className="subtitle is-6"
                  style={{ color: "black", wordBreak: "break-word" }}
                >
                  {product.description}
                </p>
                <p
                  className="price has-text-weight-bold"
                  style={{ color: "black", wordBreak: "break-word" }}
                >
                  {product.price}
                </p>
              </div>
              <footer
                className="card-footer"
                style={{ backgroundColor: "white", border: "none" }}
              >
                <button
                  className="button is-warning card-footer-item hover-button"
                  onClick={() => handleAddToCart(product)}
                >
                  {lang === "eng"
                    ? "Place order"
                    : lang === "ru"
                    ? "Разместить заказ"
                    : lang === "arm"
                    ? "Տեղադրել պատվեր"
                    : " "}
                </button>
                <button
                  className="button is-link has-text-white card-footer-item hover-button"
                  onClick={() => setSelectedProduct(product)}
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  {lang === "eng"
                    ? "View"
                    : lang === "ru"
                    ? "Смотреть"
                    : lang === "arm"
                    ? "Նայել"
                    : " "}
                </button>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div
            className="modal-card"
            style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}
          >
            <header
              className="modal-card-head"
              style={{ backgroundColor: "black", padding: "15px" }}
            >
              <p className="modal-card-title" style={{ color: "white" }}>
                {selectedProduct.name}
              </p>
              <button
                className="delete"
                onClick={() => setSelectedProduct(null)}
              ></button>
            </header>
            <section
              className="modal-card-body"
              style={{ backgroundColor: "black", padding: "20px" }}
            >
              <p style={{ color: "white" }}>{selectedProduct.description}</p>
              <p
                className="price has-text-weight-bold"
                style={{ color: "white" }}
              >
                {selectedProduct.price}
              </p>
            </section>
            <footer
              className="modal-card-foot"
              style={{ backgroundColor: "black", padding: "15px" }}
            >
              <button
                className="button"
                onClick={() => setSelectedProduct(null)}
              >
                {lang === "eng"
                  ? "Close"
                  : lang === "ru"
                  ? "Закрыть"
                  : lang === "arm"
                  ? "Փակել"
                  : " "}
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
