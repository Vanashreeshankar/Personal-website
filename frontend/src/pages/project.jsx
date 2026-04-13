import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    fetch(`https://personal-website-three-omega-48.vercel.app/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!project) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <motion.div
      className="bg-black text-white min-h-screen px-5 md:px-16 py-8 md:py-10 pb-20 md:pb-10"
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-lime-400 to-orange-400 z-50"
      />

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 md:mb-10 text-white/50 hover:text-white transition text-sm md:text-base"
      >
        ← All Projects
      </button>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 md:mb-12">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold tracking-[-0.01em]">
          {project.title}
        </h1>

        {/* DESKTOP BUTTONS ONLY */}
        {(project.demo || project.github) && (
          <div className="hidden md:flex gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-[1px] bg-gradient-to-r from-lime-400 to-orange-400"
              >
                <span className="px-5 py-2 rounded-full bg-black block text-sm">
                  Live Demo
                </span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-[1px] bg-gradient-to-r from-lime-400 to-orange-400"
              >
                <span className="px-5 py-2 rounded-full bg-black block text-sm">
                  Source Code
                </span>
              </a>
            )}
          </div>
        )}
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-20">
        
        {/* VIDEO */}
        <div className="w-full md:w-[45%] md:sticky md:top-24 h-fit">
          <motion.div
            style={{ y: yParallax }}
            className="w-full h-[220px] md:h-[320px] rounded-xl md:rounded-2xl p-[2px] bg-gradient-to-br from-lime-400 to-orange-400"
          >
            <div className="w-full h-full bg-black rounded-xl md:rounded-2xl p-2 md:p-3">
              <div className="w-full h-full rounded-lg md:rounded-xl overflow-hidden">
                <video
                  src={project.video}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="w-full md:w-[55%] space-y-10 md:space-y-16 max-w-[650px]">
          
          <p className="text-white/80 text-base md:text-lg leading-relaxed tracking-[0.01em]">
            {project.description}
          </p>

          <p className="text-white/60 leading-relaxed">
            The challenge was{" "}
            {project.problem?.toLowerCase()}
          </p>

          <div className="text-white/60 leading-relaxed">
            <p className="mb-3 text-white/70">
             The approach:
            </p>

            <ul className="space-y-2">
              {(project.features || []).map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 md:p-6">
            <p className="text-white/80 mb-3">
              Impact:
            </p>

            <p className="text-white/60 mb-4">
              {project.impact}
            </p>

            <ul className="space-y-2 text-lime-400 text-sm md:text-base">
              {(project.metrics || []).map((m, i) => (
                <li key={i}>✔ {m}</li>
              ))}
            </ul>
          </div>

          <p className="text-white/60 leading-relaxed">
            Key learnings:{" "}
            {project.learnings?.toLowerCase()}
          </p>

          <div>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
              {(project.tech || []).map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border border-white/20 rounded-full text-xs md:text-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="text-white/50 text-xs md:text-sm">
              Role: {project.role}
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM BAR (MATCHES DESKTOP STYLE) */}
      {(project.demo || project.github) && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 p-3 flex gap-2">

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full p-[1px] bg-gradient-to-r from-lime-400 to-orange-400"
            >
              <span className="block text-center py-2 rounded-full bg-black text-white text-sm">
                Live Demo
              </span>
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-full p-[1px] bg-gradient-to-r from-lime-400 to-orange-400"
            >
              <span className="block text-center py-2 rounded-full bg-black text-white text-sm">
                Source Code
              </span>
            </a>
          )}

        </div>
      )}
    </motion.div>
  );
}
