import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Lightbulb,
  Briefcase,
  Sparkles,
  Code2,
  Pencil,
} from "lucide-react";

const cards = [
  {
    title: "My Journey",
    content:
      "I come from an Electronics and Communication Engineering background, where I developed a strong analytical way of thinking. Over time, I moved into development and started applying that mindset to real-world applications.",
    icon: <User />,
  },
  {
    title: "Building Experience",
    content:
      "I’ve worked on real-world projects, including a full-stack CRM system with authentication, admin workflows, and dashboards. Along the way, I’ve built responsive applications using Angular, Node.js, and MongoDB.",
    icon: <Briefcase />,
  },
  {
    title: "How I Think",
    content:
      "I focus on creating systems that are structured and scalable, while also paying close attention to how they feel to use-keeping things simple, clear, and easy to understand.",
    icon: <Sparkles />,
  },
  {
    title: "Beyond Development",
    content:
      "I’ve also worked on AI prompt writing and user testing, which gave me a better sense of how users interact with products and where things tend to feel confusing or break down.",
    icon: <Lightbulb />,
  },
  {
    title: "Currently Growing",
    content:
      "Right now, I’m learning React, Figma, and WordPress to strengthen my frontend skills, improve my design thinking, and get better at building complete, user-focused products.",
    icon: <Code2 />,
  },
  {
    title: "What’s Next",
    content:
      "I’m looking for remote opportunities across frontend and fullstack development, including MEAN stack and UI-focused work-where I can stay versatile, grow through real-world work, and contribute to meaningful products.",
    icon: <Pencil />,
  },
];


export default function About({ setShowNavbar }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setShowNavbar(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24 px-4 md:px-8 relative overflow-hidden">

      {/* OUTER GRID */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="w-full h-full bg-[linear-gradient(to_right,rgba(163,230,53,0.25)_1px,transparent_1px)] bg-[size:40px_100%]" />
      </div>

      {/* GRAIN */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/noise.png')]" />

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex max-w-[1100px] mx-auto h-[440px] gap-3">

        {cards.map((card, index) => {
          const isActive = active === index;

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActive(index)}
              animate={{ flex: isActive ? 3.6 : 0.42 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end"
            >

              {/* GRADIENT */}
              <div className="absolute inset-0 animate-gradient bg-[linear-gradient(180deg,rgba(163,230,53,0.35)_0%,rgba(120,140,40,0.25)_35%,rgba(180,120,60,0.25)_65%,rgba(253,186,116,0.35)_100%)]" />

              {/* GLOW */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 25% 20%, rgba(163,230,53,0.2), transparent 40%), radial-gradient(circle at 75% 80%, rgba(253,186,116,0.2), transparent 50%)",
                }}
              />

              {/* GRID */}
              <div className="absolute inset-0 opacity-[0.25]">
                <div
                  className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_100%]"
                  style={{ boxShadow: "inset 0 0 100px rgba(0,0,0,0.85)" }}
                />
              </div>

              {/* BORDER */}
              <div className="absolute inset-0 border border-lime-400/50 rounded-2xl" />

              {/* ICON */}
              {isActive && (
                <div className="absolute top-6 right-6 text-lime-400 opacity-90">
                  {React.cloneElement(card.icon, {
                    size: 100,
                    strokeWidth: 0.2,
                  })}
                </div>
              )}

              {/* CONTENT */}
              <div className="p-8 z-10 max-w-[520px]">
  <h2
    className={`transition-all duration-300 font-semibold tracking-[-0.01em]
    ${
      isActive
        ? "text-[24px] text-lime-400"
        : "text-[12px] text-orange-300 rotate-[-90deg] origin-left whitespace-nowrap"
    }`}
  >
    {card.title}
  </h2>

  {isActive && (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-5 text-gray-300 text-[15px] leading-[1.7] tracking-[0.01em]"
    >
      {card.content}
    </motion.p>
  )}
</div>


            </motion.div>
          );
        })}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex flex-col gap-3 max-w-[500px] mx-auto">

        {cards.map((card, index) => {
          const isActive = active === index;

          return (
            <motion.div
              key={index}
              onClick={() => setActive(index)}
              animate={{ height: isActive ? 200 : 70 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-xl overflow-hidden cursor-pointer flex flex-col justify-end"
            >

              {/* GRADIENT */}
              <div className="absolute inset-0 animate-gradient bg-[linear-gradient(180deg,rgba(163,230,53,0.32)_0%,rgba(120,140,40,0.22)_40%,rgba(180,120,60,0.22)_70%,rgba(253,186,116,0.3)_100%)]" />

              {/* GLOW */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 20% 20%, rgba(163,230,53,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(253,186,116,0.15), transparent 50%)",
                }}
              />

              {/* GRID */}
              <div className="absolute inset-0 opacity-[0.2]">
                <div
                  className="w-full h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:40px_100%]"
                  style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.8)" }}
                />
              </div>

              {/* BORDER */}
              <div className="absolute inset-0 border border-lime-400/50 rounded-xl" />

              {/* ICON */}
              {isActive && (
                <div className="absolute top-4 right-4 text-lime-400 opacity-90">
                  {React.cloneElement(card.icon, {
                    size: 36,
                    strokeWidth: 0.2,
                  })}
                </div>
              )}

              {/* CONTENT */}
              <div className="p-5 md:p-8 z-10 max-w-[90%] md:max-w-[520px]">
  <h2
    className={`transition-all duration-300 font-semibold tracking-[-0.01em]
    ${
      isActive
        ? "text-[18px] md:text-[24px] text-lime-400"
        : "text-[13px] md:text-[12px] text-orange-300"
    }`}
  >
    {card.title}
  </h2>

  {isActive && (
    <motion.p
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 md:mt-5 text-gray-300 text-[13px] md:text-[15px] leading-[1.6] md:leading-[1.7] tracking-[0.01em]"
    >
      {card.content}
    </motion.p>
  )}
</div>


            </motion.div>
          );
        })}
      </div>
    </div>
  );
}