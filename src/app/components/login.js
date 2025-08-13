"use client";
import { useState } from "react";
import Head from "next/head";
import { useLanguage } from "../context/LanguageContext";

export const LoginPage = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === "test@example.com" &&
      formData.password === "password123"
    ) {
      setLoggedIn(true);
      setError("");
      alert(
        lang === "eng"
          ? "Login successful! (This page is for viewing only)"
          : lang === "ru"
          ? "Вход успешен! (Эта страница только для просмотра)"
          : "Մուտքը հաջողվեց! (Այս էջը միայն դիտելու համար է)"
      );
    } else {
      setError(
        lang === "eng"
          ? "Invalid email or password"
          : lang === "ru"
          ? "Неверный email или пароль"
          : "Սխալ էլեկտրոնային հասցե կամ գաղտնաբառ"
      );
    }
  };

  return (
    <>
      <Head>
        <title>
          {lang === "eng" ? "Login" : lang === "ru" ? "Вход" : "Մուտք"}
        </title>
        <meta
          name="description"
          content={
            lang === "eng"
              ? "Log in to access your account"
              : lang === "ru"
              ? "Войдите, чтобы получить доступ к своему аккаунту"
              : "Մուտք գործեք Ձեր հաշիվ մուտք գործելու համար"
          }
        />
      </Head>
      <div>
        {/* Hero Section */}
        <section className="hero is-warning">
          <div className="hero-body has-text-centered">
            <h1 className="title is-size-3-mobile is-size-2-tablet is-size-1-desktop animate-fade-in">
              {lang === "eng" ? "Login" : lang === "ru" ? "Вход" : "Մուտք"}
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
                  {loggedIn ? (
                    <div className="notification is-success has-text-centered">
                      <p style={{ color: "#e0e0e0" }}>
                        {lang === "eng"
                          ? "Welcome back!"
                          : lang === "ru"
                          ? "Добро пожаловать!"
                          : "Բարի գալուստ!"}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      {error && (
                        <div className="notification is-danger has-text-centered">
                          <p style={{ color: "#e0e0e0" }}>{error}</p>
                        </div>
                      )}
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
                            ? "Login"
                            : lang === "ru"
                            ? "Войти"
                            : "Մուտք"}
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

        .notification.is-danger {
          background-color: #2a2a2a;
          border: 1px solid #f14668;
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
            transform: translateY(0);
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
