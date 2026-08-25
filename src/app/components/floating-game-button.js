"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2 } from "lucide-react";

export function FloatingGameButton() {
  const pathname = usePathname();

  // Portals need a real DOM node, which only exists client-side after
  // mount. Guarding with this flag avoids SSR/hydration mismatches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (pathname === "/game") return null;

  // Rendering into document.body — rather than wherever this component
  // happens to sit in the tree — guarantees the button is always a direct
  // child of <body>. That means no ancestor on any page (a transformed
  // wrapper, a `will-change`, an animation library, an `overflow` container,
  // etc.) can ever hijack `position: fixed` and pin it somewhere other than
  // the viewport corner. Same spot, every route, every scroll position.
  return createPortal(
    <>
      <Link
        href="/game"
        aria-label="Open Arcade Game"
        className="screen-locked-game-btn"
      >
        <Gamepad2 size={24} />
      </Link>

      {/* global (not scoped) so the injected <style> in <head> reliably
          matches the portaled element regardless of where it's mounted */}
      <style jsx global>{`
        .screen-locked-game-btn {
          position: fixed;
          bottom: 2rem;
          left: 2rem;
          z-index: 9990;

          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;

          background: #ffcc33;
          color: #1c1d1e;
          text-decoration: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;

          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
          transition:
            transform 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1),
            background-color 0.2s ease;
        }

        .screen-locked-game-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 12px 28px rgba(255, 204, 51, 0.45);
        }

        .screen-locked-game-btn:active {
          transform: translateY(-1px) scale(0.95);
          box-shadow: 0 6px 16px rgba(255, 204, 51, 0.35);
        }

        .screen-locked-game-btn:focus-visible {
          outline: 2px solid #ffcc33;
          outline-offset: 4px;
        }

        .screen-locked-game-btn svg {
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .screen-locked-game-btn {
            bottom: calc(1rem + env(safe-area-inset-bottom));
            left: calc(1rem + env(safe-area-inset-left));
            width: 48px;
            height: 48px;
          }
        }
      `}</style>
    </>,
    document.body,
  );
}
