import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import manoBianca from '../assets/Img-mano-robotica.png';

export default function About() {
  return (
    <section className="bg-white relative z-40 overflow-hidden pt-20 md:pt-0 pb-10 md:pb-20">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* =========================================
            LATO SINISTRO: Testo Completo
            ========================================= */}
        <div className="w-full md:w-[60%] z-20">
          <motion.h2 
            className="text-2xl md:text-[2.2rem] lg:text-[2.5rem] leading-snug font-light text-[#134f72]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#00b4d8] font-medium">CABE</span> è una società di <br className="hidden lg:block"/>
            <span className="font-semibold italic">ingegneria e architettura specializzata nella <br className="hidden lg:block"/> progettazione ed esecuzione di lavori pubblici e privati.</span>
            <span className="text-gray-400"> Sul campo, abbiamo maturato una profonda competenza nella progettazione architettonica, strutturale, infrastrutturale e impiantistica.</span>
          </motion.h2>

          <motion.p 
            className="mt-6 text-gray-400 font-light text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Il nostro team di professionisti è in grado di affrontare con successo le sfide tecniche e gestionali, offrendo soluzioni tradizionali e innovative. La forza del nostro gruppo di lavoro ci permette di garantire un servizio di alta qualità e di eccellenza.
          </motion.p>
        </div>

        {/* =========================================
            LATO DESTRO: Mano e Bottone
            ========================================= */}
        {/* Aumentato mt-24 su mobile per dare spazio al bottone in alto a sinistra */}
        <div className="w-full md:w-[40%] relative mt-24 md:mt-0 flex justify-center md:justify-end">
          
          {/* BOTTONE CHI SIAMO: 
              Mobile -> ancorato a sinistra (left-[5%])
              Desktop -> ancorato a destra (md:left-auto md:right-[30%]) */}
          <div className="absolute top-[-60px] left-[5%] md:left-auto md:top-[-100px] md:right-[30%] z-30">     
            <Link to="/chi-siamo" className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-[#134f72] rounded-full px-6 py-2 text-[#134f72] hover:bg-[#134f72] hover:text-white transition-all shadow-lg">
              <i className="fa-solid fa-arrow-left"></i>
              <span className="font-light">chi siamo</span>
            </Link>
          </div>

          <motion.img 
            src={manoBianca} 
            alt="Mano Robotica" 
            className="w-[90%] md:w-auto max-w-[600px] h-auto drop-shadow-2xl z-10"
            initial={{ x: 200, y: 50 }}   // parte fuori a destra
            whileInView={{ x: 0, y: -20 }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{marginRight: "-350px", marginTop: "-100px"}}
          />
        </div>

      </div>
    </section>
  );
}