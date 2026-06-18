import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const API_BASE_URL = 'https://admin.cabeingegneria.it'; // Modifica con import.meta.env.VITE_BASEURL se usi il file .env

export default function Team() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recupero dei dati reali dal database
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/dipendenti`);
        if (res.ok) {
          const data = await res.json();
          setTeamData(data);
        }
      } catch (error) {
        console.error("Errore nel recupero dei dipendenti:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Varianti per l'animazione a cascata
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Ritardo tra un figlio e l'altro
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="team" className="py-20 md:py-32 bg-white relative overflow-hidden">
      
      {/* Sfondo decorativo */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#00b4d8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Intestazione Sezione */}
        <motion.div 
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#00b4d8] mb-3">
            Il Capitale Umano
          </h2>
          <p className="text-4xl md:text-5xl font-light text-black leading-tight">
            Incontri i <span className="text-[#134f72] font-medium">professionisti</span> di CABE
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-[#00b4d8] to-[#134f72] mx-auto rounded-full"></div>
        </motion.div>

        {/* Gestione Caricamento */}
        {loading ? (
          <div className="text-center text-gray-500 py-10 font-light tracking-widest uppercase">
            Caricamento team in corso...
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {teamData.map((member) => {
              // Logica per individuare i CEO in base al ruolo inserito
              const ruoloMinuscolo = member.ruolo ? member.ruolo.toLowerCase() : '';
              const isCeo = ruoloMinuscolo.includes('ceo') || ruoloMinuscolo.includes('titolare');

              // Se manca la foto, genera un avatar con le iniziali del nome
              const imageUrl = member.pathFoto 
                ? `${API_BASE_URL}${member.pathFoto}` 
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.nome)}&background=${isCeo ? '134f72' : '00b4d8'}&color=fff`;

              return (
                <motion.div 
                  key={member.idDipendente}
                  variants={itemVariants}
                  className={`group bg-white border border-gray-100 p-6 rounded-[30px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden ${isCeo ? 'lg:col-span-2' : ''}`}
                >
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00b4d8]/5 via-transparent to-[#134f72]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    
                    <div className={`relative mb-6 rounded-full p-1 border-2 transition-colors ${isCeo ? 'w-40 h-40 border-[#134f72]' : 'w-28 h-28 border-[#00b4d8]'}`}>
                      <img 
                        src={imageUrl} 
                        alt={member.nome} 
                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300 bg-gray-50"
                      />
                      
                      {isCeo && (
                        <div className="absolute -bottom-2 right-0 bg-[#134f72] text-white text-[0.65rem] uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold shadow-md">
                          CEO
                        </div>
                      )}
                    </div>

                    <h3 className="text-xl font-medium text-black mb-1.5 transition-colors group-hover:text-[#134f72]">
                      {member.nome}
                    </h3>
                    
                    <p className={`font-light leading-relaxed flex-grow ${isCeo ? 'text-lg text-black font-normal' : 'text-sm text-gray-500'}`}>
                      {member.ruolo}
                    </p>
                    
                    <div className={`mt-5 w-10 h-0.5 rounded-full ${isCeo ? 'bg-[#134f72]' : 'bg-[#00b4d8] group-hover:w-16 transition-all'}`}></div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
}