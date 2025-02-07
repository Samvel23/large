"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";

export const Services = () => {
  const [clickedService, setClickedService] = useState(null);

  return (
    <>
      <Head>
        <title style={{ color: "white" }}>Our Services</title>
        <meta
          name="description"
          content="Discover our wide range of services tailored to your needs."
        />
      </Head>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">Our Services</h1>
          <div className="columns is-multiline">
            {services.map((service, index) => (
              <div className="column is-one-third" key={index}>
                <motion.div
                  className="card"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setClickedService(service)}
                >
                  <div
                    className="card-content"
                    style={{ backgroundColor: "black" }}
                  >
                    <p className="title is-4" style={{ color: "white" }}>
                      {service.title}
                    </p>
                    <p className="subtitle is-6" style={{ color: "white" }}>
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {clickedService && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setClickedService(null)}
          ></div>
          <div
            className="modal-card"
            style={{ padding: "20px", backgroundColor: "black" }}
          >
            <header
              className="modal-card-head"
              style={{ backgroundColor: "black" }}
            >
              <p className="modal-card-title" style={{ color: "white" }}>
                {clickedService.title}
              </p>
              <button
                className="delete"
                onClick={() => setClickedService(null)}
                style={{ color: "white" }}
              ></button>
            </header>
            <section
              className="modal-card-body"
              style={{ color: "white", backgroundColor: "black" }}
            >
              <p>{clickedService.description}</p>
            </section>
            <footer
              className="modal-card-foot"
              style={{ backgroundColor: "black" }}
            >
              <button
                className="button"
                onClick={() => setClickedService(null)}
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

const services = [
  {
    title: "Interior Design",
    description: "Create beautiful and functional spaces for your home",
  },
  {
    title: "Print",
    description: "High-quality print solutions for your business.",
  },
  {
    title: "Graphic Design",
    description: "High-quality design solutions for your brand.",
  },
  {
    title: "Studio Store",
    description: "Discover our curated selection of design assets",
  },
  {
    title: "Web Development",
    description: "Custom web applications tailored to your needs.",
  },
  {
    title: "Digital Marketing",
    description: "Expert advice to help your business grow online.",
  },
];
