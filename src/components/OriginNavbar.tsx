import { useState, type RefObject } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type Lenis from "lenis";

const navLinks = [
  { href: "#simplify", label: "Solutions" },
  { href: "#process", label: "Method" },
  { href: "#contact", label: "Contact" },
];

interface OriginNavbarProps {
  isScrolled: boolean;
  onScrollChange?: (scrolled: boolean) => void;
  lenisRef?: RefObject<Lenis | null>;
}

export default function OriginNavbar({ isScrolled, lenisRef }: OriginNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(target as HTMLElement, {
          offset: -80,
          duration: 1.8,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = target.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    setIsMenuOpen(false);
  };

  const goToForm = () => {
    setIsMenuOpen(false);
    navigate("/describe-problem");
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-6">
      <motion.nav
        layout
        initial={{ width: "100%", maxWidth: "72rem" }}
        animate={{
          width: "100%",
          maxWidth: isScrolled ? "56rem" : "80rem",
          backgroundColor: isScrolled ? "rgba(15, 15, 15, 0.8)" : "transparent",
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "transparent",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between border rounded-full px-6 py-4 md:px-8 md:py-3
          ${isScrolled ? "backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent border-transparent"}`}
      >
        <a href="#" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-4 h-4 bg-black rounded-sm" />
          </div>
          <span className="font-bold tracking-tight text-white transition-colors">Concilio</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all hover:translate-y-[-1px] whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="ml-4 pl-4 border-l border-white/10">
            <button
              onClick={goToForm}
              className={`text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full transition-all duration-500 whitespace-nowrap flex items-center gap-2
                ${isScrolled
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20"
                }`}
            >
              Describe Your Problem
              <ArrowRight className="w-3. h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[-1] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-8 space-y-8"
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-display-serif italic text-white"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={goToForm}
              className="w-full btn-cta-white justify-center text-lg"
            >
              Describe Your Problem
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
