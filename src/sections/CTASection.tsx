import { useEffect, useRef } from 'react';
import { Rocket, Calendar, Play, CheckCircle, ArrowRight } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-scale-in');
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

  const trustBadges = [
    { icon: CheckCircle, text: 'No commitment required' },
    { icon: CheckCircle, text: 'Free business analysis' },
    { icon: CheckCircle, text: 'Custom proposal' },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-blue-soft" />

      {/* Animated Glows */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 rounded-full bg-brand-orange/15 blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="reveal-element opacity-0 max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:border-brand-orange/50 transition-all">
              <Rocket className="w-5 h-5 text-brand-orange animate-bounce" />
              <span className="text-sm font-medium text-slate-200">Transform Your Operations Today</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Ready to{' '}
                <span className="bg-gradient-to-r from-brand-orange via-brand-orange-light to-brand-orange bg-clip-text text-transparent">
                  Scale?
                </span>
              </h2>
              <p className="text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
                Join hundreds of businesses transforming their operations with intelligent ERP solutions.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={scrollToContact}
                className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-brand-orange to-brand-orange-light text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-brand-orange/50 transition-all overflow-hidden text-lg"
              >
                <Calendar className="w-5 h-5" />
                Book Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToContact}
                className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 hover:border-white/40 transition-all flex items-center justify-center gap-2 text-lg"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12 border-t border-white/10">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3">
                  <badge.icon className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-300 font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
