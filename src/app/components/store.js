"use client";
import React, { useState } from "react";
import Image from "next/image";
import shoe from "../icon/shoe.png"; // Replace with the actual path to your image

export const StorePage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert("Your Product added To Cart");
  };

  return (
    <div className="container p-4">
      <h1
        className="title has-text-centered is-size-3-mobile is-size-2-tablet"
        style={{ color: "white" }}
      >
        Welcome to Our Store
      </h1>
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
                backgroundColor: "black",
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
                  style={{ color: "white", wordBreak: "break-word" }}
                >
                  {product.name}
                </p>
                <p
                  className="subtitle is-6"
                  style={{ color: "white", wordBreak: "break-word" }}
                >
                  {product.description}
                </p>
                <p
                  className="price has-text-weight-bold"
                  style={{ color: "white", wordBreak: "break-word" }}
                >
                  {product.price}
                </p>
              </div>
              <footer
                className="card-footer"
                style={{ backgroundColor: "black" }}
              >
                <button
                  className="button is-warning card-footer-item hover-button"
                  onClick={() => handleAddToCart(product)}
                >
                  Place Order
                </button>
                <button
                  className="button is-link has-text-black card-footer-item hover-button"
                  onClick={() => setSelectedProduct(product)}
                  style={{ backgroundColor: "white" }}
                >
                  View
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

<style jsx global>{`
  .hover-button {
    transition: background-color 0.3s ease, transform 0.2s ease,
      box-shadow 0.3s ease;
  }

  .hover-button:hover {
    background-color: #ff9800; /* Slightly darker orange for hover */
    transform: scale(1.05);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  }

  .hover-button:focus {
    outline: none;
  }

  .product-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
`}</style>;
