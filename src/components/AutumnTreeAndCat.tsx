'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AutumnTreeAndCat() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize(); // Initial sizing

    class Particle {
      x!: number;
      y!: number;
      size!: number;
      speedY!: number;
      speedX!: number;
      color!: string;
      rotation!: number;
      rotationSpeed!: number;

      constructor() {
        this.reset();
        this.y = Math.random() * canvas!.height;
      }

      reset() {
        this.x = (canvas!.width * 0.2) + Math.random() * (canvas!.width * 0.6); // Start around tree top
        this.y = (canvas!.height * 0.1) + Math.random() * (canvas!.height * 0.3);
        this.size = Math.random() * 6 + 4; // heart size
        this.speedY = Math.random() * 1 + 0.5; // falling speed
        this.speedX = (Math.random() - 0.5) * 1.5; // drift
        
        const colors = ['#ffffff', '#fdfbfb', '#fecfef', '#ff9a9e', '#fff0f5', '#fffafa', '#fafad2', '#ffefd5'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.02) * 0.5; // Flutter effect
        this.rotation += this.rotationSpeed;

        if (this.y > canvas!.height + this.size) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        
        // Draw lily shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          ctx.rotate(Math.PI / 3);
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, -this.size / 4, this.size, 0);
          ctx.bezierCurveTo(this.size, this.size / 4, this.size / 2, this.size / 2, 0, 0);
        }
        ctx.fill();
        
        // Lily center
        ctx.beginPath();
        ctx.fillStyle = '#FFD700';
        ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Init particles
    for (let i = 0; i < 150; i++) {
      particles.push(new Particle());
    }

    const drawTree = () => {
      // Draw static tree leaves (lilies clusters) helper
      const drawLily = (x: number, y: number, s: number, c: string) => {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = c;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          ctx.rotate(Math.PI / 3);
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(s / 2, -s / 2, s, -s / 4, s, 0);
          ctx.bezierCurveTo(s, s / 4, s / 2, s / 2, 0, 0);
        }
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = '#FFD700';
        ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const drawBranch = (startX: number, startY: number, length: number, angle: number, depth: number, branchWidth: number) => {
        ctx.beginPath();
        ctx.save();
        ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -length);
        ctx.lineWidth = branchWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#8B5A2B';
        ctx.stroke();

        if (depth > 0) {
          // Right branch (fixed angle based on depth)
          drawBranch(0, -length, length * 0.75, 25 + (depth % 3) * 4, depth - 1, branchWidth * 0.7);
          // Left branch (fixed angle based on depth)
          drawBranch(0, -length, length * 0.75, -25 - (depth % 2) * 5, depth - 1, branchWidth * 0.7);
          
          // Occasional middle branch
          if (depth > 2 && depth % 2 === 0) {
             drawBranch(0, -length, length * 0.6, (depth % 3 - 1) * 8, depth - 1, branchWidth * 0.7);
          }
        } else {
          // Draw leaves at the end (fixed positions)
          const leafColors = ['#ffffffee', '#fdfbfbee', '#fecfefee', '#ff9a9eee', '#fff0f5ee', '#fffafaee'];
          for(let i=0; i<4; i++) {
             const color = leafColors[(depth + i) % leafColors.length];
             const offsetX = (i - 1.5) * 12;
             const offsetY = -length + (i % 2 === 0 ? 8 : -8);
             const size = 8 + (i % 3) * 3;
             drawLily(offsetX, offsetY, size, color);
          }
        }
        ctx.restore();
      };

      // Start drawing from slightly left of center
      const startX = canvas.width * 0.35;
      const startY = canvas.height;
      // Use canvas.height for the length so it grows upwards sufficiently
      drawBranch(startX, startY, canvas.height * 0.26, 0, 6, canvas.width * 0.035);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawTree();
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="relative w-full h-full glass rounded-2xl overflow-hidden flex flex-col justify-end border border-pink-100 shadow-lg"
    >
      {/* Canvas for Tree and Falling Lilies */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Cat Animation */}
      <div className="relative z-10 p-6 flex flex-col items-end justify-end h-full mt-auto pb-4 pr-12 lg:pr-24">
        
        {/* Floating Label */}
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-purple-700 font-semibold text-sm mb-4 border border-purple-100 flex items-center gap-2"
        >
          Abel escribiendo carta ⌨️
        </motion.div>

        {/* Cat SVG / CSS Animation Container */}
        <div className="relative w-56 h-48">
          
          {/* Laptop */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-20 bg-slate-200 rounded-t-xl border-4 border-slate-300 flex flex-col items-center justify-start shadow-lg z-20 overflow-hidden">
             {/* Screen */}
             <div className="w-full h-[55%] bg-slate-800 flex items-center justify-center">
                <div className="text-pink-500 text-xl animate-pulse drop-shadow-md">❤️</div>
             </div>
             {/* Keyboard */}
             <div className="w-full h-[45%] bg-slate-300 flex flex-wrap gap-0.5 p-1 justify-center opacity-80 pt-1.5">
                {[...Array(21)].map((_, i) => <div key={i} className="w-2.5 h-1.5 bg-slate-400 rounded-[1px]"></div>)}
             </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-4 bg-slate-400 rounded-b-xl z-20 shadow-xl"></div>
          
          {/* Cat Body */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-36 bg-slate-800 rounded-t-[3rem] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.3)] z-10 flex justify-center">
             
             {/* Ears */}
             <div className="absolute -top-4 left-2 w-8 h-10 bg-slate-800 rounded-tl-full rotate-[-15deg] border-t border-l border-slate-700 z-0">
               <div className="absolute bottom-0 right-1 w-4 h-6 bg-pink-200/30 rounded-tl-full"></div>
             </div>
             <div className="absolute -top-4 right-2 w-8 h-10 bg-slate-800 rounded-tr-full rotate-[15deg] border-t border-r border-slate-700 z-0">
               <div className="absolute bottom-0 left-1 w-4 h-6 bg-pink-200/30 rounded-tr-full"></div>
             </div>

             {/* Headphones Band */}
             <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-36 h-16 border-[6px] border-purple-500 rounded-t-full border-b-transparent z-20"></div>
             
             {/* Cat Face */}
             <div className="absolute top-10 flex space-x-6 z-10">
                {/* Eyes */}
                <div className="w-2.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
                <div className="w-2.5 h-3 bg-white rounded-full animate-bounce" style={{ animationDuration: '2s' }}></div>
             </div>
             
             {/* Nose/Mouth */}
             <div className="absolute top-14 flex flex-col items-center z-10">
                <div className="w-3 h-2 bg-pink-400 rounded-full"></div>
                <div className="flex mt-1 opacity-70">
                   <div className="w-2 h-2 border-b-2 border-r-2 border-white rounded-br-full rotate-45 transform -translate-x-0.5"></div>
                   <div className="w-2 h-2 border-b-2 border-l-2 border-white rounded-bl-full -rotate-45 transform translate-x-0.5"></div>
                </div>
             </div>

             {/* Blush */}
             <div className="absolute top-12 left-4 w-4 h-2 bg-pink-500/50 rounded-full blur-[2px]"></div>
             <div className="absolute top-12 right-4 w-4 h-2 bg-pink-500/50 rounded-full blur-[2px]"></div>

             {/* Headphones Earcups */}
             <div className="absolute top-6 -left-3 w-7 h-12 bg-purple-600 rounded-full z-30 shadow-md">
                <div className="absolute inset-1 bg-purple-500 rounded-full"></div>
             </div>
             <div className="absolute top-6 -right-3 w-7 h-12 bg-purple-600 rounded-full z-30 shadow-md">
                <div className="absolute inset-1 bg-purple-500 rounded-full"></div>
             </div>

             {/* Paws Typing */}
             <motion.div 
               animate={{ y: [0, 6, 0] }}
               transition={{ repeat: Infinity, duration: 0.12, ease: "linear" }}
               className="absolute top-24 left-2 w-8 h-8 bg-slate-800 rounded-full shadow-md z-40 border-b border-slate-700"
             >
                <div className="flex gap-1 justify-center mt-6 opacity-30">
                  <div className="w-0.5 h-2 bg-slate-400 rounded-full"></div>
                  <div className="w-0.5 h-2 bg-slate-400 rounded-full"></div>
                </div>
             </motion.div>
             <motion.div 
               animate={{ y: [0, 6, 0] }}
               transition={{ repeat: Infinity, duration: 0.12, delay: 0.06, ease: "linear" }}
               className="absolute top-24 right-2 w-8 h-8 bg-slate-800 rounded-full shadow-md z-40 border-b border-slate-700"
             >
                <div className="flex gap-1 justify-center mt-6 opacity-30">
                  <div className="w-0.5 h-2 bg-slate-400 rounded-full"></div>
                  <div className="w-0.5 h-2 bg-slate-400 rounded-full"></div>
                </div>
             </motion.div>
             
          </div>
        </div>
      </div>
    </motion.div>
  );
}
