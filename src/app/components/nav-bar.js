"use client";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";


export const NavBar = () => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname(); // ✅ Get current path
  const router = useRouter(); // ✅ Next.js router
  const { lang, setLang } = useLanguage();

  // Toggle navbar burger menu
  const handleClick = () => {
    setIsActive(!isActive);
  };

  // Handle About Us click
  const handleAboutClick = (e) => {
    e.preventDefault();

    // ✅ Determine scroll distance based on screen width
    const scrollAmount = window.innerWidth <= 768 ? 300 : 570;

    if (pathname === "/") {
      // ✅ If already on home, scroll smoothly
      window.scrollTo({ top: scrollAmount, behavior: "smooth" });
    } else {
      // ✅ Redirect to home **without full reload** and scroll after navigation
      router.push("/");

      // Wait for route change, then scroll
      setTimeout(() => {
        window.scrollTo({ top: scrollAmount, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <nav
        className="navbar is-dark is-fixed-top custom-navbar"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link className="navbar-item" href="/">
            <Image src="/photos/large.png" alt="Logo" width={20} height={40} />
            <span className="ml-2 has-text-weight-bold">Large Art</span>
          </Link>

          <button
            className={`navbar-burger ${
              isActive ? "is-active" : ""
            } has-text-warning`}
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
            {/* ✅ About Us button always visible */}
            <Link className="navbar-item" href="/content">
              {lang === "eng"
                ? "Content"
                : lang === "arm"
                ? "Կոնտենտ"
                : "Контент"}
            </Link>

            <Link className="navbar-item" href="/design">
              {lang === "eng"
                ? "Design/Print"
                : lang === "arm"
                ? "Դիզայն/Տպագրություն"
                : "Дизайн/Печать"}
            </Link>
            <Link className="navbar-item" href="/store">
              {lang === "eng"
                ? "Store"
                : lang === "arm"
                ? "Գրախանութ"
                : "Магазин"}
            </Link>
            <Link className="navbar-item" onClick={handleAboutClick} href="/">
              {lang === "eng"
                ? "Contacts"
                : lang === "arm"
                ? "Կոնտակտներ"
                : "Контакты"}
            </Link>
            <Link
              className="navbar-item"
              href="/telmekh"
              style={{ color: "#ffdd57" }}
            >
              TelMekh
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button
                  className="button is-small is-rounded is-outlined has-text-white"
                  onClick={() => setLang("arm")}
                >
                  ARM
                </button>
                <button
                  className="button is-small is-rounded is-outlined has-text-white"
                  onClick={() => setLang("eng")}
                >
                  ENG
                </button>
                <button
                  className="button is-small is-rounded  has-text-white is-outlined"
                  onClick={() => setLang("ru")}
                >
                  RU
                </button>
              </div>
            </div>
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  href="/signup"
                  className="button is-primary has-background-warning"
                >
                  {lang === "eng"
                    ? "Sign up"
                    : lang === "arm"
                    ? "Գրանցում"
                    : "Зарегистрироваться"}
                </Link>
                <Link href="/login" className="button is-light">
                  {lang === "eng" ? "Log in" : lang === "arm" ? "Մուտք" : "Войти"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <style jsx>{`
        *{
        font-family: "Noto Sans Armenian", sans-serif;
        }
      `}</style>
    </>
  );
};
