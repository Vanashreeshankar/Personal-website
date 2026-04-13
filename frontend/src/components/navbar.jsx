import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Navbar({ setShowContact }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: "/work", label: "Work" },
    { path: "/about", label: "About" },
  ];

  // SKILLS CLICK HANDLER
  const handleSkillsClick = () => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/#skills");
    } else {
      document
        .getElementById("skills")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  // MENU ANIMATION
  const menuVariants = {
    hidden: {
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
    },
    visible: {
      opacity: 1,
      clipPath: "circle(150% at 50% 50%)",
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
      transition: { duration: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="bg-black text-white border-b border-gray-800 px-6 py-4 relative">

      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg font-semibold tracking-[0.08em] cursor-pointer z-50"

        >
          VANASHREE
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 items-center relative">
          {links.map((link) => {
            const isActive =
              link.path === "/work"
                ? location.pathname.startsWith("/work") ||
                  location.pathname.startsWith("/projects")
                : location.pathname === link.path;

            return (
              <div key={link.path} className="relative">

                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-md bg-lime-400/20 blur-md"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.95, 1.1, 0.95],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}

                <button
                  onClick={() => handleNavigate(link.path)}
                  className={`relative z-10 text-sm tracking-wide ${
                    isActive ? "text-lime-400" : "hover:text-lime-400"
                  }`}
                >
                  {link.label}
                </button>

                {isActive && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-orange-400"
                  />
                )}
              </div>
            );
          })}

          <button
            onClick={handleSkillsClick}
            className="text-sm hover:text-lime-400 transition"
          >
            Skills
          </button>

          <button
            onClick={() => setShowContact(true)}
            className="relative px-[1.5px] py-[1.5px] rounded-full bg-gradient-to-r from-lime-400 to-orange-400"
          >
            <span className="block bg-black px-6 py-2 rounded-full hover:text-lime-300 transition">
              Hire Me
            </span>
          </button>
        </div>

        {/* HAMBURGER */}
        <button
          className="md:hidden z-50 flex flex-col gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : {}}
            className="w-6 h-[2px] bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : {}}
            className="w-6 h-[2px] bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : {}}
            className="w-6 h-[2px] bg-white"
          />
        </button>
      </div>

      {/* FULLSCREEN MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-10"
          >
            {[
              { label: "Work", action: () => navigate("/work") },
              { label: "About", action: () => navigate("/about") },
              { label: "Skills", action: handleSkillsClick },
            ].map((item, i) => (
              <motion.button
                key={item.label}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                onClick={() => {
                  setMenuOpen(false);
                  item.action();
                }}
                className="text-4xl font-bold text-white hover:text-lime-400 transition"
              >
                {item.label}
              </motion.button>
            ))}

            {/* HIRE ME */}
            <motion.button
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => {
                setMenuOpen(false);
                setShowContact(true);
              }}
              className="relative px-[1.5px] py-[1.5px] rounded-full bg-gradient-to-r from-lime-400 to-orange-400"
            >
              <span className="block bg-black px-8 py-3 rounded-full text-white hover:text-lime-300 transition text-lg font-semibold">
    Hire Me
  </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}