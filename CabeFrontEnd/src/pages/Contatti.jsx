import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_BASE_URL = 'https://admin.cabeingegneria.it';

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    messaggio: ''
  });
  
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/invia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'invio. Riprova più tardi.');
      }

      setStatus('success');
      setFormData({ nome: '', cognome: '', email: '', telefono: '', messaggio: '' });
      
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  return (
    <div className="font-sans antialiased bg-[#f4f7f6] min-h-screen flex flex-col">


      {/* HEADER PAGINA */}
      <section className="pt-32 pb-16 px-6 lg:px-12 bg-[#134f72] text-white text-center">
        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        >
          <h1 className="font-bold text-4xl md:text-5xl uppercase tracking-wider mb-4">Contattaci</h1>
          <p className="text-lg text-gray-300 font-light leading-relaxed">
            Siamo a tua disposizione per qualsiasi informazione. Compila il modulo sottostante o utilizza i nostri recapiti diretti.
          </p>
        </motion.div>
      </section>

      {/* SEZIONE FORM E INFO */}
      <section className="py-16 px-6 lg:px-12 flex-grow">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Colonna Info Recapiti */}
          <motion.div 
            className="w-full lg:w-1/3 space-y-8"
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            <div className="bg-white p-8 rounded-[20px] shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-[#134f72] mb-6">I Nostri Recapiti</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8] shrink-0">
                    <i className="fa-solid fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Sede</p>
                    <p className="text-sm text-gray-500 mt-1">Via Campana 192<br/>80010 Quarto (NA)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8] shrink-0">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Telefono</p>
                    <p className="text-sm text-gray-500 mt-1">+39 081 8768096<br/>+39 347 1138404</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00b4d8]/10 flex items-center justify-center text-[#00b4d8] shrink-0">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Email</p>
                    <p className="text-sm text-gray-500 mt-1 break-all">studiotecnicocabe@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Colonna Form */}
          <motion.div 
            className="w-full lg:w-2/3 bg-white p-8 md:p-10 rounded-[20px] shadow-lg border border-gray-100 relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-10">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#134f72] mb-2">Messaggio Inviato!</h3>
                <p className="text-gray-500">Grazie per averci contattato. Ti risponderemo il prima possibile.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-[#00b4d8] hover:underline font-medium">
                  Invia un altro messaggio
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-[#134f72] mb-8">Richiedi Informazioni</h3>
                
                {status === 'error' && (
                  <div className="mb-6 bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 text-sm">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                      <input type="text" name="nome" required value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00b4d8] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                      <input type="text" name="cognome" required value={formData.cognome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00b4d8] transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00b4d8] transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00b4d8] transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Messaggio *</label>
                    <textarea name="messaggio" required rows="5" value={formData.messaggio} onChange={handleChange} placeholder="Scrivi qui il tuo messaggio..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#00b4d8] transition-all resize-none"></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      I tuoi dati saranno trattati nel rispetto della privacy policy.
                    </p>
                    <button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto bg-gradient-to-r from-[#00b4d8] to-[#29abe2] hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center justify-center min-w-[160px]">
                      {status === 'loading' ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Invia Richiesta'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </section>


    </div>
  );
}