"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Trophy, RotateCcw, Gamepad2 } from "lucide-react";
import { NavBar } from "../components/nav-bar";
import { useLanguage } from "../context/LanguageContext";

// Lucide SVG Bomb string converted to Data-URI for direct Canvas rendering
const LUCIDE_BOMB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="%23ff4d4d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9" fill="%232a0808"/><path d="M14.35 9.65 18 6"/><path d="m17 3 1 1" stroke="%23ffcc33"/><path d="m20 6 1 1" stroke="%23ffcc33"/></svg>`;
const BOMB_DATA_URI = `data:image/svg+xml;charset=utf-8,${LUCIDE_BOMB_SVG}`;

// Multi-language dictionary (ENG / RU / HY)
const content = {
  eng: {
    selectTitle: "Choose Your Mascot",
    selectSubtitle: "Select a character to start the dodge arcade game",
    boy: "Boy",
    girl: "Girl",
    score: "Score",
    highScore: "High Score",
    gameOver: "Game Over",
    hitByBomb: "You got hit by a bomb!",
    playAgain: "Play Again",
    changeCharacter: "Change Character",
    controlsHint: "Use Left / Right Arrow keys or A / D to dodge bombs",
    mobileTouchLeft: "◄ LEFT",
    mobileTouchRight: "RIGHT ►",
    cameraPower: "CAMERA FLASH: Bombs Cleared!",
    ipadPower: "TABLET SHIELD: Invincible!",
    level: "Level",
    levelUp: "LEVEL UP!",
  },
  ru: {
    selectTitle: "Выберите персонажа",
    selectSubtitle: "Выберите талисмана для начала игры",
    boy: "Мальчик",
    girl: "Девочка",
    score: "Счет",
    highScore: "Рекорд",
    gameOver: "Игра окончена",
    hitByBomb: "В вас попала бомба!",
    playAgain: "Играть снова",
    changeCharacter: "Сменить персонажа",
    controlsHint: "Используйте стрелки Влево / Вправо или A / D для уклонения",
    mobileTouchLeft: "◄ ВЛЕВО",
    mobileTouchRight: "ВПРАВО ►",
    cameraPower: "ВСПЫШКА: Бомбы уничтожены!",
    ipadPower: "ПЛАНШЕТ: Щит активирован!",
    level: "Уровень",
    levelUp: "НОВЫЙ УРОВЕНЬ!",
  },
  arm: {
    selectTitle: "Ընտրեք Ձեր Կերպարը",
    selectSubtitle: "Ընտրեք թալիսմանին խաղը սկսելու համար",
    boy: "Տղա",
    girl: "Աղջիկ",
    score: "Միավորներ",
    highScore: "Ռեկորդ",
    gameOver: "Խաղն Ավարտվեց",
    hitByBomb: "Ռումբը դիպավ ձեզ:",
    playAgain: "Խաղալ Կրկին",
    changeCharacter: "Փոխել Կերպարը",
    controlsHint: "Օգտագործեք Ձախ / աջ սլաքները կամ A / D ստեղները",
    mobileTouchLeft: "◄ ՁԱԽ",
    mobileTouchRight: "ԱՋ ►",
    cameraPower: "ՖՈՏՈԽՑԻԿ. Ռումբերը վերացվեցին:",
    ipadPower: "ՊԼԱՆՇԵՏ. Վահանն ակտիվ է:",
    level: "Մակարդակ",
    levelUp: "ՆՈՐ ՄԱԿԱՐԴԱԿ!",
  },
};

const ASSET_PATHS = {
  boy: "/mascot/boy.png",
  boy_left: "/mascot/boy_left.png",
  boy_right: "/mascot/boy_right.png",
  boy_camera: "/mascot/boy_camera.png",
  boy_ipad: "/mascot/boy_ipad.png",
  girl: "/mascot/girl.png",
  girl_left: "/mascot/girl_left.png",
  girl_right: "/mascot/girl_right.png",
  girl_camera: "/mascot/girl_camera.png",
  girl_ipad: "/mascot/girl_ipad.png",
  camera: "/mascot/camera.png",
  tablet: "/mascot/tablet.png",
  bomb: BOMB_DATA_URI,
};

const HIGH_SCORE_KEY = "mascot-arcade-highscore";

// Score thresholds at which the game ramps up in difficulty.
// Index 0 = Level 1 (score 0), index 1 = Level 2 (score 150), etc.
const LEVEL_THRESHOLDS = [0, 150, 350, 600, 900, 1300, 1800, 2400, 3200, 4200];

// Number of horizontal "lanes" bombs can spawn in. Used to guarantee at
// least one safe gap exists even when multiple bombs fall at once.
const LANE_COUNT = 5;

const getLevelForScore = (score) => {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (score >= LEVEL_THRESHOLDS[i]) level = i + 1;
  }
  return level;
};

// Derives all tunable difficulty parameters from the current level.
// Everything scales gradually and is clamped so the game stays winnable
// (there is always at least one open lane to dodge through).
const getDifficultyParams = (level) => {
  const spawnInterval = Math.max(14, 38 - (level - 1) * 2.6);
  const bombSpeedMin = 3.4 + (level - 1) * 0.32;
  const bombSpeedMax = bombSpeedMin + 2.1 + (level - 1) * 0.18;
  // How many bomb lanes can be filled at once in a single wave.
  // Always leaves at least one of LANE_COUNT lanes free.
  const maxSimultaneousBombs = Math.min(
    LANE_COUNT - 1,
    1 + Math.floor((level - 1) / 2),
  );
  // Chance each "extra" bomb slot (beyond the first) actually gets used.
  const extraBombChance = Math.min(0.75, 0.25 + (level - 1) * 0.08);

  return {
    spawnInterval,
    bombSpeedMin,
    bombSpeedMax,
    maxSimultaneousBombs,
    extraBombChance,
  };
};

// Aspect-ratio preserving renderer grounded to bottom center
const drawAspectFitImage = (ctx, img, boxX, boxY, boxW, boxH) => {
  if (!img || !img.naturalWidth || !img.naturalHeight) return;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = boxW / boxH;

  let renderW = boxW;
  let renderH = boxH;

  if (imgRatio > boxRatio) {
    renderH = boxW / imgRatio;
  } else {
    renderW = boxH * imgRatio;
  }

  const drawX = boxX + (boxW - renderW) / 2;
  const drawY = boxY + (boxH - renderH); // Grounded bottom

  ctx.drawImage(img, drawX, drawY, renderW, renderH);
};

export default function MascotGamePage() {
  const [gameState, setGameState] = useState("SELECT"); // 'SELECT' | 'PLAYING' | 'GAMEOVER'
  const [character, setCharacter] = useState("boy"); // 'boy' | 'girl'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { lang } = useLanguage();

  const t = content[lang] || content.eng;

  // Load persisted high score once
  useEffect(() => {
    try {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setHighScore(parsed);
        }
      }
    } catch {
      // localStorage unavailable – ignore
    }
  }, []);

  const handleSelectCharacter = (selected) => {
    setCharacter(selected);
    setGameState("PLAYING");
  };

  const handleGameOver = useCallback((finalScore) => {
    setScore(finalScore);
    setHighScore((prev) => {
      const next = Math.max(prev, finalScore);
      try {
        localStorage.setItem(HIGH_SCORE_KEY, String(next));
      } catch {
        // ignore
      }
      return next;
    });
    setGameState("GAMEOVER");
  }, []);

  return (
    <div className="game-page-container">
      <NavBar />
      <div className="game-wrapper">
        {gameState === "SELECT" && (
          <div className="selection-card">
            <div className="header-icon mb-4">
              <Gamepad2 size={32} />
            </div>
            <h1 className="card-title mb-2">{t.selectTitle}</h1>
            <p className="card-subtitle mb-8">{t.selectSubtitle}</p>

            <div className="mascot-grid mb-8">
              <button
                onClick={() => handleSelectCharacter("boy")}
                className="mascot-option"
              >
                <div className="mascot-avatar">
                  <Image
                    src={ASSET_PATHS.boy}
                    alt="Boy Mascot"
                    fill
                    sizes="(max-width: 480px) 80px, 110px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <span className="mascot-name">{t.boy}</span>
              </button>

              <button
                onClick={() => handleSelectCharacter("girl")}
                className="mascot-option"
              >
                <div className="mascot-avatar">
                  <Image
                    src={ASSET_PATHS.girl}
                    alt="Girl Mascot"
                    fill
                    sizes="(max-width: 480px) 80px, 110px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <span className="mascot-name">{t.girl}</span>
              </button>
            </div>
          </div>
        )}

        {gameState === "PLAYING" && (
          <ArcadeCanvasEngine
            character={character}
            highScore={highScore}
            t={t}
            onGameOver={handleGameOver}
          />
        )}

        {gameState === "GAMEOVER" && (
          <div className="gameover-card">
            <h2 className="gameover-title mb-2">{t.gameOver}</h2>
            <p className="gameover-subtitle mb-6">{t.hitByBomb}</p>

            <div className="score-summary mb-8">
              <div className="score-box">
                <span className="score-label">{t.score}</span>
                <span className="score-value">{score}</span>
              </div>
              <div className="score-box highlight">
                <span className="score-label">{t.highScore}</span>
                <span className="score-value">{highScore}</span>
              </div>
            </div>

            <div className="action-buttons">
              <button
                onClick={() => setGameState("PLAYING")}
                className="primary-btn"
              >
                <RotateCcw size={20} />
                <span>{t.playAgain}</span>
              </button>

              <button
                onClick={() => setGameState("SELECT")}
                className="secondary-btn"
              >
                <span>{t.changeCharacter}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        :root {
          --game-bg: #1c1d1e;
          --game-panel: #3a3b3c;
          --game-panel-alt: #46474a;
          --game-panel-canvas: #232425;
          --game-border: #55565a;
          --game-text: #f1f1f1;
          --game-text-muted: #9a9b9d;
          --game-accent: #ffcc33;
          --game-accent-strong: #e6b800;
          --game-danger: #ff4d4d;
        }
      `}</style>

      <style jsx>{`
        .game-page-container {
          /* 100vh alone leaves a gap on mobile browsers whose address bar
             shrinks/grows the viewport; 100dvh (dynamic viewport height)
             fixes that where supported, with 100vh as the fallback for
             browsers that don't understand dvh yet. */
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1rem 3rem 1rem;
          background: var(--game-bg);
          color: var(--game-text);
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-sizing: border-box;
        }

        .game-wrapper {
          max-width: 860px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .top-nav-bar {
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1rem;
        }

        .lang-switcher {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: var(--game-panel);
          border: 1px solid var(--game-border);
          padding: 4px 8px;
          border-radius: 12px;
        }

        .lang-icon {
          color: var(--game-accent);
          margin-right: 4px;
        }

        .lang-btn {
          background: transparent;
          border: none;
          color: var(--game-text-muted);
          font-size: 0.8rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .lang-btn:hover {
          color: var(--game-text);
        }

        .lang-btn.active {
          background: var(--game-accent);
          color: var(--game-panel);
        }

        .selection-card,
        .gameover-card {
          width: 100%;
          max-width: 480px;
          background: var(--game-panel);
          border: 1px solid var(--game-border);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
        }

        .header-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto;
          background: rgba(255, 204, 51, 0.12);
          color: var(--game-accent);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .card-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--game-text);
        }

        .card-subtitle,
        .gameover-subtitle {
          font-size: 0.95rem;
          color: var(--game-text-muted);
        }

        .mascot-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .mascot-option {
          background: var(--game-panel-alt);
          border: 1px solid var(--game-border);
          border-radius: 16px;
          padding: 1.5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          cursor: pointer;
          transition: all 0.2s ease;
          min-width: 0;
        }

        .mascot-option:hover {
          transform: translateY(-4px);
          border-color: var(--game-accent);
          background: #4f5053;
          box-shadow: 0 8px 24px rgba(255, 204, 51, 0.15);
        }

        .mascot-option:focus-visible {
          outline: 2px solid var(--game-accent);
          outline-offset: 2px;
        }

        /*
          Fixed-size, overflow-hidden avatar box.
          The Image inside now uses "fill" + objectFit:contain, so no matter
          the source image's natural aspect ratio it is always constrained
          to this box and can never spill down onto the label text below it.
        */
        .mascot-avatar {
          position: relative;
          width: 110px;
          height: 110px;
          margin-bottom: 0.75rem;
          overflow: hidden;
          flex-shrink: 0;
        }

        .mascot-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--game-accent);
          line-height: 1.3;
        }

        .gameover-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--game-danger);
        }

        .score-summary {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .score-box {
          background: var(--game-panel-alt);
          border: 1px solid var(--game-border);
          border-radius: 14px;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }

        .score-box.highlight {
          border-color: rgba(255, 204, 51, 0.4);
          background: rgba(255, 204, 51, 0.05);
        }

        .score-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--game-text-muted);
          font-weight: 600;
        }

        .score-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--game-accent);
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 700;
          color: var(--game-panel);
          background: linear-gradient(
            135deg,
            var(--game-accent) 0%,
            var(--game-accent-strong) 100%
          );
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 6px 20px rgba(255, 204, 51, 0.25);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(255, 204, 51, 0.4);
        }

        .primary-btn:focus-visible,
        .secondary-btn:focus-visible {
          outline: 2px solid var(--game-accent);
          outline-offset: 2px;
        }

        .secondary-btn {
          padding: 0.8rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--game-text-muted);
          background: transparent;
          border: 1px solid var(--game-border);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .secondary-btn:hover {
          color: var(--game-text);
          border-color: #6a6b70;
          background: rgba(255, 255, 255, 0.03);
        }

        .mb-2 {
          margin-bottom: 0.5rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }

        /* ---------- Mobile responsiveness ---------- */
        @media (max-width: 640px) {
          .game-page-container {
            padding: 4.5rem 0.75rem 2rem 0.75rem;
          }

          .selection-card,
          .gameover-card {
            padding: 1.75rem 1.25rem;
            border-radius: 16px;
          }

          .card-title {
            font-size: 1.4rem;
          }

          .card-subtitle,
          .gameover-subtitle {
            font-size: 0.85rem;
          }

          .mascot-grid {
            gap: 0.85rem;
          }

          .mascot-option {
            padding: 1rem 0.5rem;
          }

          .mascot-avatar {
            width: 80px;
            height: 80px;
            margin-bottom: 0.5rem;
          }

          .mascot-name {
            font-size: 0.95rem;
          }

          .gameover-title {
            font-size: 1.5rem;
          }

          .score-value {
            font-size: 1.4rem;
          }

          .action-buttons {
            gap: 0.6rem;
          }

          .primary-btn,
          .secondary-btn {
            padding: 0.8rem 1.25rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 380px) {
          .mascot-grid {
            gap: 0.6rem;
          }

          .mascot-avatar {
            width: 64px;
            height: 64px;
          }

          .score-summary {
            gap: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
}

// Arcade Canvas Engine Component
function ArcadeCanvasEngine({ character, highScore, t, onGameOver }) {
  const canvasRef = useRef(null);
  const loadedImagesRef = useRef({});
  const [currentScore, setCurrentScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activeBanner, setActiveBanner] = useState(null);
  const [levelBanner, setLevelBanner] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const touchStateRef = useRef({ left: false, right: false });

  // Stable refs so the game loop does not restart on every parent render
  const onGameOverRef = useRef(onGameOver);
  const tRef = useRef(t);

  useEffect(() => {
    onGameOverRef.current = onGameOver;
  }, [onGameOver]);

  useEffect(() => {
    tRef.current = t;
  }, [t]);

  // 1. Asset Preloader Effect
  useEffect(() => {
    let isSubscribed = true;

    const preloadAssets = async () => {
      const promises = Object.entries(ASSET_PATHS).map(([key, src]) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = src;
          img.onload = () => {
            loadedImagesRef.current[key] = img;
            resolve();
          };
          img.onerror = () => resolve();
        });
      });
      await Promise.all(promises);

      if (isSubscribed) {
        setIsReady(true);
      }
    };

    preloadAssets();

    return () => {
      isSubscribed = false;
    };
  }, []);

  // 2. Engine Loop Effect
  useEffect(() => {
    if (!isReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;
    let isRunning = true;

    const keys = {
      ArrowLeft: false,
      ArrowRight: false,
      KeyA: false,
      KeyD: false,
    };

    const handleKeyDown = (e) => {
      if (e.code in keys) {
        e.preventDefault();
        keys[e.code] = true;
      }
    };
    const handleKeyUp = (e) => {
      if (e.code in keys) {
        e.preventDefault();
        keys[e.code] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });
    window.addEventListener("keyup", handleKeyUp, { passive: false });

    // Fallback rounded mascot sprite if asset is missing
    const drawFallbackSprite = (c, x, y, w, h, color) => {
      const r = Math.min(10, w / 4, h / 4);
      c.save();
      c.fillStyle = color;
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
      c.fill();
      c.restore();
    };

    const player = {
      x: canvas.width / 2 - 36,
      y: canvas.height - 90,
      width: 72,
      height: 72,
      speed: 7,
      direction: "idle",
      powerUp: null, // null | 'camera' | 'ipad'
      powerUpTimer: 0,
      flashTimer: 0,
    };

    let items = [];
    let scoreCounter = 0;
    let frame = 0;
    let level = 1;
    let levelBannerTimer = 0;

    // Recomputes the difficulty level from the current score, and if it just
    // increased, briefly flashes a "LEVEL UP!" banner.
    const refreshLevel = () => {
      const nextLevel = getLevelForScore(scoreCounter);
      if (nextLevel !== level) {
        level = nextLevel;
        setCurrentLevel(level);
        setLevelBanner(`${tRef.current.levelUp} ${level}`);
        levelBannerTimer = 110;
      }
    };

    const runLoop = () => {
      if (!isRunning) return;

      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Background Grid
      ctx.fillStyle = "#232425";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#2f3032";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // 2. Player Movement
      const moveLeft =
        keys.ArrowLeft || keys.KeyA || touchStateRef.current.left;
      const moveRight =
        keys.ArrowRight || keys.KeyD || touchStateRef.current.right;

      if (moveLeft) {
        player.x -= player.speed;
        player.direction = "left";
      } else if (moveRight) {
        player.x += player.speed;
        player.direction = "right";
      } else {
        player.direction = "idle";
      }

      player.x = Math.max(
        10,
        Math.min(canvas.width - player.width - 10, player.x),
      );

      // 3. Banner Timers (level-up flash + active power-up)
      if (levelBannerTimer > 0) {
        levelBannerTimer--;
        if (levelBannerTimer <= 0) {
          setLevelBanner(null);
        }
      }

      if (player.powerUp) {
        player.powerUpTimer--;
        if (player.powerUpTimer <= 0) {
          player.powerUp = null;
          setActiveBanner(null);
        }
      }

      // 4. Resolve Active Sprite Image & Render with Preserved Aspect Ratio
      let spriteKey = character;
      if (player.powerUp === "camera") {
        spriteKey = `${character}_camera`;
      } else if (player.powerUp === "ipad") {
        spriteKey = `${character}_ipad`;
      } else if (player.direction === "left") {
        spriteKey = `${character}_left`;
      } else if (player.direction === "right") {
        spriteKey = `${character}_right`;
      }

      const mascotImg =
        loadedImagesRef.current[spriteKey] ||
        loadedImagesRef.current[character];

      if (mascotImg) {
        drawAspectFitImage(
          ctx,
          mascotImg,
          player.x,
          player.y,
          player.width,
          player.height,
        );
      } else {
        drawFallbackSprite(
          ctx,
          player.x,
          player.y,
          player.width,
          player.height,
          "#ffcc33",
        );
      }

      // Tablet Shield Outer Glow
      if (player.powerUp === "ipad") {
        ctx.strokeStyle = "#ffcc33";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(
          player.x + player.width / 2,
          player.y + player.height / 2,
          player.width / 1.8,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }

      // 5. Item Spawner — difficulty ramps up with score.
      // Bombs spawn in "waves" across a fixed number of lanes so multiple
      // bombs can fall together at higher levels, while always guaranteeing
      // at least one lane stays open to dodge through.
      refreshLevel();
      const {
        spawnInterval,
        bombSpeedMin,
        bombSpeedMax,
        maxSimultaneousBombs,
        extraBombChance,
      } = getDifficultyParams(level);

      if (frame % Math.round(spawnInterval) === 0) {
        const laneMargin = 10;
        const laneWidth = (canvas.width - laneMargin * 2) / LANE_COUNT;
        const laneIndices = Array.from({ length: LANE_COUNT }, (_, i) => i);

        // Shuffle lanes so bomb placement isn't predictable.
        for (let i = laneIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [laneIndices[i], laneIndices[j]] = [laneIndices[j], laneIndices[i]];
        }

        // Decide how many bombs fall in this wave (always leaves >=1 lane free).
        let bombCount = 1;
        while (
          bombCount < maxSimultaneousBombs &&
          Math.random() < extraBombChance
        ) {
          bombCount++;
        }

        const bombLanes = laneIndices.slice(0, bombCount);
        bombLanes.forEach((laneIndex) => {
          const jitter = Math.random() * (laneWidth - 40);
          items.push({
            x: laneMargin + laneIndex * laneWidth + jitter,
            y: -40,
            width: 36,
            height: 36,
            type: "bomb",
            speed: bombSpeedMin + Math.random() * (bombSpeedMax - bombSpeedMin),
          });
        });

        // Power-ups spawn independently in a lane that stayed empty this
        // wave, so they never appear stacked on top of a bomb. They get
        // slightly rarer at higher levels to keep the challenge climbing.
        const powerUpChance = Math.max(0.06, 0.16 - (level - 1) * 0.01);
        const openLanes = laneIndices.slice(bombCount);
        if (openLanes.length > 0 && Math.random() < powerUpChance) {
          const laneIndex = openLanes[0];
          const jitter = Math.random() * (laneWidth - 40);
          const type = Math.random() < 0.55 ? "camera" : "tablet";
          items.push({
            x: laneMargin + laneIndex * laneWidth + jitter,
            y: -40,
            width: 36,
            height: 36,
            type,
            speed: 3.0,
          });
        }
      }

      // 6. Update Items & Collision Detection
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.y += item.speed;

        const itemImg = loadedImagesRef.current[item.type];
        if (itemImg) {
          drawAspectFitImage(
            ctx,
            itemImg,
            item.x,
            item.y,
            item.width,
            item.height,
          );
        } else {
          drawFallbackSprite(
            ctx,
            item.x,
            item.y,
            item.width,
            item.height,
            item.type === "tablet"
              ? "#ffcc33"
              : item.type === "camera"
                ? "#e6b800"
                : "#ff4d4d",
          );
        }

        const hitPadding = 8;
        const isColliding =
          player.x + hitPadding < item.x + item.width &&
          player.x + player.width - hitPadding > item.x &&
          player.y + hitPadding < item.y + item.height &&
          player.y + player.height - hitPadding > item.y;

        if (isColliding) {
          if (item.type === "bomb") {
            if (player.powerUp === "ipad") {
              items.splice(i, 1);
              scoreCounter += 25;
              setCurrentScore(scoreCounter);
              continue;
            } else {
              isRunning = false;
              onGameOverRef.current(scoreCounter);
              return;
            }
          } else if (item.type === "camera") {
            player.powerUp = "camera";
            player.powerUpTimer = 300;
            player.flashTimer = 10;
            items = items.filter((it) => it.type !== "bomb");
            scoreCounter += 150;
            setCurrentScore(scoreCounter);
            setActiveBanner(tRef.current.cameraPower);
            items.splice(i, 1);
            continue;
          } else if (item.type === "tablet") {
            player.powerUp = "ipad";
            player.powerUpTimer = 360;
            scoreCounter += 100;
            setCurrentScore(scoreCounter);
            setActiveBanner(tRef.current.ipadPower);
            items.splice(i, 1);
            continue;
          }
        }

        if (item.y > canvas.height + 20) {
          if (item.type === "bomb") {
            scoreCounter += 10;
            setCurrentScore(scoreCounter);
          }
          items.splice(i, 1);
        }
      }

      if (player.flashTimer > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${player.flashTimer / 10})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        player.flashTimer--;
      }

      animId = requestAnimationFrame(runLoop);
    };

    animId = requestAnimationFrame(runLoop);

    return () => {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isReady, character]);

  const releaseTouch = (side) => {
    touchStateRef.current[side] = false;
  };

  return (
    <div className="canvas-wrapper">
      <div className="hud-bar">
        <div className="hud-metric">
          <span className="hud-label">{t.score}</span>
          <span className="hud-value">{currentScore}</span>
        </div>

        <div className="hud-metric align-center">
          <span className="hud-label">{t.level}</span>
          <span className="hud-value text-accent">{currentLevel}</span>
        </div>

        {(levelBanner || activeBanner) && (
          <div className="banner-stack">
            {levelBanner && (
              <div className="powerup-banner level-banner">{levelBanner}</div>
            )}
            {activeBanner && (
              <div className="powerup-banner">{activeBanner}</div>
            )}
          </div>
        )}

        <div className="hud-metric align-right">
          <span className="hud-label flex-align">
            <Trophy size={14} className="mr-1" /> {t.highScore}
          </span>
          <span className="hud-value text-accent">{highScore}</span>
        </div>
      </div>

      {!isReady ? (
        <div className="canvas-skeleton">Loading Mascot Assets...</div>
      ) : (
        <canvas
          ref={canvasRef}
          width={760}
          height={460}
          className="arcade-canvas"
        />
      )}

      <div className="touch-controls">
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            touchStateRef.current.left = true;
          }}
          onTouchEnd={() => releaseTouch("left")}
          onTouchCancel={() => releaseTouch("left")}
          onMouseDown={() => (touchStateRef.current.left = true)}
          onMouseUp={() => releaseTouch("left")}
          onMouseLeave={() => releaseTouch("left")}
          className="touch-btn"
        >
          {t.mobileTouchLeft}
        </button>
        <button
          onTouchStart={(e) => {
            e.preventDefault();
            touchStateRef.current.right = true;
          }}
          onTouchEnd={() => releaseTouch("right")}
          onTouchCancel={() => releaseTouch("right")}
          onMouseDown={() => (touchStateRef.current.right = true)}
          onMouseUp={() => releaseTouch("right")}
          onMouseLeave={() => releaseTouch("right")}
          className="touch-btn"
        >
          {t.mobileTouchRight}
        </button>
      </div>

      <p className="controls-hint">{t.controlsHint}</p>

      <style jsx>{`
        .canvas-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .hud-bar {
          width: 100%;
          max-width: 760px;
          background: var(--game-panel);
          border: 1px solid var(--game-border);
          border-radius: 14px 14px 0 0;
          padding: 0.85rem 1.25rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          box-sizing: border-box;
        }

        .hud-metric {
          display: flex;
          flex-direction: column;
        }

        .align-right {
          align-items: flex-end;
        }

        .align-center {
          align-items: center;
        }

        .banner-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .level-banner {
          animation: none;
          background: rgba(255, 77, 77, 0.12);
          border-color: var(--game-danger);
          color: var(--game-danger);
        }

        .flex-align {
          display: inline-flex;
          align-items: center;
        }

        .hud-label {
          font-size: 0.75rem;
          color: var(--game-text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .hud-value {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--game-text);
        }

        .text-accent {
          color: var(--game-accent);
        }

        .mr-1 {
          margin-right: 4px;
        }

        .powerup-banner {
          background: rgba(255, 204, 51, 0.15);
          border: 1px solid var(--game-accent);
          color: var(--game-accent);
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          animation: pulse 1.5s infinite ease-in-out;
          white-space: nowrap;
        }

        .canvas-skeleton {
          width: 100%;
          max-width: 760px;
          height: 460px;
          background: var(--game-panel-canvas);
          border: 1px solid var(--game-border);
          border-top: none;
          border-radius: 0 0 14px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--game-text-muted);
          box-sizing: border-box;
        }

        .arcade-canvas {
          display: block;
          width: 100%;
          max-width: 760px;
          height: auto;
          background: var(--game-panel-canvas);
          border: 1px solid var(--game-border);
          border-top: none;
          border-radius: 0 0 14px 14px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .touch-controls {
          display: none;
          width: 100%;
          max-width: 760px;
          gap: 1rem;
          margin-top: 1rem;
          box-sizing: border-box;
        }

        .touch-btn {
          flex: 1;
          padding: 1rem;
          background: var(--game-panel-alt);
          border: 1px solid var(--game-border);
          color: var(--game-accent);
          font-weight: 800;
          font-size: 1.1rem;
          border-radius: 12px;
          user-select: none;
          touch-action: manipulation;
        }

        .touch-btn:active {
          background: var(--game-accent);
          color: var(--game-panel);
        }

        .touch-btn:focus-visible {
          outline: 2px solid var(--game-accent);
          outline-offset: 2px;
        }

        .controls-hint {
          margin-top: 1rem;
          font-size: 0.85rem;
          color: var(--game-text-muted);
          text-align: center;
          padding: 0 0.5rem;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .touch-controls {
            display: flex;
          }
        }

        @media (max-width: 640px) {
          .hud-bar {
            padding: 0.65rem 0.85rem;
            border-radius: 12px 12px 0 0;
          }

          .hud-value {
            font-size: 1.15rem;
          }

          .banner-stack {
            order: 3;
            flex-basis: 100%;
          }

          .powerup-banner {
            text-align: center;
            font-size: 0.75rem;
          }

          .canvas-skeleton,
          .arcade-canvas {
            border-radius: 0 0 12px 12px;
          }

          .touch-btn {
            padding: 0.85rem;
            font-size: 1rem;
          }

          .controls-hint {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
