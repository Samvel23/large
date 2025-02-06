"use client";
import React, { useState } from "react";
import Image from "next/image";
import shoe from "../icon/shoe.png";


export const StorePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="store-page container">
      <h1 className="title has-text-centered is-size-3-mobile">Welcome to Our Store</h1>
      <div className="columns is-multiline is-mobile">
        {products.map((product) => (
          <div
            key={product.id}
            className="column is-12-mobile is-6-tablet is-4-desktop"
          >
            <div
              className="card product-card"
              style={{
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
              {/* Card Image with Text Overlay */}
              <div className="card-image" style={{ position: "relative" }}>
                <Image
                  src={product.image || "/default-image.jpg"}
                  alt={product.name}
                  width={300}
                  height={225}
                  objectFit="cover"
                  className="product-image"
                  style={{ width: "100%", height: "auto" }}
                />
                <div
                  className="overlay"
                  style={{
                    position: "absolute",
                    bottom: "0",
                    width: "100%",
                    background: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
                    color: "white",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  <p className="title is-5 is-size-6-mobile">{product.name}</p>
                  <p className="subtitle is-6 is-size-7-mobile">{product.description}</p>
                  <p className="price has-text-weight-bold is-size-6-mobile">{product.price}</p>
                </div>
              </div>

              {/* Buttons */}
              <footer className="card-footer">
                <button
                  className="button is-primary card-footer-item is-size-7-mobile has-background-warning"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="button is-link has-text-black card-footer-item is-size-7-mobile"
                  style={{backgroundColor: "yellow"}}
                  onClick={() => setSelectedProduct(product)}
                >
                  View Details
                </button>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title is-size-5-mobile">{selectedProduct.name}</p>
              <button
                className="delete"
                onClick={() => setSelectedProduct(null)}
              ></button>
            </header>
            <section className="modal-card-body">
              <p className="is-size-6-mobile">{selectedProduct.description}</p>
              <p className="price has-text-weight-bold is-size-6-mobile">
                {selectedProduct.price}
              </p>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button is-size-7-mobile"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product.",
    price: "$19.99",
    image: shoe,
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is another great product.",
    price: "$29.99",
    image: shoe,
  },
  {
    id: 3,
    name: "Product 3",
    description: "The best product in our store.",
    price: "$39.99",
    image: shoe,
  },
  {
    id: 4,
    name: "Product 4",
    description: "A must-have item!",
    price: "$49.99",
    image: shoe,
  },
];

export default StorePage;