import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";
import { GiHerbsBundle } from "react-icons/gi";

export default function Ingredients() {
  const { data, isLoading, isError } = useDish({
    endPoint: "list.php?i=list",
    title: "ingredients",
  });
  const navigate = useNavigate();
  const { ingredient } = useParams();
  const [ingredientLabel, setIngredient] = useState("");

  useEffect(() => {
    if (!ingredient && data?.data?.meals[0]?.strIngredient) {
      navigate(`/ingredients/${data?.data?.meals[0]?.strIngredient}`);
    }
    if (ingredient) setIngredient(ingredient);
  }, [data, navigate, ingredient]);

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <section className="container mx-auto px-4 min-h-[70vh] pt-28 flex items-center justify-center">
        <p className="text-red-400 font-semibold text-xl">
          Something went wrong. Please try again.
        </p>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Ingredients — Alosh Kitchen</title>
      </Helmet>
      <section
        className="container mx-auto px-4 min-h-[70vh] pt-28 pb-10 select-none"
        style={{ background: "#0f1117" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <GiHerbsBundle size={26} className="text-amber-400" />
          <h1 className="text-3xl font-extrabold text-white">Browse by Ingredient</h1>
        </div>

        {/* Select */}
        <div className="flex justify-center mb-10">
          <select
            name="ingredient"
            id="ingredient"
            value={ingredientLabel}
            className="custom-select"
            onChange={(e) => {
              setIngredient(e.target.value);
              navigate(`/ingredients/${e.target.value}`);
            }}
          >
            {data?.data?.meals.map((item: any, index: number) => (
              <option key={index} value={item.strIngredient}>
                {item.strIngredient}
              </option>
            ))}
          </select>
        </div>

        <Outlet />
      </section>
    </>
  );
}
