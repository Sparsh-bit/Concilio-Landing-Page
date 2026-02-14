import { useEffect, useRef, useState } from "react";
import { ArrowLeft, GraduationCap, FileText, BarChart, Bell, ChevronDown, CheckCircle2, Users, School } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 200;
const framesDir = "/frames_3";

const SchoolERP = () => {
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
        const context = canvas.getContext("2d", { alpha: false }); // Alpha false for speed
        if (!context) return;

        // Optimized Resize Handler
        const handleResize = () => {
            const width = Math.min(window.innerWidth, 1920);
            const height = Math.min(window.innerHeight, 1080);
            canvas.width = width;
            canvas.height = height;
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "medium";

            // Re-render current frame on resize
            // We need to access the current index, but for now just render 0 or safe fallback
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        const render = (index: number) => {
            const img = images[index];
            if (img) {
                // Background clear not strictly needed if we cover, but safer
                // context.clearRect(0, 0, canvas.width, canvas.height); 

                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.max(hRatio, vRatio);

                // Integer coordinates for faster rendering
                const centerShift_x = Math.floor((canvas.width - img.width * ratio) / 2);
                const centerShift_y = Math.floor((canvas.height - img.height * ratio) / 2);
                const dw = Math.ceil(img.width * ratio);
                const dh = Math.ceil(img.height * ratio);

                context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, dw, dh);
            }
        };

        // Initial render
        render(0);

        const trigger = ScrollTrigger.create({
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0, // Instant scrub for responsiveness (or very low like 0.1)
            onUpdate: (self) => {
                const frameIndex = Math.round(self.progress * (frameCount - 1));
                const safeIndex = Math.min(Math.max(frameIndex, 0), frameCount - 1);
                render(safeIndex); // Direct call, no RAF wrap
            },
        });

        return () => {
            trigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded, images]);

    // Text animations
    useEffect(() => {
        if (!isLoaded) return;

        const sections = document.querySelectorAll(".text-section");
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%", // Trigger slightly earlier
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
            <div className="h-screen w-full bg-[#050505] flex items-center justify-center text-[#ffcc00]">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="w-16 h-16 border-2 border-[#ffcc00]/20 border-t-[#ffcc00] rounded-full animate-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <School className="w-6 h-6 animate-pulse" />
                        </div>
                    </div>
                    <p className="font-display-serif italic text-xl tracking-widest text-[#ffcc00]">INITIALIZING SYSTEM...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-[#e8e4dc] selection:bg-[#ffcc00]/30 font-sans">

            {/* 1. FIXED BACKGROUND LAYER */}
            <div className="fixed inset-0 w-full h-full z-0 flex items-center justify-center bg-[#050505]">

                {/* Premium Gold Luxury Grain */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay'
                    }}>
                </div>

                {/* Subtle Gold Glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ffcc00]/5 blur-[150px] rounded-full pointer-events-none"></div>

                {/* THE IMAGE FRAME */}
                <div className="relative w-[95%] md:w-[85%] max-w-[1500px] aspect-video bg-black rounded-lg border border-[#ffcc00]/10 shadow-[0_0_100px_-30px_rgba(255,204,0,0.15)] overflow-hidden ring-1 ring-white/5 group">
                    {/* Canvas Video - Sharpened & Clear */}
                    <canvas ref={canvasRef} className="w-full h-full object-cover opacity-100" />

                    {/* Watermark Cover - Bottom Right */}
                    <div className="absolute bottom-4 right-4 bg-black/95 px-4 py-1 z-30 flex items-center gap-2 border border-white/10 rounded-sm shadow-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">System Active</span>
                    </div>
                    <div className="absolute top-6 left-8 z-20 font-mono">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-[#ffcc00] rounded-full animate-pulse shadow-[0_0_15px_#ffcc00]"></div>
                            <span className="text-xs text-[#ffcc00] tracking-[0.2em] uppercase font-bold">Campus Neural Network</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 tracking-[0.3em] uppercase">Status: Optimal</div>
                    </div>

                    <div className="absolute top-6 right-8 text-right z-20 font-mono">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold block mb-1">Active Students</span>
                        <div className="text-3xl text-[#e8e4dc] font-display-serif italic tracking-tight">
                            4,289
                        </div>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-6 left-8 right-8 z-20 flex justify-between items-end border-t border-[#ffcc00]/10 pt-4">
                        <div className="flex gap-12">
                            <div>
                                <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Attendance Rate</div>
                                <div className="flex gap-2 items-center text-[#ffcc00] font-mono text-sm">
                                    <CheckCircle2 className="w-4 h-4" />
                                    98.4%
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-2">Fee Collection</div>
                                <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="w-[92%] h-full bg-[#ffcc00]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.3em]">EduCore v4.0</div>
                    </div>

                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80 pointer-events-none" />
                </div>
            </div>

            {/* 2. SCROLLABLE CONTENT LAYER */}
            <div className="relative z-10 w-full">

                {/* Header */}
                <nav className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-50 pointer-events-auto mix-blend-normal">
                    <Link to="/" className="flex items-center gap-3 text-[#e8e4dc] hover:text-[#ffcc00] transition-colors group cursor-pointer bg-black/40 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 hover:border-[#ffcc00]/30 transition-all shadow-lg">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-display-serif italic text-sm tracking-wide hidden md:inline">Back</span>
                    </Link>
                    <div className="px-4 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/5">
                        <div className="font-display-serif italic font-bold text-sm tracking-widest text-[#ffcc00]">School ERP</div>
                    </div>
                </nav>

                <div ref={scrollContainerRef} className="relative w-full h-[500vh]">

                    {/* Title Section */}
                    <div className="absolute top-0 w-full h-screen flex flex-col items-center justify-center pointer-events-none">
                        <div className="text-center pointer-events-auto mt-[10vh] z-30">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center gap-2 mb-8"
                            >
                                <div className="px-4 py-1 rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00] text-[10px] uppercase tracking-[0.3em] font-bold">
                                    Premium Education OS
                                </div>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-7xl md:text-9xl font-display-serif italic font-bold text-[#e8e4dc] mb-8 leading-none drop-shadow-2xl"
                            >
                                SCHOOL <br /><span className="text-[#ffcc00]">ERP.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-gray-200 text-lg md:text-xl max-w-xl mx-auto leading-relaxed font-light tracking-wide px-6 drop-shadow-md"
                            >
                                The definitive digital backbone for elite institutions.
                                <br /><span className="text-[#ffcc00] font-medium">Power. Prestige. Performance.</span>
                            </motion.p>
                        </div>

                        <div className="absolute bottom-12 animate-bounce opacity-80 text-[#ffcc00]">
                            <ChevronDown className="w-6 h-6" />
                        </div>
                    </div>


                    {/* Feature 1: Student Management */}
                    <div className="absolute top-[80vh] left-0 w-full px-8 md:px-24 pointer-events-none flex justify-start">
                        <div className="text-section pointer-events-auto max-w-md p-10 bg-[#0a0a0a] border border-white/10 border-l-4 border-l-[#ffcc00] shadow-2xl rounded-sm">
                            <GraduationCap className="w-8 h-8 text-[#ffcc00] mb-6 opacity-100" />
                            <h2 className="text-3xl font-display-serif italic text-white mb-4">Student <span className="text-[#ffcc00]">360°</span></h2>
                            <p className="text-gray-300 leading-relaxed text-sm font-normal">
                                A complete digital legacy for every scholar. Track academic mastery, disciplinary records, and extracurricular triumphs in one unified, golden timeline.
                            </p>
                        </div>
                    </div>

                    {/* Feature 2: Smart Fees */}
                    <div className="absolute top-[170vh] right-0 w-full px-8 md:px-24 pointer-events-none flex justify-end">
                        <div className="text-section pointer-events-auto max-w-md p-10 bg-[#0a0a0a] border border-white/10 border-r-4 border-r-[#ffcc00] shadow-2xl text-right rounded-sm">
                            <div className="flex justify-end mb-6"><FileText className="w-8 h-8 text-[#ffcc00] opacity-100" /></div>
                            <h2 className="text-3xl font-display-serif italic text-white mb-4">Zero-Touch Fees</h2>
                            <p className="text-gray-300 leading-relaxed text-sm font-normal">
                                Automated invoice generation and payment reminders. Integrated gateway for seamless capital flow, reducing administrative friction by 80%.
                            </p>
                        </div>
                    </div>

                    {/* Feature 3: Analytics */}
                    <div className="absolute top-[260vh] left-0 w-full px-8 md:px-24 pointer-events-none flex justify-start">
                        <div className="text-section pointer-events-auto max-w-md p-10 bg-[#0a0a0a] border border-white/10 border-l-4 border-l-[#ffcc00] shadow-2xl rounded-sm">
                            <BarChart className="w-8 h-8 text-[#ffcc00] mb-6 opacity-100" />
                            <h2 className="text-3xl font-display-serif italic text-white mb-4">Result Intelligence</h2>
                            <p className="text-gray-300 leading-relaxed text-sm font-normal">
                                Beyond grade cards. Our analytics engine identifies learning gaps and prescribes personalized remedial actions for every underperforming student.
                            </p>
                        </div>
                    </div>

                    {/* Feature 4: Communication */}
                    <div className="absolute top-[350vh] right-0 w-full px-8 md:px-24 pointer-events-none flex justify-end">
                        <div className="text-section pointer-events-auto max-w-md p-10 bg-[#0a0a0a] border border-white/10 border-r-4 border-r-[#ffcc00] shadow-2xl text-right rounded-sm">
                            <div className="flex justify-end mb-6"><Bell className="w-8 h-8 text-[#ffcc00] opacity-100" /></div>
                            <h2 className="text-3xl font-display-serif italic text-white mb-4">Instant Connect</h2>
                            <p className="text-gray-300 leading-relaxed text-sm font-normal">
                                Bridge the gap between campus and home. Real-time notifications for attendance, homework, and emergency alerts sent directly to parent apps.
                            </p>
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="absolute top-[420vh] w-full px-6 pointer-events-none flex justify-center">
                        <div className="text-section pointer-events-auto max-w-4xl text-center">
                            <h2 className="text-6xl md:text-8xl font-display-serif italic text-white mb-8 drop-shadow-2xl">
                                Upgrade Your <span className="text-[#ffcc00]">Campus.</span>
                            </h2>
                            <p className="text-gray-300 mb-12 max-w-xl mx-auto text-lg font-light">
                                Join 500+ leading institutions running on Nano School ERP.
                            </p>
                        </div>
                    </div>

                </div>

                {/* 3. FOOTER LAYER */}
                <div className="relative z-20 bg-[#050505] py-32 border-t border-[#ffcc00]/10 flex flex-col items-center justify-center">
                    <div className="relative z-10 text-center">
                        <div className="mb-8 flex justify-center">
                            <Users className="w-16 h-16 text-[#ffcc00]" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-display-serif italic text-[#e8e4dc] mb-4">The Operating System for Education.</h3>
                        <p className="text-zinc-500 mb-12 uppercase tracking-widest text-xs">Designed for Schools, Colleges & Universities.</p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <button className="px-10 py-4 bg-[#ffcc00] hover:bg-[#ffdb4d] text-black font-bold text-sm uppercase tracking-widest rounded-none transition-all hover:scale-105 shadow-[0_0_40px_-5px_rgba(255,204,0,0.3)]">
                                Schedule Demo
                            </button>
                            <button className="px-10 py-4 bg-transparent hover:bg-white/5 text-[#e8e4dc] font-bold text-sm uppercase tracking-widest rounded-none border border-[#e8e4dc]/20 transition-all">
                                Download Brochure
                            </button>
                        </div>

                        <div className="mt-24 opacity-30">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#ffcc00]">Concilio Engineering • Nano Series</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SchoolERP;
