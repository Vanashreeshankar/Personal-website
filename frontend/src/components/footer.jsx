import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-black px-6 md:px-16 py-32 overflow-hidden text-white">

      {/* Premium Background (WORKING + TEXTURED) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), transparent 60%),
            radial-gradient(circle at 60% 25%, rgba(255,140,0,0.05), transparent 50%),
            radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 100% 100%, 3px 3px",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading (Vintage infusion) */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-3xl md:text-5xl font-semibold mb-10 tracking-tight leading-[1.2] pb-2 bg-gradient-to-r from-white via-gray-200 to-lime-300 bg-clip-text text-transparent">
          Let’s build something that actually matters
          <span className="text-lime-400">.</span>
        </motion.h2>

        {/* Divider 1 */}
        <div className="h-px bg-gradient-to-r from-transparent via-lime-400/20 to-transparent mb-12" />

        {/* Content Row */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-12 mb-12">

          {/* LEFT: Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2 text-left"
          >
            <div className="flex items-center gap-3 text-gray-300">
              <span className="w-2.5 h-2.5 bg-lime-400 rounded-full animate-pulse shadow-[0_0_5px_#A3FF12]" />
              <span>Open to opportunities</span>
            </div>
            <p className="text-gray-500 ml-5 text-sm">
              Remote
            </p>
          </motion.div>

          {/* CENTER: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-12 md:gap-16"
          >

            {/* Email */}
            <a
              href="mailto:vanashree.ravishankar@gmail.com?subject=Let's%20build%20something&body=Hi%20Vanashree,"
              className="group flex flex-col items-center gap-2"
            >
              <svg className="w-7 h-7 text-gray-500 group-hover:text-lime-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_#A3FF12]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M3 6l9 6 9-6" />
                <rect x="3" y="6" width="18" height="12" rx="2" />
              </svg>
              <span className="text-xs text-gray-500 group-hover:text-white transition">
                Say hello
              </span>
            </a>

            {/* GitHub */}
            <a href="https://github.com/Vanashreeshankar" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <svg className="w-7 h-7 text-gray-500 group-hover:text-lime-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_#A3FF12]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008 10.94c.58.1.79-.25.79-.56v-2c-3.26.7-3.95-1.57-3.95-1.57-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.84 2.8 1.3 3.48.99.1-.78.42-1.3.76-1.6-2.6-.3-5.33-1.3-5.33-5.78 0-1.28.46-2.33 1.22-3.15-.12-.3-.53-1.52.12-3.18 0 0 1-.32 3.3 1.2a11.3 11.3 0 016 0c2.3-1.52 3.3-1.2 3.3-1.2.65 1.66.24 2.88.12 3.18.76.82 1.22 1.87 1.22 3.15 0 4.5-2.73 5.47-5.34 5.77.43.37.82 1.1.82 2.22v3.3c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z" />
              </svg>
              <span className="text-xs text-gray-500 group-hover:text-white transition">
                View code
              </span>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/vanashree-69a303199" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
              <svg className="w-7 h-7 text-gray-500 group-hover:text-lime-400 transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_5px_#A3FF12]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.5 8h4v15h-4V8zm7 0h3.6v2.1h.05c.5-.95 1.75-2.1 3.6-2.1 3.85 0 4.55 2.53 4.55 5.8V23h-4v-7.9c0-1.88-.03-4.3-2.6-4.3-2.6 0-3 2.03-3 4.16V23h-4V8z" />
              </svg>
              <span className="text-xs text-gray-500 group-hover:text-white transition">
                Connect
              </span>
            </a>

          </motion.div>

          {/* RIGHT: Resume */}
          <motion.a
            href="https://drive.google.com/file/d/1dkchoRPaSLBHe6LAyj1_Ai-2vsdp8bcQ/view?usp=sharing"
            target="_blank"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-orange-400 hover:text-orange-300 text-lg flex items-center gap-2 hover:translate-x-1 transition-all hover:drop-shadow-[0_0_6px_#FF8A00]"
          >
            View Resume →
          </motion.a>

        </div>

        {/* Premium Divider with Text */}
        <div className="relative flex items-center justify-center my-12">

          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-lime-400/20 to-transparent" />

          <span className="px-6 text-sm text-gray-500 whitespace-nowrap">
            Built with <span className="text-white">React</span> • Styled with{" "}
            <span className="text-white">CSS</span> • Deployed on{" "}
            <span className="text-white hover:text-lime-400 transition">
              Vercel ↗
            </span>
          </span>

          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-600">
          © 2026 | Created and Designed by Vanashree
        </p>

      </div>
    </footer>
  );
}