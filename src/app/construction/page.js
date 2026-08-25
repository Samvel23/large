"use client";

import Link from "next/link";

// Swap these for whatever's true of the page/site — they're the only
// "content" driving the blueprint framing.
const SHEET_ID = "SHEET 014";
const REVISION = "REV A";

export default function ConstructionPage() {
  return (
    <div className="page">
      <main className="sheet">
        <span className="crop crop-tl" aria-hidden="true" />
        <span className="crop crop-tr" aria-hidden="true" />
        <span className="crop crop-bl" aria-hidden="true" />
        <span className="crop crop-br" aria-hidden="true" />

        <div className="stamp" aria-hidden="true">
          <svg viewBox="0 0 120 120" className="stamp-svg">
            <defs>
              <path
                id="stampCircle"
                d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
              />
            </defs>
            <circle cx="60" cy="60" r="46" className="stamp-ring" />
            <circle cx="60" cy="60" r="34" className="stamp-ring-inner" />
            <text className="stamp-text">
              <textPath href="#stampCircle" startOffset="2%">
                IN PROGRESS &#8226; IN PROGRESS &#8226;
              </textPath>
            </text>
            <path
              d="M46 68 L58 56 M58 56 L54 52 L64 42 L68 46 L58 56 M62 50 L70 58"
              className="stamp-pencil"
            />
          </svg>
        </div>

        <div className="dim-line">
          <span className="dim-label">
            {SHEET_ID} &nbsp;/&nbsp; {REVISION} &nbsp;&mdash;&nbsp; STATUS:
            DRAFT
          </span>
        </div>

        <h1 className="title">This page is still on the drafting table.</h1>

        <p className="description">
          We&rsquo;re still measuring, sketching, and revising. Check back once
          the drawings are finalized &mdash; or head back to home in the
          meantime.
        </p>
        <Link href="/" className="home-btn">
          <button className="butik">
            Back to home <span className="arrow">&rarr;</span>
          </button>
        </Link>
      </main>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

        .butik {
          padding: 10px;
          border-radius: 5px;
          border: none;
        }
        .home-btn {
          text-decoration: none;
        }
        .page {
          --bg: #0b2942;
          --grid-minor: rgba(191, 225, 245, 0.06);
          --grid-major: rgba(191, 225, 245, 0.12);
          --paper: #0f3555;
          --line: #5f92b3;
          --line-bright: #bfe1f5;
          --ink: #eaf4fb;
          --muted: #8fb4cc;
          --stamp: #e8a33d;

          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          background-color: var(--bg);
          background-image:
            repeating-linear-gradient(
              to right,
              var(--grid-minor) 0,
              var(--grid-minor) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              to bottom,
              var(--grid-minor) 0,
              var(--grid-minor) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              to right,
              var(--grid-major) 0,
              var(--grid-major) 1px,
              transparent 1px,
              transparent 200px
            ),
            repeating-linear-gradient(
              to bottom,
              var(--grid-major) 0,
              var(--grid-major) 1px,
              transparent 1px,
              transparent 200px
            );
          color: var(--ink);
          font-family: "IBM Plex Mono", ui-monospace, Menlo, monospace;
        }

        .sheet {
          position: relative;
          width: 100%;
          max-width: 480px;
          padding: 3rem 2.25rem 2.5rem;
          background: var(--paper);
          border: 1.5px dashed var(--line);
          border-radius: 2px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
          animation: settle 0.5s ease-out;
        }

        @keyframes settle {
          from {
            opacity: 0;
            transform: translateY(6px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .crop {
          position: absolute;
          width: 14px;
          height: 14px;
          pointer-events: none;
        }
        .crop-tl {
          top: -7px;
          left: -7px;
          border-top: 1.5px solid var(--line-bright);
          border-left: 1.5px solid var(--line-bright);
        }
        .crop-tr {
          top: -7px;
          right: -7px;
          border-top: 1.5px solid var(--line-bright);
          border-right: 1.5px solid var(--line-bright);
        }
        .crop-bl {
          bottom: -7px;
          left: -7px;
          border-bottom: 1.5px solid var(--line-bright);
          border-left: 1.5px solid var(--line-bright);
        }
        .crop-br {
          bottom: -7px;
          right: -7px;
          border-bottom: 1.5px solid var(--line-bright);
          border-right: 1.5px solid var(--line-bright);
        }

        .stamp {
          position: absolute;
          top: -34px;
          right: -22px;
          width: 84px;
          height: 84px;
          transform: rotate(-10deg);
        }
        .stamp-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .stamp-ring {
          fill: none;
          stroke: var(--stamp);
          stroke-width: 1.5;
          stroke-dasharray: 3 4;
        }
        .stamp-ring-inner {
          fill: none;
          stroke: var(--stamp);
          stroke-width: 1;
          opacity: 0.5;
        }
        .stamp-text {
          font-family: "IBM Plex Mono", monospace;
          font-size: 9px;
          letter-spacing: 0.15em;
          fill: var(--stamp);
        }
        .stamp-pencil {
          fill: none;
          stroke: var(--stamp);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          opacity: 0.85;
        }

        .dim-line {
          position: relative;
          height: 1px;
          background: var(--line);
          margin: 0.25rem 0 2rem;
        }
        .dim-line::before,
        .dim-line::after {
          content: "";
          position: absolute;
          top: -4px;
          width: 1px;
          height: 9px;
          background: var(--line);
        }
        .dim-line::before {
          left: 0;
        }
        .dim-line::after {
          right: 0;
        }
        .dim-label {
          position: relative;
          display: inline-block;
          top: -0.55rem;
          background: var(--paper);
          padding: 0 0.6rem;
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--muted);
          white-space: nowrap;
        }

        .title {
          font-family: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
          font-size: 1.625rem;
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.01em;
          color: var(--ink);
          margin: 0 0 0.875rem;
        }

        .description {
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--muted);
          margin: 0 0 2.25rem;
        }

        .home-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.7rem 1.5rem;
          font-family: "IBM Plex Mono", monospace;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--bg);
          background-color: var(--line-bright);
          border: 1px solid var(--line-bright);
          border-radius: 3px;
          text-decoration: none;
          transition:
            background-color 0.15s ease,
            transform 0.15s ease;
        }

        .home-btn:hover {
          background-color: #fff;
          transform: translateY(-1px);
        }

        .home-btn:focus-visible {
          outline: 2px solid var(--stamp);
          outline-offset: 3px;
        }

        .arrow {
          transition: transform 0.15s ease;
        }
        .home-btn:hover .arrow {
          transform: translateX(2px);
        }

        @media (max-width: 480px) {
          .sheet {
            padding: 2.75rem 1.5rem 2rem;
          }
          .title {
            font-size: 1.375rem;
          }
          .stamp {
            width: 68px;
            height: 68px;
            top: -26px;
            right: -14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sheet {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
