import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const API_BASE_URL = 'https://localhost:7220';

export default function Contact() {
  const canvasRef = useRef(null);

  // --- STATI DEL FORM ---
  const [formData, setFormData] = useState({
    nome: '',
    cognome: 'Non fornito (Home Form)', // Campo richiesto dal DTO, usiamo un placeholder
    email: '',
    telefono: '',
    messaggio: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // --- LOGICA EFFETTO RETE (CANVAS) PER I CONTATTI ---
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

    // Meno particelle rispetto alla Hero per non appesantire
    const particleCount = window.innerWidth < 768 ? 30 : 70;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 0.5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Colore bianco semitrasparente per contrastare col fondo azzurro
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; 
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; 
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
          if (dist < 120) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // --- GESTIONE INVIO FORM ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/invia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Impossibile inviare il messaggio. Riprova più tardi.');
      }

      setStatus('success');
      // Resetta i campi visibili
      setFormData({
        ...formData,
        nome: '',
        email: '',
        messaggio: ''
      });
      
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  return (
    <section className="relative w-full  flex items-center justify-center py-16 px-4 md:px-8 overflow-hidden bg-gradient-to-br from-[#2fd5e6] via-[#00c3db] to-[#009bbf]">
      
      {/* 1. Rete Cibernetica (Canvas) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>

      {/* 2. Quadrati Decorativi Astratti */}
      <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] bg-white/10 backdrop-blur-md z-0 rounded-2xl rotate-12 shadow-[0_0_40px_rgba(255,255,255,0.1)]"></div>
      <div className="absolute bottom-[5%] right-[15%] w-[200px] h-[200px] bg-white/20 backdrop-blur-lg z-0 rounded-2xl -rotate-6 shadow-[0_0_30px_rgba(255,255,255,0.2)] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
        
        {/* =========================================
            LATO SINISTRO: INFO CONTATTI
            ========================================= */}
        <motion.div 
          className="w-full lg:w-[50%]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Card Effetto Vetro */}
          <div className="w-full bg-white/10 backdrop-blur-xl border border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.1)] rounded-[30px] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>

            {/* Colonna 1 */}
            <div className="flex-1 space-y-5 text-[#0a3854] relative z-10">
              <div>
                <p className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">Telefono</p>
                <p className="font-medium text-lg">+39 081 8768096</p>
              </div>
              <div>
                <p className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">Cellulare</p>
                <p className="font-medium text-lg">+39 347 1138404</p>
                <p className="font-medium text-lg">+39 338 5633260</p>
              </div>
              <div>
                <p className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">Email</p>
                <p className="font-medium text-[1.05rem] break-all">studiotecnicocabe@gmail.com</p>
              </div>
            </div>

            {/* Divisore */}
            <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-[#0a3854]/20 to-transparent"></div>
            <div className="block md:hidden h-px w-full bg-gradient-to-r from-transparent via-[#0a3854]/20 to-transparent"></div>

            {/* Colonna 2 */}
            <div className="flex-1 space-y-5 text-[#0a3854] relative z-10">
              <div>
                <p className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">Sede centrale</p>
                <p className="font-medium text-lg leading-tight">Via Campana 192<br/>Cap 80010 Quarto (NA)</p>
              </div>
              <div>
                <p className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">Orari</p>
                <p className="font-medium text-lg leading-tight">Lun - Ven<br/>09:00 - 13:30<br/>16:00 - 19:30</p>
              </div>
              <div>
                <p className="font-semibold text-sm uppercase tracking-wider mb-1 opacity-80">P.IVA</p>
                <p className="font-medium text-lg">10507651213</p>
              </div>
            </div>
          </div>
        </motion.div>


        {/* =========================================
            LATO DESTRO: FORM DI CONTATTO
            ========================================= */}
        <motion.div 
          className="w-full lg:w-[45%] flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-md border border-white/30 rounded-[30px] p-10 text-center text-white"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-3xl font-medium mb-2">Messaggio Inviato!</h3>
              <p className="font-light mb-6">Grazie per averci contattato. Ti risponderemo il prima possibile.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="text-[#0a3854] bg-white px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Invia un altro messaggio
              </button>
            </motion.div>
          ) : (
            <>
              <motion.h2 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#0a3854] mb-8 tracking-tight"
              >
                Contattaci.
              </motion.h2>

              {status === 'error' && (
                <div className="mb-4 bg-red-500/20 text-white p-3 rounded-xl border border-red-500/30 text-sm backdrop-blur-sm">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                
                <motion.div variants={itemVariants}>
                  <input 
                    type="text" 
                    name="nome"
                    placeholder="Nome" 
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    className="w-full bg-white/20 backdrop-blur-sm border border-[#0a3854]/20 text-[#0a3854] placeholder-[#0a3854]/60 rounded-xl px-5 py-3 focus:outline-none focus:border-[#0a3854] focus:bg-white/40 transition-all"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Mail" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/20 backdrop-blur-sm border border-[#0a3854]/20 text-[#0a3854] placeholder-[#0a3854]/60 rounded-xl px-5 py-3 focus:outline-none focus:border-[#0a3854] focus:bg-white/40 transition-all"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <textarea 
                    name="messaggio"
                    placeholder="Messaggio" 
                    rows="4"
                    required
                    value={formData.messaggio}
                    onChange={handleChange}
                    className="w-full bg-white/20 backdrop-blur-sm border border-[#0a3854]/20 text-[#0a3854] placeholder-[#0a3854]/60 rounded-2xl px-5 py-3 resize-none focus:outline-none focus:border-[#0a3854] focus:bg-white/40 transition-all"
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-2">
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative flex items-center justify-between gap-4 bg-transparent border border-white rounded-full pl-6 pr-1.5 py-1.5 text-white hover:bg-white hover:text-[#009bbf] transition-colors duration-300 w-full sm:w-max overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="text-[0.95rem] font-medium tracking-wide">
                      {status === 'loading' ? 'Invio in corso...' : 'Raccontaci il tuo progetto'}
                    </span>
                    <div className="bg-white text-[#009bbf] w-10 h-10 rounded-full flex items-center justify-center transform group-hover:translate-x-1 transition-transform">
                      {status === 'loading' ? (
                        <i className="fa-solid fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-right"></i>
                      )}
                    </div>
                  </button>
                </motion.div>

              </form>
            </>
          )}
        </motion.div>

      </div>
    </section>
  );
}