import { useEffect, useRef } from 'react';
import { Zap, Shield, Layers, Clock, Percent, Users, CheckCircle2, ArrowUpRight } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLSection>(null);

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

  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Speed',
      description: 'Process transactions 10x faster with optimized architecture',
      color: 'from-brand-orange to-brand-orange-light',
    },
    {
      icon: Shield,
      title: 'Military Grade Security',
      description: 'Enterprise-level encryption and compliance standards',
      color: 'from-blue-500 to-blue-400',
    },
    {
      icon: Layers,
      title: 'Modular Design',
      description: 'Pick and choose features that fit your workflow',
      color: 'from-purple-500 to-purple-400',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Dedicated team always ready to help',
      color: 'from-cyan-500 to-cyan-400',
    },
    {
      icon: Percent,
      title: 'Cost Efficient',
      description: 'Reduce operational costs by up to 40%',
      color: 'from-emerald-500 to-emerald-400',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Built-in tools for seamless teamwork',
      color: 'from-pink-500 to-pink-400',
    },
  ];

  const stats = [
    { number: '500+', label: 'Active Clients', icon: Users },
    { number: '99.9%', label: 'System Uptime', icon: CheckCircle2 },
    { number: '10M+', label: 'Transactions/Day', icon: ArrowUpRight },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-brand-blue relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="reveal-element opacity-0 inline-block mb-4">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase px-4 py-2 bg-brand-orange/10 rounded-full">
              Why Choose Concilio
            </span>
          </div>

          <h2 className="reveal-element opacity-0 animation-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
            Built for enterprises that demand{' '}
            <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">
              more
            </span>
          </h2>

          <p className="reveal-element opacity-0 animation-delay-200 text-xl text-slate-300 max-w-2xl mx-auto">
            Modern businesses need modern solutions. We combine cutting-edge technology with deep industry expertise.
          </p>
        </div>

        {/* Stats Row */}
        <div className="reveal-element opacity-0 animation-delay-300 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-brand-orange/50 hover:bg-brand-orange/5 transition-all text-center group"
            >
              <stat.icon className="w-8 h-8 text-brand-orange mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Grid */}
        <div className="reveal-element opacity-0 animation-delay-400 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-all duration-300`}
              />

              {/* Content */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-white/30 rounded-2xl p-8 h-full transition-all">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${benefit.color} bg-opacity-20 mb-4`}>
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>

                <div className="mt-6 flex items-center text-sm font-medium text-brand-orange opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1">
                  Learn more <ArrowUpRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
