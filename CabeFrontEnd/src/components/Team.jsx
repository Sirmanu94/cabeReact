import { motion } from 'framer-motion';

// Dati del team forniti dall'utente
const teamData = [
  {
    name: "Luigi Carrozza",
    role: "Titolare & CEO - Ingegnere Senior",
    img: "https://ui-avatars.com/api/?name=Luigi+Carrozza&background=0D8ABC&color=fff",
    ceo: true,
  },
  {
    name: "Luigi Belfiore",
    role: "Titolare & CEO - Ingegnere Senior",
    img: "https://ui-avatars.com/api/?name=Luigi+Belfiore&background=0D8ABC&color=fff",
    ceo: true,
  },
  {
    name: "Luigi",
    role: "Geometra",
    img: "https://ui-avatars.com/api/?name=Luigi&background=6B7280&color=fff",
  },
  {
    name: "Ciro",
    role: "Geometra",
    img: "https://ui-avatars.com/api/?name=Ciro&background=6B7280&color=fff",
  },
  {
    name: "Mario",
    role: "Geometra",
    img: "https://ui-avatars.com/api/?name=Mario&background=6B7280&color=fff",
  },
  {
    name: "Vincenzo",
    role: "Geometra",
    img: "https://ui-avatars.com/api/?name=Vincenzo&background=6B7280&color=fff",
  },
  {
    name: "Sergio",
    role: "Architetto",
    img: "https://ui-avatars.com/api/?name=Sergio&background=6B7280&color=fff",
  },
  {
    name: "Michael",
    role: "Reparto Amministrativo",
    img: "https://ui-avatars.com/api/?name=Michael&background=6B7280&color=fff",
  },
  {
    name: "Rossana",
    role: "Assistente",
    img: "https://ui-avatars.com/api/?name=Rossana&background=EC4899&color=fff",
  },
];
export default function Team() {
  
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
      
      
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#00b4d8"/></pattern></defs><rect width="100%" height="100%" fill="url(#dots)"/></svg>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        
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

        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {teamData.map((member, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`group bg-white border border-gray-100 p-6 rounded-[30px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden ${member.ceo ? 'lg:col-span-2' : ''}`}
            >
              
              <div className="absolute inset-0 bg-gradient-to-br from-[#00b4d8]/5 via-transparent to-[#134f72]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                
                
                <div className={`relative mb-6 rounded-full p-1 border-2 transition-colors ${member.ceo ? 'w-40 h-40 border-[#134f72]' : 'w-28 h-28 border-[#00b4d8]'}`}>
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  
                  {member.ceo && (
                    <div className="absolute -bottom-2 right-0 bg-[#134f72] text-white text-[0.65rem] uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold shadow-md">
                      CEO
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-medium text-black mb-1.5 transition-colors group-hover:text-[#134f72]">
                  {member.name}
                </h3>
                
                <p className={`font-light leading-relaxed ${member.ceo ? 'text-lg text-black font-normal' : 'text-sm text-gray-500'}`}>
                  {member.role}
                </p>
                
                <div className={`mt-5 w-10 h-0.5 rounded-full ${member.ceo ? 'bg-[#134f72]' : 'bg-[#00b4d8] group-hover:w-16 transition-all'}`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}