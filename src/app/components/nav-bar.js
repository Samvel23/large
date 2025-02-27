"use client";
import "bulma/css/bulma.css";
import { useState } from "react";
import icon from "../icon/large.png";
import Image from "next/image";
import Link from "next/link";

export const NavBar = ({ lang, setLang }) => {
  const [isActive, setIsActive] = useState(false);

  // Toggle the navbar burger menu
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <nav
      className="navbar is-dark is-fixed-top custom-navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <Image src={icon} alt="Logo" width={30} height={40} />
          <span className="ml-2 has-text-weight-bold">Large Art</span>
        </Link>

        <button
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isActive}
          onClick={handleClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link className="navbar-item" href="/about">
            {lang === "eng" ? "About Us" : " "}
            {lang === "arm" ? "Մեր մասին" : " "}
            {lang === "ru" ? "О нас" : " "}
          </Link>
          <Link className="navbar-item" href="/services">
            {lang === "eng" ? "Services" : " "}
            {lang === "arm" ? "Ծառայություններ" : " "}
            {lang === "ru" ? "Услуги" : " "}
          </Link>
          <Link className="navbar-item" href="/store">
            {lang === "eng" ? "Store" : " "}
            {lang === "arm" ? "Պահեստ" : " "}
            {lang === "ru" ? "Магазин" : " "}
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link
                href="/signup"
                className="button is-primary has-background-warning"
              >
                {lang === "eng" ? "Sign up" : " "}
                {lang === "arm" ? "Գրանցում" : " "}
                {lang === "ru" ? "Зарегистрироваться" : " "}
              </Link>
              <Link href="/login" className="button is-light">
                {lang === "eng" ? "Log in" : " "}
                {lang === "arm" ? "Գրանցվել" : " "}
                {lang === "ru" ? "Войти" : " "}
              </Link>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="navbar-item">
            <div className="buttons">
              <button className="button" onClick={() => setLang("ru")}>
                RU
              </button>
              <button className="button" onClick={() => setLang("arm")}>
                ARM
              </button>
              <button className="button" onClick={() => setLang("eng")}>
                ENG
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
