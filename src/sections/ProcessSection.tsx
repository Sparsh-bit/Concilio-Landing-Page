import { useEffect, useRef } from 'react';
import { Search, PenTool, Users, ArrowUpRight } from 'lucide-react';

const ProcessSection = () => {
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

  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Business Analysis',
      description: 'We study your operations, pain points, workflows, and goals to understand exactly what you need.',
      time: 'Week 1-2',
    },
    {
      number: '02',
      icon: PenTool,
      title: 'ERP Design',
      description: 'Custom architecture, module selection, and UX design tailored to your business requirements.',
      time: 'Week 3-4',
    },
    {
      number: '03',
      icon: Users,
      title: 'Deployment & Training',
      description: 'Seamless deployment with comprehensive training to ensure your team is confident and productive.',
      time: 'Week 5-6',
    },
    {
      number: '04',
      icon: ArrowUpRight,
      title: 'Support & Scaling',
      description: 'Ongoing maintenance, updates, and support—plus easy scaling as your business grows.',
      time: 'Ongoing',
    },
  ];

  return (
    <section id="process" ref={sectionRef} className="section-padding bg-brand-blue relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal-element opacity-0 inline-block mb-4">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase px-4 py-2 bg-brand-orange/10 rounded-full">
              Proven Methodology
            </span>
          </div>
          <h2 className="reveal-element opacity-0 animation-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            How We Build <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">Your ERP</span>
          </h2>
          <p className="reveal-element opacity-0 animation-delay-200 text-xl text-slate-300 max-w-2xl mx-auto">
            A systematic approach that ensures your ERP delivers value from day one.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="reveal-element opacity-0 animation-delay-300 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-orange via-brand-orange/50 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="relative pt-24 h-full">
                  {/* Circle Number */}
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center border-4 border-brand-blue transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow-orange">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 group-hover:border-brand-orange/50 transition-all h-full flex flex-col">
                    {/* Timeline marker */}
                    <div className="text-center mb-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange text-xs font-bold">
                        {step.time}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <step.icon className="w-6 h-6 text-brand-orange" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3 text-center">{step.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed flex-grow text-center">{step.description}</p>

                    {/* Arrow for next (hidden on last) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex justify-end mt-6">
                        <ArrowUpRight className="w-5 h-5 text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
