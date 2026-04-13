import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <>
      {/* Lime Small Cursor (fast) */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[999] bg-lime-400"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.02,
        }}
      />

      {/* Orange Large Cursor (smooth follower) */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[998]"
        animate={{
          x: position.x - 32,
          y: position.y - 32,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(255,165,0,0.2) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />
    </>
  );
};

export default CursorGlow;
