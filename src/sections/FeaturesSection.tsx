import { useEffect, useRef, useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  CreditCard,
  Package,
  Smartphone,
  Cloud,
  FileDown,
  Bell,
  Plug,
  History,
  Sparkles,
} from 'lucide-react';

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [_hoveredFeature, setHoveredFeature] = useState<number | null>(null);

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

  const mainFeatures = [
    {
      icon: LayoutDashboard,
      title: 'Role-Based Dashboards',
      description: 'Customized views for owners, managers, and staff—everyone sees what matters to their role.',
      color: 'from-blue-500 to-blue-400',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Live data visualization with KPIs, trends, and alerts that help you act, not react.',
      color: 'from-cyan-500 to-cyan-400',
    },
    {
      icon: CreditCard,
      title: 'Payment Reconciliation',
      description: 'Automated matching of cash, UPI, card payments with bank statements—no manual errors.',
      color: 'from-emerald-500 to-emerald-400',
    },
    {
      icon: Package,
      title: 'Inventory & Asset Tracking',
      description: 'Real-time stock levels, automatic reorder alerts, and complete asset lifecycle management.',
      color: 'from-purple-500 to-purple-400',
    },
    {
      icon: Smartphone,
      title: 'Multi-Device Access',
      description: 'Access your ERP from desktop, tablet, or mobile—responsive design for business on the go.',
      color: 'from-amber-500 to-amber-400',
    },
    {
      icon: Cloud,
      title: 'Cloud Hosting',
      description: 'Enterprise-grade cloud infrastructure with automatic backups, scaling, and 99.9% uptime guarantee.',
      color: 'from-rose-500 to-rose-400',
    },
  ];

  const miniFeatures = [
    { icon: FileDown, label: 'Exportable Reports' },
    { icon: Bell, label: 'Smart Alerts' },
    { icon: Plug, label: 'API Integration' },
    { icon: History, label: 'Audit Trail' },
  ];

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-brand-blue-light relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -top-40 left-1/3 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal-element opacity-0 inline-block mb-4">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase px-4 py-2 bg-brand-orange/10 rounded-full">
              Powerful Features
            </span>
          </div>
          <h2 className="reveal-element opacity-0 animation-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Everything You Need,<br/>
            <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
              Nothing You Don't
            </span>
          </h2>
          <p className="reveal-element opacity-0 animation-delay-200 text-xl text-slate-300 max-w-2xl mx-auto">
            Designed to simplify complexity and deliver actionable insights at every level.
          </p>
        </div>

        {/* Main Features Showcase */}
        <div className="reveal-element opacity-0 animation-delay-300 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-all duration-300`}
              />

              {/* Card Content */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-8 h-full transition-all flex flex-col">
                {/* Icon Container */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 mb-6 transition-all group-hover:scale-110`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">{feature.description}</p>

                {/* Hover indicator */}
                <div className="mt-6 flex items-center text-brand-orange opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Explore</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features Row */}
        <div className="reveal-element opacity-0 animation-delay-400">
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-white">Plus Many More Features</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {miniFeatures.map((feature, index) => (
              <div
                key={index}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all blur" />
                <div className="relative flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-brand-orange/50 transition-all hover:bg-white/10">
                  <feature.icon className="w-6 h-6 text-brand-orange group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 text-sm text-center font-medium">{feature.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
