import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/Logo-navbar.png'; 

export default function Header() {
  // Stato per gestire l'apertura/chiusura del menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Funzione per chiudere il menu dopo aver cliccato un link
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6">
      
      {/* =========================================
          LOGO (Rimane sempre visibile a sinistra)
          ========================================= */}
      <div className="z-50 w-32 md:w-48">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="CABE Ingegneria" className="w-full h-auto" />
        </Link>
      </div>
      
      {/* =========================================
          MENU DESKTOP (Nascosto su mobile)
          ========================================= */}
      <nav className="hidden md:flex bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-8 py-2">
        <ul className="flex items-center gap-8 m-0 p-0 list-none text-gray-300 text-lg font-light tracking-wider">
          <li>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
          </li>
          <li>
            <Link to="/chi-siamo" className="hover:text-white transition-colors">Chi siamo</Link>
          </li>
          <li>
            <Link to="/progetti" className="hover:text-white transition-colors">Progetti</Link>
          </li>
          <li>
            <Link to="/contatti" className="hover:text-white transition-colors">Contattaci</Link>
          </li>
        </ul>
      </nav>

      {/* =========================================
          PULSANTE HAMBURGER (Visibile solo su mobile)
          ========================================= */}
      <div className="md:hidden z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white text-3xl focus:outline-none hover:text-[#00b4d8] transition-colors"
          aria-label="Toggle menu"
        >
          {/* Cambia l'icona tra "hamburger" e "X" in base allo stato */}
          <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* =========================================
          MENU MOBILE (Pannello a scorrimento laterale)
          ========================================= */}
      {/* Overlay scuro di sfondo (opzionale, cliccabile per chiudere) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      ></div>

      {/* Il vero e proprio menu a cassetto sulla destra */}
      <nav 
        className={`fixed top-0 right-0 h-screen w-4/5 sm:w-2/3 bg-[#030508]/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-center items-center ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="flex flex-col items-center gap-10 m-0 p-0 list-none text-gray-300 text-2xl font-light tracking-widest">
          <li>
            <Link to="/" onClick={closeMenu} className="hover:text-[#00b4d8] transition-colors block">Home</Link>
          </li>
          <li>
            <Link to="/chi-siamo" onClick={closeMenu} className="hover:text-[#00b4d8] transition-colors block">Chi siamo</Link>
          </li>
          <li>
            <Link to="/progetti" onClick={closeMenu} className="hover:text-[#00b4d8] transition-colors block">Progetti</Link>
          </li>
          <li>
            <Link to="/contatti" onClick={closeMenu} className="hover:text-[#00b4d8] transition-colors block">Contattaci</Link>
          </li>
        </ul>
      </nav>

    </header>
  );
}