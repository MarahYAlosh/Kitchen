import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import useDish from "../hooks/useDish";

export default function SpecialCategory() {
  const { category } = useParams();
  const { data: specialCategories, isLoading, refetch } = useDish({
    title: "Special Category",
    endPoint: `filter.php?c=${category}`,
  });

  useEffect(() => {
    refetch();
  }, [category, refetch]);

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>{category} — Alosh Kitchen</title>
      </Helmet>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
        {specialCategories?.data?.meals?.map((item: any) => (
          <Link
            key={item.idMeal}
            to={`/recipe/${item.idMeal}`}
            className="group rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{
              background: "#1a1f2e",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="relative overflow-hidden aspect-square">
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-3">
              <h2 className="text-slate-200 font-semibold text-sm truncate group-hover:text-amber-400 transition-colors duration-300">
                {item.strMeal}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
