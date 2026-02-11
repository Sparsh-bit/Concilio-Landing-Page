import { useEffect, useRef } from 'react';
import { Puzzle, Factory, Cloud, BarChart3, Headphones, Rocket, CheckCircle } from 'lucide-react';

const WhyChooseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

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

  const cards = [
    {
      icon: Puzzle,
      title: 'Tailor-Made Solutions',
      description:
        'No two businesses are alike. We build ERP systems from the ground up to match your exact workflows, not generic templates that force you to adapt.',
      step: '01',
    },
    {
      icon: Factory,
      title: 'Industry Expertise',
      description:
        'Deep knowledge of petrol pump operations, school administration, retail dynamics, and enterprise workflows ensures solutions that actually work.',
      step: '02',
    },
    {
      icon: Cloud,
      title: 'Cloud-Native & Secure',
      description:
        'Enterprise-grade security with cloud infrastructure ensures your data is protected, accessible, and always available—from anywhere.',
      step: '03',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Insights',
      description:
        'Make decisions with confidence using live dashboards, automated reports, and business intelligence that turns data into actionable strategy.',
      step: '04',
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      description:
        'Our relationship does not end at deployment. Dedicated support, regular updates, and continuous optimization keep your systems running optimally.',
      step: '05',
    },
    {
      icon: Rocket,
      title: 'Future-Ready',
      description:
        'Modular architecture means your ERP grows with you. Add new features, branches, and capabilities without starting over.',
      step: '06',
    },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-brand-blue-light relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 right-0 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -top-40 left-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="reveal-element opacity-0 inline-block mb-4">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase px-4 py-2 bg-brand-orange/10 rounded-full">
              Our Advantages
            </span>
          </div>
          <h2 className="reveal-element opacity-0 animation-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">Concilio</span>
          </h2>
          <p className="reveal-element opacity-0 animation-delay-200 text-xl text-slate-300 leading-relaxed">
            We deliver operational transformation backed by deep industry expertise and genuine partnership.
          </p>
        </div>

        {/* Cards Grid - Staggered Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`reveal-element opacity-0 group relative`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 group-hover:border-brand-orange/50 transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-orange-light flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {card.step}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <card.icon className="w-7 h-7 text-brand-orange" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.description}</p>

                {/* Check Mark */}
                <div className="flex items-center gap-2 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              </div>

              {/* Connecting Line (hidden on mobile) */}
              {index < cards.length - 1 && index % 3 !== 2 && (
                <div className="hidden lg:block absolute top-full left-1/2 w-0.5 h-8 bg-gradient-to-b from-brand-orange/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
