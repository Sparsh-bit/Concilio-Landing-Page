import { useEffect, useState } from "react";

interface CinematicNavbarProps {
  scrollProgress: number;
}

const navLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#features", label: "Features" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

const CinematicNavbar: React.FC<CinematicNavbarProps> = ({ scrollProgress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = scrollProgress > 0.02;

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${isScrolled ? "glass-nav py-0" : "bg-transparent py-4"}`}>
      <div className="container-cinematic">
        <div className="h-16 md:h-[84px] flex items-center justify-between relative">
          {/* Top border accent when scrolled */}
          {isScrolled && <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />}

          <a href="#" className="flex items-center gap-4 group relative">
            <div className="relative">
              <div className="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-10 h-10 rounded-lg flex items-center justify-center bg-neutral-900 border border-white/10 transition-all duration-300 group-hover:border-accent/50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white group-hover:text-accent transition-colors">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div className="leading-none">
              <span className="font-display block text-base md:text-lg tracking-[0.2em] text-white group-hover:text-accent transition-colors">CONCILIO</span>
              <span className="font-display hidden md:block text-[0.45rem] tracking-[0.3em] text-white/30 mt-1 uppercase">Advanced Cinematic Systems</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-display text-[0.62rem] tracking-[0.25em] uppercase text-white/40 hover:text-white transition-all hover:tracking-[0.3em] relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all group-hover:w-full"></span>
              </button>
            ))}
            <div className="w-px h-6 bg-white/10 mx-2" />
            <button onClick={() => scrollTo("#contact")} className="nav-cta group">
              <span className="relative z-10">Inquire</span>
              <div className="absolute inset-0 bg-accent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center text-white/70 hover:text-white"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-end gap-1.5">
              <span className={`h-px bg-current transition-all duration-300 ${isMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`h-px bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-4"}`} />
              <span className={`h-px bg-current transition-all duration-300 ${isMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-neutral-950/95 backdrop-blur-xl px-8 py-10 space-y-6 border-t border-white/5">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left font-display text-xs tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors flex items-center justify-between group"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
              <div className="w-1 h-1 rounded-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
          <button onClick={() => scrollTo("#contact")} className="w-full nav-cta mt-6 py-4">
            Connect Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CinematicNavbar;
