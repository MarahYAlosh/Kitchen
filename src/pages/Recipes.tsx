import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ApiContext } from "../context/ApiContext";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { FaYoutube } from "react-icons/fa";
import { FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import useDish from "../hooks/useDish";
import Modal from "../components/Modal";
import VideoDisplay from "../components/VideoDisplay";

export default function Recipes() {
  const { id } = useParams();
  const { getIngredient, getIngredientPic } = useContext(ApiContext);
  const { data, isLoading, isError, refetch } = useDish({
    title: "dish by id",
    endPoint: `lookup.php?i=${id}`,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading) return <Loading />;
  if (isError) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{data?.data?.meals[0]?.strMeal} — Alosh Kitchen</title>
      </Helmet>
      <section
        className="container mx-auto px-4 min-h-[70vh] py-28"
        style={{ background: "#0f1117" }}
      >
        {data?.data?.meals?.map((dish: any) => (
          <div key={dish?.idMeal} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — image & actions */}
            <div className="flex flex-col items-center gap-6">
              <div
                className="w-full max-w-md rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid rgba(245,158,11,0.2)",
                  boxShadow: "0 0 60px rgba(16,185,129,0.12), 0 20px 60px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  className="w-full object-cover"
                  src={dish?.strMealThumb}
                  alt={dish?.strMeal}
                />
              </div>

              {/* Tags */}
              <div className="flex gap-3 flex-wrap justify-center">
                {dish?.strArea && (
                  <Link
                    to={`/area/${dish.strArea}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:opacity-80"
                    style={{
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.4)",
                      color: "#10b981",
                    }}
                  >
                    🌍 {dish.strArea}
                  </Link>
                )}
                {dish?.strCategory && (
                  <Link
                    to={`/categories/${dish.strCategory}`}
                    className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:opacity-80"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.4)",
                      color: "#f59e0b",
                    }}
                  >
                    🍽 {dish.strCategory}
                  </Link>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                {dish?.strSource && (
                  <Link
                    to={dish.strSource}
                    target="_blank"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-80"
                    style={{
                      background: "rgba(245,158,11,0.15)",
                      border: "1px solid rgba(245,158,11,0.4)",
                      color: "#f59e0b",
                    }}
                  >
                    <FiExternalLink size={15} />
                    Source
                  </Link>
                )}
                {dish?.strYoutube && (
                  <button
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:opacity-80"
                    style={{
                      background: "linear-gradient(135deg, #dc2626, #b91c1c)",
                      color: "#fff",
                    }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaYoutube size={16} />
                    Watch
                  </button>
                )}
              </div>
            </div>

            {/* Right — info */}
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {dish?.strMeal}
              </h1>

              {/* Instructions */}
              <div
                className="p-5 rounded-2xl"
                style={{
                  background: "#1a1f2e",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <h2 className="text-amber-400 font-bold text-base mb-3 uppercase tracking-wider text-sm">
                  Instructions
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {!show
                    ? dish?.strInstructions.split("").splice(0, 500).join("")
                    : dish?.strInstructions}
                </p>
                <button
                  onClick={() => setShow(!show)}
                  className="flex items-center gap-1 mt-3 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors duration-300"
                >
                  {show ? (
                    <>
                      Show less <FiChevronUp />
                    </>
                  ) : (
                    <>
                      Show more <FiChevronDown />
                    </>
                  )}
                </button>
              </div>

              {/* Ingredients */}
              <div>
                <h2 className="text-amber-400 font-bold text-base mb-4 uppercase tracking-wider text-sm">
                  Ingredients
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {getIngredient(dish).map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 p-2 rounded-xl group hover:-translate-y-1 transition-all duration-300"
                      style={{
                        background: "#1a1f2e",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <img
                        src={getIngredientPic(ingredient[1])}
                        alt={ingredient[1]}
                        className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                      <p className="text-emerald-400 text-xs font-semibold text-center truncate w-full text-center">
                        {ingredient[1]}
                      </p>
                      <p className="text-slate-500 text-xs text-center truncate w-full text-center">
                        {ingredient[0]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <VideoDisplay videoUrl={dish?.strYoutube} />
            </Modal>
          </div>
        ))}
      </section>
    </>
  );
}
