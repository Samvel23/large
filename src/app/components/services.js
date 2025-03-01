"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export const Services = () => {
  const [clickedService, setClickedService] = useState(null);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { lang } = useLanguage();
  const services = [
    {
      title: lang === "eng" ? "Design" : lang === "ru" ? "Дизайн" : "Դիզայն",
      description:
        lang === "eng"
          ? "Create beautiful and functional designes for your home"
          : lang === "ru"
          ? "Создавайте красивые и функциональные проекты для вашего дома"
          : "Ստեղծեք գեղեցիկ և ֆունկցիոնալ դիզայն ձեր տան համար",
      image:
        "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
    },
    {
      title:
        lang === "eng" ? "Print" : lang === "ru" ? "Печать" : "Տպագրություն",
      description:
        lang === "eng"
          ? "High-quality print solutions for your business."
          : lang === "ru"
          ? "Высококачественные решения для печати для вашего бизнеса."
          : "Բարձրորակ տպագրական լուծումներ ձեր բիզնեսի համար:",
      image:
        "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
    },

    {
      title:
        lang === "eng"
          ? "Graphic Design"
          : lang === "ru"
          ? "Графический дизайн"
          : "Գրաֆիկական դիզայն",
      description:
        lang === "eng"
          ? "High-quality design solutions for your brand."
          : lang === "ru"
          ? "Высококачественные решения для вашего бренда."
          : "Բարձրորակ դիզայն լուծումներ ձեր բրենդի համար:",
      image:
        "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
    },
    {
      title:
        lang === "eng"
          ? "Studio Store"
          : lang === "ru"
          ? "Магазин студии"
          : "Ստուդիայի խանութ",
      description:
        lang === "eng"
          ? "Discover our curated selection of design assets."
          : lang === "ru"
          ? "Откройте для себя наш отобранный выбор дизайнерских активов."
          : "Հայտնաբերեք մեր ընտրյալ դիզայն ակտիվները:",
      image:
        "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
    },
    {
      title:
        lang === "eng"
          ? "Web Development"
          : lang === "ru"
          ? "Веб-разработка"
          : "Վեբ-զարգացում",
      description:
        lang === "eng"
          ? "Custom web applications tailored to your needs."
          : lang === "ru"
          ? "Индивидуальные веб-приложения, разработанные под ваши потребности."
          : "Ձեր կարիքներին համապատասխան վեբ-հավելվածներ:",
      image:
        "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
    },
    {
      title:
        lang === "eng"
          ? "Digital Marketing"
          : lang === "ru"
          ? "Цифровой маркетинг"
          : "Թվային մարկետինգ",
      description:
        lang === "eng"
          ? "Expert advice to help your business grow online."
          : lang === "ru"
          ? "Экспертные консультации, чтобы помочь вашему бизнесу развиваться в интернете."
          : "Էքսպերտ խորհրդատվություններ ձեր բիզնեսի աճի համար օնլայն:",
      image:
        "https://cdn.prod.website-files.com/65130e79c72ae8812db3412e/6718fbb85d1152665bfafec4_Untitled%20design%20(14).jpg",
    },
  ];
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
            {lang === "eng"
              ? "Our Services"
              : lang === "ru"
              ? "Наши услуги"
              : lang === "arm"
              ? "Մեր ծառայությունները"
              : " "}
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
            </section>
          </div>
        </div>
      )}
    </>
  );
};
