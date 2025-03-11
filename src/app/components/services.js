"use client";
import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import td from "../icon/3d.jpeg";
import design from "../icon/design.jpg";
import Image from "next/image";
import print from "../icon/print.jpg";
import store from "../icon/store.jpg";
import creating from "../icon/creating.jpg";
import gift from "../icon/gift.jpg";
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
      title:
        lang === "eng"
          ? "3D Design"
          : lang === "ru"
          ? "3Д Дизайн"
          : "3Դ Դիզայն",
      description:
        lang === "eng"
          ? "Beautiful designs for your home"
          : lang === "ru"
          ? "Красивые и функциональные проекты для дома"
          : "Ստեղծեք գեղեցիկ դիզայն ձեր տան համար",
      image: td,
    },
    {
      title:
        lang === "eng" ? "Print" : lang === "ru" ? "Печать" : "Տպագրություն",
      description:
        lang === "eng"
          ? "High-quality printing solutions."
          : lang === "ru"
          ? "Качественная печать для вашего бизнеса."
          : "Բարձրորակ տպագրում ձեր բիզնեսի համար:",
      image: print,
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
          ? "Высококачественные решения для бренда."
          : "Բարձրորակ դիզայն լուծումներ ձեր համար:",
      image: design,
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
          ? "Explore our curated design assets."
          : lang === "ru"
          ? "Откройте наш выбор дизайнерских активов."
          : "Մեր ակտիվները ու մեր դիզայն պահեստները:",
      image: store,
    },
    {
      title:
        lang === "eng"
          ? "Content Createing"
          : lang === "ru"
          ? "Создание контента"
          : "Կոնտենտ Ստեղծում",
      description:
        lang === "eng"
          ? "Create content that resonates."
          : lang === "ru"
          ? "Создайте контент, который резонирует."
          : "Կոնտենտ, որը համապատասխանում է ձեզ։",
      image: creating,
    },
    {
      title:
        lang === "eng" ? "Giftboxes" : lang === "ru" ? "Гифтбокс" : "Գիֆտբոքս",
      description:
        lang === "eng"
          ? "Customized gift boxes for any occasion."
          : lang === "ru"
          ? "Индивидуальные гифтбоксы для любого события."
          : "Գիֆտբոքսեր ցանկացած առիթի համար:",
      image: gift,
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
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={300}
                        height={300}
                      />
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
