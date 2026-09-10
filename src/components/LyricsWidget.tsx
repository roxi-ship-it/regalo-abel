'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music } from 'lucide-react';

export default function LyricsWidget() {
  const [isHovered, setIsHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTimeUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      setCurrentTime(customEvent.detail);
    };

    window.addEventListener('karaokeTimeUpdate', handleTimeUpdate);
    return () => {
      window.removeEventListener('karaokeTimeUpdate', handleTimeUpdate);
    };
  }, []);

  const lyrics = [
    { time: 0, text: "♪ (Introducción musical) ♪" },
    { time: 10, text: "" },
    { time: 12, text: "Y renunciaría a la eternidad por tocarte" },
    { time: 17, text: "Porque sé que me sientes de alguna forma" },
    { time: 22, text: "Estás más cerca del cielo que nunca" },
    { time: 27, text: "Y no quiero ir a casa ahora mismo" },
    { time: 32, text: "" },
    { time: 34, text: "Y lo único que puedo saborear es este momento" },
    { time: 40, text: "Y todo lo que puedo respirar es tu vida" },
    { time: 44, text: "Y más vale tarde que nunca" },
    { time: 48, text: "Simplemente no quiero extrañarte esta noche" },
    { time: 52, text: "" },
    { time: 53, text: "Y no quiero que el mundo me vea" },
    { time: 58, text: "Porque no creo que lo entenderían" },
    { time: 62, text: "Cuando todo está hecho para romperse" },
    { time: 68, text: "Solo quiero que sepas quién soy" },
    { time: 74, text: "" },
    { time: 100, text: "Y no puedes pelear contra las lágrimas que no llegan" },
    { time: 105, text: "O el momento de verdad en tus mentiras" },
    { time: 111, text: "Cuando todo se siente como en las películas" },
    { time: 116, text: "Sí, sangras solo para saber que estás vivo" },
    { time: 120, text: "" },
    { time: 121, text: "Y no quiero que el mundo me vea" },
    { time: 125, text: "Porque no creo que lo entenderían" },
    { time: 131, text: "Cuando todo está hecho para romperse" },
    { time: 135, text: "Solo quiero que sepas quién soy" },
    { time: 139, text: "" },
    { time: 196, text: "Y no quiero que el mundo me vea" },
    { time: 201, text: "Porque no creo que lo entenderían" },
    { time: 207, text: "Cuando todo está hecho para romperse" },
    { time: 211, text: "Solo quiero que sepas quién soy" },
    { time: 215, text: "" },
    { time: 217, text: "Solo quiero que sepas quién soy" },
    { time: 222, text: "Solo quiero que sepas quién soy" },
    { time: 227, text: "Solo quiero que sepas quién soy" }
  ];

  // Determine active index
  let activeIndex = -1;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      activeIndex = i;
    } else {
      break;
    }
  }

  // Auto scroll effect
  useEffect(() => {
    if (isHovered && containerRef.current && activeIndex >= 0) {
      const container = containerRef.current;
      const activeElement = container.children[activeIndex] as HTMLElement;
      if (activeElement) {
        // Scroll so the active line is nicely positioned in view
        container.scrollTo({
          top: activeElement.offsetTop - container.clientHeight / 2 + 30,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIndex, isHovered]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.8, type: 'spring' }}
      className="fixed bottom-6 left-6 z-50 flex items-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // For mobile tap
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="relative flex items-end">
        {/* Floating Notes Animation */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`note-${i}`}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [-10, -80],
              x: [0, i % 2 === 0 ? 25 + i * 3 : -25 - i * 3],
              scale: [0.5, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            className="absolute left-4 bottom-4 text-pink-400 z-10 pointer-events-none text-xl"
          >
            {i % 2 === 0 ? '🎵' : '🎶'}
          </motion.div>
        ))}

        {/* Floating Button */}
        <motion.button
          animate={{ boxShadow: ["0 8px 32px rgba(219,39,119,0.3)", "0 8px 40px rgba(219,39,119,0.7)", "0 8px 32px rgba(219,39,119,0.3)"] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full flex items-center justify-center text-pink-600 border border-pink-200 focus:outline-none z-20 relative bg-white/70 backdrop-blur-md hover:bg-white transition-colors"
        >
          <Music size={24} />
        </motion.button>

        {/* Lyrics Panel */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ transformOrigin: 'bottom left' }}
              className="absolute bottom-16 left-0 mb-2 w-72 md:w-80 backdrop-blur-xl bg-white/80 p-6 rounded-3xl rounded-bl-none shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-pink-200 z-10"
            >
              <h4 className="text-pink-600 font-bold mb-3 border-b border-pink-100 pb-2 flex items-center gap-2 font-sans tracking-wide">
                <Music size={16} /> Iris (Español)
              </h4>
              <div 
                ref={containerRef}
                className="max-h-64 overflow-y-auto custom-scrollbar pr-3 text-[0.9rem] text-gray-700 italic font-serif leading-relaxed relative"
              >
                {lyrics.map((line, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <p key={index} className={`transition-all duration-300 ${line.text === "" ? "h-3" : "mb-2"}`}>
                      <span className={isActive && line.text !== "" ? "bg-yellow-200/90 text-gray-900 font-bold px-1.5 py-0.5 rounded-md shadow-sm transition-all duration-300" : "transition-all duration-300 px-1.5 py-0.5"}>
                        {line.text}
                      </span>
                    </p>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
