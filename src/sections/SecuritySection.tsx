import { useEffect, useRef } from 'react';
import { Cloud, Lock, UserCog, Database, Shield, CheckCircle, Lock as LockIcon, Eye } from 'lucide-react';

const SecuritySection = () => {
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

  const features = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure',
      description: 'Enterprise-grade cloud servers with automatic scaling and geographic redundancy.',
      color: 'from-cyan-500 to-cyan-400',
    },
    {
      icon: Lock,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication, SSO integration, and encrypted sessions for all users.',
      color: 'from-emerald-500 to-emerald-400',
    },
    {
      icon: UserCog,
      title: 'Role-Based Access Control',
      description: 'Granular permissions ensure users only see and modify data relevant to their role.',
      color: 'from-blue-500 to-blue-400',
    },
    {
      icon: Database,
      title: 'Data Protection',
      description: '256-bit encryption at rest and in transit, with automated backups and disaster recovery.',
      color: 'from-purple-500 to-purple-400',
    },
  ];

  const complianceBadges = [
    { label: 'GDPR Compliant', icon: CheckCircle },
    { label: 'SOC 2 Ready', icon: CheckCircle },
    { label: 'SSL Encrypted', icon: LockIcon },
    { label: '99.9% Uptime', icon: CheckCircle },
  ];

  return (
    <section ref={sectionRef} className="section-padding bg-brand-blue-light relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="reveal-element opacity-0 animation-delay-200 space-y-8">
            <div>
              <span className="text-brand-orange font-bold text-sm tracking-wider uppercase px-4 py-2 bg-brand-orange/10 rounded-full">
                Security & Compliance
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Enterprise-Grade <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">Security</span>
            </h2>

            <p className="text-xl text-slate-300 leading-relaxed">
              Your data is your most valuable asset. We protect it with bank-level security standards and compliance certifications.
            </p>

            {/* Features Grid */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all`} />
                  <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 group-hover:border-white/30 transition-all flex gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} bg-opacity-20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Security Showcase */}
          <div className="reveal-element opacity-0 animation-delay-300 space-y-6">
            {/* Main Shield Card */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-12 hover:border-brand-orange/50 transition-all hover:shadow-xl">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-orange/10 blur-3xl" />

              <div className="relative z-10 text-center mb-12">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Military-Grade Security</h3>
                <p className="text-slate-300 text-sm">Bank-level protection for your data</p>
              </div>

              {/* Compliance Grid */}
              <div className="grid grid-cols-2 gap-4">
                {complianceBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="group/badge bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                  >
                    <badge.icon className="w-7 h-7 text-emerald-400 mx-auto mb-3 group-hover/badge:scale-110 transition-transform" />
                    <div className="text-sm text-white font-semibold">{badge.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Card */}
            <div className="rounded-2xl bg-gradient-to-br from-brand-orange/20 to-brand-orange/5 p-8 border border-brand-orange/30 hover:border-brand-orange/60 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/20 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">API-Ready Architecture</h4>
                  <p className="text-slate-300 text-sm">Seamless integrations with your existing systems</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
