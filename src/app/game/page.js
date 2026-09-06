"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  Trophy,
  RotateCcw,
  Gamepad2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Gift,
  Percent,
  Sparkles,
  Camera,
} from "lucide-react";
import { NavBar } from "../components/nav-bar";
import { useLanguage } from "../context/LanguageContext";

// Lucide SVG Bomb string converted to Data-URI for direct Canvas rendering
const LUCIDE_BOMB_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="%23ff4d4d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="13" r="9" fill="%232a0808"/><path d="M14.35 9.65 18 6"/><path d="m17 3 1 1" stroke="%23ffcc33"/><path d="m20 6 1 1" stroke="%23ffcc33"/></svg>`;
const BOMB_DATA_URI = `data:image/svg+xml;charset=utf-8,${LUCIDE_BOMB_SVG}`;

const INSTAGRAM_URL = "https://www.instagram.com/large.art.studio/";

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
    enterNameLabel: "Enter your name to play",
    namePlaceholder: "Your name",
    nameTooShort: "Name must be at least 2 characters",
    nameRequiredHint: "Enter your name to choose a mascot",
    savingScore: "Saving your score...",
    scoreSaveError: "Couldn't save your score.",
    retry: "Retry",
    topScores: "Top 10 Scores",
    you: "You",
    noScoresYet: "No scores yet — be the first!",
    rewardsTitle: "Score Rewards",
    rewardsSubtitle: "Hit these milestones to unlock real prizes from the shop",
    reward5kLabel: "5,000 pts",
    reward5kPrize: "Toy",
    reward10kLabel: "10,000 pts",
    reward10kPrize: "10% Off Stationery",
    reward15kLabel: "15,000 pts",
    reward15kPrize: "Special Shop Gift",
    rulesTitle: "Rules to claim your prize",
    rule1: "Follow us on Instagram",
    rule2: "Reach the milestone score for your prize tier",
    rule3: "Screenshot your score the moment you reach it",
    rule4: "Bring the screenshot, plus your Instagram follow, to the shop",
    followInstagram: "Follow @large.art.studio",
    milestoneReachedPrefix: "You unlocked:",
    milestoneHint:
      "Screenshot this screen now and bring it to the shop with your Instagram follow to claim your prize.",
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
    enterNameLabel: "Введите имя, чтобы начать игру",
    namePlaceholder: "Ваше имя",
    nameTooShort: "Имя должно быть не короче 2 символов",
    nameRequiredHint: "Введите имя, чтобы выбрать персонажа",
    savingScore: "Сохраняем ваш результат...",
    scoreSaveError: "Не удалось сохранить результат.",
    retry: "Повторить",
    topScores: "Топ 10 результатов",
    you: "Вы",
    noScoresYet: "Пока нет результатов — будьте первым!",
    rewardsTitle: "Награды за очки",
    rewardsSubtitle:
      "Достигните этих отметок, чтобы получить настоящие призы от магазина",
    reward5kLabel: "5 000 очков",
    reward5kPrize: "Игрушка",
    reward10kLabel: "10 000 очков",
    reward10kPrize: "Скидка 10% на канцтовары",
    reward15kLabel: "15 000 очков",
    reward15kPrize: "Особый подарок от магазина",
    rulesTitle: "Правила получения приза",
    rule1: "Подпишитесь на нас в Instagram",
    rule2: "Наберите нужное количество очков для своего уровня приза",
    rule3: "Сделайте скриншот экрана сразу после достижения результата",
    rule4: "Принесите скриншот и подтверждение подписки в Instagram в магазин",
    followInstagram: "Подписаться на @large.art.studio",
    milestoneReachedPrefix: "Вы открыли приз:",
    milestoneHint:
      "Сделайте скриншот этого экрана и принесите его в магазин вместе с подпиской в Instagram, чтобы получить приз.",
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
    enterNameLabel: "Մուտքագրեք Ձեր անունը՝ խաղը սկսելու համար",
    namePlaceholder: "Ձեր անունը",
    nameTooShort: "Անունը պետք է լինի առնվազն 2 նիշ",
    nameRequiredHint: "Մուտքագրեք Ձեր անունը՝ կերպար ընտրելու համար",
    savingScore: "Պահպանվում է Ձեր արդյունքը...",
    scoreSaveError: "Չհաջողվեց պահպանել արդյունքը:",
    retry: "Կրկին փորձել",
    topScores: "Լավագույն 10 արդյունքները",
    you: "Դուք",
    noScoresYet: "Դեռ արդյունքներ չկան․ եղեք առաջինը!",
    rewardsTitle: "Միավորների Մրցանակներ",
    rewardsSubtitle:
      "Հասեք այս շեմերին՝ խանութից իրական նվերներ ստանալու համար",
    reward5kLabel: "5,000 միավոր",
    reward5kPrize: "Խաղալիք",
    reward10kLabel: "10,000 միավոր",
    reward10kPrize: "10% զեղչ գրենական պիտույքների վրա",
    reward15kLabel: "15,000 միավոր",
    reward15kPrize: "Հատուկ նվեր խանութից",
    rulesTitle: "Կանոններ՝ նվերը ստանալու համար",
    rule1: "Հետևեք մեզ Instagram-ում",
    rule2: "Հասեք ձեր մրցանակային մակարդակի համապատասխան միավորին",
    rule3: "Անմիջապես սքրինշոթ արեք Ձեր արդյունքը",
    rule4: "Բերեք սքրինշոթը և Ձեր Instagram հետևանքը խանութ",
    followInstagram: "Հետևել @large.art.studio-ին",
    milestoneReachedPrefix: "Դուք բացեցիք՝",
    milestoneHint:
      "Անմիջապես սքրինշոթ արեք այս էկրանը և բերեք խանութ Ձեր Instagram հետևանքի հետ միասին՝ նվերը ստանալու համար։",
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
const PLAYER_NAME_KEY = "mascot-arcade-playername";

// Score thresholds at which the game ramps up in difficulty.
// Spread across 16 levels (rather than 10) so the climb to a 15,000-point
// run stays gradual: comfortable early on, genuinely demanding by the end,
// but never a wall. Level 16 (14,250+) is the difficulty ceiling — beyond
// that, difficulty stops increasing so the game stays survivable at length.
const LEVEL_THRESHOLDS = [
  0, 250, 600, 1050, 1600, 2250, 3000, 3850, 4800, 5850, 7000, 8250, 9600,
  11050, 12600, 14250,
];

// Score milestones that unlock real shop prizes. Checked against a run's
// final score on the game-over screen (highest tier reached wins).
const REWARD_TIERS = [
  { threshold: 15000, prizeKey: "reward15kPrize" },
  { threshold: 10000, prizeKey: "reward10kPrize" },
  { threshold: 5000, prizeKey: "reward5kPrize" },
];

// Same tiers, ascending — used during gameplay to detect the moment a
// threshold is first crossed (walking the array bottom-up as the score
// climbs), separately from the game-over screen's "which is the best tier
// reached" lookup above.
const REWARD_TIERS_ASC = [...REWARD_TIERS].sort(
  (a, b) => a.threshold - b.threshold,
);

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
// Ramps more slowly than a typical bullet-hell curve: the first several
// levels stay comfortable, and the difficulty only tightens up seriously
// in the back half of a run. The ceiling (reached near level 16, ~14k
// score) is kept fair on purpose — at most 3 of the 5 lanes ever fill at
// once, so there is always real room to dodge if the player is paying
// attention. This is what makes 15k reachable without being trivial: a
// full, focused run is required, but a single well-timed dodge is never
// impossible.
//
// `isMobile` eases all of this further. At the same score, mobile is
// harder than desktop for two reasons that have nothing to do with skill:
// the canvas is scaled down by CSS to fit the screen (bombs read smaller
// and are physically harder to track), and tap-and-hold buttons react
// slightly slower than a held keyboard key. Rather than changing the
// scoring curve itself, mobile gets slower bombs, more breathing room
// between spawns, and one fewer simultaneous bomb at the high end.
const getDifficultyParams = (level, isMobile) => {
  const spawnInterval = Math.max(17, 42 - (level - 1) * 1.6);
  const bombSpeedMin = 2.9 + (level - 1) * 0.2;
  const bombSpeedMax = bombSpeedMin + 1.7 + (level - 1) * 0.1;
  // How many bomb lanes can be filled at once in a single wave.
  // Capped at 3 of LANE_COUNT (5) — always at least 2 lanes free.
  const maxSimultaneousBombs = Math.min(3, 1 + Math.floor((level - 1) / 4));
  // Chance each "extra" bomb slot (beyond the first) actually gets used.
  const extraBombChance = Math.min(0.55, 0.15 + (level - 1) * 0.03);

  if (!isMobile) {
    return {
      spawnInterval,
      bombSpeedMin,
      bombSpeedMax,
      maxSimultaneousBombs,
      extraBombChance,
    };
  }

  return {
    spawnInterval: spawnInterval * 1.35,
    bombSpeedMin: bombSpeedMin * 0.78,
    bombSpeedMax: bombSpeedMax * 0.78,
    maxSimultaneousBombs: Math.max(1, maxSimultaneousBombs - 1),
    extraBombChance: extraBombChance * 0.7,
  };
};

// lucide-react removed all brand/trademark icons (Instagram, Facebook, etc.)
// a while back, so there is no <Instagram /> to import — this hand-rolled
// outline glyph is shared by the character-select screen and the
// game-over reward callout instead.
const InstagramGlyph = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

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
  const [playerName, setPlayerName] = useState("");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const { lang } = useLanguage();

  const t = content[lang] || content.eng;

  const trimmedName = playerName.trim();
  const nameIsValid = trimmedName.length >= 2 && trimmedName.length <= 20;

  // Load persisted high score + last-used name once. The name is only a
  // convenience prefill; the player can still change it before playing.
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem(HIGH_SCORE_KEY);
      if (savedScore !== null) {
        const parsed = parseInt(savedScore, 10);
        if (!Number.isNaN(parsed) && parsed >= 0) {
          setHighScore(parsed);
        }
      }
      const savedName = localStorage.getItem(PLAYER_NAME_KEY);
      if (savedName) {
        setPlayerName(savedName);
      }
    } catch {
      // localStorage unavailable – ignore
    }
  }, []);

  const handleSelectCharacter = (selected) => {
    if (!nameIsValid) return;
    try {
      localStorage.setItem(PLAYER_NAME_KEY, trimmedName);
    } catch {
      // ignore
    }
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

            <div className="name-entry mb-8">
              <label htmlFor="player-name" className="name-label">
                {t.enterNameLabel}
              </label>
              <input
                id="player-name"
                className="name-input"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder={t.namePlaceholder}
                minLength={2}
                maxLength={20}
                autoFocus
              />
              {playerName.length > 0 && !nameIsValid && (
                <p className="form-hint">{t.nameTooShort}</p>
              )}
            </div>

            <div
              className={`mascot-grid mb-8${!nameIsValid ? " disabled" : ""}`}
            >
              <button
                onClick={() => handleSelectCharacter("boy")}
                className="mascot-option"
                disabled={!nameIsValid}
                aria-disabled={!nameIsValid}
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
                disabled={!nameIsValid}
                aria-disabled={!nameIsValid}
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

            {!nameIsValid && (
              <p className="name-required-hint mb-8">{t.nameRequiredHint}</p>
            )}

            <div className="rewards-section">
              <h2 className="rewards-title">
                <Gift size={16} />
                {t.rewardsTitle}
              </h2>
              <p className="rewards-subtitle">{t.rewardsSubtitle}</p>

              <div className="rewards-grid">
                <div className="reward-chip">
                  <Gift size={16} className="reward-chip-icon" />
                  <span className="reward-score">{t.reward5kLabel}</span>
                  <span className="reward-prize">{t.reward5kPrize}</span>
                </div>
                <div className="reward-chip">
                  <Percent size={16} className="reward-chip-icon" />
                  <span className="reward-score">{t.reward10kLabel}</span>
                  <span className="reward-prize">{t.reward10kPrize}</span>
                </div>
                <div className="reward-chip reward-chip-top">
                  <Sparkles size={16} className="reward-chip-icon" />
                  <span className="reward-score">{t.reward15kLabel}</span>
                  <span className="reward-prize">{t.reward15kPrize}</span>
                </div>
              </div>

              <details className="rules-details">
                <summary className="rules-summary">
                  <span>{t.rulesTitle}</span>
                  <ChevronDown size={16} className="rules-chevron" />
                </summary>
                <ol className="rules-list">
                  <li>{t.rule1}</li>
                  <li>{t.rule2}</li>
                  <li>{t.rule3}</li>
                  <li>{t.rule4}</li>
                </ol>
              </details>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-btn"
              >
                <InstagramGlyph size={16} />
                <span>{t.followInstagram}</span>
              </a>
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
          <GameOverPanel
            score={score}
            highScore={highScore}
            playerName={trimmedName}
            t={t}
            onPlayAgain={() => setGameState("PLAYING")}
            onChangeCharacter={() => setGameState("SELECT")}
          />
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

        /* Kills the "select text / copy" popup that mobile Safari and
           Chrome show on long-press or drag anywhere in the game — this is
           what was breaking touch controls. The name input is explicitly
           re-enabled below since the player still needs to type into it. */
        .game-page-container,
        .game-page-container * {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .game-page-container input {
          -webkit-touch-callout: default;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
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
          touch-action: manipulation;
        }

        .game-wrapper {
          max-width: 860px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .selection-card {
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

        .card-subtitle {
          font-size: 0.95rem;
          color: var(--game-text-muted);
        }

        /* ---------- Rewards & rules panel ---------- */
        .rewards-section {
          background: var(--game-panel-alt);
          border: 1px solid var(--game-border);
          border-radius: 16px;
          padding: 1.25rem 1.25rem 1.5rem;
          text-align: left;
          box-sizing: border-box;
        }

        .rewards-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 1rem;
          font-weight: 800;
          color: var(--game-text);
          margin: 0 0 0.3rem 0;
        }

        .rewards-title :global(svg) {
          color: var(--game-accent);
          flex-shrink: 0;
        }

        .rewards-subtitle {
          font-size: 0.82rem;
          color: var(--game-text-muted);
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }

        .rewards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.15rem;
        }

        .reward-chip {
          background: var(--game-panel);
          border: 1px solid var(--game-border);
          border-radius: 12px;
          padding: 0.65rem 0.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 0.25rem;
          min-width: 0;
        }

        .reward-chip-icon {
          color: var(--game-text-muted);
          margin-bottom: 0.1rem;
        }

        .reward-chip-top .reward-chip-icon {
          color: var(--game-accent);
        }

        .reward-chip-top {
          border-color: var(--game-accent);
          background: rgba(255, 204, 51, 0.08);
        }

        .reward-score {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--game-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .reward-prize {
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--game-accent);
          line-height: 1.25;
        }

        /* Native <details>/<summary> disclosure — no extra state needed,
           and it keeps the card short until someone actually wants the
           step-by-step instructions. */
        .rules-details {
          margin-bottom: 1.1rem;
          border-top: 1px dashed var(--game-border);
          padding-top: 0.85rem;
        }

        .rules-summary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          list-style: none;
          cursor: pointer;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--game-text);
        }

        .rules-summary::-webkit-details-marker {
          display: none;
        }

        .rules-summary::marker {
          content: "";
        }

        .rules-chevron {
          color: var(--game-text-muted);
          transition: transform 0.2s ease;
          flex-shrink: 0;
        }

        .rules-details[open] .rules-chevron {
          transform: rotate(180deg);
        }

        .rules-list {
          margin: 0.9rem 0 0 0;
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .rules-list li {
          font-size: 0.8rem;
          color: var(--game-text-muted);
          line-height: 1.4;
        }

        .rules-list li::marker {
          color: var(--game-accent);
          font-weight: 700;
        }

        .instagram-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.7rem 1rem;
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          text-decoration: none;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #f9ce34 0%,
            #ee2a7b 55%,
            #6228d7 100%
          );
          box-sizing: border-box;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }

        .instagram-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(238, 42, 123, 0.35);
        }

        .instagram-btn:focus-visible {
          outline: 2px solid var(--game-accent);
          outline-offset: 2px;
        }

        .name-entry {
          text-align: left;
        }

        .name-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--game-text-muted);
          margin-bottom: 0.5rem;
        }

        .name-input {
          width: 100%;
          padding: 0.75rem 0.9rem;
          font-size: 1rem;
          color: var(--game-text);
          background: var(--game-panel-alt);
          border: 1px solid var(--game-border);
          border-radius: 10px;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }

        .name-input:focus {
          outline: none;
          border-color: var(--game-accent);
        }

        .form-hint {
          font-size: 0.78rem;
          color: var(--game-text-muted);
          margin: 0.4rem 0 0 0;
        }

        .name-required-hint {
          font-size: 0.82rem;
          color: var(--game-text-muted);
          margin: -1rem 0 0 0;
        }

        .mascot-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          transition: opacity 0.2s ease;
        }

        .mascot-grid.disabled {
          opacity: 0.5;
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

        .mascot-option:disabled {
          cursor: not-allowed;
        }

        .mascot-option:not(:disabled):hover {
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

        .mb-2 {
          margin-bottom: 0.5rem;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }

        /* ---------- Mobile responsiveness ---------- */
        @media (max-width: 640px) {
          .game-page-container {
            padding: 4.5rem 0.75rem calc(2rem + env(safe-area-inset-bottom))
              0.75rem;
          }

          .selection-card {
            padding: 1.75rem 1.25rem;
            border-radius: 16px;
          }

          .card-title {
            font-size: 1.4rem;
          }

          .card-subtitle {
            font-size: 0.85rem;
          }

          .rewards-section {
            padding: 1rem 1rem 1.25rem;
            border-radius: 14px;
          }

          .rewards-title {
            font-size: 0.92rem;
          }

          .rewards-subtitle {
            font-size: 0.76rem;
          }

          .rewards-grid {
            gap: 0.4rem;
          }

          .reward-chip {
            padding: 0.55rem 0.3rem;
            border-radius: 10px;
          }

          .reward-chip-icon {
            width: 14px;
            height: 14px;
          }

          .reward-score {
            font-size: 0.62rem;
          }

          .reward-prize {
            font-size: 0.74rem;
          }

          .rules-summary {
            font-size: 0.8rem;
          }

          .rules-list {
            padding-left: 1.05rem;
          }

          .rules-list li {
            font-size: 0.75rem;
          }

          .instagram-btn {
            font-size: 0.82rem;
            padding: 0.65rem 0.9rem;
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
        }

        @media (max-width: 380px) {
          .rewards-grid {
            gap: 0.3rem;
          }

          .reward-chip {
            padding: 0.5rem 0.25rem;
          }

          .mascot-grid {
            gap: 0.6rem;
          }

          .mascot-avatar {
            width: 64px;
            height: 64px;
          }
        }
      `}</style>
    </div>
  );
}

// Game Over panel: auto-saves the score under the name the player already
// gave at the start (no extra prompt), then expands in place to reveal the
// top-10 leaderboard from the database once the save completes. Also
// surfaces a reward callout when the run's score cleared a prize tier.
function GameOverPanel({
  score,
  highScore,
  playerName,
  t,
  onPlayAgain,
  onChangeCharacter,
}) {
  const [status, setStatus] = useState("saving"); // 'saving' | 'saved' | 'error'
  const [leaderboard, setLeaderboard] = useState([]);
  const [savedEntryId, setSavedEntryId] = useState(null);
  const hasFiredRef = useRef(false);

  const reachedTier =
    REWARD_TIERS.find((tier) => score >= tier.threshold) || null;

  const submitScore = useCallback(async () => {
    setStatus("saving");
    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, score }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not save your score.");
      }

      setLeaderboard(Array.isArray(data.topScores) ? data.topScores : []);
      setSavedEntryId(data.score?._id ?? null);
      setStatus("saved");
    } catch {
      setStatus("error");
    }
  }, [playerName, score]);

  // Fires once per game-over screen — the ref guard keeps React Strict
  // Mode's double-invoke in dev from saving the same run twice.
  useEffect(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    submitScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSaved = status === "saved";

  return (
    <div className={`gameover-card${isSaved ? " expanded" : ""}`}>
      <h2 className="gameover-title mb-2">{t.gameOver}</h2>
      <p className="gameover-subtitle mb-6">{t.hitByBomb}</p>

      {reachedTier && (
        <div className="reward-earned mb-8">
          <div className="reward-earned-badge">
            <Gift size={20} />
          </div>
          <div className="reward-earned-body">
            <p className="reward-earned-title">
              {t.milestoneReachedPrefix}{" "}
              <span className="reward-earned-prize">
                {t[reachedTier.prizeKey]}
              </span>
            </p>
            <p className="reward-earned-hint">
              <Camera size={13} className="hint-icon" />
              {t.milestoneHint}
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="reward-earned-link"
            >
              <InstagramGlyph size={14} />
              {t.followInstagram}
            </a>
          </div>
        </div>
      )}

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

      {status === "saving" && (
        <div className="save-status mb-8">
          <Loader2 size={18} className="spin" />
          <span>{t.savingScore}</span>
        </div>
      )}

      {status === "error" && (
        <div className="save-status error mb-8">
          <span>{t.scoreSaveError}</span>
          <button className="retry-btn" onClick={submitScore}>
            {t.retry}
          </button>
        </div>
      )}

      {/* Always mounted so it can transition open; collapses to zero
          height until the score has actually been saved. */}
      <div className={`leaderboard-section${isSaved ? " open" : ""}`}>
        <div className="leaderboard-inner">
          <h3 className="leaderboard-title">{t.topScores}</h3>
          {leaderboard.length === 0 ? (
            <p className="empty-board">{t.noScoresYet}</p>
          ) : (
            <ol className="leaderboard-list">
              {leaderboard.map((entry, idx) => {
                const isYou =
                  savedEntryId != null && entry._id === savedEntryId;
                return (
                  <li
                    key={entry._id ?? `${entry.playerName}-${idx}`}
                    className={`leaderboard-row${isYou ? " own-row" : ""}`}
                  >
                    <span className="rank">{idx + 1}</span>
                    <span className="lb-name">
                      {entry.playerName}
                      {isYou && <span className="you-tag">{t.you}</span>}
                    </span>
                    <span className="lb-score">{entry.score}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onPlayAgain} className="primary-btn">
          <RotateCcw size={20} />
          <span>{t.playAgain}</span>
        </button>

        <button onClick={onChangeCharacter} className="secondary-btn">
          <span>{t.changeCharacter}</span>
        </button>
      </div>

      <style jsx>{`
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
          transition: max-width 0.4s ease;
        }

        .gameover-card.expanded {
          max-width: 560px;
        }

        .gameover-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--game-danger);
        }

        .gameover-subtitle {
          font-size: 0.95rem;
          color: var(--game-text-muted);
        }

        .reward-earned {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          text-align: left;
          background: rgba(255, 204, 51, 0.08);
          border: 1px solid var(--game-accent);
          border-radius: 14px;
          padding: 1rem 1.1rem;
        }

        .reward-earned-badge {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255, 204, 51, 0.18);
          color: var(--game-accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reward-earned-body {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          min-width: 0;
        }

        .reward-earned-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--game-text);
          margin: 0;
        }

        .reward-earned-prize {
          color: var(--game-accent);
        }

        .reward-earned-hint {
          font-size: 0.8rem;
          color: var(--game-text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .reward-earned-hint :global(.hint-icon) {
          margin-right: 3px;
          vertical-align: -2px;
          flex-shrink: 0;
        }

        .reward-earned-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--game-accent);
          text-decoration: none;
          margin-top: 0.1rem;
        }

        .reward-earned-link:hover {
          text-decoration: underline;
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

        .save-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: var(--game-text-muted);
        }

        .save-status.error {
          flex-direction: column;
          gap: 0.6rem;
          color: var(--game-danger);
        }

        .retry-btn {
          padding: 0.4rem 1rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--game-text);
          background: var(--game-panel-alt);
          border: 1px solid var(--game-border);
          border-radius: 8px;
          cursor: pointer;
        }

        .retry-btn:hover {
          border-color: var(--game-accent);
          color: var(--game-accent);
        }

        .spin {
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Height-animated reveal: collapsed to 0 with hidden overflow,
           then grows open once the score has been saved. This is the one
           orchestrated motion moment on this screen — everything else
           stays still. */
        .leaderboard-section {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition:
            max-height 0.5s ease,
            opacity 0.4s ease,
            margin-bottom 0.5s ease;
          margin-bottom: 0;
        }

        .leaderboard-section.open {
          max-height: 480px;
          opacity: 1;
          margin-bottom: 2rem;
        }

        .leaderboard-inner {
          padding-top: 0.25rem;
          text-align: left;
        }

        .leaderboard-title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--game-text);
          margin: 0 0 0.75rem 0;
        }

        .empty-board {
          font-size: 0.85rem;
          color: var(--game-text-muted);
          margin: 0;
        }

        .leaderboard-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-height: 320px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }

        .leaderboard-row {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 0.6rem;
          padding: 0.5rem 0.65rem;
          border-radius: 10px;
          background: var(--game-panel-alt);
          border: 1px solid transparent;
        }

        .leaderboard-row.own-row {
          border-color: var(--game-accent);
          background: rgba(255, 204, 51, 0.08);
        }

        .rank {
          font-weight: 800;
          color: var(--game-text-muted);
          font-size: 0.9rem;
        }

        .lb-name {
          font-weight: 600;
          color: var(--game-text);
          font-size: 0.92rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .you-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--game-panel);
          background: var(--game-accent);
          padding: 1px 6px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .lb-score {
          font-weight: 800;
          color: var(--game-accent);
          font-size: 0.95rem;
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
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }

        @media (max-width: 640px) {
          .gameover-card {
            padding: 1.75rem 1.25rem;
            border-radius: 16px;
          }

          .gameover-title {
            font-size: 1.5rem;
          }

          .gameover-subtitle {
            font-size: 0.85rem;
          }

          .reward-earned {
            padding: 0.85rem 0.9rem;
            gap: 0.6rem;
            border-radius: 12px;
          }

          .reward-earned-badge {
            width: 32px;
            height: 32px;
          }

          .reward-earned-title {
            font-size: 0.85rem;
          }

          .reward-earned-hint,
          .reward-earned-link {
            font-size: 0.75rem;
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

          .leaderboard-section.open {
            max-height: 380px;
          }

          .leaderboard-list {
            max-height: 280px;
            gap: 0.3rem;
          }

          .leaderboard-row {
            grid-template-columns: 22px 1fr auto;
            gap: 0.45rem;
            padding: 0.45rem 0.55rem;
          }

          .rank {
            font-size: 0.8rem;
          }

          .lb-name {
            font-size: 0.85rem;
          }

          .lb-score {
            font-size: 0.85rem;
          }

          .you-tag {
            font-size: 0.62rem;
            padding: 1px 5px;
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
  const [rewardBanner, setRewardBanner] = useState(null);
  const [scoreMilestoneTier, setScoreMilestoneTier] = useState(0); // 0 = none, 1/2/3 = 5k/10k/15k
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

    // Coarse-pointer (touch) devices are meaningfully harder at the same
    // score than a mouse/keyboard desktop: the 760x460 canvas gets scaled
    // down by CSS to fit the screen, so bombs read smaller, and tap-and-hold
    // buttons react a touch slower than a held key. This single flag drives
    // three separate mitigations below (difficulty params, item size, and
    // collision forgiveness) rather than changing the scoring curve itself.
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth <= 768);

    // Bombs/power-ups render larger on mobile so they're easier to actually
    // see against a scaled-down canvas — the extra collision padding below
    // (hitPadding) keeps the bigger sprite from also meaning a bigger
    // effective hitbox.
    const itemSize = isMobile ? 46 : 36;
    const hitPadding = isMobile ? 14 : 8;

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
      // Slightly snappier on mobile to help offset tap-and-hold reacting a
      // touch slower than a held keyboard key.
      speed: isMobile ? 8.5 : 7,
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
    let rewardBannerTimer = 0;
    // Index into REWARD_TIERS_ASC of the highest prize tier crossed so far
    // this run. -1 means no tier reached yet.
    let rewardTierIndex = -1;

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

    // Score awarded per bomb successfully dodged (or destroyed via shield).
    // Scales gently with level so the harder, late-game stretch near 15,000
    // doesn't also demand an unreasonable number of dodges on top of being
    // riskier to survive.
    const getDodgeBonus = () => 10 + Math.floor((level - 1) / 3) * 2;

    // Central score-mutation helper: applies the delta, updates the HUD
    // state, and checks whether it just crossed a new prize threshold. On
    // crossing, the score readout permanently recolors (via
    // scoreMilestoneTier) for the rest of the run, and a banner announces
    // which prize was just unlocked — so a player who hits 5,000 mid-run
    // finds out immediately rather than only at game over.
    const addScore = (amount) => {
      scoreCounter += amount;
      setCurrentScore(scoreCounter);

      for (let i = rewardTierIndex + 1; i < REWARD_TIERS_ASC.length; i++) {
        if (scoreCounter >= REWARD_TIERS_ASC[i].threshold) {
          rewardTierIndex = i;
          setScoreMilestoneTier(i + 1);
          setRewardBanner(
            `${tRef.current.milestoneReachedPrefix} ${
              tRef.current[REWARD_TIERS_ASC[i].prizeKey]
            }`,
          );
          rewardBannerTimer = 220; // ~3.6s at 60fps — longer than the level-up flash
        } else {
          break;
        }
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

      // 3. Banner Timers (level-up flash + reward flash + active power-up)
      if (levelBannerTimer > 0) {
        levelBannerTimer--;
        if (levelBannerTimer <= 0) {
          setLevelBanner(null);
        }
      }

      if (rewardBannerTimer > 0) {
        rewardBannerTimer--;
        if (rewardBannerTimer <= 0) {
          setRewardBanner(null);
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

      // Tablet Shield Outer Glow — once the power-up is close to running
      // out, the ring flickers on/off, speeding up the closer we get to 0,
      // so the player gets a clear visual cue before invincibility ends.
      if (player.powerUp === "ipad") {
        const SHIELD_WARNING_FRAMES = 90; // ~1.5s at 60fps
        let showShield = true;

        if (player.powerUpTimer <= SHIELD_WARNING_FRAMES) {
          const blinkInterval = Math.max(
            4,
            Math.floor(player.powerUpTimer / 6),
          );
          showShield = Math.floor(frame / blinkInterval) % 2 === 0;
        }

        if (showShield) {
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
      } = getDifficultyParams(level, isMobile);

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
          const jitter = Math.random() * Math.max(0, laneWidth - itemSize);
          items.push({
            x: laneMargin + laneIndex * laneWidth + jitter,
            y: -40,
            width: itemSize,
            height: itemSize,
            type: "bomb",
            speed: bombSpeedMin + Math.random() * (bombSpeedMax - bombSpeedMin),
          });
        });

        // Power-ups spawn independently in a lane that stayed empty this
        // wave, so they never appear stacked on top of a bomb. They stay
        // reasonably common even at high levels, since surviving the
        // toughest stretch of a run leans on grabbing them.
        const powerUpChance = Math.max(0.08, 0.18 - (level - 1) * 0.008);
        const openLanes = laneIndices.slice(bombCount);
        if (openLanes.length > 0 && Math.random() < powerUpChance) {
          const laneIndex = openLanes[0];
          const jitter = Math.random() * Math.max(0, laneWidth - itemSize);
          const type = Math.random() < 0.55 ? "camera" : "tablet";
          items.push({
            x: laneMargin + laneIndex * laneWidth + jitter,
            y: -40,
            width: itemSize,
            height: itemSize,
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

        const isColliding =
          player.x + hitPadding < item.x + item.width &&
          player.x + player.width - hitPadding > item.x &&
          player.y + hitPadding < item.y + item.height &&
          player.y + player.height - hitPadding > item.y;

        if (isColliding) {
          if (item.type === "bomb") {
            if (player.powerUp === "ipad") {
              items.splice(i, 1);
              // Shield kills are worth a bit more than a plain dodge, to
              // reward pushing through a bomb wave instead of just outlasting it.
              addScore(getDodgeBonus() + 15);
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
            addScore(150);
            setActiveBanner(tRef.current.cameraPower);
            items.splice(i, 1);
            continue;
          } else if (item.type === "tablet") {
            player.powerUp = "ipad";
            player.powerUpTimer = 360;
            addScore(100);
            setActiveBanner(tRef.current.ipadPower);
            items.splice(i, 1);
            continue;
          }
        }

        if (item.y > canvas.height + 20) {
          if (item.type === "bomb") {
            addScore(getDodgeBonus());
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
        <div className="hud-metrics">
          <div className="hud-metric">
            <span className="hud-label">{t.score}</span>
            <span
              className={`hud-value${
                scoreMilestoneTier > 0 ? ` milestone-${scoreMilestoneTier}` : ""
              }`}
            >
              {currentScore}
            </span>
          </div>

          <div className="hud-metric align-center">
            <span className="hud-label">{t.level}</span>
            <span className="hud-value text-accent">{currentLevel}</span>
          </div>

          <div className="hud-metric align-right">
            <span className="hud-label flex-align">
              <Trophy size={14} className="mr-1" /> {t.highScore}
            </span>
            <span className="hud-value text-accent">{highScore}</span>
          </div>
        </div>

        {/* Fixed-height slot, always rendered, so a banner appearing or
            disappearing never changes the HUD bar's size or reflows the
            metrics above it. */}
        <div className="banner-row">
          {rewardBanner && (
            <div className="powerup-banner reward-banner">{rewardBanner}</div>
          )}
          {levelBanner && (
            <div className="powerup-banner level-banner">{levelBanner}</div>
          )}
          {activeBanner && <div className="powerup-banner">{activeBanner}</div>}
        </div>
      </div>

      <div className="canvas-stage">
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
      </div>

      {/* Placed below the canvas (not overlaid on top of it) so the
          controls never block the view of falling bombs near the bottom
          of the play field. touch-action: none + the global
          user-select/callout reset above stop iOS/Android from treating
          a press-and-hold here as a text selection instead of a game
          input. */}
      <div className="touch-controls">
        <button
          type="button"
          aria-label={t.mobileTouchLeft}
          onTouchStart={(e) => {
            e.preventDefault();
            touchStateRef.current.left = true;
          }}
          onTouchEnd={() => releaseTouch("left")}
          onTouchCancel={() => releaseTouch("left")}
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={() => (touchStateRef.current.left = true)}
          onMouseUp={() => releaseTouch("left")}
          onMouseLeave={() => releaseTouch("left")}
          className="touch-btn touch-btn-left"
        >
          <ChevronLeft size={30} strokeWidth={3} />
        </button>
        <div className="touch-controls-divider" />
        <button
          type="button"
          aria-label={t.mobileTouchRight}
          onTouchStart={(e) => {
            e.preventDefault();
            touchStateRef.current.right = true;
          }}
          onTouchEnd={() => releaseTouch("right")}
          onTouchCancel={() => releaseTouch("right")}
          onContextMenu={(e) => e.preventDefault()}
          onMouseDown={() => (touchStateRef.current.right = true)}
          onMouseUp={() => releaseTouch("right")}
          onMouseLeave={() => releaseTouch("right")}
          className="touch-btn touch-btn-right"
        >
          <ChevronRight size={30} strokeWidth={3} />
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
          flex-direction: column;
          gap: 0.4rem;
          box-sizing: border-box;
        }

        .hud-metrics {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
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

        /* Always present in the layout (even with no banner text) so its
           reserved height never causes the HUD — or anything below it — to
           jump when a level-up or power-up banner appears/disappears. */
        .banner-row {
          min-height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .level-banner {
          animation: none;
          background: rgba(255, 77, 77, 0.12);
          border-color: var(--game-danger);
          color: var(--game-danger);
        }

        .reward-banner {
          background: rgba(255, 140, 26, 0.16);
          border-color: #ff8c1a;
          color: #ff8c1a;
          font-weight: 800;
          animation: rewardPulse 1s ease-in-out infinite;
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
          transition: color 0.3s ease;
        }

        /* Score readout progressively recolors as prize thresholds are
           crossed during a run — a persistent, at-a-glance reminder that a
           prize is already secured, distinct from the momentary banner. */
        .hud-value.milestone-1 {
          color: #ff8c1a;
        }

        .hud-value.milestone-2 {
          color: #ff6a00;
          text-shadow: 0 0 8px rgba(255, 106, 0, 0.5);
        }

        .hud-value.milestone-3 {
          color: #ff3d00;
          text-shadow: 0 0 10px rgba(255, 61, 0, 0.6);
          animation: milestoneGlow 1.1s ease-in-out infinite;
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

        .canvas-stage {
          position: relative;
          width: 100%;
          max-width: 760px;
        }

        .canvas-skeleton {
          width: 100%;
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
          height: auto;
          background: var(--game-panel-canvas);
          border: 1px solid var(--game-border);
          border-top: none;
          border-radius: 0 0 14px 14px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
          touch-action: none;
        }

        /* Hidden on desktop/pointer devices — shown only below the 768px
           breakpoint, as its own row underneath the canvas rather than
           overlaid on top of it. */
        .touch-controls {
          display: none;
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

        @keyframes rewardPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.04);
            opacity: 0.85;
          }
        }

        @keyframes milestoneGlow {
          0%,
          100% {
            text-shadow: 0 0 6px rgba(255, 61, 0, 0.4);
          }
          50% {
            text-shadow: 0 0 16px rgba(255, 61, 0, 0.9);
          }
        }

        @media (max-width: 768px) {
          .touch-controls {
            display: flex;
            width: 100%;
            max-width: 760px;
            height: 82px;
            margin-top: 0.75rem;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid var(--game-border);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
            padding-bottom: env(safe-area-inset-bottom);
            box-sizing: content-box;
          }

          .touch-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: var(--game-panel-alt);
            color: #fff;
            touch-action: none;
            transition: background-color 0.1s ease;
          }

          .touch-btn:active {
            background-color: rgba(255, 204, 51, 0.28);
          }

          .touch-controls-divider {
            width: 1px;
            align-self: stretch;
            background: rgba(255, 255, 255, 0.12);
          }

          /* The button icons already show what to do; the keyboard hint
             text underneath is desktop-only guidance. */
          .controls-hint {
            display: none;
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

          .banner-row {
            min-height: 22px;
          }

          .powerup-banner {
            text-align: center;
            font-size: 0.75rem;
          }

          .canvas-skeleton,
          .arcade-canvas {
            border-radius: 0 0 12px 12px;
          }

          .touch-controls {
            height: 76px;
          }
        }
      `}</style>
    </div>
  );
}
