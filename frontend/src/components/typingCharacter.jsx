export default function TypingCharacter() {
    return (
      <div className="relative flex justify-center items-center">
  
        {/* KEYBOARD LIGHT SOURCE */}
        <div className="absolute bottom-[8%] left-[25%] w-[160px] h-[100px]
          bg-lime-300 opacity-50 blur-[70px] z-10"
        />
  
        {/* ORANGE AMBIENT */}
        <div className="absolute right-0 top-[30%] w-[300px] h-[300px]
          bg-orange-400 opacity-25 blur-[120px] z-0"
        />
  
        {/* IMAGE */}
        <img
          src="/girl1.png"
          alt="character"
          className="relative z-20 w-[500px] md:w-[700px] lg:w-[800px] -mr-40"
        />
  
      </div>
    );
  }