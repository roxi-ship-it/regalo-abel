'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Attempt autoplay if possible
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, type: 'spring' }}
      className="fixed top-6 right-6 z-50"
    >
      <audio 
        ref={audioRef} 
        loop 
        src="/iris.mp3" 
        onTimeUpdate={(e) => {
          const currentTime = (e.target as HTMLAudioElement).currentTime;
          window.dispatchEvent(new CustomEvent('karaokeTimeUpdate', { detail: currentTime }));
        }}
      />
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-14 h-14 rounded-full glass shadow-[0_8px_32px_rgba(219,39,119,0.3)] flex items-center justify-center text-pink-600 border border-pink-200 focus:outline-none"
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Pause size={24} className="relative z-10" />
            <motion.div 
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-pink-400 rounded-full -z-10"
            />
          </div>
        ) : (
          <Play size={24} className="ml-1" />
        )}
      </motion.button>
    </motion.div>
  );
}
