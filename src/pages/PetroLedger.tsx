import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ShieldCheck, Zap, Cpu, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import ScrollCanvas from "../components/ScrollCanvas";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 192;
const framesDir = "/frames";

const PetroLedger = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Scroll trigger to track progress
    useEffect(() => {
        // Wait for load to ensure layout is stable, though not strictly required for logic
        if (!isLoaded) return;

        const trigger = ScrollTrigger.create({
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1, // Very responsive
            onUpdate: (self) => {
                setScrollProgress(self.progress);
            },
        });

        return () => {
            trigger.kill();
        };
    }, [isLoaded]);

    // Text animations
    useEffect(() => {
        if (!isLoaded) return;

        const sections = document.querySelectorAll(".text-section");
        sections.forEach((section) => {
            // Animate In
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%", // When top of card hits 80% viewport height
                        end: "top 50%",
                        scrub: 1,
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

    }, [isLoaded]);

    if (!isLoaded) {
        return (
            <div className="h-screen w-full bg-[#050505] flex items-center justify-center text-[#d4af37]">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-2 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin"></div>
                    <p className="font-display-serif italic text-xl tracking-widest text-[#d4af37]">System Initializing...</p>
                    {/* Render ScrollCanvas hidden to preload */}
                    <div className="hidden">
                        <ScrollCanvas
                            scrollProgress={0}
                            frameCount={frameCount}
                            frameFolder={framesDir}
                            onLoadProgress={(p) => { if (p >= 1) setIsLoaded(true); }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-[#e8e4dc] selection:bg-[#d4af37]/30 font-sans">

            {/* 1. FIXED BACKGROUND LAYER */}
            {/* This layer stays pinned to the viewport until the footer covers it */}
            <div className="fixed inset-0 w-full h-full z-0 flex items-center justify-center bg-[#080808]">

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}>
                </div>

                {/* Vintage Grain */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay z-10"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>

                {/* THE IMAGE FRAME */}
                <div className="relative w-[90%] md:w-[80%] max-w-[1400px] aspect-video bg-black rounded-sm border border-[#333] shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
                    {/* Canvas Video */}
                    <div className="w-full h-full opacity-90 sepia-[0.1]">
                        <ScrollCanvas
                            scrollProgress={scrollProgress}
                            frameCount={frameCount}
                            frameFolder={framesDir}
                        />
                    </div>

                    {/* HUD Overlays (Fixed on image) */}
                    <div className="absolute top-4 left-6 flex flex-col gap-1 z-20">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/70 font-bold">System Status</span>
                        <div className="flex items-center gap-2 text-xs font-mono text-emerald-500">
                            <span className="animate-pulse">●</span> ONLINE
                        </div>
                    </div>
                    <div className="absolute top-4 right-6 text-right z-20">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37]/70 font-bold">Pressure</span>
                        <div className="text-xl font-mono text-white/90">2.4 BAR</div>
                    </div>
                    <div className="absolute bottom-4 left-6 z-20">
                        <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-1 h-3 bg-emerald-500/60"></div>)}
                        </div>
                    </div>

                    {/* Scanlines & Vignette */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,14,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none" />
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 z-10 pointer-events-none" />
                </div>
            </div>

            {/* 2. SCROLLABLE CONTENT LAYER */}
            {/* This layer has a transparent background and sits ON TOP (z-10) of the fixed layer */}
            {/* It contains the text sections that scroll naturally over the fixed image */}
            <div className="relative z-10 w-full">

                {/* Header (Fixed visual, but interactive) */}
                <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center mix-blend-exclusion z-50 pointer-events-auto">
                    <Link to="/" className="flex items-center gap-3 text-[#e8e4dc] hover:text-[#d4af37] transition-colors group cursor-pointer">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-display-serif italic text-lg tracking-wide hidden md:inline">Back to Concilio</span>
                    </Link>
                    <div className="font-bold text-xs tracking-[0.3em] uppercase opacity-80 text-[#d4af37]">Series 7100</div>
                </nav>

                {/* TALL SPACER DIV - This defines the scroll length */}
                <div ref={scrollContainerRef} className="relative w-full h-[400vh]">

                    {/* Title Section (At the very top) */}
                    <div className="absolute top-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-center pointer-events-auto mt-[40vh] md:mt-[35vh]">
                            <motion.h1
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="font-display-serif text-6xl md:text-9xl italic text-[#e8e4dc] mb-4 drop-shadow-2xl mix-blend-screen"
                            >
                                PetroLedger
                            </motion.h1>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 inline-block"
                            >
                                <p className="text-[#d4af37] uppercase tracking-[0.2em] text-xs md:text-sm font-bold">
                                    Refining Flow • <span className="text-white">Est. 2026</span>
                                </p>
                            </motion.div>
                        </div>

                        <div className="absolute bottom-12 animate-bounce opacity-50 text-[#d4af37]">
                            <ChevronDown className="w-6 h-6" />
                        </div>
                    </div>


                    {/* Content Section 1: Top Right */}
                    <div className="absolute top-[80vh] w-full px-8 md:px-20 pointer-events-none">
                        <div className="flex justify-end">
                            <div className="text-section pointer-events-auto max-w-sm p-8 bg-black/90 backdrop-blur-xl border border-white/10 border-r-4 border-r-[#d4af37] rounded-lg shadow-2xl transform transition-transform hover:scale-105">
                                <ShieldCheck className="w-8 h-8 text-[#d4af37] mb-4" />
                                <h2 className="font-display-serif text-3xl italic text-white mb-2">Employee Trust Score</h2>
                                <p className="text-sm text-gray-400 leading-relaxed text-right md:text-left">
                                    Monitor attendant performance and reliability with <span className="text-white font-bold">AI-driven trust scores</span> ensuring operational integrity.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section 2: Middle Left */}
                    <div className="absolute top-[160vh] w-full px-8 md:px-20 pointer-events-none">
                        <div className="flex justify-start">
                            <div className="text-section pointer-events-auto max-w-sm p-8 bg-black/90 backdrop-blur-xl border border-white/10 border-l-4 border-l-[#d4af37] rounded-lg shadow-2xl transform transition-transform hover:scale-105">
                                <Cpu className="w-8 h-8 text-[#d4af37] mb-4" />
                                <h2 className="font-display-serif text-3xl italic text-white mb-2">CNG Safety Validation</h2>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Automatically detect vehicles with expired or unverified CNG cylinders using advanced CCTV feeds, ensuring station safety.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section 3: Bottom Right */}
                    <div className="absolute top-[240vh] w-full px-8 md:px-20 pointer-events-none">
                        <div className="flex justify-end">
                            <div className="text-section pointer-events-auto max-w-sm p-8 bg-black/90 backdrop-blur-xl border border-white/10 border-r-4 border-r-[#d4af37] rounded-lg shadow-2xl transform transition-transform hover:scale-105">
                                <Zap className="w-8 h-8 text-[#d4af37] mb-4" />
                                <h2 className="font-display-serif text-3xl italic text-white mb-2">Instant Guard</h2>
                                <p className="text-sm text-gray-400 leading-relaxed text-right md:text-left">
                                    Instant alerts sent to managers and owners the moment a non-compliant vehicle enters CCTV surveillance.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content Section 4: Center Bottom */}
                    <div className="absolute top-[320vh] w-full px-6 pointer-events-none">
                        <div className="flex justify-center">
                            <div className="text-section pointer-events-auto max-w-2xl p-10 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl text-center">
                                <Zap className="w-10 h-10 text-[#d4af37] mx-auto mb-6" />
                                <h2 className="font-display-serif text-4xl md:text-5xl italic text-white mb-4">Live Sync</h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Every drop is accounted for. Real-time reconciliation with the Concilio Cloud ensures your books are balanced before the nozzle hits the holster.
                                    <br /><span className="text-[#d4af37] font-bold block mt-4">Total Clarity. Zero Latency.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 3. SOLID FOOTER LAYER */}
                {/* This sits AFTER the tall spacer. It has a solid background to cover the fixed image as it scrolls up. */}
                <div className="relative z-20 bg-[#080808] py-32 border-t border-[#333] flex flex-col items-center justify-center">
                    <div className="absolute inset-0 bg-[url('https://grain-url-placeholder')] opacity-5 pointer-events-none"></div>

                    <h3 className="font-display-serif text-5xl md:text-6xl italic mb-6 text-[#e8e4dc] text-center px-4">The Future is Flowing.</h3>
                    <p className="text-center text-white/40 max-w-md mb-12 px-6">
                        Limited pilot deployments for Q3 2026. <br />Secure your station's upgrade slot today.
                    </p>

                    <div className="flex flex-col md:flex-row gap-6">
                        <Link to="/#contact" className="px-10 py-5 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-[#b5952f] transition-all transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)]">
                            Inquire Now
                        </Link>
                        <Link to="/petro-problem" className="px-10 py-5 bg-transparent border border-[#e8e4dc]/20 text-[#e8e4dc] font-bold uppercase tracking-widest hover:bg-[#e8e4dc]/5 transition-colors">
                            Report Issue
                        </Link>
                    </div>

                    <div className="mt-24 opacity-30 text-xs tracking-widest uppercase">
                        Concilio Engineering • Series 7100
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PetroLedger;
