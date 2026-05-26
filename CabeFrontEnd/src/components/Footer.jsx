import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Sostituisci con il percorso reale del tuo logo per sfondo scuro
import logoDark from '../assets/Logo-navbar.png'; 

export default function Footer() {
  const canvasRef = useRef(null);

  // --- LOGICA EFFETTO PARTICELLE (CANVAS) PER FOOTER ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      // Il footer è basso, limitiamo l'altezza del canvas
      canvas.width = window.innerWidth;
      canvas.height = canvasRef.current.parentElement.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Pochissime particelle lente per uno sfondo discreto
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.1, // Lentissime
        vy: (Math.random() - 0.5) * 0.1, // Lentissime
        radius: Math.random() * 1.5 + 0.5,
        // Colore cyan molto tenue
        color: `rgba(0, 180, 216, ${Math.random() * 0.1 + 0.05})` 
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Rimbalzo sui bordi del canvas del footer
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <footer className="relative w-full bg-[#030508] text-white overflow-hidden border-t border-white/5">
      
      {/* 1. Particelle di sfondo */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60"></canvas>

      {/* 2. Contenuto Principale */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Colonna 1: Logo e Descrizione */}
          <div className="space-y-6">
            <Link to="/">
              <img src={logoDark} alt="Cabe Ingegneria" className="h-10 w-auto" />
            </Link>
            <p className="text-sm font-light leading-relaxed pr-4 opacity-80">
              Consulenza e soluzioni di progettazione ingegneristica e architettonica per imprese pubbliche e private.
            </p>
          </div>

          {/* Colonna 2: Contatti */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#00b4d8]">Contatti</h4>
            <ul className="space-y-4 text-[0.9rem] font-light">
              <li className="flex gap-3 items-start">
                <i className="fa-solid fa-map-marker-alt text-[#00b4d8] mt-1"></i>
                <span>VIA CAMPANA 192 CAP 80010<br/>QUARTO (NA)</span>
              </li>
              <li className="flex gap-3 items-start hover:text-[#00b4d8] transition-colors">
                <i className="fa-solid fa-phone-alt text-[#00b4d8] mt-1"></i>
                <div className="flex flex-col gap-1">
                  <a href="tel:+393471138404">+39 347 113 8404‬</a>
                  <a href="tel:+390818768096">+39 081 876 8096‬</a>
                  <a href="tel:+393385633260">+39 338 563 3260</a>
                </div>
              </li>
              <li className="flex gap-3 items-center hover:text-[#00b4d8] transition-colors">
                <i className="fa-solid fa-envelope text-[#00b4d8]"></i>
                <a href="mailto:studiotecnicocabe@gmail.com" className="break-all">studiotecnicocabe@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Colonna 3: Social & Links */}
          <div className="space-y-10">
            {/* Social */}
            <div className="space-y-5">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#00b4d8]">Seguici</h4>
              <div className="flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-[#00b4d8] hover:text-[#00b4d8] hover:-translate-y-1 transition-all shadow-sm">
                  <i className="fab fa-facebook-f text-lg"></i>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-[#00b4d8] hover:text-[#00b4d8] hover:-translate-y-1 transition-all shadow-sm">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:border-[#00b4d8] hover:text-[#00b4d8] hover:-translate-y-1 transition-all shadow-sm">
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              </div>
            </div>
            
            {/* Menu Navigazione rapida (Aggiunto per completezza e bilanciamento) */}
            <div className="space-y-5 hidden md:block">
              <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#00b4d8]">Naviga</h4>
              <ul className="space-y-2 text-[0.9rem] font-light">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link></li>
                <li><Link to="/contatti" className="hover:text-white transition-colors">Contattaci</Link></li>
                <li><Link to="/progetti" className="hover:text-white transition-colors">Progetti</Link></li>
              </ul>
            </div>
          </div>

          {/* Colonna 4: Informazioni Legali */}
          <div className="space-y-5">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#00b4d8]">Informazioni</h4>
            <div className="footer-links space-y-3 text-[0.9rem] font-light flex flex-col items-start">
              <a href="https://www.iubenda.com/privacy-policy/67949477" className="iubenda-white no-brand iubenda-embed hover:text-white transition-colors" title="Privacy Policy">Privacy Policy</a>
              <a href="https://www.iubenda.com/privacy-policy/67949477/cookie-policy" className="iubenda-white no-brand iubenda-embed hover:text-white transition-colors" title="Cookie Policy">Cookie Policy</a>
              {/* Script Iubenda mantenuti dal vecchio codice */}
              <script type="text/javascript">{`(function (w, d) { var loader = function () { var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src = "https://cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s, tag); }; if (w.addEventListener) { w.addEventListener("load", loader, false); } else if (w.attachEvent) { w.attachEvent("onload", loader); } else { w.onload = loader; } })(window, document);`}</script>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Footer Bottom */}
      <div className="relative z-10 border-t border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-white">
          <p>&copy; 2026 Cabe - P.IVA 10507651213 - Tutti i diritti riservati</p>
          <div className="flex gap-1.5 items-center  hover:opacity-100 transition-opacity">
            <span className='text-lg'>Developed by</span>
            <a href="https://081lab.com" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-white hover:text-orange-400">081Lab</a>
          </div>
        </div>
      </div>

    </footer>
  );
}