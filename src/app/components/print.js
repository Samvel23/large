// pages/print.js
"use client";
import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function PrintPage() {
  const [activeId, setActiveId] = useState(null);
  const { lang } = useLanguage();

  const printTypes = [
    {
      id: 1,
      name:
        lang === "eng"
          ? "Data Matrix codes"
          : lang === "arm"
          ? "Data Matrix կոդեր"
          : "Data Matrix коды",
      about:
        lang === "eng"
          ? "High-quality Data Matrix codes for your products."
          : lang === "arm"
          ? "Բարձրորակ Data Matrix կոդեր ձեր արտադրանքների համար."
          : "Высококачественные Data Matrix коды для ваших продуктов.",
      img: "/photos/g500.png",
    },
    {
      id: 2,
      name: lang === "eng" ? "Flyers" : lang === "arm" ? "Ֆլայերներ" : "Флаеры",
      about: "Custom flyers for your marketing campaigns.",
      img: "/photos/g500.png",
    },
    {
      id: 3,
      name:
        lang === "eng"
          ? "A3 Printing"
          : lang === "arm"
          ? "A3 տպագրություն"
          : "A3 печать",
      about:
        lang === "eng"
          ? "Professional A3 printing services for posters and brochures."
          : lang === "arm"
          ? "Պրոֆեսիոնալ A3 տպագրության ծառայություններ պաստառների և բրոշյուրների համար."
          : "Профессиональные услуги печати A3 для плакатов и буклетов.",
      img: "/photos/g500.png",
    },

    {
      id: 5,
      name:
        lang === "eng"
          ? "Bussines Cards"
          : lang === "arm"
          ? "Այցեքարտեր"
          : "Визитные карточки",
      about:
        lang === "eng"
          ? "Custom business cards to make a lasting impression."
          : lang === "arm"
          ? "Անհատականացված այցեքարտեր տպելու համար՝ տպավորիչ ազդեցություն թողնելու համար."
          : "Индивидуальные визитные карточки для создания впечатляющего эффекта.",
      img: "/photos/g500.png",
    },
    {
      id: 6,
      name:
        lang === "eng" ? "Ribbons" : lang === "arm" ? "ժապավեններ" : "Ленты",
      about:
        lang === "eng"
          ? "Custom ribbons for events and branding."
          : lang === "arm"
          ? "Անհատականացված ժապավեններ միջոցառումների և բրենդինգի համար."
          : "Индивидуальные ленты для мероприятий и брендинга.",
      img: "/photos/g500.png",
    },
    {
      id: 7,
      name:
        lang === "eng"
          ? "Book Printing"
          : lang === "arm"
          ? "Գրքերի Տպագրություն"
          : "Книгопечатание",
      about:
        lang === "eng"
          ? "High-quality book printing services for authors and publishers."
          : lang === "arm"
          ? "Բարձրորակ գրքերի տպագրության ծառայություններ հեղինակների և հրատարակիչների համար."
          : "Высококачественные услуги печати книг для авторов и издателей.",
      img: "/photos/g500.png",
    },
    {
      id: 9,
      name:
        lang === "eng" ? "T-Shirt" : lang === "arm" ? "Մարզաշապիկ" : "Футболка",
      about:
        lang === "eng"
          ? "Custom T-shirt printing for events and promotions."
          : lang === "arm"
          ? "Անհատականացված մարզաշապիկների տպագրություն միջոցառումների և խթանման համար."
          : "Индивидуальная печать футболок для мероприятий и акций.",
      img: "/photos/g500.png",
    },
  ];

  const handleClick = (id) => {
    setActiveId(id);
  };

  return (
    <div className="container full-page">
      <h1 className="title has-text-centered">
        {lang === "eng"
          ? "Print Services"
          : lang === "arm"
          ? "Տպագրական ծառայություններ"
          : "Услуги печати"}
      </h1>

      <div className="main-layout">
        <div className="sidebar">
          {printTypes.map((type) => (
            <button
              key={type.id}
              className={`button sidebar-btn ${
                activeId === type.id ? "active" : ""
              }`}
              onClick={() => handleClick(type.id)}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="content-area">
          {activeId ? (
            <div className="content-card">
              <h2 className="has-text-black">
                {printTypes.find((p) => p.id === activeId).name}
              </h2>
              <p className="has-text-black">
                {printTypes.find((p) => p.id === activeId).about}
              </p>
              {printTypes.find((p) => p.id === activeId).img && (
                <Image
                  width={500}
                  height={500}
                  src={printTypes.find((p) => p.id === activeId).img}
                  alt={printTypes.find((p) => p.id === activeId).name}
                  style={{
                    marginTop: "20px",
                    maxWidth: "100%",
                    borderRadius: "8px",
                  }}
                />
              )}
            </div>
          ) : (
            <div className="placeholder">
              <p>Select a print type to see details here</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .full-page {
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
        }

        .main-layout {
          display: flex;
          gap: 20px;
          margin-top: 40px;
          height: calc(100vh - 100px); /* fill remaining screen height */
        }

        .sidebar {
          flex: 0 0 200px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .sidebar-btn {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: left;
          background: #333;
        }
        .sidebar-btn:hover {
          transform: translateX(10px);
          transition: 0.3s ease;
          background: orange;
          color: black;
        }
        .sidebar-btn.active {
          background: orange;
          color: black;
        }

        .sidebar-btn.active {
          transform: translateX(-10px);
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }

        .content-area {
          flex: 1; /* takes all remaining horizontal space */
          background: #f5f5f5;
          border-radius: 8px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          overflow-y: auto; /* scroll if content exceeds free space */
          height: 80%; /* fill vertical free space */
          box-sizing: border-box;
        }

        .content-card {
          animation: fadeIn 0.4s ease forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .placeholder {
          color: #999;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .main-layout {
            flex-direction: column;
            height: auto;
          }
          .sidebar {
            flex-direction: row;
            overflow-x: auto;
            flex: none;
          }
          .sidebar-btn {
            flex: none;
            min-width: 150px;
          }
          .content-area {
            height: auto;
          }
        }
      `}</style>
    </div>
  );
}
