"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2 } from "lucide-react";

export function FloatingGameButton() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname === "/game") return null;

  return createPortal(
    <>
      <Link
        href="/game"
        aria-label="Open Arcade Game"
        className="screen-locked-game-btn"
      >
        <Gamepad2 size={28} />
      </Link>

      <style jsx global>{`
        .screen-locked-game-btn {
          position: fixed;
          bottom: 2.25rem;
          left: 2.25rem;
          z-index: 9990;

          display: flex;
          align-items: center;
          justify-content: center;
          /* Sizing increased to 64px on desktop */
          width: 64px;
          height: 64px;
          border-radius: 50%;

          background: #ffcc33;
          color: #1c1d1e;
          text-decoration: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;

          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);

          /* Continuous periodic hop animation (3s interval) */
          animation: hopBounce 3s cubic-bezier(0.28, 0.84, 0.42, 1) infinite;

          transition:
            transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            background-color 0.2s ease;
        }

        /* Hover pauses keyframes to prevent transform conflicts */
        .screen-locked-game-btn:hover {
          animation-play-state: paused;
          transform: translateY(-6px) scale(1.08);
          box-shadow: 0 14px 32px rgba(255, 204, 51, 0.5);
        }

        .screen-locked-game-btn:active {
          animation-play-state: paused;
          transform: translateY(-1px) scale(0.95);
          box-shadow: 0 6px 18px rgba(255, 204, 51, 0.35);
        }

        .screen-locked-game-btn:focus-visible {
          outline: 2px solid #ffcc33;
          outline-offset: 4px;
        }

        .screen-locked-game-btn svg {
          pointer-events: none;
        }

        /* Periodic Hop Keyframes (Idles for ~2.4s, jumps across ~0.6s) */
        @keyframes hopBounce {
          0%,
          80%,
          100% {
            transform: translateY(0) scale(1);
          }
          85% {
            transform: translateY(-14px) scaleY(1.06) scaleX(0.95);
          }
          90% {
            transform: translateY(0) scaleY(0.92) scaleX(1.06);
          }
          94% {
            transform: translateY(-4px) scale(1);
          }
        }

        @media (max-width: 640px) {
          .screen-locked-game-btn {
            bottom: calc(1.25rem + env(safe-area-inset-bottom));
            left: calc(1.25rem + env(safe-area-inset-left));
            /* Sizing increased to 54px on mobile */
            width: 54px;
            height: 54px;
          }
        }

        /* Accessibility: Disable continuous motion for reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .screen-locked-game-btn {
            animation: none;
          }
        }
      `}</style>
    </>,
    document.body,
  );
}
