"use client";
import { useState } from "react";
import Head from "next/head";
import { useLanguage } from "../context/LanguageContext";

export const SignUpPage = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert(
      lang === "eng"
        ? "Signup successful! (This page is for viewing only)"
        : lang === "ru"
        ? "Регистрация успешна! (Эта страница только для просмотра)"
        : "Հաշիվը ստեղծված է! (Այս էջը միայն դիտելու համար է)"
    );
  };

  return (
    <>
      <Head>
        <title>
          {lang === "eng"
            ? "Sign Up"
            : lang === "ru"
            ? "Регистрация"
            : "Գրանցում"}
        </title>
        <meta
          name="description"
          content={
            lang === "eng"
              ? "Create an account to access exclusive features"
              : lang === "ru"
              ? "Создайте аккаунт для доступа к эксклюзивным функциям"
              : "Ստեղծեք հաշիվ՝ բացառիկ հնարավորություններին հասանելիություն ստանալու համար"
          }
        />
      </Head>
      <div>
        {/* Hero Section */}
        <section className="hero is-warning">
          <div className="hero-body has-text-centered">
            <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop animate-fade-in">
              {lang === "eng"
                ? "Sign Up"
                : lang === "ru"
                ? "Регистрация"
                : "Գրանցում"}
            </h1>
          </div>
        </section>

        {/* Form Section */}
        <section className="section py-4">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-12-mobile is-8-tablet is-6-desktop animate-slide-up">
                <div className="box p-5">
                  <p
                    className="has-text-centered mb-4"
                    style={{ color: "#e0e0e0" }}
                  >
                    {lang === "eng"
                      ? "This page is for viewing only"
                      : lang === "ru"
                      ? "Эта страница только для просмотра"
                      : "Այս էջը միայն դիտելու համար է"}
                  </p>
                  {submitted ? (
                    <div className="notification is-success has-text-centered">
                      <p style={{ color: "#e0e0e0" }}>
                        {lang === "eng"
                          ? `Welcome, ${formData.name}!`
                          : lang === "ru"
                          ? `Добро пожаловать, ${formData.name}!`
                          : `Բարի գալուստ, ${formData.name}!`}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <label className="label" style={{ color: "#e0e0e0" }}>
                          {lang === "eng"
                            ? "Name"
                            : lang === "ru"
                            ? "Имя"
                            : "Անուն"}
                        </label>
                        <div className="control">
                          <input
                            className="input"
                            type="text"
                            name="name"
                            placeholder={
                              lang === "eng"
                                ? "Your Name"
                                : lang === "ru"
                                ? "Ваше имя"
                                : "Ձեր անունը"
                            }
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" style={{ color: "#e0e0e0" }}>
                          {lang === "eng"
                            ? "Email"
                            : lang === "ru"
                            ? "Почта"
                            : "Էլ. հասցե"}
                        </label>
                        <div className="control">
                          <input
                            className="input"
                            type="email"
                            name="email"
                            placeholder={
                              lang === "eng"
                                ? "Your Email"
                                : lang === "ru"
                                ? "Ваша почта"
                                : "Ձեր էլ. հասցեն"
                            }
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label" style={{ color: "#e0e0e0" }}>
                          {lang === "eng"
                            ? "Password"
                            : lang === "ru"
                            ? "Пароль"
                            : "Գաղտնաբառ"}
                        </label>
                        <div className="control">
                          <input
                            className="input"
                            type="password"
                            name="password"
                            placeholder={
                              lang === "eng"
                                ? "Your Password"
                                : lang === "ru"
                                ? "Ваш пароль"
                                : "Ձեր գաղտնաբառը"
                            }
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="field">
                        <button className="button is-warning is-fullwidth">
                          {lang === "eng"
                            ? "Sign Up"
                            : lang === "ru"
                            ? "Зарегистрироваться"
                            : "Գրանցվել"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        .hero {
          background-color: #2a2a2a;
        }

        .box {
          background-color: #2a2a2a;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .notification.is-success {
          background-color: #2a2a2a;
          border: 1px solid #48c78e;
        }

        .input {
          background-color: #333333;
          color: #e0e0e0;
          border-color: #444444;
        }

        .input:focus {
          border-color: #ff8c00;
          box-shadow: 0 0 5px rgba(255, 140, 0, 0.3);
        }

        .label {
          font-weight: 500;
          line-height: 1.4;
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
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: -translateY(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .box {
            padding: 1.5rem;
          }

          .title.is-size-3-mobile {
            font-size: 1.75rem !important;
          }
        }

        @media (max-width: 480px) {
          .box {
            padding: 1rem;
          }

          .notification p {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
};
