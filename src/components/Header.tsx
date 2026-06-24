import React from "react";
import { CiMenuFries } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { GiChefToque } from "react-icons/gi";

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Links = [
    { path: "/", title: "Home" },
    { path: "/ingredients", title: "Ingredients" },
    { path: "/categories", title: "Categories" },
    { path: "/area", title: "Area" },
  ];

  return (
    <header className={`header ${isScrolled ? "move" : ""}`}>
      {/* Logo */}
      <button
        className="flex items-center gap-2 select-none group"
        onClick={() => navigate("/")}
      >
        <GiChefToque
          size={36}
          className="text-amber-400 group-hover:rotate-12 transition-transform duration-300"
        />
        <span className="text-xl font-extrabold tracking-wide">
          <span className="text-amber-400">Alosh</span>
          <span className="text-white"> Kitchen</span>
        </span>
      </button>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-lg border border-amber-400/30 hover:border-amber-400 transition-colors duration-300"
        aria-label="Toggle menu"
      >
        <CiMenuFries
          className={`${isMenuOpen ? "rotate-90" : "rotate-0"} transition-transform duration-300`}
          size={"1.5rem"}
          color="#f59e0b"
        />
      </button>

      {/* Nav */}
      <nav
        className={`flex justify-center items-center gap-1 font-semibold 
        md:flex-row flex-col md:static fixed inset-0 top-20 
        transition-all duration-500 
        ${isMenuOpen ? "h-52 opacity-100" : "h-0 md:h-auto opacity-0 md:opacity-100"} 
        overflow-hidden md:overflow-visible
        bg-[#0f1117]/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none`}
      >
        {Links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/"}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `relative text-sm px-4 py-2 rounded-lg transition-all duration-300 
              ${
                isActive
                  ? "active text-amber-400 bg-amber-400/10"
                  : "text-slate-300 hover:text-amber-400 hover:bg-white/5"
              }`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
