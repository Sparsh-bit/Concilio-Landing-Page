import { useEffect, useRef } from 'react';
import { Zap, ArrowRight, BarChart3, Lightbulb, Lock, Rocket } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-element');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; life: number }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(2, 22, 79, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const gradient = ctx.createLinearGradient(p.x - 20, p.y - 20, p.x + 20, p.y + 20);
        gradient.addColorStop(0, `rgba(243, 112, 34, ${p.life * 0.4})`);
        gradient.addColorStop(1, `rgba(10, 42, 107, ${p.life * 0.2})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    { icon: Zap, text: 'Lightning Fast' },
    { icon: Lock, text: 'Bank-Grade Security' },
    { icon: BarChart3, text: 'Real-time Analytics' },
  ];

  return (
    <section
      ref={sectionRef}
      className="min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center"
    >
      {/* Animated Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(135deg, #02164F 0%, #0A2A6B 100%)' }}
      />

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(243, 112, 34, 0.4) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(243, 112, 34, 0.3) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            {/* Top Badge */}
            <div className="reveal-element opacity-0 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:border-white/40 transition-all">
              <div className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
              <span className="text-sm text-slate-200 font-medium">Next-Gen ERP Platform</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="reveal-element opacity-0 animation-delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Transform Your{' '}
                <span className="bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-orange bg-clip-text text-transparent">
                  Enterprise
                </span>
              </h1>

              <p className="reveal-element opacity-0 animation-delay-200 text-xl text-slate-300 leading-relaxed max-w-lg">
                Unified operations. Intelligent workflows. One platform that grows with your business.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="reveal-element opacity-0 animation-delay-300 flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={scrollToContact}
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-brand-orange/50 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </span>
              </button>

              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 hover:border-white/40 transition-all"
              >
                Watch Demo
              </button>
            </div>

            {/* Feature Pills */}
            <div className="reveal-element opacity-0 animation-delay-400 flex flex-wrap gap-3 pt-8">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-brand-orange/50 transition-all"
                >
                  <feature.icon className="w-4 h-4 text-brand-orange" />
                  <span className="text-sm text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="reveal-element opacity-0 animation-delay-200 relative h-96 lg:h-full min-h-96">
            {/* Floating Cards */}
            <div className="absolute top-0 right-0 w-72 h-40 bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 rounded-2xl p-6 backdrop-blur-xl border border-brand-orange/30 hover:border-brand-orange/60 transition-all animate-float shadow-lg shadow-brand-orange/10">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="w-6 h-6 text-brand-orange" />
                <h3 className="text-white font-semibold text-sm">Performance</h3>
              </div>
              <p className="text-slate-300 text-sm">10x faster data processing</p>
              <div className="mt-4 text-2xl font-bold text-white">99.9% <span className="text-xs text-slate-400">Uptime</span></div>
            </div>

            <div className="absolute bottom-0 left-0 w-72 h-40 bg-gradient-to-br from-blue-500/20 to-brand-blue-soft/5 rounded-2xl p-6 backdrop-blur-xl border border-blue-500/30 hover:border-blue-500/60 transition-all animate-float-slow shadow-lg shadow-blue-500/10">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-blue-400" />
                <h3 className="text-white font-semibold text-sm">Intelligence</h3>
              </div>
              <p className="text-slate-300 text-sm">AI-powered insights</p>
              <div className="mt-4 text-2xl font-bold text-white">500+ <span className="text-xs text-slate-400">Deployments</span></div>
            </div>

            {/* Center Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2 border-brand-orange/30 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full border-2 border-brand-orange/50 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange/40 to-brand-orange/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
