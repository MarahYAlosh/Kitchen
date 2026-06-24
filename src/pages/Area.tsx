import { Outlet, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useDish from "../hooks/useDish";
import { TbWorld } from "react-icons/tb";

export default function Area() {
  const navigate = useNavigate();
  const { area } = useParams();
  const [areaLabel, setArea] = useState("");
  const { data, isLoading, isError } = useDish({
    endPoint: "list.php?a=list",
    title: "areas",
  });

  useEffect(() => {
    if (!area && data?.data?.meals[0]?.strArea) {
      navigate(`/area/${data?.data?.meals[0]?.strArea}`);
    }
    if (area) setArea(area);
  }, [data, navigate, area]);

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
        <title>Area — Alosh Kitchen</title>
      </Helmet>
      <section
        className="container mx-auto px-4 min-h-[70vh] pt-28 pb-10 select-none"
        style={{ background: "#0f1117" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <TbWorld size={26} className="text-amber-400" />
          <h1 className="text-3xl font-extrabold text-white">Browse by Area</h1>
        </div>

        {/* Select */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <select
              name="area"
              id="area"
              value={areaLabel}
              className="custom-select"
              onChange={(e) => {
                setArea(e.target.value);
                navigate(`/area/${e.target.value}`);
              }}
            >
              {data?.data?.meals.map((a: any, index: number) => (
                <option key={index} value={a.strArea}>
                  {a.strArea}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Outlet />
      </section>
    </>
  );
}
