import { useMemo } from "react";
import { hudPhases, TOTAL_FRAMES } from "../data/scrollData";

interface ScrollExperienceProps {
  scrollProgress: number;
}

const ScrollExperience: React.FC<ScrollExperienceProps> = ({ scrollProgress }) => {
  const currentFrame = Math.min(Math.floor(scrollProgress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);

  const phaseStates = useMemo(() => {
    return hudPhases.map((phase) => {
      const fadeInStart = phase.startProgress;
      const fadeInEnd = Math.min(phase.startProgress + 0.08, phase.endProgress);
      const fadeOutStart = Math.max(phase.endProgress - 0.08, fadeInEnd);
      const fadeOutEnd = phase.endProgress;

      let opacity = 0;
      let translateY = 30;
      let blur = 10;
      let scale = 0.96;

      if (scrollProgress >= fadeInStart && scrollProgress <= fadeInEnd) {
        const t = (scrollProgress - fadeInStart) / (fadeInEnd - fadeInStart || 1);
        opacity = t;
        translateY = 30 * (1 - t);
        blur = 10 * (1 - t);
        scale = 0.96 + 0.04 * t;
      } else if (scrollProgress > fadeInEnd && scrollProgress < fadeOutStart) {
        opacity = 1;
        translateY = 0;
        blur = 0;
        scale = 1;
      } else if (scrollProgress >= fadeOutStart && scrollProgress <= fadeOutEnd) {
        const t = (scrollProgress - fadeOutStart) / (fadeOutEnd - fadeOutStart || 1);
        opacity = 1 - t;
        translateY = -20 * t;
        blur = 5 * t;
        scale = 1 + 0.02 * t;
      }

      return { ...phase, opacity, translateY, blur, scale };
    });
  }, [scrollProgress]);

  const activePhaseIndex = useMemo(() => {
    const found = hudPhases.findIndex(
      (phase) => scrollProgress >= phase.startProgress && scrollProgress < phase.endProgress
    );
    if (found !== -1) return found;
    return scrollProgress >= 1 ? hudPhases.length - 1 : 0;
  }, [scrollProgress]);

  const systemStatus =
    scrollProgress < 0.2
      ? "SYSTEM READY"
      : scrollProgress < 0.5
        ? "ADAPTING FORM"
        : scrollProgress < 0.82
          ? "OPTIMIZING"
          : "MISSION_COMPLETED";

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "left":
        return "items-start text-left pl-8 sm:pl-16 lg:pl-28 pr-6";
      case "right":
        return "items-end text-right pr-8 sm:pr-16 lg:pr-28 pl-6";
      case "center":
        return "items-center text-center px-10";
      case "bottom-left":
        return "items-start text-left pl-8 sm:pl-16 lg:pl-28 pr-6 justify-end pb-40";
      case "bottom-right":
        return "items-end text-right pr-8 sm:pr-16 lg:pr-28 pl-6 justify-end pb-40";
      default:
        return "items-start text-left pl-8 sm:pl-16 lg:pl-28";
    }
  };

  return (
    <div className="hud-overlay">
      <div className="vignette-overlay" />
      <div className="grain-overlay" />

      {/* Dynamic technical lines */}
      <div className="absolute inset-y-0 left-8 sm:left-14 lg:left-24 w-px bg-white/[0.07]" />
      <div className="absolute inset-y-0 right-8 sm:right-14 lg:right-24 w-px bg-white/[0.07]" />

      {phaseStates.map((phase) => (
        <div
          key={phase.id}
          className={`absolute inset-0 flex flex-col justify-center ${getPositionClasses(phase.position)}`}
          style={{
            opacity: phase.opacity,
            transform: `translateY(${phase.translateY}px) scale(${phase.scale})`,
            filter: `blur(${phase.blur}px)`,
            transition: "none",
            willChange: "opacity, transform, filter",
            pointerEvents: phase.opacity > 0.1 ? "auto" : "none",
          }}
        >
          <div className="max-w-[38rem] space-y-8">
            {phase.tag && (
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-accent/60" />
                <span className="hud-tag">{phase.tag}</span>
              </div>
            )}
            <h2 className="hud-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl">{phase.headline}</h2>
            <div className="space-y-6">
              <p className="hud-subline text-lg sm:text-xl lg:text-2xl font-light">{phase.subline}</p>
              <ul className="hud-readouts flex flex-wrap gap-x-6 gap-y-2">
                {phase.readouts.map((line) => (
                  <li key={line} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <div className="chapter-rail" aria-hidden="true">
        {hudPhases.map((phase, index) => (
          <div key={phase.id} className="flex items-center gap-3">
            <div className={`h-px transition-all duration-500 ${index === activePhaseIndex ? "w-8 bg-accent" : "w-4 bg-white/10"}`} />
            <div className={`chapter-chip ${index === activePhaseIndex ? "active" : ""}`}>
              <span>{`CH.0${index + 1}`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="frame-counter">
        <div className="flex flex-col items-end">
          <span className="text-[0.45rem] text-white/30 tracking-[0.3em] font-display uppercase mb-1">Timeline Sequence</span>
          <span className="text-sm font-display tracking-[0.1em]">
            <span className="text-white">{String(currentFrame + 1).padStart(3, "0")}</span>
            <span className="text-white/20 mx-1">/</span>
            <span className="text-white/40">{TOTAL_FRAMES}</span>
          </span>
        </div>
        <div className="h-px w-24 bg-white/10 my-2" />
        <span className="frame-counter-status">{systemStatus}</span>
      </div>

      <div className="scroll-progress-track">
        <div className="scroll-progress-fill" style={{ height: `${scrollProgress * 100}%` }} />
        <div className="absolute top-0 -left-1 text-[0.4rem] text-white/20 rotate-90 origin-left mt-2 whitespace-nowrap">START</div>
        <div className="absolute bottom-0 -left-1 text-[0.4rem] text-white/20 rotate-90 origin-left mb-8 whitespace-nowrap">END_DATA</div>
      </div>

      {scrollProgress < 0.05 && (
        <div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          style={{ opacity: 1 - scrollProgress * 20 }}
        >
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-accent/20 rounded-full" />
            <span className="label-tag relative z-10">INITIATE_SCROLL</span>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
        </div>
      )}
    </div>
  );
};

export default ScrollExperience;
