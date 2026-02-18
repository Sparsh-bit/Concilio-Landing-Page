import { type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { HeroGeometric } from "./ui/shape-landing-hero";
import { useNavigate } from "react-router-dom";
import type Lenis from "lenis";

interface OriginHeroProps {
  onScrollChange?: (scrolled: boolean) => void;
  lenisRef?: RefObject<Lenis | null>;
}

export function OriginHero({ lenisRef }: OriginHeroProps) {
  const navigate = useNavigate();

  const scrollToContent = () => {
    const target = document.querySelector("#simplify");
    if (target) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(target as HTMLElement, {
          offset: -40,
          duration: 2.0,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <HeroGeometric
      badge="Concilio Studio"
      title1="Engineering Simplicity"
      title2="For Complex Business"
      description="Intelligent, scalable, and industry-specific solutions for the modern enterprise."
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <button
          onClick={() => navigate("/describe-problem")}
          className="px-10 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2"
        >
          Describe Your Problem
          <ArrowRight className="w-5 h-5" />
        </button>
        <button
          onClick={scrollToContent}
          className="px-8 py-4 rounded-full text-lg font-medium text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
        >
          Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </HeroGeometric>
  );
}
