'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Props {
  onOpen: () => void;
}

export default function EnvelopeScreen({ onOpen }: Props) {
  const [misses, setMisses] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const messages = ["¡Uy, casi! 😹", "¡Más rápida! 🐾", "¡Una más, tú puedes! jaja"];

  const handlePointerEnter = () => {
    if (misses < 3) {
      setMisses(m => m + 1);
      // Random position jumping
      const randomX = (Math.random() - 0.5) * 400; // Mover hasta 200px a los lados
      const randomY = (Math.random() - 0.5) * 400; // Mover hasta 200px arriba/abajo
      setPos({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-white z-50 p-4 overflow-hidden">
      
      <motion.div
        animate={pos}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="relative cursor-pointer group flex flex-col items-center"
        onClick={misses >= 3 ? onOpen : handlePointerEnter}
        onPointerEnter={handlePointerEnter}
        whileHover={{ scale: misses >= 3 ? 1.05 : 1 }}
        whileTap={{ scale: misses >= 3 ? 0.95 : 1 }}
      >
        <div className="relative w-80 h-56 bg-white rounded-lg shadow-xl overflow-hidden glass-panel flex items-center justify-center border border-pink-200">
          <div className="absolute inset-0 border-8 border-pink-50 opacity-50 pointer-events-none rounded-lg z-0"></div>
          <div className="absolute top-0 left-0 w-full h-full border-t-[112px] border-t-pink-100/60 border-l-[160px] border-l-transparent border-r-[160px] border-r-transparent pointer-events-none z-0"></div>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-pink-500 drop-shadow-md z-10"
          >
            <Heart size={64} fill="currentColor" />
          </motion.div>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-pink-700 opacity-80 group-hover:opacity-100 transition-opacity z-10">
            {misses >= 3 ? "¡Ahora sí! Toca para abrir ❤️" : "Toca el sobre para abrir tu sorpresa"}
          </div>
        </div>
        
        <h1 className="mt-12 text-3xl md:text-4xl font-bold text-gradient text-center drop-shadow-sm">
          Para Piojito ✨
        </h1>
      </motion.div>

      {/* Mocking Cat */}
      <AnimatePresence>
        {misses > 0 && misses <= 3 && (
          <motion.div 
            key={misses} // re-animate each time
            initial={{ y: 150, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-0 right-4 md:right-10 z-50 flex flex-col items-center pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl text-purple-700 font-bold text-lg mb-2 border border-purple-200">
              {messages[misses - 1]} 
            </div>
            
            <div className="relative w-32 h-28 bg-slate-800 rounded-t-[3rem] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)] flex justify-center">
              {/* Ears */}
              <div className="absolute -top-4 left-2 w-8 h-10 bg-slate-800 rounded-tl-full rotate-[-15deg] border-t border-l border-slate-700 z-0">
                <div className="absolute bottom-0 right-1 w-4 h-6 bg-pink-200/30 rounded-tl-full"></div>
              </div>
              <div className="absolute -top-4 right-2 w-8 h-10 bg-slate-800 rounded-tr-full rotate-[15deg] border-t border-r border-slate-700 z-0">
                <div className="absolute bottom-0 left-1 w-4 h-6 bg-pink-200/30 rounded-tr-full"></div>
              </div>

              {/* Headphones Band */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-[110%] h-12 border-[5px] border-purple-500 rounded-t-full border-b-transparent z-20"></div>
              
              {/* Headphones Earcups */}
              <div className="absolute top-4 -left-2 w-5 h-10 bg-purple-600 rounded-full z-30 shadow-md">
                <div className="absolute inset-1 bg-purple-500 rounded-full"></div>
              </div>
              <div className="absolute top-4 -right-2 w-5 h-10 bg-purple-600 rounded-full z-30 shadow-md">
                <div className="absolute inset-1 bg-purple-500 rounded-full"></div>
              </div>
              
              {/* Face */}
              <div className="absolute top-8 flex space-x-6 z-10">
                <div className="text-xl font-bold text-white -mt-2">^</div>
                <div className="text-xl font-bold text-white -mt-2">^</div>
              </div>
              
              <div className="absolute top-12 flex flex-col items-center z-10">
                <div className="w-3 h-2 bg-pink-400 rounded-full"></div>
                <div className="text-lg font-bold text-white -mt-1 leading-none opacity-80">w</div>
              </div>

              {/* Blush */}
              <div className="absolute top-10 left-3 w-4 h-2 bg-pink-500/50 rounded-full blur-[2px]"></div>
              <div className="absolute top-10 right-3 w-4 h-2 bg-pink-500/50 rounded-full blur-[2px]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
