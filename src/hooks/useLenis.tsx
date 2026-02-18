import { createContext, useContext, useEffect, useRef, type RefObject } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<RefObject<Lenis | null>>({ current: null });

/**
 * Access the global Lenis instance from any component.
 */
export function useLenisRef() {
    return useContext(LenisContext);
}

/**
 * Provider that initializes Lenis smooth scrolling globally and syncs
 * it with GSAP ScrollTrigger. Wrap this around your routes.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Connect GSAP ScrollTrigger with Lenis
        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP ticker for the Lenis RAF loop (ensures perfect sync)
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCallback);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value= { lenisRef } >
        { children }
        </LenisContext.Provider>
    );
}
