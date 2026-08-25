"use client";

import Link from "next/link";
import { Home, Gamepad2 } from "lucide-react";

export default function NotFound() {
  return (
    <main className="notfound-container">
      <div className="notfound-card">
        <div className="status-badge">404 ERROR</div>
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-description">
          The resource you requested does not exist or has been relocated deeper
          into the application.
        </p>

        <div className="action-group">
          <button className="btn-primary">
            <Home size={18} />
            <Link href="/" aria-label="Return to Homepage">
              Return Home
            </Link>
          </button>
        </div>
      </div>

      <style jsx>{`
        .notfound-container {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #1a1b1c;
          /* Composite radial spotlight + vector grid pattern */
          background-image:
            radial-gradient(
              circle at 50% 35%,
              rgba(255, 204, 51, 0.08) 0%,
              transparent 60%
            ),
            radial-gradient(#3a3b3c 1px, transparent 1px);
          background-size:
            100% 100%,
            28px 28px;
          color: #f0f0f0;
          padding: 2rem;
          box-sizing: border-box;
        }

        .notfound-card {
          max-width: 520px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: #242526;
          border: 1px solid #3a3b3c;
          border-radius: 16px;
          padding: 3rem 2.5rem;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 204, 51, 0.12);
        }

        .status-badge {
          background-color: rgba(255, 204, 51, 0.12);
          color: #ffcc33;
          border: 1px solid rgba(255, 204, 51, 0.3);
          padding: 0.35rem 0.9rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          margin-bottom: 1.5rem;
        }

        .notfound-title {
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0 0 0.75rem 0;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .notfound-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #a0a5aa;
          margin: 0 0 2.25rem 0;
        }

        .action-group {
          display: flex;
          gap: 1rem;
          width: 100%;
          justify-content: center;
        }

        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          text-decoration: none;
          color: white;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.4rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition:
            transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            background-color 0.2s,
            box-shadow 0.2s;
        }

        .btn-primary {
          background-color: #ffcc33;
          color: #1a1b1c;
          box-shadow: 0 4px 14px rgba(255, 204, 51, 0.25);
        }

        .btn-primary a {
          color: #ffffff;
          text-decoration: none;
        }

        .btn-primary:hover {
          background-color: #e6b82e;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 204, 51, 0.4);
        }

        .btn-secondary {
          background-color: #3a3b3c;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
          background-color: #4a4b4c;
          color: #ffcc33;
          transform: translateY(-2px);
        }

        .btn-primary:focus-visible,
        .btn-secondary:focus-visible {
          outline: 2px solid #ffcc33;
          outline-offset: 3px;
        }

        @media (max-width: 520px) {
          .notfound-card {
            padding: 2rem 1.5rem;
          }
          .action-group {
            flex-direction: column;
          }
          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
