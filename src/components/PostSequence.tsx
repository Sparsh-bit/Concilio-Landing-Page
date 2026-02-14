import { useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AssetAllocation, MarketSparklines, PortfolioGraph, PositionTable } from "./WealthComponents";
import { ConcilioInfo } from "./ConcilioInfo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PostSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger Implementation
    const elements = containerRef.current?.querySelectorAll(".reveal-up");

    if (elements && elements.length > 0) {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Refresh ScrollTrigger to ensure positions are correct after render
    const timeout = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#000000] z-10">
      {/* 2x2 Multi-Dash Section */}
      <section id="simplify" className="py-32 md:py-48 border-b border-white/[0.03]">
        <div className="container-origin">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

            {/* Card 1: Connect */}
            <div className="reveal-up card-origin group flex flex-col min-h-[500px]">
              <div className="mb-auto">
                <h2 className="font-display-serif text-4xl md:text-5xl text-white italic mb-4 whitespace-pre-wrap">
                  Connect {"\n"}<span className="text-white/40">every drop & penny</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  PetroLedger integrates directly with your fuel pumps and POS systems. Track nozzle-wise sales, tank levels, and density in real-time.
                </p>
              </div>
              <div className="bg-[#050505] rounded-2xl border border-white/[0.03] p-6 mt-8 shadow-inner overflow-hidden">
                <AssetAllocation />
              </div>
            </div>

            {/* Card 2: Automate */}
            <div className="reveal-up card-origin group flex flex-col min-h-[500px]" style={{ transitionDelay: '100ms' }}>
              <div className="mb-auto">
                <h2 className="font-display-serif text-4xl md:text-5xl text-white italic mb-4 whitespace-pre-wrap">
                  Automate {"\n"}<span className="text-white/40">daily reconciliation</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Stop manual tallying. Our system automatically matches QR payments, card swipes, and cash collections against dispensed fuel.
                </p>
              </div>
              <div className="bg-[#050505] rounded-2xl border border-white/[0.03] p-6 mt-8 shadow-inner overflow-hidden">
                <PortfolioGraph />
              </div>
            </div>

            {/* Card 3: Control */}
            <div className="reveal-up card-origin group flex flex-col min-h-[500px]" style={{ transitionDelay: '200ms' }}>
              <div className="mb-auto">
                <h2 className="font-display-serif text-4xl md:text-5xl text-white italic mb-4 whitespace-pre-wrap">
                  Control {"\n"}<span className="text-white/40">pilferage & fraud</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  AI-powered algorithms detect dip/sales mismatches, density anomalies, and suspicious void transactions instantly.
                </p>
              </div>
              <div className="bg-[#050505] rounded-2xl border border-white/[0.03] p-6 mt-8 shadow-inner overflow-hidden">
                <MarketSparklines />
              </div>
            </div>

            {/* Card 4: Scale */}
            <div className="reveal-up card-origin group flex flex-col min-h-[500px]" style={{ transitionDelay: '300ms' }}>
              <div className="mb-auto">
                <h2 className="font-display-serif text-4xl md:text-5xl text-white italic mb-4 whitespace-pre-wrap">
                  Scale {"\n"}<span className="text-white/40">your operations</span>
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Whether you run one bunk or a chain of fifty, view consolidated reports and manage shifts from a single glass pane.
                </p>
              </div>
              <div className="bg-[#050505] rounded-2xl border border-white/[0.03] p-6 mt-8 shadow-inner overflow-hidden">
                <PositionTable />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-white/5">
        <div className="container-origin">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="reveal-up card-origin flex flex-col">
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">Zero</div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Leakage Target</div>
            </div>
            <div className="reveal-up card-origin flex flex-col" style={{ transitionDelay: '100ms' }}>
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">100%</div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Digital Reconcile</div>
            </div>
            <div className="reveal-up card-origin flex flex-col" style={{ transitionDelay: '200ms' }}>
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">Live</div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Dashboards</div>
            </div>
            <div className="reveal-up card-origin flex flex-col" style={{ transitionDelay: '300ms' }}>
              <div className="text-2xl md:text-3xl font-bold text-white tracking-tight">24/7</div>
              <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* PetroLedger CTA Strip */}
      <section className="py-12 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="container-origin flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="reveal-up text-center md:text-left">
            <h3 className="text-2xl font-display-serif italic text-white mb-2">Discover the standard.</h3>
            <p className="text-muted-foreground text-sm max-w-md">See how PetroLedger transforms fuel station management with our immersive story.</p>
          </div>
          <div className="reveal-up">
            <Link to="/petroledger" className="btn-cta-white px-8 py-4 text-base shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform">
              Explore PetroLedger
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Market ERP CTA Strip */}
      <section className="py-12 border-b border-white/[0.05] bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-950/10 pointer-events-none" />
        <div className="container-origin flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="reveal-up text-center md:text-left">
            <h3 className="text-2xl font-display-serif italic text-white mb-2">Scale with AI Intelligence.</h3>
            <p className="text-muted-foreground text-sm max-w-md">Market ERP fuses Google Analytics, Inventory, and an AI Consultant into one system.</p>
          </div>
          <div className="reveal-up">
            <Link to="/market-erp" className="btn-cta-white px-8 py-4 text-base shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] hover:scale-105 transition-transform border border-cyan-500/20 text-cyan-950 bg-cyan-50 hover:bg-white">
              Explore Market ERP
              <ArrowRight className="w-4 h-4 text-cyan-600" />
            </Link>
          </div>
        </div>
      </section>

      {/* School ERP CTA Strip */}
      <section className="py-12 border-b border-white/[0.05] bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[#ffcc00]/5 pointer-events-none" />
        <div className="container-origin flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="reveal-up text-center md:text-left">
            <h3 className="text-2xl font-display-serif italic text-white mb-2">Next-Gen Campus OS.</h3>
            <p className="text-muted-foreground text-sm max-w-md">Automate admissions, fees, and results with our AI-powered School ERP.</p>
          </div>
          <div className="reveal-up">
            <Link to="/school-erp" className="btn-cta-white px-8 py-4 text-base shadow-[0_0_30px_-5px_rgba(255,204,0,0.3)] hover:scale-105 transition-transform border border-[#ffcc00]/20 text-black bg-[#ffcc00] hover:bg-white">
              Explore School ERP
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>
        </div>
      </section>

      {/* Concilio Detailed Info */}
      <section className="relative z-10 bg-black">
        <div className="container-origin">
          <ConcilioInfo />
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 md:py-28 border-b border-white/5">
        <div className="container-origin">
          <div className="reveal-up mb-14">
            <h2 className="font-display-serif text-3xl md:text-4xl lg:text-5xl text-white italic">The approach</h2>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            <article className="reveal-up card-origin group flex flex-col">
              <div className="text-4xl font-bold text-white/5 mb-6 group-hover:text-white/10 transition-colors">01</div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Phase 01</span>
              <h3 className="text-base font-semibold text-white mb-2">Audit</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                We analyze your current hardware, dip charts, and operational bottlenecks to design a custom fit.
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </article>
            <article className="reveal-up card-origin group flex flex-col" style={{ transitionDelay: '80ms' }}>
              <div className="text-4xl font-bold text-white/5 mb-6 group-hover:text-white/10 transition-colors">02</div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Phase 02</span>
              <h3 className="text-base font-semibold text-white mb-2">Deploy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                Installation of PetroLedger sensors and software with zero downtime to your daily sales.
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </article>
            <article className="reveal-up card-origin group flex flex-col" style={{ transitionDelay: '160ms' }}>
              <div className="text-4xl font-bold text-white/5 mb-6 group-hover:text-white/10 transition-colors">03</div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Phase 03</span>
              <h3 className="text-base font-semibold text-white mb-2">Train</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                On-site training for your managers and pump attendants to ensure smooth adoption.
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </article>
            <article className="reveal-up card-origin group flex flex-col" style={{ transitionDelay: '240ms' }}>
              <div className="text-4xl font-bold text-white/5 mb-6 group-hover:text-white/10 transition-colors">04</div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Phase 04</span>
              <h3 className="text-base font-semibold text-white mb-2">Scale</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                Unlock advanced analytics and multi-site management as your business grows.
              </p>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 border-b border-white/5">
        <div className="container-origin">
          <h2 className="font-display-serif text-3xl md:text-4xl lg:text-5xl text-white italic text-center mb-14">
            Trusted by owners
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <article className="reveal-up testimonial-card bg-gradient-to-br from-emerald-800/90 to-lime-600/80 border border-white/10">
              <div className="flex gap-1 mb-6"><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span></div>
              <p className="text-white/95 text-sm leading-relaxed flex-1">"Finally, I can see my exact stock and sales from home. The QR reconciliation feature alone saves me 2 hours every night."</p>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mt-6">RAJESH K., HPCL DEALER</p>
            </article>
            <article className="reveal-up testimonial-card bg-gradient-to-br from-cyan-800/90 to-teal-500/80 border border-white/10 backdrop-blur-sm" style={{ transitionDelay: '80ms' }}>
              <div className="flex gap-1 mb-6"><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span></div>
              <p className="text-white/95 text-sm leading-relaxed flex-1">"Concilio's fraud detection caught a density mismatch issue that was costing us lakhs. The investment paid for itself in a month."</p>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mt-6">VIKRAM S., IOCL OWNER</p>
            </article>
            <article className="reveal-up testimonial-card bg-gradient-to-br from-blue-800/90 to-indigo-500/80 border border-white/10" style={{ transitionDelay: '160ms' }}>
              <div className="flex gap-1 mb-6"><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span><span className="text-white/90 text-lg">★</span></div>
              <p className="text-white/95 text-sm leading-relaxed flex-1">"Managing 5 outlets was a nightmare before PetroLedger. Now I have a single dashboard for everything. Highly recommended."</p>
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mt-6">AMIT G., NAYARA ENERGY</p>
            </article>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-origin relative z-10">
          <div className="reveal-up max-w-2xl mx-auto text-center">
            <h2 className="font-display-serif text-3xl md:text-4xl lg:text-5xl text-white italic mb-6">
              Engineering Simplicity for Complex Businesses.
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Ready to digitize your operations? Let's build your custom ERP solution today.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
              <a href="mailto:studio@concilio.in" className="btn-cta-white justify-center w-full">
                Get started
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
              <Link to="/petroledger" className="btn-cta-white justify-center w-full px-4">View PetroLedger</Link>
              <Link to="/market-erp" className="btn-cta-white justify-center w-full px-4 border-cyan-500/30 text-cyan-200">View Market ERP</Link>
              <Link to="/school-erp" className="btn-cta-white justify-center w-full px-4 border-[#ffcc00]/30 text-[#ffcc00]">View School ERP</Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 pt-12 border-t border-white/10">
              <div className="flex flex-col items-center sm:items-start gap-3">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Email</span>
                <a href="mailto:studio@concilio.in" className="flex items-center gap-2 text-white hover:text-emerald-500 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-500/70" />
                  <span>studio@concilio.in</span>
                </a>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-3">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Phone</span>
                <a href="tel:+919912044852" className="flex items-center gap-2 text-white hover:text-emerald-500 transition-colors">
                  <Phone className="w-4 h-4 text-emerald-500/70" />
                  <span>+91 99120 44852</span>
                </a>
              </div>
              <div className="flex flex-col items-center sm:items-start gap-3">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Response</span>
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500/70" />
                  <span>Within 12 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <footer className="py-8 border-t border-white/5">
        <div className="container-origin flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
            <span className="text-sm font-semibold text-white">Concilio</span>
            <span className="text-xs text-muted-foreground">© 2026 Concilio. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-wider">Privacy</button>
            <button className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-wider">Terms</button>
          </div>
        </div>
      </footer>
    </div >
  );
};

export default PostSequence;
