"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export const TelMekh = () => {
  const { lang } = useLanguage();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [winnerAnimation, setWinnerAnimation] = useState(false);
  const [loading, setLoading] = useState(false);

  // Submit winner
  const submitWinner = async () => {
    if (!code) {
      setResult("Please enter your code.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/check-number", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, number: code }), // only number is required now
      });
      const data = await res.json();
      setResult(data.message);

      if (data.message.includes("Winner")) {
        setWinnerAnimation(true);
        setTimeout(() => setWinnerAnimation(false), 4000);
      }
    } catch {
      setResult("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero is-fullheight telmekh-hero">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered is-multiline">
            {/* Static Image */}
            <div className="column is-6 fade-in-left">
              <div className="image-static">
                <Image
                  src="/photos/tel1.jpg"
                  alt="TelMekh image"
                  width={500}
                  height={600}
                  className="is-rounded main-img"
                  priority
                />
              </div>
            </div>

            {/* Form & Info */}
            <div className="column is-6 fade-in-right">
              <div className="telmekh-logo">
                <Image
                  src="/photos/telmekh.png"
                  alt="TelMekh Logo"
                  width={250}
                  height={100}
                  priority
                />
              </div>

              <p className="content is-size-5">
                {lang === "eng"
                  ? "This handcrafted wooden board features meticulously hammered nails and precision threading. Each piece is unique, crafted with care, and perfect for home decoration or a personal gift."
                  : lang === "ru"
                  ? "Эта деревянная доска ручной работы украшена тщательно вбитыми гвоздями и точной резьбой. Каждое изделие TelMekh уникально и идеально подходит для украшения дома или подарка."
                  : "Այս ձեռագործ փայտե տախտակը պատրաստված է մանրակրկիտ մշակված մեխերով։ Յուրաքանչյուր TelMekh եզակի է և հիանալի նվեր է ընկերոջը կամ հարազատին։"}
              </p>

              {/* Winner Form */}
              <div className="mt-6 winner-check-form card-form">
                <h2 className="subtitle">
                  {lang == "eng"
                    ? "Check Your Code"
                    : lang == "ru"
                    ? "Проверьте свой код"
                    : "Ստուգեք ձեր կոդը"}
                </h2>
                <div className="field">
                  <input
                    className="styled-input"
                    type="text"
                    placeholder={
                      lang === "eng" ? "Name" : lang === "ru" ? "Имя" : "Անուն"
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    className="styled-input"
                    type="text"
                    placeholder={
                      lang === "eng"
                        ? "Phone Number"
                        : lang === "ru"
                        ? "Номер телефона"
                        : "Հեռախոսահամար"
                    }
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="field">
                  <input
                    className="styled-input"
                    type="text"
                    placeholder={
                      lang === "eng"
                        ? "Enter your code"
                        : lang === "ru"
                        ? "Введите ваш код"
                        : "Մուտքագրեք ձեր կոդը"
                    }
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <button
                  className="submit-btn mt-3"
                  onClick={submitWinner}
                  disabled={loading}
                >
                  {loading
                    ? lang === "eng"
                      ? "Checking..."
                      : lang === "ru"
                      ? "Проверка..."
                      : "Ստուգվում է..."
                    : lang === "eng"
                    ? "Submit"
                    : lang === "ru"
                    ? "Отправить"
                    : "Ուղարկել"}
                </button>

                {loading && (
                  <div className="loading-gif">
                    <Image
                      src="/photos/progress.gif"
                      alt="Checking..."
                      width={80}
                      height={80}
                    />
                    <p>
                      {lang === "eng"
                        ? "Checking..."
                        : lang === "ru"
                        ? "Проверка..."
                        : "Ստուգվում է..."}
                    </p>
                  </div>
                )}

                {result && (
                  <p
                    className={`mt-3 result-msg ${
                      result.includes("Winner")
                        ? "success-msg"
                        : result.includes("Server") || result.includes("⚠️")
                        ? "error-msg"
                        : "info-msg"
                    }`}
                  >
                    {result}
                  </p>
                )}
              </div>

              <a href="https://www.instagram.com/telmekh/">
                <button className="button is-warning is-medium pulse-btn mt-5">
                  {lang === "eng"
                    ? "Visit TelMekh on Instagram"
                    : lang === "ru"
                    ? "Посетите TelMekh в Instagram"
                    : "Այցելեք TelMekh-ը Instagram-ում"}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Winner animation */}
      {winnerAnimation && (
        <div className="winner-animation">
          <Image
            src="/photos/confetti.gif"
            alt="Winner!"
            width={400}
            height={400}
          />
          <p className="winner-text">
            {lang === "eng"
              ? "Congratulations!"
              : lang === "ru"
              ? "Поздравляем!"
              : "Շնորհավորում ենք!"}
          </p>
        </div>
      )}

      <style jsx>{`
        .telmekh-hero {
          color: #fff;
          padding-bottom: 100px;
        }
        .telmekh-logo {
          margin-top: 3rem;
          text-align: center;
        }
        .main-img {
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
        }

        .card-form {
          background: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }
        .styled-input {
          width: 100%;
          padding: 0.8rem 1rem;
          margin-bottom: 1rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          background: #222;
          color: #fff;
          box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        .styled-input:focus {
          outline: none;
          background: #333;
          box-shadow: 0 0 8px #f9a825;
        }
        .submit-btn {
          width: 100%;
          padding: 0.9rem;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: bold;
          background: linear-gradient(135deg, #ffb300, #f57f17);
          color: #000;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.3s;
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(249, 168, 37, 0.5);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-gif {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1rem;
        }
        .loading-gif p {
          margin-top: 0.5rem;
          font-weight: 600;
          color: #fff;
        }

        .result-msg {
          padding: 0.8rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          text-align: center;
        }
        .success-msg {
          background: rgba(76, 175, 80, 0.2);
          color: #4caf50;
        }
        .error-msg {
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
        }
        .info-msg {
          background: rgba(255, 193, 7, 0.2);
          color: #ffc107;
        }

        .pulse-btn {
          animation: pulse 1.5s infinite;
          box-shadow: 0 2px 16px rgba(255, 204, 51, 0.2);
          border-radius: 8px;
          font-weight: 600;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 204, 51, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(255, 204, 51, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 204, 51, 0);
          }
        }

        .winner-animation {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
          animation: pop 0.5s ease-out;
          z-index: 2000;
          pointer-events: none;
        }
        .winner-text {
          font-size: 2rem;
          font-weight: bold;
          color: #ffcc33;
          text-shadow: 2px 2px 8px #000;
          margin-top: -60px;
        }
        @keyframes pop {
          0% {
            transform: scale(0) translateX(-50%);
            opacity: 0;
          }
          100% {
            transform: scale(1) translateX(-50%);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .columns {
            text-align: center;
            flex-direction: column;
          }
          .main-img {
            width: 90vw !important;
            height: auto !important;
          }
          .winner-animation img {
            width: 70vw !important;
            height: auto !important;
          }
        }
      `}</style>
    </div>
  );
};
