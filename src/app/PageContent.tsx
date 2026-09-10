'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import EnvelopeScreen from '@/components/EnvelopeScreen';
import TypewriterLetter from '@/components/TypewriterLetter';
import AutumnTreeAndCat from '@/components/AutumnTreeAndCat';
import TimeCounter from '@/components/TimeCounter';
import AudioPlayer from '@/components/AudioPlayer';
import PhotoStrip from '@/components/PhotoStrip';
import LyricsWidget from '@/components/LyricsWidget';

export default function PageContent() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    // Disparar confeti para cumpleaños
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb7b2', '#ffdac1', '#e2f0cb', '#b5ead7', '#c7ceea']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="envelope"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-white"
          >
            <EnvelopeScreen onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`lg:h-screen lg:overflow-hidden min-h-screen p-4 md:p-6 flex flex-col transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'} relative z-10 max-w-7xl mx-auto`}>
        
        <header className="text-center pt-2 pb-4 shrink-0">
          <motion.h1 
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="text-4xl md:text-5xl font-bold text-gradient drop-shadow-sm font-sans tracking-tight"
          >
            ¡Feliz Cumpleaños Aslyn!
          </motion.h1>
        </header>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 xl:gap-6 items-stretch mb-4">
          
          {/* Photo Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isOpen ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="hidden lg:block w-40 xl:w-48 flex-shrink-0 order-3 lg:order-1 h-full"
          >
            <PhotoStrip />
          </motion.div>

          {/* Letter */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isOpen ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex-1 min-w-0 h-[400px] lg:h-full order-2 lg:order-2"
          >
            <TypewriterLetter startAnimation={isOpen} />
          </motion.div>

          {/* Tree and Cat */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={isOpen ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex-1 min-w-0 h-[400px] lg:h-full order-1 lg:order-3"
          >
            <AutumnTreeAndCat />
          </motion.div>

        </div>

        {/* Timer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isOpen ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="shrink-0 pb-2 order-4"
        >
          <TimeCounter />
        </motion.div>
        
      </div>
      
      {isOpen && <AudioPlayer />}
      {isOpen && <LyricsWidget />}
    </>
  );
}
