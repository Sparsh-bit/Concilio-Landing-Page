import { useEffect, useRef, useState } from 'react';
import { Fuel, GraduationCap, Store, Building2, AlertTriangle, CheckCircle, Trophy, ArrowRight } from 'lucide-react';

const SolutionsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeSolution, setActiveSolution] = useState(0);

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

  const solutions = [
    {
      icon: Fuel,
      title: 'Petrol Pump ERP',
      subtitle: 'Complete fuel station management from tank to transaction',
      color: 'amber',
      problem: 'Cash leakages, manual reconciliation errors, no visibility into shift-wise performance, fuel stock discrepancies.',
      solution: 'Real-time nozzle tracking, automated cash vs UPI reconciliation, shift management, tank dip monitoring, and daily expected vs actual reports.',
      benefit: 'Eliminate pilferage, automate compliance reporting, and gain complete financial clarity across all shifts and pumps.',
      tags: ['Fuel Sales Tracking', 'Shift Management', 'Tank Monitoring', 'Cash Reconciliation'],
    },
    {
      icon: GraduationCap,
      title: 'School ERP',
      subtitle: 'End-to-end academic institution management',
      color: 'emerald',
      problem: 'Fragmented student data, fee collection chaos, attendance tracking gaps, and no unified view for administrators.',
      solution: 'Unified student lifecycle management, automated fee collection with reminders, digital attendance, teacher portals, and parent communication tools.',
      benefit: 'Reduce administrative overhead by 60%, improve fee collection rates, and provide transparency to all stakeholders.',
      tags: ['Student Management', 'Fee Collection', 'Attendance', 'Teacher Portal'],
    },
    {
      icon: Store,
      title: 'Retail / SME ERP',
      subtitle: 'Streamlined operations for growing businesses',
      color: 'purple',
      problem: 'Inventory blind spots, disconnected billing systems, limited customer insights, and no scalable growth path.',
      solution: 'Integrated POS, real-time inventory management, customer relationship tracking, and sales analytics dashboards.',
      benefit: 'Boost sales with data-driven decisions, reduce stock-outs, and build lasting customer relationships.',
      tags: ['Billing & POS', 'Inventory', 'CRM', 'Sales Analytics'],
    },
    {
      icon: Building2,
      title: 'Enterprise ERP',
      subtitle: 'Scalable solutions for complex organizations',
      color: 'blue',
      problem: 'Multi-location coordination failures, inconsistent data across branches, complex approval workflows, and security concerns.',
      solution: 'Centralized multi-branch management, role-based access control, advanced reporting, and enterprise-grade security compliance.',
      benefit: 'Unified operations across all locations, granular control, and executive-level visibility into every aspect of the business.',
      tags: ['Multi-Branch', 'Role-Based Access', 'Advanced Reports', 'Compliance'],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string; tagBg: string; glow: string }> = {
      amber: {
        bg: 'bg-amber-500/20',
        text: 'text-amber-400',
        border: 'border-amber-500/30',
        tagBg: 'bg-amber-500/10',
        glow: 'from-amber-500/20',
      },
      emerald: {
        bg: 'bg-emerald-500/20',
        text: 'text-emerald-400',
        border: 'border-emerald-500/30',
        tagBg: 'bg-emerald-500/10',
        glow: 'from-emerald-500/20',
      },
      purple: {
        bg: 'bg-purple-500/20',
        text: 'text-purple-400',
        border: 'border-purple-500/30',
        tagBg: 'bg-purple-500/10',
        glow: 'from-purple-500/20',
      },
      blue: {
        bg: 'bg-blue-500/20',
        text: 'text-blue-400',
        border: 'border-blue-500/30',
        tagBg: 'bg-blue-500/10',
        glow: 'from-blue-500/20',
      },
    };
    return colors[color] || colors.blue;
  };

  const currentSolution = solutions[activeSolution];
  const colors = getColorClasses(currentSolution.color);

  return (
    <section id="solutions" ref={sectionRef} className="section-padding bg-brand-blue relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-brand-orange/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="reveal-element opacity-0 inline-block mb-4">
            <span className="text-brand-orange font-bold text-sm tracking-wider uppercase px-4 py-2 bg-brand-orange/10 rounded-full">
              Industry Solutions
            </span>
          </div>
          <h2 className="reveal-element opacity-0 animation-delay-100 text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Built for <span className="bg-gradient-to-r from-brand-orange to-brand-orange-light bg-clip-text text-transparent">Every Industry</span>
          </h2>
          <p className="reveal-element opacity-0 animation-delay-200 text-xl text-slate-300 max-w-2xl mx-auto">
            Purpose-built systems addressing unique challenges each sector faces daily.
          </p>
        </div>

        {/* Solution Selector & Details */}
        <div className="reveal-element opacity-0 animation-delay-300">
          {/* Selector Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {solutions.map((solution, index) => (
              <button
                key={index}
                onClick={() => setActiveSolution(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeSolution === index
                    ? `bg-gradient-to-r ${solutions[index].color === 'amber' ? 'from-amber-500 to-amber-600' : solutions[index].color === 'emerald' ? 'from-emerald-500 to-emerald-600' : solutions[index].color === 'purple' ? 'from-purple-500 to-purple-600' : 'from-blue-500 to-blue-600'} text-white shadow-lg`
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/20'
                }`}
              >
                <solution.icon className="w-5 h-5" />
                <span className="hidden sm:inline">{solution.title}</span>
              </button>
            ))}
          </div>

          {/* Detailed View */}
          <div className={`bg-gradient-to-br ${colors.glow} to-transparent rounded-3xl p-10 lg:p-12 border ${colors.border} overflow-hidden relative`}>
            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Side - Header & Main Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${colors.bg} flex items-center justify-center`}>
                    <currentSolution.icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">{currentSolution.title}</h3>
                    <p className={`${colors.text} text-lg`}>{currentSolution.subtitle}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-brand-orange">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentSolution.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`px-4 py-2 rounded-lg ${colors.tagBg} ${colors.text} text-sm font-medium`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Problem, Solution, Benefit */}
              <div className="space-y-6">
                {/* Problem */}
                <div className="bg-white/5 rounded-2xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span className="text-white font-bold">The Challenge</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentSolution.problem}</p>
                </div>

                {/* Solution */}
                <div className="bg-white/5 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-bold">Our Solution</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentSolution.solution}</p>
                </div>

                {/* Benefit */}
                <div className="bg-white/5 rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <Trophy className="w-5 h-5 text-emerald-400" />
                    <span className="text-white font-bold">The Impact</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentSolution.benefit}</p>
                </div>

                {/* CTA Button */}
                <button className={`w-full mt-4 px-6 py-4 rounded-xl bg-gradient-to-r ${colors.glow.replace('from-', 'from-')} to-transparent text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all border ${colors.border}`}>
                  Learn More <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
