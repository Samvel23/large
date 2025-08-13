"use client";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="notfound-wrapper">
      <h1 className="notfound-title" aria-label="404">
        404
      </h1>
      <p className="notfound-message">
        Oops! Looks like this page wandered off into the void.
      </p>
      <Link href="/" aria-label="Go back to homepage">
        <button className="btnBack">🏠 Go back home</button>
      </Link>

      <style jsx>{`
        .notfound-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ffefef, #ffeaea, #fff0f0);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          color: #222;
          padding: 2rem;
          text-align: center;
        }

        /* 404 big text animation */
        .notfound-title {
          font-size: clamp(4rem, 10vw, 10rem);
          font-weight: 900;
          color: #ff6b6b;
          margin: 0;
          letter-spacing: 0.05em;
          text-shadow: 0 8px 24px rgba(255, 107, 107, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        /* message fade-in */
        .notfound-message {
          font-size: 1.4rem;
          margin-top: 1rem;
          color: #555;
          max-width: 420px;
          animation: fadeIn 1.5s ease forwards;
        }

        /* button styling */
        .btnBack {
          background-color: #ff6b6b;
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 999px;
          margin-top: 2rem;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25);
          transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
          animation: fadeInUp 2s ease forwards;
        }

        .btnBack:hover {
          background-color: #ff3b3b;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 16px rgba(255, 59, 59, 0.3);
        }

        /* background animation */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* floating 404 animation */
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }

        /* fade-in text */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* fade-in-up for button */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .notfound-message {
            font-size: 1.1rem;
          }
          .btnBack {
            font-size: 1rem;
            padding: 0.6rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}