import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Assicurati che il percorso verso Team sia corretto!
import Team from '../components/Team';

export default function ChiSiamo() {
  const canvasRef = useRef(null);

  // --- LOGICA PARTICELLE TENUI DI SFONDO (CANVAS) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7; 
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 180, 216, 0.4)'; 
      ctx.strokeStyle = 'rgba(0, 180, 216, 0.1)'; 
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
          if (dist < 100) {
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
    <div className="w-full">

      <section className="relative min-h-[70vh] bg-[#030508] overflow-hidden flex items-center md:pb-0">
        
        {/* Sfondo Animato Canvas (Tenuo) */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-70"></canvas>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between h-full gap-16 md:gap-8">
          
          {/* LATO SINISTRO: Testo Vision */}
          <div className="w-full md:w-[50%] text-left">

            
            <motion.h1 
              className="text-4xl mt-20 md:text-5xl font-light text-white leading-tight"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            >
              La nostra <span className="text-[#00b4d8] font-medium">Storia,</span> <br/> Il nostro <span className="text-[#00b4d8] font-medium">Team.</span>
            </motion.h1>
            
            <motion.p 
              className="text-gray-400 mt-8 text-xl max-w-xl font-light leading-relaxed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              <span className="text-white font-medium">CABE</span> non è solo una società di ingegneria e architettura. È un ecosistema di talenti uniti dalla passione per la progettazione integrata, dove la visione creativa si sposa con il rigore tecnico per dare forma al futuro.
            </motion.p>
          </div>

          {/* LATO DESTRO: IMMAGINE FLUTTUANTE 3D WOW */}
          <div className="w-full md:w-[45%] relative h-[300px] md:h-[500px] flex justify-center items-center">
            <motion.img 
        
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop" 
              alt="Architettura Fluttuante" 
              className="w-[80%] h-auto rounded-3xl opacity-80 drop-shadow-[0_0_50px_rgba(0,180,216,0.3)] object-cover aspect-square"
              // Animazione fluttuante 3D
              animate={{ 
                y: [0, -15, 0],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* CURVA BIANCA INFERIORE */}
        <div className="absolute bottom-0 left-0 w-full h-16 md:h-24 bg-white rounded-t-[40px] md:rounded-t-[80px] z-20 shadow-[0_-15px_30px_rgba(0,0,0,0.1)]"></div>
      </section>

      {/* =========================================
          SEZIONE 2: I VALORI
          ========================================= */}
      <section className="md: bg-white relative">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          
          <motion.div 
            className="group bg-white border border-gray-100 p-8 rounded-[30px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
          >
            <div className="absolute inset-0 bg-[#00b4d8]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-5xl text-[#00b4d8] mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-drafting-compass"></i>
            </div>
            <h3 className="text-2xl font-medium text-black mb-3 transition-colors group-hover:text-[#134f72]">Integrazione</h3>
            <p className="text-gray-500 font-light leading-relaxed">Progettazione unificata dove ingegneria e architettura dialogano in sintonia per risultati d'eccellenza.</p>
          </motion.div>

          <motion.div 
            className="group bg-white border border-gray-100 p-8 rounded-[30px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="absolute inset-0 bg-[#134f72]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-5xl text-[#134f72] mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-hard-hat"></i>
            </div>
            <h3 className="text-2xl font-medium text-black mb-3 transition-colors group-hover:text-[#134f72]">Innovazione</h3>
            <p className="text-gray-500 font-light leading-relaxed">Sviluppiamo soluzioni structurali e tecnologiche d'avanguardia, utilizzando i materiali e i processi più avanzati.</p>
          </motion.div>

          <motion.div 
            className="group bg-white border border-gray-100 p-8 rounded-[30px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-[#00b4d8]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-5xl text-[#00b4d8] mb-6 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-users"></i>
            </div>
            <h3 className="text-2xl font-medium text-black mb-3 transition-colors group-hover:text-[#134f72]">Capitale Umano</h3>
            <p className="text-gray-500 font-light leading-relaxed">La forza di CABE risiede nella professionalità del nostro team, dedicato a superare ogni sfida tecnica e gestionale.</p>
          </motion.div>

        </div>
      </section>

      {/* =========================================
          SEZIONE 3: IL TEAM
          ========================================= */}
      <Team />
      
    </div>
  );
}