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
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[998]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
        }}
        style={{
          border: "2px solid rgba(255,165,0,0.9)",
          background: "transparent",
          boxShadow: "0 0 8px rgba(255,165,0,0.5)",
        }}
      />
    </>
  );
};

export default CursorGlow;
