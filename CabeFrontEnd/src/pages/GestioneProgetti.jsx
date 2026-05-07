import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const API_BASE_URL = 'https://localhost:7220';

export default function GestioneProgetti() {
  const [progetti, setProgetti] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Manteniamo idProgetto per il frontend, lo mapperemo quando inviamo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ idProgetto: 0, descrizioneBreve: '', descrizione: '' });
  const [fotoCopertina, setFotoCopertina] = useState(null);
  const [fotoGalleria, setFotoGalleria] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    caricaProgetti();
  }, [navigate]);

  const caricaProgetti = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/progetti`);
      const data = await res.json();
      setProgetti(data);
    } catch (err) {
      console.error("Errore recupero progetti:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSalva = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const dataToSend = new FormData();
    // Usa le chiavi esatte del DTO in .NET per il body della POST
    dataToSend.append('id_Progetto', formData.idProgetto);
    dataToSend.append('descrizione_Breve', formData.descrizioneBreve);
    dataToSend.append('descrizione', formData.descrizione);
    
    if (fotoCopertina) dataToSend.append('fileUploadCopertina', fotoCopertina);
    for (let i = 0; i < fotoGalleria.length; i++) {
      dataToSend.append('fotoProgetto', fotoGalleria[i]);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/progetti/salva`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: dataToSend
      });

      if (res.ok) {
        chiudiModale();
        caricaProgetti();
      } else {
        alert("Errore durante il salvataggio.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleElimina = async (idProgetto) => {
    if (window.confirm("Sei sicuro di voler eliminare questo progetto?")) {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/progetti/${idProgetto}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      caricaProgetti();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const apriModale = (progetto = null) => {
    if (progetto) {
      // Popolamento basato sul JSON ricevuto
      setFormData({ 
        idProgetto: progetto.idProgetto, 
        descrizioneBreve: progetto.descrizioneBreve, 
        descrizione: progetto.descrizione 
      });
    } else {
      setFormData({ idProgetto: 0, descrizioneBreve: '', descrizione: '' });
    }
    setFotoCopertina(null);
    setFotoGalleria([]);
    setIsModalOpen(true);
  };

  const chiudiModale = () => setIsModalOpen(false);

  return (
    <div className="bg-[#f4f7f6] min-h-screen">
      <Header />
      
      <div className="pt-32 px-6 lg:px-12 max-w-7xl mx-auto pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-[#134f72]">Gestione Progetti</h2>
          <div className="flex gap-4">
            <button onClick={() => apriModale()} className="bg-gradient-to-r from-[#00b4d8] to-[#29abe2] text-white px-6 py-2 rounded-xl font-medium shadow-lg hover:-translate-y-1 transition-all">
              <i className="fas fa-plus mr-2"></i>Nuovo
            </button>
            <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-600 transition-all">
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-[#134f72] text-white">
              <tr>
                <th className="p-4 font-medium w-32">Azioni</th>
                <th className="p-4 font-medium w-24">Copertina</th>
                <th className="p-4 font-medium">Titolo</th>
                <th className="p-4 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-8">Caricamento...</td></tr>
              ) : (
                progetti.map((p) => (
                  <tr key={p.idProgetto} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex gap-2">
                      <button onClick={() => apriModale(p)} className="bg-yellow-400 text-black w-8 h-8 rounded-lg hover:bg-yellow-500 flex items-center justify-center"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleElimina(p.idProgetto)} className="bg-red-500 text-white w-8 h-8 rounded-lg hover:bg-red-600 flex items-center justify-center"><i className="fas fa-trash-alt"></i></button>
                    </td>
                    <td className="p-4">
                      {/* Gestione URL Immagine */}
                      <img 
                        src={p.pathFotoCopertina ? `${API_BASE_URL}${p.pathFotoCopertina}` : 'https://via.placeholder.com/150'} 
                        alt="cover" 
                        className="w-16 h-12 object-cover rounded-md border" 
                      />
                    </td>
                    <td className="p-4 font-medium text-[#134f72]">{p.descrizioneBreve}</td>
                    <td className="p-4 text-gray-500">{new Date(p.dataInserimento).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button onClick={chiudiModale} className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl">&times;</button>
            
            <h3 className="text-2xl font-bold text-[#134f72] mb-6 border-b pb-4">
              {formData.idProgetto === 0 ? 'Aggiungi Progetto' : 'Modifica Progetto'}
            </h3>
            
            <form onSubmit={handleSalva} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Titolo Breve</label>
                <input required type="text" value={formData.descrizioneBreve} onChange={e => setFormData({...formData, descrizioneBreve: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:border-[#00b4d8]" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Descrizione (Supporta tag HTML per grassetto, liste, ecc.)</label>
                <textarea required rows="5" value={formData.descrizione} onChange={e => setFormData({...formData, descrizione: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:border-[#00b4d8]" />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border">
                <label className="block text-sm font-medium mb-2">Immagine Copertina (Sostituisce la vecchia)</label>
                <input type="file" accept="image/*" onChange={e => setFotoCopertina(e.target.files[0])} className="w-full" />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border">
                <label className="block text-sm font-medium mb-2">Aggiungi Foto Galleria (Multiple)</label>
                <input type="file" multiple accept="image/*" onChange={e => setFotoGalleria(e.target.files)} className="w-full" />
              </div>

              <button type="submit" className="w-full bg-[#134f72] text-white font-bold py-4 rounded-xl hover:bg-[#0d3852] transition-colors shadow-lg">
                <i className="fas fa-save mr-2"></i> Salva Progetto
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}