import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "react-icons/si";

export default function Skills() {

  /* MOBILE DETECTION*/
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const initialSkills = {
    frontend: [
      { name: "HTML", icon: "SiHtml5", color: "text-orange-500" },
      {
        name: "CSS",
        custom: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#1572B6"
              d="M3 3l1.5 17.5L12 23l7.5-2.5L21 3H3zm14.2 5.5l-.2 2.2-.6 6.3-.1.9L12 19l-4.3-1.1-.3-3.3h2.1l.2 1.5 2.3.6 2.3-.6.2-2.2H8.1l-.1-1.2-.2-2.1h7.6l.2-2.2H7.4l-.1-1.2-.2-2.1h10.1z"
            />
          </svg>
        ),
      },
      { name: "JavaScript", icon: "SiJavascript", color: "text-yellow-400" },
      { name: "Angular", icon: "SiAngular", color: "text-red-500" },
      { name: "React", icon: "SiReact", color: "text-cyan-400" },
    ],

    backend: [
      { name: "Node.js", icon: "SiNodedotjs", color: "text-green-500" },
      {
        name: "Express.js",
        custom: (
          <span className="text-gray-300 text-base font-semibold">
            ex
          </span>
        ),
      },
      { name: "MongoDB", icon: "SiMongodb", color: "text-green-400" },
      {
        name: "REST APIs",
        custom: (
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-purple-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.3 1a7 7 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7 7 0 0 0-1.7 1l-2.3-1-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.3-1a7 7 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7 7 0 0 0 1.7-1l2.3 1 2-3.5-2-1.5c.1-.3.1-.7.1-1z" />
          </svg>
        ),
      },
    ],

    tools: [
      { name: "Git", icon: "SiGit", color: "text-orange-500" },
      {
        name: "VS Code",
        custom: (
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="#007ACC"
              d="M17.6 2L9.6 9.5 5.5 6.8 2.5 9.3l3.5 2.7-3.5 2.7 3 2.5 4.1-2.7 8 7.5 3.4-1.6V3.6L17.6 2z"
            />
          </svg>
        ),
      },
      { name: "Figma (Basics)", icon: "SiFigma", color: "text-pink-400" },
      { name: "WordPress (Basics)", icon: "SiWordpress", color: "text-indigo-400" },
    ],
  };

  const [remaining, setRemaining] = useState([
    "frontend",
    "backend",
    "tools",
  ]);

  const [selected, setSelected] = useState([]);
  const [dragging, setDragging] = useState(null);

  /* SAFE ICON HANDLER */
  const getIcon = (item) => {
    if (item.custom) return item.custom;

    if (item.icon && Icons[item.icon]) {
      const IconComponent = Icons[item.icon];
      return <IconComponent className={`${item.color} text-xl`} />;
    }

    return <span className="text-xs">{item.name?.[0]}</span>;
  };

  /*  SAFE DROP */
  const handleDrop = (type) => {
    if (!type) return;

    if (!selected.includes(type) && initialSkills[type]) {
      setSelected((prev) => [...prev, type]);
      setRemaining((prev) => prev.filter((item) => item !== type));
    }
  };

  /* CARD */
  const Card = ({ title, items }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-[260px] min-h-[230px] rounded-3xl p-[1px]
      bg-gradient-to-r from-lime-400/70 to-orange-400/70"
    >
      <div className="w-full h-full rounded-3xl bg-black/90 px-5 py-5">

        <h3 className="text-white mb-4 capitalize">{title}</h3>

        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 px-4 py-2 text-sm
              border border-gray-800 rounded-full w-fit bg-black/60"
            >
              <div className="min-w-[26px] flex justify-center">
                {getIcon(item)}
              </div>
              <span className="text-gray-300">{item.name}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );

  return (
    <section
      id="skills"
      className="skills-bg text-white px-4 sm:px-8 py-12 sm:py-16"
    >
      <h2 className="font-heading text-2xl md:text-4xl mb-12 text-center md:text-left">
        What I work with
      </h2>

      {/* Mobile hint */}
      {isMobile && (
        <p className="text-xs text-gray-500 text-center mb-4">
          Tap to see
        </p>
      )}

      <div
        className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          if (isMobile) return;
          const type = e.dataTransfer.getData("type");
          handleDrop(type);
        }}
      >

        {/* DRAG BOX */}
        {remaining.length > 0 && (
          <motion.div
            layout
            className="w-full max-w-[260px] h-[200px] sm:h-[220px]
            rounded-3xl p-[1px]
            bg-gradient-to-r from-lime-400/70 to-orange-400/70"
          >
            <div className="w-full h-full rounded-3xl bg-black/90 flex flex-col items-center justify-center gap-3 px-5">

              {remaining.map((type) => (
                <motion.div
                  key={type}
                  draggable={!isMobile}
                  whileTap={{ scale: 0.95 }}

                  onClick={() => {
                    if (isMobile) handleDrop(type);
                  }}

                  onDragStart={(e) => {
                    if (!isMobile) {
                      e.dataTransfer.setData("type", type);
                      setDragging(type);
                    }
                  }}

                  onDragEnd={() => setDragging(null)}

                  className={`w-full cursor-pointer md:cursor-grab px-3 py-2 rounded-full text-center capitalize text-sm
                  ${
                    dragging === type
                      ? "bg-gradient-to-r from-lime-400 to-orange-400 text-black"
                      : "bg-black/60 border border-gray-700"
                  }`}
                >
                  {type}
                </motion.div>
              ))}

            </div>
          </motion.div>
        )}

        {/* CARDS */}
        <motion.div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
          <AnimatePresence>
            {selected.map((type) => (
              <Card
              key={type}
              title={
                type === "frontend"
                  ? "Interface"
                  : type === "backend"
                  ? "Systems"
                  : "Workflow"
              }
              items={initialSkills[type]}
            />
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}