// pages/visual-design.js
"use client";
import { useState } from "react";

export default function VisualDesignPage() {
  const [activeId, setActiveId] = useState(null);

  const designServices = [
    {
      id: 1,
      name: "Logo Design",
      about: "Craft unique and memorable logos for your brand.",
      img: "/photos/logo.png",
    },
    {
      id: 2,
      name: "Brand Identity",
      about: "Develop cohesive brand identities with colors, fonts, and style.",
    },
    {
      id: 3,
      name: "UI/UX Design",
      about:
        "Design intuitive interfaces and experiences for your apps and websites.",
      img: "/photos/uiux.png",
    },
    {
      id: 4,
      name: "Poster Design",
      about: "Create visually striking posters for events and promotions.",
    },
  ];

  const handleClick = (id) => {
    setActiveId(id);
  };

  return (
    <div className="container full-page">
      <h1 className="title has-text-centered">Visual Design Services</h1>

      <div className="main-layout">
        <div className="sidebar">
          {designServices.map((service) => (
            <button
              key={service.id}
              className={`button sidebar-btn ${
                activeId === service.id ? "active" : ""
              }`}
              onClick={() => handleClick(service.id)}
            >
              {service.name}
            </button>
          ))}
        </div>

        <div className="content-area">
          {activeId ? (
            <div className="content-card">
              <h2>{designServices.find((d) => d.id === activeId).name}</h2>
              <p>{designServices.find((d) => d.id === activeId).about}</p>
              {designServices.find((d) => d.id === activeId).img && (
                <img
                  src={designServices.find((d) => d.id === activeId).img}
                  alt={designServices.find((d) => d.id === activeId).name}
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
              <p>Select a visual design service to see details here</p>
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
          height: calc(100vh - 100px);
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
          color: #fff;
        }

        .sidebar-btn:hover {
          transform: translateX(10px);
          transition: 0.3s ease;
          background: #ffdd57;
          color: #000;
        }

        .sidebar-btn.active {
          background: #ffdd57;
          color: #000;
          transform: translateX(-10px);
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
        }

        .content-area {
          flex: 1;
          background: #f5f5f5;
          border-radius: 8px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          height: 100%;
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
