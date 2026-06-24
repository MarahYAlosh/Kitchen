import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import Card from "../components/Card";
import Loading from "../components/Loading";
import useDish from "../hooks/useDish";
import { HiOutlineEmojiSad } from "react-icons/hi";

export default function Search() {
  const { term } = useParams();
  const [newTerm, setTerm] = useState(term);
  const { data, isLoading, isError, refetch } = useDish({
    endPoint: `search.php?s=${term}`,
    title: "search",
  });
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    const x = setTimeout(() => {
      if (newTerm) {
        navigate("/search/" + newTerm);
        refetch();
      }
    }, 1000);
    return () => clearTimeout(x);
  }, [newTerm, navigate, refetch]);

  useEffect(() => {
    ref.current?.blur();
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <Loading />;

  const meals = data?.data?.meals;

  return (
    <>
      <Helmet>
        <title>Search — {term}</title>
      </Helmet>
      <section
        className="container mx-auto px-4 pt-28 pb-10 min-h-[70vh]"
        style={{ background: "#0f1117" }}
      >
        {/* Search header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-1">
              Results for
            </p>
            <h1 className="text-2xl font-bold text-white">
              "{term}"
              {meals && (
                <span className="ml-3 text-base font-normal text-emerald-400">
                  {meals.length} found
                </span>
              )}
            </h1>
          </div>

          {/* Inline search */}
          <div className="relative">
            <CiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400"
              size={20}
            />
            <input
              ref={ref}
              onFocus={(e) => (e.target.value = "")}
              type="search"
              placeholder="Search again..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none transition-all duration-300 w-48 focus:w-64"
              style={{
                background: "#1a1f2e",
                border: "1px solid rgba(245,158,11,0.3)",
              }}
              onFocusCapture={(e) =>
                (e.target.style.borderColor = "rgba(245,158,11,0.8)")
              }
              onBlurCapture={(e) =>
                (e.target.style.borderColor = "rgba(245,158,11,0.3)")
              }
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Results grid */}
        {meals && meals.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {meals.map((dish: Record<string, string>) => (
              <Card dish={dish} key={dish?.idMeal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-72 gap-4">
            <HiOutlineEmojiSad size={56} className="text-slate-600" />
            <h2 className="text-slate-400 font-semibold text-xl text-center">
              No results for{" "}
              <span className="text-amber-400">"{term}"</span>
            </h2>
            <button
              onClick={() => {
                ref.current?.focus();
                setTerm("");
              }}
              className="px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 hover:opacity-80"
              style={{
                background: "rgba(245,158,11,0.15)",
                border: "1px solid rgba(245,158,11,0.4)",
                color: "#f59e0b",
              }}
            >
              Try another search
            </button>
          </div>
        )}
      </section>
    </>
  );
}
