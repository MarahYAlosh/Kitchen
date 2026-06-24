import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useRandomDish from "../hooks/useRandomDish";
import { GiKnifeFork } from "react-icons/gi";
import { FiArrowRight } from "react-icons/fi";

/* ─── Scroll-reveal hook ──────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ══════════════════════════════════════════════════════════════ */
export default function RandomDish() {
  const { data, isError, isLoading } = useRandomDish();
  const { ref: sectionRef, inView: sectionVisible } = useInView();
  const { ref: imgRef, inView: imgVisible } = useInView(0.1);
  const { ref: contentRef, inView: contentVisible } = useInView(0.1);

  if (isLoading || isError) return <SpinLoader />;

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4"
      style={{ background: "#0f1117" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section header ─────────────────────────────── */}
        <div
          className="flex items-center gap-3 mb-10 transition-all duration-700"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)" }}
          >
            <GiKnifeFork className="text-amber-400" size={18} />
          </div>
          <h2 className="text-2xl font-bold text-white">Recipe of the Day</h2>
          <span
            className="ml-2 px-3 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(16,185,129,0.12)",
              border: "1px solid rgba(16,185,129,0.35)",
              color: "#10b981",
            }}
          >
            ✦ Random
          </span>
        </div>

        {/* ── Card ───────────────────────────────────────── */}
        {data?.data?.meals.map((dish: any) => (
          <div
            key={dish?.idMeal}
            className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden transition-all duration-700"
            style={{
              background: "#1a1f2e",
              border: "1px solid rgba(245,158,11,0.15)",
              boxShadow: "0 8px 60px rgba(0,0,0,0.5)",
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? "translateY(0)" : "translateY(40px)",
              transitionDelay: "0.2s",
            }}
          >
            {/* Image side */}
            <div
              ref={imgRef}
              className="relative overflow-hidden"
              style={{
                transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
                opacity: imgVisible ? 1 : 0,
                transform: imgVisible ? "translateX(0)" : "translateX(-40px)",
              }}
            >
              <img
                src={dish?.strMealThumb}
                className="w-full h-full object-cover min-h-64 lg:min-h-full hover:scale-105 transition-transform duration-700"
                alt={dish?.strMeal}
                style={{ maxHeight: "440px" }}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1f2e]/50 hidden lg:block" />

              {/* Category badge */}
              {dish?.strCategory && (
                <span
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(245,158,11,0.9)",
                    color: "#0f1117",
                    backdropFilter: "blur(4px)",
                    animation: "fadeInDown 0.6s ease 0.5s both",
                  }}
                >
                  {dish.strCategory}
                </span>
              )}

              {/* Area badge */}
              {dish?.strArea && (
                <span
                  className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(16,185,129,0.85)",
                    color: "#0f1117",
                    backdropFilter: "blur(4px)",
                    animation: "fadeInUp 0.6s ease 0.7s both",
                  }}
                >
                  🌍 {dish.strArea}
                </span>
              )}
            </div>

            {/* Content side */}
            <div
              ref={contentRef}
              className="flex flex-col gap-5 p-8"
              style={{
                transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? "translateX(0)" : "translateX(40px)",
              }}
            >
              {/* Title */}
              <div>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">
                  Today's Featured Recipe
                </p>
                <h3 className="text-white font-bold text-2xl lg:text-3xl leading-tight">
                  {dish?.strMeal}
                </h3>
              </div>

              {/* Divider */}
              <div
                className="w-16 h-0.5 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #f59e0b, #10b981)",
                  animation: contentVisible ? "slideInLeft 0.6s ease 0.6s both" : "none",
                }}
              />

              {/* Text */}
              <p className="text-slate-400 text-sm leading-relaxed">
                {dish?.strInstructions.slice(0, 400)}
                <span className="text-emerald-400">...</span>
              </p>

              {/* CTA */}
              <Link
                to={`/recipe/${dish?.idMeal}`}
                className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl 
                           font-semibold text-sm group transition-all duration-300 mt-auto
                           hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#0f1117",
                }}
              >
                Full Recipe
                <FiArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Loader ────────────────────────────────────────────────── */
const SpinLoader = () => (
  <section
    className="w-full py-24 flex justify-center items-center"
    style={{ background: "#0f1117" }}
  >
    <div className="relative w-14 h-14">
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          border: "3px solid transparent",
          borderTopColor: "#f59e0b",
          borderRightColor: "#10b981",
        }}
      />
      <div
        className="absolute inset-2 rounded-full animate-spin"
        style={{
          border: "2px solid transparent",
          borderTopColor: "#10b981",
          animationDirection: "reverse",
          animationDuration: "0.7s",
        }}
      />
    </div>
  </section>
);
