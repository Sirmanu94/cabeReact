import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

import palazziImg from '../assets/Img-chi-siamo.png';
import scrittaCabe from '../assets/scrittacabe.png';
import direzione from '../assets/direzione.png';  
import consulenza from '../assets/consulenza.png';
import progettazione from '../assets/Progettazione.png';
import riqualificazione from '../assets/riqualificazione.png';
export default function Services() {
  const scrollJackRef = useRef(null);

  // --- INTERCETTAZIONE MOBILE ---
  // Inizializza direttamente leggendo la finestra (evita sfarfallii al caricamento)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- LOGICA ORIGINALE DELLO SCROLL JACKING (Applicata solo su desktop) ---
  const { scrollYProgress } = useScroll({
    target: scrollJackRef,
    offset: ["start start", "end end"] 
  });
  
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  const x = useTransform(smoothProgress, [0, 1], ["20vw", "-100vw"]);

  const servizi = [
    {
      id: 1,
      titolo: "Direzione dei lavori",
      img: direzione,
      testo: "Ci occupiamo della gestione completa del cantiere, assicurando che i lavori vengano perfettamente eseguiti rispettando tempi e budget prestabiliti. Curiamo ogni aspetto, tecnico e burocratico."
    },
    {
      id: 2,
      titolo: "Consulenza e Studi di fattibilità",
      img: consulenza,
      testo: "Forniamo consulenza tecnica e realizziamo studi approfonditi per valutare la fattibilità e la sostenibilità di ogni progetto, ottimizzando le risorse e minimizzando i rischi."
    },
    {
      id: 3,
      titolo: "Progettazione",
      img: progettazione,
      testo: "Architettonica, strutturale e impiantistica. Creiamo spazi funzionali, efficienti ed esteticamente gradevoli. Sviluppiamo soluzioni strutturali sicure e durature."
    },
    {
      id: 4,
      titolo: "Riqualificazione Energetica",
      img: riqualificazione,
      testo: "Soluzioni all'avanguardia per l'efficientamento energetico degli edifici esistenti. Riduciamo l'impatto ambientale migliorando le prestazioni termiche e garantendo l'accesso agli incentivi fiscali."
    },
  ];

  return (
    <section 
      ref={scrollJackRef} 
      className={isMobile ? "relative bg-[#f9fbfd] py-20" : "h-[400vh] relative bg-[#f9fbfd]"}
    >
      
      {/* Contenitore Interno */}
      <div className={isMobile ? "relative w-full flex flex-col items-center px-6 overflow-hidden" : "sticky top-0 h-screen w-full overflow-hidden flex items-center"}>
        
        {/* SCRITTA CABE DI SFONDO */}
        <div className={isMobile ? "absolute top-10 left-1/2 -translate-x-1/2 w-[90%] text-center z-0 pointer-events-none opacity-[0.2]" : "absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none opacity-[0.4]"}>
          <img src={scrittaCabe} alt="Cabe Sfondo" className={isMobile ? "w-full" : ""} />
        </div>

        {/* TITOLO FISSO / RELATIVO */}
        <div className={isMobile ? "relative z-20 flex items-center justify-center w-full gap-4 bg-white/80 backdrop-blur-sm rounded-[20px] py-4 px-4 shadow-sm mb-12 text-center" : "absolute top-24 left-6 lg:left-12 z-20 flex items-center gap-4 md:gap-6 bg-white/50 backdrop-blur-sm rounded-full py-2 px-6 shadow-sm"}>
          <i className={`fa-solid fa-arrow-right-long text-[#134f72] ${isMobile ? 'hidden' : 'text-3xl md:text-4xl'}`}></i>
          <Link to="/progetti" className={`font-light text-[#7aa5c2] ${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl'}`}>
            Scopri i nostri Progetti
          </Link>
        </div>

        {/* CONTENITORE ANIMATO */}
        <motion.div 
          style={isMobile ? {} : { x }} 
          className={isMobile ? "flex flex-col gap-10 w-full z-10" : "flex items-stretch gap-8 w-max px-[30vw] z-10 h-max"}
        >
          {servizi.map((servizio) => (
            <motion.div 
              key={servizio.id} 
              initial={isMobile ? { opacity: 0, y: 30 } : {}}
              whileInView={isMobile ? { opacity: 1, y: 0 } : {}}
              viewport={isMobile ? { once: true, margin: "-50px" } : {}}
              className={isMobile ? "w-full flex flex-col bg-white border border-gray-100 rounded-[30px] overflow-hidden shadow-xl relative group" : "shrink-0 w-[85vw] md:w-[400px] flex flex-col bg-white border border-gray-100 rounded-[30px] overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 relative group"}
            >
              {/* IMMAGINE DELLA CARD */}
              <div className="w-full h-48 md:h-56 overflow-hidden shrink-0">
                <img 
                  src={servizio.img} 
                  alt={servizio.titolo} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* CONTENUTO TESTUALE */}
              <div className="p-8 flex flex-col grow relative">
                {/* Cubetti Decorativi */}
                <div className="absolute top-6 right-6 flex flex-wrap w-[22px] h-[22px] gap-[2px]">
                  <div className="w-[10px] h-[10px] bg-[#134f72]"></div>
                  <div className="w-[10px] h-[10px] bg-[#7aa5c2]"></div>
                  <div className="w-[10px] h-[10px] bg-gray-300"></div>
                  <div className="w-[10px] h-[10px] bg-[#134f72]"></div>
                </div>

                <h4 className="text-[#00b4d8] text-xl font-medium mb-4 pr-10">
                  {servizio.titolo}
                </h4>
                <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
                  {servizio.testo}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* IMMAGINE CITTÀ FISSA A SINISTRA */}
        <div className={isMobile ? "relative mt-16 w-[80%] max-w-[400px] z-2 pointer-events-none opacity-60" : "absolute bottom-80 left-0 w-[60%] md:w-[40%] max-w-[650px] z-2 pointer-events-none"}>
          <img 
            src={palazziImg} 
            alt="Skyline Città" 
            className="w-full h-auto drop-shadow-[20px_0_30px_rgba(0,0,0,0.3)]" 
          />
        </div>

      </div>
    </section>
  );
}