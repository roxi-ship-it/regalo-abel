'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimeLeft {
  años: number;
  meses: number;
  días: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export default function TimeCounter() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ años: 0, meses: 0, días: 0, horas: 0, minutos: 0, segundos: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fecha de nacimiento: 21 Agosto 1998
    const startDate = new Date('1998-08-21T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        let años = now.getFullYear() - startDate.getFullYear();
        let meses = now.getMonth() - startDate.getMonth();
        let días = now.getDate() - startDate.getDate();
        
        if (días < 0) {
          meses--;
          const lastMonthDate = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
          días += lastMonthDate;
        }
        
        if (meses < 0) {
          años--;
          meses += 12;
        }

        const horas = now.getHours() - startDate.getHours();
        let finalHoras = horas;
        let finalDias = días;
        if (horas < 0) {
           finalDias--;
           finalHoras += 24;
        }

        const minutos = now.getMinutes() - startDate.getMinutes();
        let finalMinutos = minutos;
        if (minutos < 0) {
           finalHoras--;
           if (finalHoras < 0) {
             finalDias--;
             finalHoras += 24;
           }
           finalMinutos += 60;
        }

        const segundos = now.getSeconds() - startDate.getSeconds();
        let finalSegundos = segundos;
        if (segundos < 0) {
           finalMinutos--;
           if (finalMinutos < 0) {
              finalHoras--;
              finalMinutos += 60;
           }
           finalSegundos += 60;
        }

        setTimeLeft({
          años: años,
          meses: meses,
          días: finalDias,
          horas: finalHoras,
          minutos: finalMinutos,
          segundos: finalSegundos
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call
    return () => clearInterval(timer);
  }, []);

  if (!isClient) return null;

  const timeBlocks = [
    { label: 'Años', value: timeLeft.años },
    { label: 'Meses', value: timeLeft.meses },
    { label: 'Días', value: timeLeft.días },
    { label: 'Horas', value: timeLeft.horas },
    { label: 'Minutos', value: timeLeft.minutos },
    { label: 'Segundos', value: timeLeft.segundos },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="backdrop-blur-xl bg-white/40 w-full rounded-3xl p-4 md:p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/50"
    >
      <h3 className="text-center text-lg md:text-xl font-bold text-purple-800 mb-4 uppercase tracking-[0.2em]">
        fecha en la que nacio la mujer mas bella que he podido ver y conocer
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
        {timeBlocks.map((block, index) => (
          <motion.div 
            key={block.label} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4 + (index * 0.1) }}
            className="flex flex-col items-center justify-center p-4 backdrop-blur-md rounded-2xl bg-white/60 shadow-[inset_0_0_10px_rgba(255,255,255,0.5)] border border-white/60 hover:scale-105 hover:bg-white/80 transition-all cursor-default"
          >
            <span className="text-3xl md:text-5xl font-bold text-gradient mb-2 drop-shadow-sm font-sans tabular-nums">
              {block.value}
            </span>
            <span className="text-xs font-bold text-purple-500 uppercase tracking-widest">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
