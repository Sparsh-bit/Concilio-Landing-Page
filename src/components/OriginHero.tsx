import { ArrowRight } from "lucide-react";
import { HeroGeometric } from "./ui/shape-landing-hero";

interface OriginHeroProps {
  onScrollChange?: (scrolled: boolean) => void;
}

export function OriginHero(_props: OriginHeroProps) {
  const scrollToContent = () => {
    document.querySelector("#simplify")?.scrollIntoView({ behavior: "smooth" });
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
          onClick={scrollToContent}
          className="px-10 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]"
        >
          Get started
        </button>
        <button className="px-8 py-4 rounded-full text-lg font-medium text-white hover:bg-white/10 transition-all flex items-center gap-2 group">
          Learn more <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </HeroGeometric>
  );
}
