import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
// Imposta qui l'URL del tuo backend!
const API_BASE_URL = 'https://admin.cabeingegneria.it';

export default function Progetti() {
  const [progetti, setProgetti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgetti = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/progetti`);
        
        if (!response.ok) {
          throw new Error('Errore durante il recupero dei progetti');
        }
        
        const data = await response.json();
        setProgetti(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgetti();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const formattaData = (dataString) => {
    if (!dataString) return '';
    const date = new Date(dataString);
    return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="font-sans antialiased bg-[#f4f7f6] min-h-screen">
      <Header />

      <section className="pt-32 pb-16 px-6 lg:px-12 bg-gradient-to-br from-[#134f72] to-[#0d3852] text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
        </div>
        
        <motion.div 
          className="relative z-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <h1 className="font-bold text-4xl md:text-5xl uppercase tracking-wider mb-4">I Nostri Progetti</h1>
          <p className="text-lg text-gray-300 font-light leading-relaxed">
            Esplora alcune delle nostre migliori realizzazioni. Dalla progettazione ingegneristica al design architettonico, curiamo ogni dettaglio.
          </p>
        </motion.div>
      </section>

      <section className="py-16 md:py-24 px-6 lg:px-12 max-w-7xl mx-auto min-h-[50vh]">
        {loading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#134f72]"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-50 p-6 rounded-xl border border-red-100">
            <i className="fa-solid fa-triangle-exclamation text-2xl mb-2"></i>
            <p>Non è stato possibile caricare i progetti. Verifica che il backend sia attivo.</p>
          </div>
        )}

        {!loading && !error && progetti.length > 0 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {progetti.map((progetto) => (
              <motion.div 
                key={progetto.idProgetto} 
                variants={itemVariants}
                className="bg-white rounded-[20px] overflow-hidden border border-[#134f72]/10 shadow-[0_12px_25px_rgba(19,79,114,0.1)] hover:shadow-[0_15px_30px_rgba(0,180,216,0.2)] hover:border-[#00b4d8]/40 hover:-translate-y-2 transition-all duration-400 flex flex-col group h-full"
              >
                <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-[#00b4d8] to-[#29abe2] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-2">
                    <i className="far fa-calendar-alt"></i>
                    {formattaData(progetto.dataInserimento)}
                  </div>
                  
                  {/* Anteponiamo il base URL se il path esiste */}
                  <img 
                    src={progetto.pathFotoCopertina ? `${API_BASE_URL}${progetto.pathFotoCopertina}` : 'https://via.placeholder.com/600x400?text=Immagine+Non+Disponibile'} 
                    alt={progetto.descrizioneBreve} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[#134f72] font-bold text-xl mb-4 line-clamp-2">
                    {progetto.descrizioneBreve}
                  </h3>
                  
                  <div 
                    className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-4"
                    dangerouslySetInnerHTML={{ __html: progetto.descrizione }}
                  ></div>

                  <div className="w-full h-px bg-gray-100 my-4"></div>

                  <Link 
  to={`/progetto/${progetto.idProgetto}`} 
  className="text-[#00b4d8] font-medium text-sm hover:text-[#134f72] transition-colors flex items-center gap-2 mt-auto"
>
  Scopri di più <i className="fa-solid fa-arrow-right"></i>
</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && !error && progetti.length === 0 && (
          <div className="text-center text-gray-500">
            Nessun progetto trovato nel database.
          </div>
        )}
      </section>


    </div>
  );
}