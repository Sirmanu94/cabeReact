import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import manoRobot from '../assets/Mano-Robot.png'; 
import strutturaOlo from '../assets/Costruzione.png';

export default function Hero() {
  const canvasRef = useRef(null);

  // --- LOGICA EFFETTO RETE CIBERNETICA (CANVAS) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particleCount = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 180, 216, 0.8)'; 
      ctx.strokeStyle = 'rgba(0, 180, 216, 0.15)'; 
      ctx.lineWidth = 1;

      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          let p2 = particles[j];
          let dist = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#030508] overflow-hidden flex items-center pt-24 pb-20 md:pb-0">
      
      {/* Sfondo Animato Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between h-full">
        
        {/* --- LATO SINISTRO (In alto su Mobile): SCENOGRAFIA 3D --- */}
        {/* Su mobile l'altezza è gestita in base al contenuto (h-auto), su desktop fissa (h-[650px]) */}
        <div className="w-full md:w-[60%] relative h-[350px] sm:h-[450px] md:h-[650px] flex justify-center items-center mt-4 md:mt-0">
          
          {/* 1. CONTENITORE MANO */}
          {/* Mobile: Scende più in basso (top-[20%]), è più larga (w-[130%]) e si sposta a sinistra per centrare (left-[-15%]) */}
          {/* Desktop: Rimane top-[10%], w-[100%], left-[-35%] */}
          <motion.div 
            className="absolute left-[-55%] md:left-[-35%] top-[0%] md:top-[10%] w-[130%] md:w-[100%] z-20"
            initial={{ x: "-50vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* 1b. ANIMAZIONE FLUTTUANTE DELLA MANO */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <img 
                src={manoRobot} 
                alt="Mano Robotica" 
                className="w-full h-auto drop-shadow-[0_0_25px_rgba(0,180,216,0.3)]"
                style={{ marginLeft: '-20%' , marginTop: '-25%' }}
              />

              {/* 2. IL RAGGIO LASER DOPPIO E REALISTICO */}
              <motion.div 
                className="absolute origin-left z-30 flex flex-col justify-center"
                style={{ 
                  top: '42%',                
                  left: '79%',               
                  width: '25%',              
                }}
                initial={{ scaleX: 0, opacity: 0, rotate: 15 }}
                animate={{ scaleX: 1, opacity: 1, rotate: 15 }}
                transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }} 
              >
                <div className="absolute inset-0 h-10 -translate-y-5 bg-gradient-to-r from-[#00b4d8] to-transparent opacity-30 blur-xl"></div>
                
                <div className="relative flex flex-col gap-[3px] w-full">
                  <div className="h-[3px] w-full bg-gradient-to-r from-white via-[#00b4d8] to-transparent shadow-[0_0_12px_rgba(0,180,216,1)]"></div>
                  <div className="h-[1px] w-[85%] bg-gradient-to-r from-white via-[#00b4d8] to-transparent shadow-[0_0_8px_rgba(0,180,216,0.8)] opacity-80"></div>
                </div>

                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-[0_0_20px_8px_rgba(0,180,216,1)] blur-[2px]"></div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3. L'OLOGRAMMA CHE SI COSTRUISCE */}
          {/* Mobile: Scende (top-[25%]), è più largo (w-[70%]) e si sposta un po' più al centro (right-[10%]) */}
          {/* Desktop: Rimane top-[10%], w-[65%], right-[-10%] */}
          <motion.div 
            className="absolute right-[-15%] md:right-[-10%] top-[10%] md:top-[10%] w-[70%] md:w-[65%] z-10"
            initial={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0.5, filter: "brightness(2) blur(5px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1, filter: "brightness(1) blur(0px)" }}
            transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 3 }}
            >
              <img 
                src={strutturaOlo} 
                alt="Progetto Olografico" 
                className="w-full h-auto drop-shadow-[0_0_20px_rgba(0,180,216,0.6)]"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* --- LATO DESTRO (In basso su Mobile): TESTO E CALL TO ACTION --- */}
        {/* Mobile: Margini ridotti (mt-0) e testo centrato o con meno spazio laterale. */}
        <div className="w-full md:w-[40%] text-center md:text-left mt-0 md:mt-0 z-20 pb-10 md:pb-0">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight"
            initial={{ opacity: 0, y: 30 }} // Modificato da x:30 a y:30 per coerenza su mobile (appare dal basso)
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          >
            <span className="text-[#00b4d8] font-medium">Innovazione</span> e<br className="hidden md:block" />
            <span className="text-[#00b4d8] font-medium"> sostenibilità</span>, in un' unica<br className="hidden md:block" />
            <span className="font-bold italic"> soluzione.</span>
          </motion.h1>
          
          <motion.button 
            className="mt-6 md:mt-8 border border-white/30 text-gray-300 rounded-full px-8 py-3 text-sm tracking-widest hover:bg-[#00b4d8] hover:text-white hover:border-[#00b4d8] transition-all duration-300 shadow-[0_0_15px_rgba(0,180,216,0)] hover:shadow-[0_0_20px_rgba(0,180,216,0.5)] mx-auto md:mx-0 block md:inline-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
          >
            scopri di più
          </motion.button>
        </div>

      </div>

      {/* CURVA BIANCA INFERIORE */}
      <div className="absolute bottom-0 left-0 w-full h-12 md:h-32 bg-white rounded-t-[40px] md:rounded-t-[80px] z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"></div>

    </section>
  );
}