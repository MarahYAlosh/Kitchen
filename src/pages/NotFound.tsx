import { Link } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <section
      className="grow w-full flex flex-col justify-center items-center gap-8 px-4"
      style={{ background: "#0f1117", minHeight: "70vh" }}
    >
      {/* Big 404 */}
      <div className="text-center select-none">
        <p
          className="text-9xl font-extrabold leading-none"
          style={{
            background: "linear-gradient(135deg, #f59e0b 30%, #10b981 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>
      </div>

      {/* Icon */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(245,158,11,0.1)",
          border: "1px solid rgba(245,158,11,0.3)",
        }}
      >
        <GiChefToque size={40} className="text-amber-400 opacity-50" />
      </div>

      {/* Message */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Page Not Found</h2>
        <p className="text-slate-400 text-base max-w-sm mx-auto">
          Looks like this recipe doesn't exist. Let's get you back to the kitchen.
        </p>
      </div>

      {/* CTA */}
      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:opacity-80 hover:gap-3"
        style={{
          background: "linear-gradient(135deg, #f59e0b, #d97706)",
          color: "#0f1117",
        }}
      >
        <FiArrowLeft size={16} />
        Back to Home
      </Link>
    </section>
  );
}
