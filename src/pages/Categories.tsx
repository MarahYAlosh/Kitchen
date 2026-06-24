import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useDish from "../hooks/useDish";
import { BiCategory } from "react-icons/bi";

export default function Categories() {
  const { category: searchCategory } = useParams();
  const [category, setCategory] = useState("");
  const { data: categories } = useDish({
    endPoint: "categories.php",
    title: "categories",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchCategory && categories?.data?.categories[0]?.strCategory) {
      navigate(`/categories/${categories?.data?.categories[0]?.strCategory}`);
    }
    if (searchCategory) setCategory(searchCategory);
  }, [categories, navigate, searchCategory]);

  return (
    <>
      <Helmet>
        <title>Categories — Alosh Kitchen</title>
      </Helmet>
      <section
        className="container mx-auto px-4 min-h-[70vh] pt-28 pb-10 select-none"
        style={{ background: "#0f1117" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BiCategory size={26} className="text-amber-400" />
          <h1 className="text-3xl font-extrabold text-white">Browse by Category</h1>
        </div>

        {/* Select */}
        <div className="flex justify-center mb-10">
          <select
            name="category"
            id="category"
            value={category}
            className="custom-select"
            onChange={(e) => {
              setCategory(e.target.value);
              navigate(`/categories/${e.target.value}`);
            }}
          >
            {categories?.data?.categories.map((cat: any) => (
              <option key={cat.idCategory} value={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>

        <Outlet />
      </section>
    </>
  );
}
