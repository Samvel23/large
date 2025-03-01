"use client";
import { useState } from "react";
import Head from "next/head";
import { useLanguage } from "../context/LanguageContext";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { lang } = useLanguage();
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
          ? "Login successful!"
          : lang === "ru"
          ? "Вход успешен!"
          : "Մուտքը հաջողվեց!"
      );
    } else {
      setError(
        lang === "eng"
          ? "Invalid email or password"
          : lang === "ru"
          ? "Неверный email или пароль"
          : "Սխալ էլեկտրոնային հասցե կամ գաղտնաբառ"
      );
    }
  };

  return (
    <>
      <Head>
        <title>
          {lang === "eng"
            ? "Login"
            : lang === "ru"
            ? "Авторизоваться"
            : "Մուտք գործել"}
        </title>
        <meta name="description" content="Log in to access your account." />
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
                  ? "Login To Your Account"
                  : lang === "ru"
                  ? "Войти в свою учетную запись"
                  : "Մուտք գործեք ձեր հաշիվ"}
              </h1>
              <p>
                {lang === "eng"
                  ? "This page is for only viewing"
                  : lang === "ru"
                  ? "Эта страница предназначена только для просмотра"
                  : "Այս էջը միայն դիտելու համար է"}
              </p>
              {loggedIn ? (
                <div className="notification is-success">
                  {lang === "eng"
                    ? "Login successful! Welcome back!"
                    : lang === "ru"
                    ? "Вход успешен! Добро пожаловать!"
                    : "Մուտքը հաջողվեց! Բարի գալուստ!"}
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="notification is-danger">{error}</div>
                  )}
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
                        ? "Login"
                        : lang === "ru"
                        ? "Войти"
                        : "Մուտք գործել"}
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
