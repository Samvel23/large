"use client";
import "bulma/css/bulma.css";
import { useState } from "react";
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
              if (router.asPath === "/") {
                window.scrollTo({ top: 600, behavior: "smooth" }); // Scroll down by 600px if on home page
              } else {
                router.push("/"); // Navigate to home page using `router.push`
                setTimeout(() => {
                  window.scrollTo({ top: 600, behavior: "smooth" }); // Scroll to 600px after navigation
                }, 100); // Delay to allow for page navigation
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

          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">More</a>
            <div className="navbar-dropdown">
              <Link className="navbar-item" href="/contact">
                Contact
              </Link>
              <hr className="navbar-divider" />
              <Link className="navbar-item" href="/faq">
                FAQ
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <Link href="/signup" className="button is-primary has-background-warning">
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
  /* Customizing navbar height and padding */
  .custom-navbar {
    height: 80px; /* Adjust to your preferred height */
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .navbar-item {
    padding: 0.5rem 1rem; /* Ensure better vertical padding */
  }

  /* Adjust navbar burger visibility */
  .navbar-burger {
    display: none;
  }

  /* Make navbar-burger visible on mobile */
  @media (max-width: 768px) {
    .navbar-burger {
      display: block;
    }

    .navbar-menu.is-active {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  /* Add custom styles for mobile */
  @media (max-width: 768px) {
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
