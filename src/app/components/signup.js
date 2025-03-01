"use client";
import { useState } from "react";
import Head from "next/head";
import { useLanguage } from "../context/LanguageContext";

export const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { lang } = useLanguage();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    alert(
      lang === "eng"
        ? "Signup successful! "
        : lang === "ru"
        ? "Регистрация успешна! "
        : "Ստեղծված հաշիվ! "
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
          content="Create an account to access exclusive features."
        />
      </Head>
      <section className="section">
        <div className="container">
          <div className="column is-half is-offset-one-quarter">
            <div className="box p-5" style={{ backgroundColor: "black" }}>
              <h1
                className="title has-text-centered"
                style={{ color: "white" }}
              >
                {lang === "eng"
                  ? "Create an Account"
                  : lang === "ru"
                  ? "Завести аккаунт"
                  : "Ստեղծեք հաշիվ"}
              </h1>
              <p>
                {lang === "eng"
                  ? "This page for only viewing"
                  : lang === "ru"
                  ? "Эта страница только для просмотра"
                  : "Այս էջը միայն դիտելու համար"}
              </p>

              {submitted ? (
                <div className="notification is-success">
                  {lang === "eng"
                    ? "Signup successful! Welcome,"
                    : lang === "ru"
                    ? "Регистрация успешна! Добро пожаловать,"
                    : "Ստեղծված հաշիվ! Բարի Գալուստ,"}
                  {formData.name}!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label className="label" style={{ color: "white" }}>
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
                            ? "Name"
                            : lang === "ru"
                            ? "Имя"
                            : "Անուն"
                        }
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" style={{ color: "white" }}>
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
                            ? "Email"
                            : lang === "ru"
                            ? "Почта"
                            : "Էլ. հասցե"
                        }
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label" style={{ color: "white" }}>
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
                            ? "Password"
                            : lang === "ru"
                            ? "Пароль"
                            : "Գաղտնաբառ"
                        }
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <button className="button is-primary is-fullwidth has-background-warning">
                      {lang === "eng"
                        ? "Sign Up"
                        : lang === "ru"
                        ? "Регистрация"
                        : "Ստեղծեք հաշիվ"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
