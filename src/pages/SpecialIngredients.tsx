import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";

export default function SpecialIngredients() {
  const { ingredient } = useParams();
  const { data, refetch, isLoading, isError } = useDish({
    title: "Special Ingredients",
    endPoint: `filter.php?i=${ingredient}`,
  });
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [ingredient, refetch]);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-red-400 font-semibold">Failed to load recipes.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{ingredient} — Alosh Kitchen</title>
      </Helmet>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {data?.data?.meals?.map((meal: any) => (
          <div
            key={meal.idMeal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
            className="group cursor-pointer rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{
              background: "#1a1f2e",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-3">
              <h2 className="text-slate-200 font-semibold text-sm truncate group-hover:text-amber-400 transition-colors duration-300">
                {meal.strMeal}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
