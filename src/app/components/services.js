"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";

export const Services = () => {
  const [clickedService, setClickedService] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Simulate sending email (replace with real service)
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: clickedService.title,
        ...orderDetails,
      }),
    });

    if (response.ok) {
      alert("Your order has been placed!");
      setClickedService(null);
      setOrderDetails({ name: "", email: "", message: "" });
    } else {
      alert("There was an error placing your order.");
    }
  };

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
          <h1 className="title has-text-centered" style={{ color: "white" }}>
            Our Services
          </h1>
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
                    <figure className="image">
                      <img src={service.image} alt={service.title} />
                    </figure>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {clickedService && (
        <div className="modal is-active" style={{ padding: "20px" }}>
          <div
            className="modal-background"
            onClick={() => setClickedService(null)}
          ></div>
          <div
            className="modal-card"
            style={{
              padding: "20px",
              backgroundColor: "black",
              border: "1px solid grey",
            }}
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
              <hr style={{ backgroundColor: "grey" }} />
              <h2 style={{ color: "white" }}>Order this service</h2>
              <form onSubmit={handleOrderSubmit}>
                <div className="field">
                  <label className="label" style={{ color: "white" }}>
                    Name
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      value={orderDetails.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" style={{ color: "white" }}>
                    Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      value={orderDetails.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label" style={{ color: "white" }}>
                    Message
                  </label>
                  <div className="control">
                    <textarea
                      className="textarea"
                      name="message"
                      value={orderDetails.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="button is-primary"
                  style={{ marginTop: "10px" }}
                >
                  Submit Order
                </button>
              </form>
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
    image:
      "https://images.unsplash.com/photo-1615529182904-14819c35db37?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGl2aW5nJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
  },
  {
    title: "Print",
    description: "High-quality print solutions for your business.",
    image:
      "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
  },
  {
    title: "Graphic Design",
    description: "High-quality design solutions for your brand.",
    image:
      "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
  },
  {
    title: "Studio Store",
    description: "Discover our curated selection of design assets",
    image:
      "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
  },
  {
    title: "Web Development",
    description: "Custom web applications tailored to your needs.",
    image:
      "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
  },
  {
    title: "Digital Marketing",
    description: "Expert advice to help your business grow online.",
    image:
      "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
  },
];
