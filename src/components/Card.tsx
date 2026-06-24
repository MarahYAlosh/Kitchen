import { useNavigate } from "react-router-dom";

type Props = {
  dish: Record<string, string>;
};

export default function Card({ dish }: Props) {
  const navigate = useNavigate();

  return (
    <div
      className="recipe-card cursor-pointer group rounded-2xl overflow-hidden transition-all duration-500 
                 hover:-translate-y-2"
      style={{ background: "#1a1f2e", border: "1px solid rgba(255,255,255,0.06)" }}
      onClick={() => navigate(`/recipe/${dish?.idMeal}`)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={dish?.strMealThumb}
          alt={dish?.strMeal}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-3">
        <h2 className="text-slate-200 font-semibold text-sm truncate group-hover:text-amber-400 transition-colors duration-300">
          {dish?.strMeal}
        </h2>
      </div>
    </div>
  );
}
