import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Chatbot({ setShowContact }) {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi, I can help you explore my work, skills, or experience", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  const toggleChat = () => setOpen(!open);

  const randomRadius = () => {
    const values = [
      "10px 16px 6px 14px",
      "14px 8px 12px 6px",
      "12px 18px 8px 10px"
    ];
    return values[Math.floor(Math.random() * values.length)];
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      text: input,
      sender: "user",
      radius: randomRadius()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const botMsg = { text: data.text, sender: "bot" };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        handleAction(data.action);
        setLoading(false);
      }, 700);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Something went wrong. Please try again", sender: "bot" }
      ]);
      setLoading(false);
    }
  };

  const handleAction = (action) => {
    if (!action) return;

    if (action === "resume") {
      window.open(
        "https://drive.google.com/file/d/1dkchoRPaSLBHe6LAyj1_Ai-2vsdp8bcQ/view?usp=sharing"
      );
    }

    if (action === "contact") setShowContact(true);

    if (action === "skills") {
      if (window.location.pathname !== "/") {
        navigate("/#skills");
      } else {
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (action === "projects") navigate("/work");
    if (action === "about") navigate("/about");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <>
      {/* TOGGLE BUTTON */}
      <motion.div
  whileTap={{ scale: 0.9 }}
  onClick={toggleChat}
  className="fixed bottom-8 right-8 z-[999999] cursor-pointer"
>
  <div className="relative w-[62px] h-[62px] flex items-center justify-center rounded-full">


    {/* OUTER GLOW */}
    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,_#84cc16,_#f97316,_#84cc16)] blur-md opacity-40"></div>

    {/* THICK GRADIENT RING */}
    <div className="absolute inset-0 rounded-full p-[4px] animate-spinSlow bg-[conic-gradient(from_0deg,_#84cc16,_#f97316,_#84cc16)]">
      <div className="w-full h-full rounded-full bg-black"></div>
    </div>

    {/* INNER CORE (compressed icon container) */}
    <div className="relative z-10 w-[42px] h-[42px] rounded-full bg-black flex items-center justify-center border border-white/10 shadow-inner">
     
      {/* subtle inner glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-lime-400/10 to-orange-400/10 blur-sm"></div>

      {/* icon */}
      <span className="text-white text-xs tracking-wide">VS</span>
    </div>

  </div>
</motion.div>


      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-8 z-[999999] rounded-xl p-[1.5px]
            bg-[linear-gradient(135deg,_#84cc16,_#f97316)]"
          >
            {/* Gradient Border Wrapper */}
            <div className="w-[300px] h-[420px] flex flex-col rounded-xl bg-black overflow-hidden">


              {/* Header */}
              <div className="p-3 text-center text-white text-sm border-b border-white/10">
                Vanashree
              </div>

              {/* Body */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`text-sm max-w-[80%] ${
                      msg.sender === "user"
                        ? "ml-auto border border-orange-500/60 text-orange-400 px-3 py-2"
                        : "text-gray-400 border-l border-lime-400/30 pl-2"
                    }`}
                    style={
                      msg.sender === "user"
                        ? { borderRadius: msg.radius }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                ))}

                {/* Typing */}
                {loading && (
                  <div className="flex gap-1 pl-2">
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 p-2 border-t border-white/10">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, or experience..."
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 px-3 py-2 bg-transparent border border-white/20 rounded text-white text-sm outline-none focus:border-lime-400/60"
                />
                <button
                  onClick={sendMessage}
                  className="w-9 h-9 flex items-center justify-center border border-orange-500/50 rounded text-orange-400 hover:bg-orange-500/10"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
