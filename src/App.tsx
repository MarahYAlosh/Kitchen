import "./App.css";
import { Helmet } from "react-helmet-async";
import RandomDish from "./components/RandomDish";
import StatCard from "./components/StatCard";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { GiChefToque, GiKnifeFork, GiHerbsBundle } from "react-icons/gi";
import { TbWorld } from "react-icons/tb";
import { FiArrowDown } from "react-icons/fi";

/* ─── Floating particle ─────────────────────────────────────── */
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <span
      style={{
        position: "absolute",
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "rgba(245,158,11,0.5)",
        animation: `particleRise ${2 + Math.random() * 3}s ease-out infinite`,
        ...style,
      }}
    />
  );
}

/* ─── Typing cursor effect ──────────────────────────────────── */
function useTypingPlaceholder(phrases: string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((p) => (p + 1) % phrases.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return text;
}

/* ─── Stats data ────────────────────────────────────────────── */
const STATS = [
  { endValue: 5000, suffix: "+", label: "Recipes", delay: 0,   icon: <GiKnifeFork /> },
  { endValue: 30,   suffix: "+", label: "Cuisines", delay: 200, icon: <TbWorld /> },
  { endValue: 500,  suffix: "+", label: "Ingredients", delay: 400, icon: <GiHerbsBundle /> },
];

/* ─── Particles positions ───────────────────────────────────── */
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + i * 8}%`,
  bottom: `${10 + (i % 4) * 8}%`,
  animationDelay: `${i * 0.4}s`,
}));

/* ══════════════════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<string>();
  const [searchFocused, setSearchFocused] = useState(false);
  const scrollRef = useRef<HTMLElement>(null);

  const placeholder = useTypingPlaceholder([
    "Search pasta recipes...",
    "Try chicken tikka masala...",
    "Find vegan desserts...",
    "Explore Japanese ramen...",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  useEffect(() => {
    const x = setTimeout(() => {
      if (searchData && searchData.length > 0) {
        navigate(`/search/${searchData}`);
      }
    }, 1000);
    return () => clearTimeout(x);
  }, [searchData, navigate]);

  const scrollToContent = () => {
    scrollRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Alosh Kitchen — Home</title>
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="home select-none" ref={scrollRef}>
        {/* Floating orbs */}
        <div className="hero-orb hero-orb-gold" />
        <div className="hero-orb hero-orb-emerald" />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <Particle key={i} style={{ left: p.left, bottom: p.bottom, animationDelay: p.animationDelay }} />
        ))}

        {/* Content */}
        <div className="flex flex-col items-center text-center gap-7 px-4 max-w-2xl mx-auto py-10">

          {/* Chef icon with rotating ring */}
          <div className="hero-icon-anim relative flex items-center justify-center">
            {/* Outer rotating dashed ring */}
            <div
              className="icon-ring absolute"
              style={{
                width: 96,
                height: 96,
                borderRadius: "50%",
                border: "1.5px dashed rgba(245,158,11,0.35)",
              }}
            />
            {/* Static glow circle */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(245,158,11,0.12)",
                border: "1px solid rgba(245,158,11,0.45)",
                boxShadow: "0 0 40px rgba(245,158,11,0.25)",
              }}
            >
              <GiChefToque size={38} className="text-amber-400" />
            </div>
          </div>

          {/* Badge */}
          <div
            className="hero-title-anim flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.35)",
              color: "#10b981",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ animation: "glowPulse 1.5s ease-in-out infinite" }}
            />
            World Cuisine Explorer
          </div>

          {/* Title */}
          <h1
            className="hero-title-anim text-5xl lg:text-7xl font-extrabold text-white leading-tight"
            style={{ animationDelay: "0.25s" }}
          >
            Cook Like a{" "}
            <span className="shimmer-text">Chef</span>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-sub-anim text-slate-300 text-lg lg:text-xl max-w-md leading-relaxed"
          >
            Discover thousands of recipes from every corner of the world —
            ingredients, techniques, and stories on every plate.
          </p>

          {/* Search bar with typing placeholder */}
          <div
            className="hero-search-anim relative w-full max-w-md"
          >
            {/* Glow ring when focused */}
            {searchFocused && (
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  boxShadow: "0 0 0 3px rgba(245,158,11,0.2), 0 0 30px rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.6)",
                  borderRadius: "1rem",
                }}
              />
            )}

            <CiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 transition-colors duration-300"
              style={{ color: searchFocused ? "#f59e0b" : "#64748b" }}
              size={22}
            />

            {/* Scan-line shimmer on focus */}
            {searchFocused && (
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                style={{ zIndex: 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    width: "30%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(245,158,11,0.06), transparent)",
                    animation: "scanLine 1.5s linear infinite",
                  }}
                />
              </div>
            )}

            <input
              onChange={handleChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              type="search"
              placeholder={placeholder + (searchFocused ? "" : "|")}
              className="hero-search-input w-full pl-12 pr-5 h-14 rounded-2xl text-base font-medium text-white
                         outline-none placeholder-slate-500 relative"
              style={{
                background: "rgba(26,31,46,0.9)",
                border: `1px solid ${searchFocused ? "rgba(245,158,11,0.7)" : "rgba(245,158,11,0.25)"}`,
                backdropFilter: "blur(10px)",
                zIndex: 1,
              }}
            />
          </div>

          {/* ── Stat pills with CountUp ───────────────────── */}
          <div className="hero-stats-anim flex gap-4 flex-wrap justify-center mt-2">
            {STATS.map((s) => (
              <StatCard
                key={s.label}
                endValue={s.endValue}
                suffix={s.suffix}
                label={s.label}
                delay={s.delay}
                icon={s.icon}
              />
            ))}
          </div>

          {/* Scroll indicator */}
          <button
            onClick={scrollToContent}
            className="hero-stats-anim flex flex-col items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors duration-300 mt-2"
            style={{ animationDelay: "1.1s" }}
          >
            <span className="text-xs uppercase tracking-widest">Explore</span>
            <FiArrowDown
              size={18}
              style={{ animation: "fadeInUp 1s ease-in-out infinite alternate" }}
            />
          </button>
        </div>
      </section>

      {/* Random dish section */}
      <RandomDish />
    </>
  );
}
