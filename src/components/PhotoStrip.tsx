'use client';
import { motion } from 'framer-motion';

export default function PhotoStrip() {
  const photos = [
    '/foto1.jpg',
    '/foto2.jpg',
    '/foto3.jpg',
    '/foto4.jpg',
    '/foto5.jpg'
  ];
  
  // Double the array for seamless looping
  const loopedPhotos = [...photos, ...photos];

  return (
    <div className="h-full w-full overflow-hidden relative rounded-2xl glass border border-pink-100 shadow-inner flex justify-center bg-white/30">
      {/* Top and Bottom Fades */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none rounded-t-2xl"></div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/90 to-transparent z-10 pointer-events-none rounded-b-2xl"></div>

      <motion.div
        animate={{ y: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
        className="flex flex-col gap-6 py-4"
      >
        {loopedPhotos.map((src, idx) => {
          // Slight alternating rotation for polaroids
          const rotation = idx % 2 === 0 ? '-rotate-3' : 'rotate-2';
          
          return (
            <div key={idx} className="relative group">
              <div className={`w-32 xl:w-36 h-40 xl:h-48 bg-white p-2 pb-8 xl:pb-10 shadow-md rounded-sm transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0 hover:z-20 ${rotation} border border-gray-200 mx-auto`}>
                  <div className="w-full h-full bg-slate-200 rounded-sm overflow-hidden relative flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={src} 
                      alt="Nuestra foto" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect width="100%" height="100%" fill="%23e2e8f0" /><text x="50%" y="50%" font-family="sans-serif" font-size="12" fill="%2394a3b8" text-anchor="middle" dy=".3em">Foto</text></svg>';
                      }}
                    />
                  </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
