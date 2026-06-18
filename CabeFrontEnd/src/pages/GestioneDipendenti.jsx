import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const API_BASE_URL = 'https://admin.cabeingegneria.it';

export default function GestioneDipendenti() {
  const [dipendenti, setDipendenti] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Manteniamo l'id per il frontend, lo mapperemo quando inviamo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, nome: '', ruolo: '' });
  const [fotoProfilo, setFotoProfilo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    caricaDipendenti();
  }, [navigate]);

  const caricaDipendenti = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/Dipendenti`);
      const data = await res.json();
      setDipendenti(data);
    } catch (err) {
      console.error("Errore recupero dipendenti:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSalva = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    // Creazione del FormData associato al DipendenteDto
    const dataToSend = new FormData();
    dataToSend.append('Id', formData.id);
    dataToSend.append('Nome', formData.nome);
    dataToSend.append('Ruolo', formData.ruolo);
    
    // Selezioniamo il file caricato (corrisponde a IFormFile pathFoto nel DTO)
    if (fotoProfilo) {
        dataToSend.append('pathFoto', fotoProfilo);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/dipendenti`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: dataToSend
      });

      if (res.ok) {
        chiudiModale();
        caricaDipendenti();
      } else {
        alert("Errore durante il salvataggio.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleElimina = async (idDipendente) => {
    if (window.confirm("Sei sicuro di voler eliminare questo dipendente?")) {
      const token = localStorage.getItem('token');
      await fetch(`${API_BASE_URL}/api/dipendenti/${idDipendente}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      caricaDipendenti();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const apriModale = (dipendente = null) => {
    if (dipendente) {
      // Popolamento basato sul JSON ricevuto dal Modello Dipendenti (attenzione al camelCase di default in JS)
      setFormData({ 
        id: dipendente.idDipendente, 
        nome: dipendente.nome, 
        ruolo: dipendente.ruolo 
      });
    } else {
      setFormData({ id: 0, nome: '', ruolo: '' });
    }
    setFotoProfilo(null);
    setIsModalOpen(true);
  };

  const chiudiModale = () => setIsModalOpen(false);

  return (
    <div className="bg-[#f4f7f6] min-h-screen">
      <Header />
      
      <div className="pt-32 px-6 lg:px-12 max-w-7xl mx-auto pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-[#134f72]">Gestione Dipendenti</h2>
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
                <th className="p-4 font-medium w-24">Foto</th>
                <th className="p-4 font-medium">Nome</th>
                <th className="p-4 font-medium">Ruolo</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="text-center p-8">Caricamento...</td></tr>
              ) : (
                dipendenti.map((d) => (
                  <tr key={d.idDipendente} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 flex gap-2">
                      <button onClick={() => apriModale(d)} className="bg-yellow-400 text-black w-8 h-8 rounded-lg hover:bg-yellow-500 flex items-center justify-center"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleElimina(d.idDipendente)} className="bg-red-500 text-white w-8 h-8 rounded-lg hover:bg-red-600 flex items-center justify-center"><i className="fas fa-trash-alt"></i></button>
                    </td>
                    <td className="p-4">
                      {/* Gestione URL Immagine Profilo */}
                      <img 
                        src={d.pathFoto ? `${API_BASE_URL}${d.pathFoto}` : 'https://via.placeholder.com/150'} 
                        alt="profilo" 
                        className="w-12 h-12 object-cover rounded-full border shadow-sm" 
                      />
                    </td>
                    <td className="p-4 font-medium text-[#134f72]">{d.nome}</td>
                    <td className="p-4 text-gray-500">{d.ruolo}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative">
            <button onClick={chiudiModale} className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl">&times;</button>
            
            <h3 className="text-2xl font-bold text-[#134f72] mb-6 border-b pb-4">
              {formData.id === 0 ? 'Aggiungi Dipendente' : 'Modifica Dipendente'}
            </h3>
            
            <form onSubmit={handleSalva} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">Nome e Cognome</label>
                <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:border-[#00b4d8]" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Ruolo in Azienda</label>
                <input required type="text" value={formData.ruolo} onChange={e => setFormData({...formData, ruolo: e.target.value})} className="w-full border rounded-lg p-3 outline-none focus:border-[#00b4d8]" />
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border">
                <label className="block text-sm font-medium mb-2">Foto Profilo (Sostituisce la vecchia)</label>
                <input type="file" accept="image/*" onChange={e => setFotoProfilo(e.target.files[0])} className="w-full" />
              </div>

              <button type="submit" className="w-full bg-[#134f72] text-white font-bold py-4 rounded-xl hover:bg-[#0d3852] transition-colors shadow-lg">
                <i className="fas fa-save mr-2"></i> Salva Dipendente
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}