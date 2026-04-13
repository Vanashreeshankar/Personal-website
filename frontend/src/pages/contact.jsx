import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Reusable Floating Input */
function FloatingInput({ name, value, onChange, label, type = "text" }) {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required
        autoComplete="off"
        className="peer w-full bg-[#141414] border border-gray-800 text-white p-2.5 text-sm rounded-md
        focus:outline-none focus:border-lime-400 transition"
      />
      <label
        className={`absolute left-3 px-1 bg-[#0b0b0b] text-gray-500 text-xs transition-all
        ${
          value
            ? "-top-2 text-lime-400"
            : "top-2.5 peer-focus:-top-2 peer-focus:text-lime-400"

        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default function Contact({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "frontend",
    jobType: "freelance",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle");

  const textareaRef = useRef(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => onClose(), 2500);
    }
  }, [status, onClose]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // auto-resize textarea
    if (e.target.name === "message") {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => setStatus("idle");

  const isFormValid =
    form.name &&
    form.email &&
    form.service &&
    form.jobType &&
    form.message;

  return (
    <AnimatePresence>
      <motion.div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Card */}
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative p-[1px] rounded-2xl bg-gradient-to-r from-lime-400 to-orange-400"
        >
          <div className="w-[92vw] max-w-md max-h-[90vh] overflow-y-auto p-5 rounded-2xl bg-[#0b0b0b]">

            {/* SUCCESS */}
            {status === "success" && (
              <div className="text-center py-10 space-y-3">
                <p className="text-white text-lg font-medium">
                  Message received ✨
                </p>
                <p className="text-gray-400 text-sm">
                  I’ll get back to you soon.
                </p>
              </div>
            )}

            {/* ERROR */}
            {status === "error" && (
              <div className="text-center py-10 space-y-4">
                <p className="text-white text-lg font-medium">
                  Something went wrong
                </p>
                <p className="text-gray-400 text-sm">
                  Please try again or reach out via email.
                </p>

                <div className="flex justify-center items-center gap-4">
                  <button
                    onClick={resetForm}
                    className="text-sm text-lime-400 hover:underline"
                  >
                    Try again
                  </button>

                  <button
                    onClick={onClose}
                    className="text-sm text-gray-400 hover:text-white transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* FORM */}
            {status === "idle" && (
              <>
                <motion.h5
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="font-heading text-2xl md:text-3xl font-medium mb-6 tracking-tight leading-snug pb-2 bg-gradient-to-r from-white via-gray-200 to-lime-300 bg-clip-text text-transparent"
                >
                  Let's build something meaningful
                  <span className="text-lime-400">.</span>
                </motion.h5>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">

                  <FloatingInput
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    label="Name"
                  />

                  <FloatingInput
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    label="Email"
                    type="email"
                  />

                  {/* SERVICE */}
                  <select
                    name="service"
                    onChange={handleChange}
                    className="bg-[#141414] border border-gray-800 text-white p-2.5 text-sm rounded-md
                    focus:outline-none focus:border-lime-400 transition"
                  >
                    <option value="frontend">Frontend Development</option>
                    <option value="fullstack">Fullstack Development</option>
                    <option value="web">Web Development</option>
                    <option value="ui/ux">UI/UX</option>
                    <option value="landing page">Landing Page Design</option>
                  </select>

                  {/* JOB TYPE */}
                  <select
                    name="jobType"
                    onChange={handleChange}
                    className="bg-[#141414] border border-gray-800 text-white p-2.5 text-sm rounded-md
                    focus:outline-none focus:border-lime-400 transition"
                  >
                    <option value="full-time">Full-Time</option>
                    <option value="part-time">Part-Time</option>
                    <option value="freelance">Freelance</option>
                    <option value="contract">Contract</option>
                  </select>

                  {/* TEXTAREA */}
                  <textarea
                    ref={textareaRef}
                    name="message"
                    placeholder="Briefly describe what you're looking to build..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={1}
                    className="bg-[#141414] border border-gray-800 text-white p-2.5 text-sm rounded-md
                    focus:outline-none focus:border-lime-400
                    resize-none overflow-hidden transition"

                  />

                  {/* BUTTONS */}
                  <div className="flex justify-between items-center mt-2">

                    <motion.button
                      type="button"
                      onClick={onClose}
                      whileTap={{ scale: 0.96 }}
                      className="px-4 py-1.5 text-sm rounded-full border border-gray-700 text-gray-400
                      hover:border-lime-400 hover:text-white transition"
                    >
                      Close
                    </motion.button>

                    <motion.button
                      type="submit"
                      whileTap={{ scale: 0.96 }}
                      disabled={!isFormValid || loading}
                      className={`px-4 py-1.5 text-sm rounded-full border transition
                      ${
                        isFormValid
                          ? "border-lime-400 text-white hover:bg-gradient-to-r hover:from-lime-400 hover:to-orange-400 hover:text-black"
                          : "border-gray-700 text-gray-500 cursor-not-allowed opacity-60"
                      }`}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </motion.button>

                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}