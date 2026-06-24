import { Link } from "react-router-dom";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";

export default function Footer() {
  const links = [
    { href: "/", title: "Home" },
    { href: "/ingredients", title: "Ingredients" },
    { href: "/area", title: "Area" },
    { href: "/categories", title: "Categories" },
  ];

  const socials = [
    { href: "https://github.com/MarahYAlosh", icon: <FaGithub size={18} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/marah-alosh/", icon: <FaLinkedin size={18} />, label: "LinkedIn" },
    {
      href: "https://www.facebook.com/share/1PkvcMDBFj/",
      icon: <FaFacebook size={18} />,
      label: "Facebook",
    },
    { href: "https://wa.me/+963991520237", icon: <FaWhatsapp size={18} />, label: "WhatsApp" },
  ];

  return (
    <footer
      className="w-full mt-auto"
      style={{
        background: "linear-gradient(to top, #070b10 0%, #141824 100%)",
        borderTop: "1px solid rgba(245,158,11,0.15)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <GiChefToque size={32} className="text-amber-400" />
            <span className="text-xl font-extrabold">
              <span className="text-amber-400">Alosh</span>
              <span className="text-white"> Kitchen</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Discover thousands of recipes from around the world. Cook like a
            professional chef, right at home.
          </p>
          <div className="flex gap-3 mt-2">
            {socials.map((s) => (
              <Link
                key={s.label}
                to={s.href}
                target="_blank"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 
                           border border-white/10 hover:border-amber-400 hover:text-amber-400 
                           transition-all duration-300"
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-amber-400 font-bold text-base mb-4 uppercase tracking-widest text-sm">
            About Us
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Alosh Kitchen is your go-to destination for culinary inspiration.
            Whether you're a home cook or a seasoned chef, we've got the perfect
            recipe for every occasion.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-amber-400 font-bold text-base mb-4 uppercase tracking-widest text-sm">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm 
                             flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 group-hover:bg-amber-400 transition-colors duration-300" />
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="text-center py-4 text-slate-500 text-xs"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        &copy; {new Date().getFullYear()} Alosh Kitchen. All rights reserved to{" "}
        <span className="text-amber-400 font-semibold">Marah Alosh</span>.
      </div>
    </footer>
  );
}
