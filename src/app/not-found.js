"use client";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-title" aria-label="404">
        404
      </h1>
      <p className="notfound-message">
        Sorry, we couldn&apos;t find that page.
      </p>
      <Link href="/" className="home-link" aria-label="Go back to homepage">
        <button className="btnBack">Go back home</button>
      </Link>

      <style jsx>{`
        .notfound-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fff 60%, #ffeaea 100%);
          color: #222;
          padding: 2rem;
        }

        .notfound-title {
          font-size: 8rem;
          font-weight: 900;
          color: #ff6b6b;
          margin: 0;
          letter-spacing: 0.1em;
          text-shadow: 0 4px 24px rgba(255, 107, 107, 0.15);
          animation: bounce 1s ease-in-out infinite alternate;
        }

        .notfound-message {
          font-size: 1.5rem;
          margin-top: 1rem;
          color: #555;
          max-width: 400px;
        }

        .home-link {
          margin-top: 2rem;
          font-size: 1.15rem;
          color: #fff;
          background: #ff6b6b;
          padding: 0.75rem 2rem;
          border-radius: 999px;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(255, 107, 107, 0.08);
          transition: background 0.2s, color 0.2s, transform 0.2s;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          textDecoration: "none"
          gap: 0.5em;
        }

        .home-link:hover,
        .home-link:focus {
          background: #ff3b3b;
          color: #fff;
          transform: translateY(-2px) scale(1.03);
        }

        @keyframes bounce {
          to {
            transform: translateY(-12px) scale(1.04);
          }
        }

        @media (max-width: 768px) {
          .notfound-title {
            font-size: 4rem;
          }
          .notfound-message {
            font-size: 1.1rem;
          }
        }
        .btnBack {
            background-color: #ff6b6b;
            color: white;
            border: none;
            padding: 0.5rem 1.5rem;
            border-radius: 12px;
            margin-top: 1rem;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.2s;
        }
        .btnBack:hover {
            background-color: #ff3b3b;
            transform: translateY(-2px);
        }
        
      `}</style>
    </div>
  );
}
