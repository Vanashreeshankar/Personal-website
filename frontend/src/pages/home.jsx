import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import TypingCharacter from "../components/typingCharacter";
import TypingLine from "../components/typingLine";
import Skills from "./skills";

export default function Home({ setShowNavbar, isFirstLoad }) {
  const [phase, setPhase] = useState(0);

  

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref") || "direct";

    const API_URL =
      window.location.hostname === "localhost"
        ? "http://localhost:5000"
        : "";

    fetch(`${API_URL}/api/visit?ref=${ref}`).catch(() => {});
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
  
    /* Direct navigation to skills*/
    if (hash === "#skills") {
      setPhase(3);
      setShowNavbar(true);
  
      setTimeout(() => {
        document.getElementById("skills")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
  
      return;
    }
  
    /* If NOT first load & skip boot*/
    if (!isFirstLoad) {
      setPhase(3);
      setShowNavbar(true);
      return;
    }
  
    /* Boot animation (only once per refresh)*/
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 4500);
    const t3 = setTimeout(() => setPhase(3), 5500);
  
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (phase === 3) setShowNavbar(true);
  }, [phase]);

  //for scrollbar
  useEffect(() => {
    if (phase < 3) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 3 && window.location.hash === "#skills") {
      const timer = setTimeout(() => {
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 400);
  
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <div className="w-full bg-black text-white">

      {/* BOOT SCREEN */}
      {phase < 3 && (
        <motion.div
          className="min-h-screen flex flex-col items-center justify-center text-center px-4"
          animate={{
            opacity: phase >= 2 ? 0 : 1,
            scale: phase >= 2 ? 0.9 : 1,
          }}
          transition={{ duration: 1 }}
        >
          {phase === 0 && (
            <div className="flex text-4xl sm:text-5xl md:text-7xl font-semibold gap-2 sm:gap-5 tracking-[0.08em]">
              <motion.span
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-lime-400"
              >
                VANA
              </motion.span>

              <motion.span
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                className="text-orange-300"
              >
                SHREE
              </motion.span>
            </div>
          )}

          {phase >= 1 && (
            <>
              <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-4xl sm:text-6xl md:text-8xl font-semibold bg-gradient-to-r from-lime-400 to-orange-300 bg-clip-text text-transparent"
              >
                VANASHREE
              </motion.h1>

              <p className="mt-4 text-gray-400 italic text-sm sm:text-base">
                Fullstack Developer & Designer
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* HERO (RESPONSIVE FIX) */}
      {phase === 3 && (
  <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">

    {/*  BACKGROUND */}
    <div className="absolute inset-0">

      {/* Glow Left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute left-[-80px] top-[0%] w-[300px] h-[300px] sm:w-[600px] sm:h-[500px]
        bg-[radial-gradient(circle_at_top_left,rgba(132,204,22,0.45),transparent_60%)]
        blur-[100px] sm:blur-[140px]"
      />

      {/* Glow Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1.1, scale: 1 }}
        transition={{ duration: 1.4 }}
        className="absolute right-[-120px] top-[10%] w-[400px] h-[400px] sm:w-[800px] sm:h-[800px]
        bg-orange-400 opacity-20 blur-[120px] sm:blur-[180px]"
      />

      {/* Overlay */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_center,rgba(20,20,30,0.45),black)]"
      />
    </div>

    {/* CONTENT */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.2 },
        },
      }}
      className="relative z-10 w-full max-w-7xl
      flex flex-col md:flex-row
      items-center justify-center md:justify-between
      gap-10 md:gap-12 text-center md:text-left tracking-tight"
    >

      {/* TEXT SIDE */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-6 sm:gap-8 max-w-lg"
      >
        <TypingLine />
      </motion.div>

      {/* CHARACTER SIDE */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 60, scale: 0.9 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        transition={{ duration: 0.7 }}
        animate={{
          y: [0, -10, 0], // floating effect
        }}
        className="flex justify-center items-center w-full md:w-auto"
      >
        <div className="scale-[0.8] sm:scale-100">
          <TypingCharacter />
        </div>
      </motion.div>

    </motion.div>
  </section>
)}

      {/*  SKILLS  */}
      {phase === 3 && <Skills />}
    </div>
  );
}