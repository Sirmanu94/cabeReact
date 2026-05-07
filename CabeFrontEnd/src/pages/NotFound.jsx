import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#030508]">
      <Header />

      <main className="flex-grow relative flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        
        {/* Effetto di luce di sfondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#00b4d8] rounded-full blur-[120px] md:blur-[150px] opacity-20 pointer-events-none z-0"></div>

        {/* Contenitore Centrale */}
        <motion.div
          className="relative z-10 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Numero 404 Fluttuante */}
          <motion.h1
            className="text-[8rem] md:text-[14rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-[#134f72]"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            404
          </motion.h1>

          <h2 className="text-2xl md:text-4xl font-medium text-white mt-4 mb-6">
            Pagina non trovata
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto font-light mb-10 leading-relaxed">
            Sembra che tu ti sia spinto oltre i confini dell'ingegneria. La pagina che stai cercando non esiste o è stata spostata.
          </p>

          <Link
            to="/"
            className="group relative flex items-center gap-4 bg-transparent border border-white/30 rounded-full pl-6 md:pl-8 pr-1.5 py-1.5 md:py-2 text-white hover:border-[#00b4d8] hover:text-white transition-all duration-300 overflow-hidden shadow-lg"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-[#00b4d8] opacity-0 group-hover:opacity-10 transition-opacity"></div>
            
            <span className="text-base md:text-lg font-light tracking-wide relative z-10">Torna alla base</span>
            
            <div className="bg-white/10 group-hover:bg-[#00b4d8] text-white w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transform transition-colors relative z-10">
              <i className="fa-solid fa-home"></i>
            </div>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}