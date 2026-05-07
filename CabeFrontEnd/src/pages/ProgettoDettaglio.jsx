import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = 'https://localhost:7220';

export default function ProgettoDettaglio() {
  const { id } = useParams();
  const [progetto, setProgetto] = useState(null);
  const [fotoGalleria, setFotoGalleria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(null); // Per il Lightbox

  useEffect(() => {
    const fetchDettagli = async () => {
      try {
        // Chiamata all'endpoint del backend (assicurati che esista api/progetti/{id})
        const res = await fetch(`${API_BASE_URL}/api/progetti/${id}`);
        const data = await res.json();
        
        // Supponiamo che l'API restituisca { progetto: {...}, listaFoto: [...] }
        // Se restituisce solo il progetto, adatta i set
        setProgetto(data.progetto || data); 
        setFotoGalleria(data.listaFoto || []);
      } catch (err) {
        console.error("Errore recupero dettagli:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDettagli();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="h-screen bg-[#030508] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b4d8]"></div>
    </div>
  );

  if (!progetto) return <div className="text-white text-center py-40">Progetto non trovato.</div>;

  return (
    <div className="bg-white min-h-screen font-sans antialiased">
      <Header />

      {/* 1. HERO DEL PROGETTO (Copertina) */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-black">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 1.5 }}
          src={progetto.pathFotoCopertina ? `${API_BASE_URL}${progetto.pathFotoCopertina}` : ''} 
          className="w-full h-full object-cover"
          alt={progetto.descrizioneBreve}
        />
        
        {/* Overlay Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/progetti" className="text-[#00b4d8] flex items-center gap-2 mb-4 hover:gap-4 transition-all">
                <i className="fa-solid fa-arrow-left"></i> Torna ai progetti
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-[#134f72] leading-tight max-w-4xl">
                {progetto.descrizioneBreve}
              </h1>
              <p className="text-gray-500 mt-4 font-light italic">
                Realizzato il: {new Date(progetto.dataInserimento).toLocaleDateString('it-IT')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. DESCRIZIONE (Corpo Centrale) */}
      <section className="py-16 md:py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="prose prose-lg max-w-none text-gray-600 font-light leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-[#134f72] first-letter:mr-3 first-letter:float-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            dangerouslySetInnerHTML={{ __html: progetto.descrizione }}
          />
        </div>
      </section>

      {/* 3. GALLERIA FOTOGRAFICA */}
      {fotoGalleria.length > 0 && (
        <section className="py-16 bg-[#f9fbfd] px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-medium text-[#134f72]">Galleria Progetto</h2>
              <div className="w-16 h-1 bg-[#00b4d8] mt-4"></div>
            </div>

            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {fotoGalleria.map((foto, index) => (
                <motion.div 
                  key={index}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImg(`${API_BASE_URL}${foto.pathFoto}`)}
                >
                  <img 
                    src={`${API_BASE_URL}${foto.pathFoto}`} 
                    alt={`Dettaglio ${index}`} 
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-[#134f72]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <i className="fa-solid fa-expand text-white text-3xl"></i>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIGHTBOX (Ingrandimento Foto) */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImg} 
              className="max-w-full max-h-full rounded-lg shadow-2xl"
            />
            <button className="absolute top-8 right-8 text-white text-4xl hover:text-[#00b4d8]">&times;</button>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}