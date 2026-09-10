'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const textToType = `Hoy es una fecha *supeeeeeeeeeer importante* para usted y para todos los que tenemos la dicha de conocerla, porque un día como hoy nació una persona que, por lo menos para mí, ha sido un verdadero *ser de luz*. ✨

Espero de corazón que este nuevo año de vida llegue cargado de muchas bendiciones, aprendizajes, crecimiento y momentos maravillosos. Que pueda seguir creciendo en todos los ámbitos de su vida: *personal, espiritual y profesional*, y que cada nuevo proyecto y meta que se proponga encuentre el camino para hacerse realidad. 🙏✨

Me alegra muchísimo haber podido coincidir con usted en este camino. Desde el primer momento he podido aprender y crecer gracias a sus conocimientos, su inteligencia y, sobre todo, a esa capacidad que tiene para explicar las cosas de una manera que hace que todo parezca mucho más sencillo. Sin duda, ha sido una de esas personas con las que uno se alegra de haber coincidido. 😊

Espero que pase un *súper bonito día*, que disfrute muchísimo, que reciba todo el cariño que merece y que pueda celebrar rodeada de personas que realmente valoran y aprecian quién es usted. 🎊🎉🎂🎁

*¡Feliz cumpleaños! 🥳🎂✨ Que Dios continúe bendiciendo su vida y permitiéndole cumplir muchos años más, siempre con salud, felicidad y grandes motivos para sonreír.* ❤️

Estas si son unas felicitaciones a su nivel, espero que te guste. HAHAHA`;

interface Props {
  startAnimation?: boolean;
}

export default function TypewriterLetter({ startAnimation = true }: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!startAnimation) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(textToType.substring(0, i));
      i++;
      if (i > textToType.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 45); // Typing speed

    return () => clearInterval(interval);
  }, [startAnimation]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="glass p-6 md:p-8 rounded-2xl h-full flex flex-col relative overflow-hidden shadow-lg border border-purple-100"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -ml-10 -mb-10"></div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-800 border-b border-purple-200 pb-2 relative z-10 font-serif italic tracking-wide">
        Para Piojito
      </h2>
      
      <div className="flex-grow overflow-y-auto pr-2 relative z-10 custom-scrollbar">
        <p className="text-lg md:text-xl text-gray-800 leading-loose whitespace-pre-wrap font-serif">
          {displayedText}
          {!isComplete && (
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-5 bg-pink-500 ml-1 translate-y-1"
            />
          )}
        </p>
      </div>
      
      <div className="mt-8 text-right font-medium text-pink-700 italic border-t border-pink-200 pt-4 relative z-10">
        21 • Agosto • 2026
      </div>
    </motion.div>
  );
}
