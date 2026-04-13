import { useEffect, useState } from "react";

export default function TypingLine() {
  const lines = [
    "Building web systems that are scalable, performant, and thoughtfully structured.",
    "Designing interfaces that feel intuitive, clear, and effortless to navigate."
  ];

  const [currentLine, setCurrentLine] = useState(0);
  const [displayLines, setDisplayLines] = useState(["", ""]);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLine < lines.length) {
      if (charIndex < lines[currentLine].length) {
        const timeout = setTimeout(() => {
          setDisplayLines((prev) => {
            const updated = [...prev];
            updated[currentLine] += lines[currentLine][charIndex];
            return updated;
          });
          setCharIndex(charIndex + 1);
        }, 30); // smooth typing speed

        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLine(currentLine + 1);
          setCharIndex(0);
        }, 700); // pause before next line

        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, currentLine]);

  return (
    <div className="text-left max-w-xl mt-6 space-y-6">

      {/* LINE 1 */}
      <p className="font-heading text-white text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium tracking-[-0.01em]">
        {displayLines[0]}
      </p>

      {/* LINE 2 */}
      {displayLines[1] && (
        <p className="font-heading text-white text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium tracking-[-0.01em]">
          {displayLines[1]}
          {currentLine === 1 && (
            <span className="ml-1 inline-block w-[6px] bg-white animate-pulse">
              &nbsp;
            </span>
          )}
        </p>
      )}

    </div>
  );
}