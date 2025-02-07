"use client";
import "bulma/css/bulma.css";
import { useState, useEffect } from "react";
import icon from "../icon/large.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };
  const router = useRouter();

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isActive]);

  return (
    <nav
      className="navbar is-dark is-fixed-top custom-navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <Image src={icon} alt="Logo" width="30" height="40" />
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
          <Link
            className={`navbar-item ${
              router.asPath !== "/" ? "" : "is-hidden"
            }`}
            href={router.asPath === "/" ? "#" : "/"}
            onClick={(e) => {
              e.preventDefault();
              const scrollAmount = window.innerWidth <= 768 ? 400 : 600;
              if (router.asPath === "/") {
                window.scrollTo({ top: scrollAmount, behavior: "smooth" });
              } else {
                router.push("/");
                setTimeout(() => {
                  window.scrollTo({ top: scrollAmount, behavior: "smooth" });
                }, 100);
              }
            }}
          >
            About Us
          </Link>
          <Link className="navbar-item" href="/services">
            Services
          </Link>
          <Link className="navbar-item" href="/store">
            Store
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link
                href="/signup"
                className="button is-primary has-background-warning"
              >
                <strong>Sign up</strong>
              </Link>
              <Link href="/login" className="button is-light">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

<style jsx>{`
  .custom-navbar {
    height: 80px;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .navbar-item {
    padding: 0.5rem 1rem;
  }

  .navbar-burger {
    display: none;
  }

  @media (max-width: 768px) {
    .navbar-burger {
      display: block;
    }

    .navbar-menu.is-active {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      overflow-y: auto;
      padding-top: 80px;
    }

    .navbar-item {
      padding: 1rem;
      font-size: 1.2rem;
    }

    .navbar-brand {
      flex-direction: column;
      align-items: center;
    }

    .buttons {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }
`}</style>;
