import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkSection({ setShowNavbar }) {
  const [projects, setProjects] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  /* MOBILE STATE*/
  const [[mobileIndex, mobileDirection], setMobileIndex] = useState([0, 0]);

  const [videoLoading, setVideoLoading] = useState(true);

  const containerRef = useRef(null);
  const lastIndex = useRef(0);

  /* FETCH */
  useEffect(() => {
    fetch("https://personal-website-three-omega-48.vercel.app/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  /* make sure Navbar always visible*/
  useEffect(() => {
    setShowNavbar(true);
  }, [setShowNavbar]);

  /* RESET LOADING WHEN VIDEO CHANGES */
  useEffect(() => {
    setVideoLoading(true);
  }, [activeIndex]);

  useEffect(() => {
    setVideoLoading(true);
  }, [mobileIndex]);

  /* DESKTOP SCROLL */
  useEffect(() => {
    if (!projects.length) return;

    const handleScroll = () => {
      if (window.innerWidth < 768) return;

      const rect = containerRef.current.getBoundingClientRect();
      const vh = window.innerHeight;

      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        rect.height - vh
      );

      const index = Math.floor(scrolled / vh + 0.3);

      const safeIndex = Math.max(
        0,
        Math.min(projects.length - 1, index)
      );

      if (safeIndex !== lastIndex.current) {
        setDirection(safeIndex > lastIndex.current ? 1 : -1);
        lastIndex.current = safeIndex;
      }

      setActiveIndex(safeIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [projects]);

  /* MOBILE PAGINATION */
  const paginate = (newDirection) => {
    setMobileIndex(([prev]) => {
      let next = prev + newDirection;

      if (next < 0) next = 0;
      if (next > projects.length - 1) next = projects.length - 1;

      return [next, newDirection];
    });
  };

  /* SWIPE ANIMATION */
  const swipeVariants = {
    enter: (direction) => ({
      y: direction > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      y: direction > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.98,
    }),
  };

  if (!projects.length) {
    return <div className="h-screen bg-black" />;
  }

  return (
    <div className="bg-black text-white antialiased">

      {/* DESKTOP */}
      <div
        ref={containerRef}
        className="hidden md:block snap-y snap-mandatory"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex">

          {/* LEFT - VIDEO */}
          <div className="w-1/2 flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: direction * 60, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -direction * 60 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[700px]"
              >
                <div className="p-[2px] rounded-2xl bg-gradient-to-br from-lime-400 to-orange-400">
                  <div className="bg-black rounded-2xl p-3 relative">

                    {videoLoading && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-10 h-10 border-4 border-dotted border-lime-400 border-t-orange-400 rounded-full animate-spin"></div>
                      </div>
                    )}

                    <video
                      key={activeIndex}
                      src={projects[activeIndex].video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onLoadedData={() => setVideoLoading(false)}
                      className="w-full max-h-[60vh] object-cover rounded-xl"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT - CONTENT */}
          <div className="w-1/2 px-20 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: direction * 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -direction * 80 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <h2 className="font-heading text-4xl md:text-5xl font-semibold mb-6">
                  {projects[activeIndex].title}
                </h2>

                <p className="text-white/70 text-lg mb-10">
                  {projects[activeIndex].description}
                </p>

                <div className="flex items-center justify-between">
                  <Link to={`/projects/${projects[activeIndex]._id}`}>
                    <div className="rounded-full p-[1px] bg-gradient-to-r from-lime-400 to-orange-400 hover:scale-105 transition duration-300">
                      <div className="px-6 py-3 rounded-full bg-black text-sm">
                        View Case Study
                      </div>
                    </div>
                  </Link>

                  <div className="text-white/50 text-sm">
                    [{String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(projects.length).padStart(2, "0")}]
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden h-screen overflow-hidden relative">

        <AnimatePresence initial={false} custom={mobileDirection}>
          <motion.div
            key={mobileIndex}
            custom={mobileDirection}
            variants={swipeVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              const swipe = info.offset.y;
              if (swipe < -80) paginate(1);
              else if (swipe > 80) paginate(-1);
            }}
            className="absolute inset-0 flex flex-col justify-center px-4"
          >

            {/* VIDEO */}
            <div className="w-full mb-6">
              <div className="p-[2px] rounded-2xl bg-gradient-to-br from-lime-400 to-orange-400">
                <div className="bg-black rounded-2xl p-2 relative">

                  {videoLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-8 h-8 border-4 border-dotted border-lime-400 border-t-orange-400 rounded-full animate-spin"></div>
                    </div>
                  )}

                  <video
                    src={projects[mobileIndex].video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => setVideoLoading(false)}
                    className="w-full h-[240px] object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-4">
              <h2 className="font-heading text-2xl font-semibold">
                {projects[mobileIndex].title}
              </h2>

              <p className="text-white/70 text-sm">
                {projects[mobileIndex].description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <Link to={`/projects/${projects[mobileIndex]._id}`}>
                  <div className="rounded-full p-[1px] bg-gradient-to-r from-lime-400 to-orange-400">
                    <div className="px-4 py-2 rounded-full bg-black text-xs">
                      View Project
                    </div>
                  </div>
                </Link>

                <div className="text-white/40 text-xs">
                  [{String(mobileIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}]
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
