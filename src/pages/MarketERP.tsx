import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Brain, Layers, AlertTriangle, Network, Globe, ChevronDown, Bot, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 200;
const framesDir = "/frames_2";

const MarketERP = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            const frameIndex = i.toString().padStart(3, "0");
            img.src = `${framesDir}/ezgif-frame-${frameIndex}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setIsLoaded(true);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Canvas render and scroll animation
    useEffect(() => {
        if (!isLoaded || !canvasRef.current || !scrollContainerRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = 1920;
        canvas.height = 1080;

        const render = (index: number) => {
            if (images[index]) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                const img = images[index];
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio); // Cover to fill canvas

                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                context.drawImage(
                    img,
                    0,
                    0,
                    img.width,
                    img.height,
                    centerShift_x,
                    centerShift_y,
                    img.width * ratio,
                    img.height * ratio
                );
            }
        };

        render(0);

        const trigger = ScrollTrigger.create({
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
            onUpdate: (self) => {
                const frameIndex = Math.round(self.progress * (frameCount - 1));
                const safeIndex = Math.min(Math.max(frameIndex, 0), frameCount - 1);
                requestAnimationFrame(() => render(safeIndex));
            },
        });

        return () => {
            trigger.kill();
        };
    }, [isLoaded, images]);

    // Text animations
    useEffect(() => {
        if (!isLoaded) return;

        const sections = document.querySelectorAll(".text-section");
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        end: "top 55%",
                        scrub: 1,
                        toggleActions: "play reverse play reverse"
                    }
                }
            );
        });

    }, [isLoaded]);

    if (!isLoaded) {
        return (
            <div className="h-screen w-full bg-[#020617] flex items-center justify-center text-cyan-500">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Bot className="w-6 h-6 animate-pulse" />
                        </div>
                    </div>
                    <p className="font-mono text-xl tracking-widest text-cyan-400">CONNECTING NEURAL NET...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#020617] min-h-screen text-slate-200 selection:bg-cyan-500/30 font-sans">

            {/* 1. FIXED BACKGROUND LAYER */}
            <div className="fixed inset-0 w-full h-full z-0 flex items-center justify-center bg-[#020617]">

                {/* Tech Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0891b2 1px, transparent 1px), linear-gradient(to bottom, #0891b2 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}>
                </div>

                {/* Cyberpunk Glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>

                {/* THE IMAGE FRAME */}
                <div className="relative w-[95%] md:w-[85%] max-w-[1500px] aspect-video bg-black/80 rounded-lg border border-cyan-500/20 shadow-[0_0_100px_-20px_rgba(8,145,178,0.3)] overflow-hidden ring-1 ring-white/5">
                    {/* Canvas Video */}
                    <canvas ref={canvasRef} className="w-full h-full object-cover opacity-80 mix-blend-screen" />

                    {/* HUD Overlays */}
                    <div className="absolute top-6 left-8 z-20 font-mono">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
                            <span className="text-xs text-cyan-400 tracking-widest">GEMINI AI CONNECTED</span>
                        </div>
                        <div className="text-[10px] text-slate-500 tracking-[0.2em] uppercase"> latency: 12ms</div>
                    </div>

                    <div className="absolute top-6 right-8 text-right z-20 font-mono">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold block mb-1">Live Revenue</span>
                        <div className="text-xl text-white font-bold tracking-tight">
                            $<span className="inline-block w-20 text-right">24,892.00</span>
                        </div>
                    </div>

                    {/* Bottom Data Stream Visual */}
                    <div className="absolute bottom-6 left-8 right-8 z-20 flex justify-between items-end border-t border-white/10 pt-4">
                        <div className="flex gap-8">
                            <div>
                                <div className="text-[9px] uppercase tracking-[0.1em] text-slate-500 mb-1">Active Channels</div>
                                <div className="flex gap-2 text-cyan-300">
                                    <Globe className="w-4 h-4" />
                                    <ShoppingCart className="w-4 h-4" />
                                    <Network className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <div className="text-[9px] uppercase tracking-[0.1em] text-slate-500 mb-1">Inventory Health</div>
                                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="w-[85%] h-full bg-emerald-500"></div>
                                </div>
                            </div>
                        </div>
                        <div className="text-[10px] text-slate-600 font-mono">v11.4.2-stable</div>
                    </div>

                    {/* Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,14,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(0,0,0,0.06),rgba(0,0,0,0.02),rgba(0,0,0,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-50" />
                </div>
            </div>

            {/* 2. SCROLLABLE CONTENT LAYER */}
            <div className="relative z-10 w-full">

                {/* Header */}
                <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 pointer-events-auto">
                    <Link to="/" className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors group cursor-pointer bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 hover:border-cyan-500/30">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm tracking-wide hidden md:inline">EXIT SIMULATION</span>
                    </Link>
                    <div className="font-mono font-bold text-xs tracking-[0.3em] uppercase text-cyan-500/80">Market ERP</div>
                </nav>

                <div ref={scrollContainerRef} className="relative w-full h-[500vh]">

                    {/* Title Section */}
                    <div className="absolute top-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-center pointer-events-auto mt-[10vh] z-30">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center gap-2 mb-6"
                            >
                                <div className="px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/50 text-cyan-400 text-[10px] uppercase tracking-widest font-mono">
                                    AI-First Architecture
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                                transition={{ duration: 0.8 }}
                                className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900 mb-6 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)] tracking-tight"
                            >
                                MARKET ERP
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4"
                            >
                                The operating system for modern commerce. <br />
                                <span className="text-cyan-400 font-semibold">Connect data. Predict demand. Automate scale.</span>
                            </motion.p>
                        </div>

                        <div className="absolute bottom-12 animate-bounce opacity-50 text-cyan-500">
                            <ChevronDown className="w-8 h-8" />
                        </div>
                    </div>


                    {/* Feature 1: Multi-Platform */}
                    <div className="absolute top-[80vh] left-0 w-full px-8 md:px-20 pointer-events-none flex justify-start">
                        <div className="text-section pointer-events-auto max-w-sm p-8 bg-slate-950/80 backdrop-blur-xl border border-cyan-900/50 border-l-4 border-l-cyan-500 rounded-xl shadow-[0_0_50px_-20px_rgba(6,182,212,0.3)]">
                            <Layers className="w-10 h-10 text-cyan-400 mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-3">Unified Intelligence</h2>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Stop tab-switching. Connect Amazon, Flipkart, Shopify, and Meesho into one central command center. View <span className="text-white">real-time profit & loss</span> across all channels instantly.
                            </p>
                            <div className="mt-4 flex gap-2">
                                {/* Platform Icons Placeholders */}
                                <div className="w-6 h-6 rounded-full bg-white/10"></div>
                                <div className="w-6 h-6 rounded-full bg-white/10"></div>
                                <div className="w-6 h-6 rounded-full bg-white/10"></div>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: AI Agent */}
                    <div className="absolute top-[170vh] right-0 w-full px-8 md:px-20 pointer-events-none flex justify-end">
                        <div className="text-section pointer-events-auto max-w-sm p-8 bg-slate-950/80 backdrop-blur-xl border border-violet-900/50 border-r-4 border-r-violet-500 rounded-xl shadow-[0_0_50px_-20px_rgba(139,92,246,0.3)]">
                            <Bot className="w-10 h-10 text-violet-400 mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-3">Your AI Analyst</h2>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Powered by Gemini. It doesn't just show charts; it tells you what to do.
                            </p>
                            <div className="mt-4 bg-violet-900/20 p-3 rounded-lg border border-violet-500/20">
                                <p className="font-mono text-xs text-violet-300">
                                    &gt; "Detected: Amazon return rate spiked to 28%. Flagging SKU-71 for quality check."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Inventory */}
                    <div className="absolute top-[260vh] left-0 w-full px-8 md:px-20 pointer-events-none flex justify-start">
                        <div className="text-section pointer-events-auto max-w-sm p-8 bg-slate-950/80 backdrop-blur-xl border border-emerald-900/50 border-l-4 border-l-emerald-500 rounded-xl shadow-[0_0_50px_-20px_rgba(16,185,129,0.3)]">
                            <Network className="w-10 h-10 text-emerald-400 mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-3">Smart Sync</h2>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                Prevent overselling. Allocated stock is synced automatically. If you sell on Flipkart, stock updates on Amazon instantly.
                            </p>
                            <div className="mt-4 flex items-center justify-between text-xs font-mono text-emerald-500">
                                <span>SYNC STATUS:</span>
                                <span className="animate-pulse">ACTIVE</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature 4: Returns */}
                    <div className="absolute top-[350vh] right-0 w-full px-8 md:px-20 pointer-events-none flex justify-end">
                        <div className="text-section pointer-events-auto max-w-sm p-8 bg-slate-950/80 backdrop-blur-xl border border-rose-900/50 border-r-4 border-r-rose-500 rounded-xl shadow-[0_0_50px_-20px_rgba(244,63,94,0.3)]">
                            <AlertTriangle className="w-10 h-10 text-rose-400 mb-6" />
                            <h2 className="text-3xl font-bold text-white mb-3">Return Forensics</h2>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                High returns kill D2C brands. Our matrix identifies serial returners and high-risk products before you ship.
                            </p>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="absolute top-[420vh] w-full px-6 pointer-events-none flex justify-center">
                        <div className="text-section pointer-events-auto max-w-3xl text-center">
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">
                                SCALE WITHOUT CHAOS
                            </h2>
                            <p className="text-slate-400 mb-10 max-w-xl mx-auto">
                                Join the elite sellers using Market ERP to manage millions in GMV.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 3. FOOTER LAYER */}
                <div className="relative z-20 bg-[#020617] py-32 border-t border-slate-800 flex flex-col items-center justify-center">
                    <div className="relative z-10 text-center">
                        <div className="mb-8 flex justify-center">
                            <Brain className="w-16 h-16 text-cyan-500" />
                        </div>
                        <h3 className="text-4xl text-white font-bold mb-4">Google Analytics + ERP + AI Consultant</h3>
                        <p className="text-slate-500 mb-12">All in one system.</p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)]">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-slate-700 transition-all">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MarketERP;
