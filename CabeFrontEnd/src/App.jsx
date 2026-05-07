import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Importazione Componenti
import Contatti from './pages/Contatti'; // In alto con gli altri import
import Header from './components/Header';
import Footer from './components/Footer';
import ProgettoDettaglio from './pages/ProgettoDettaglio';
// Importazione Pagine
import Home from './pages/Home'; 
import ChiSiamo from './pages/ChiSiamo'; 
import Progetti from './pages/Progetti';
import Login from './pages/Login';
import GestioneProgetti from './pages/GestioneProgetti';
import NotFound from './pages/NotFound';

// 1. QUESTO È IL TRUCCHETTO SALVA-VITA PER IL ROUTING
// Quando cambi pagina, forza il browser a tornare in cima, 
// così Framer Motion può calcolare le altezze correttamente!
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* 2. HO RIMOSSO 'overflow-x-hidden' DA QUI! */}
      {/* Ora lo sticky della sezione Servizi tornerà ad ancorarsi alla finestra */}
      <div className="font-sans antialiased min-h-screen flex flex-col bg-[#030508]">
        
        <Header />

        <main className="grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/progetti" element={<Progetti />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/progetto/:id" element={<ProgettoDettaglio />} />
            <Route path="/admin/progetti" element={<GestioneProgetti />} />   
            <Route path="/contatti" element={<Contatti />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;