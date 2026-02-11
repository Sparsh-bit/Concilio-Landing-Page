import { Boxes, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const solutionLinks = [
    { label: 'Petrol Pump ERP', href: '#solutions' },
    { label: 'School ERP', href: '#solutions' },
    { label: 'Retail / SME ERP', href: '#solutions' },
    { label: 'Enterprise ERP', href: '#solutions' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Process', href: '#process' },
    { label: 'Security', href: '#security' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-brand-blue via-brand-blue to-brand-blue-light border-t border-white/10 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center transition-transform hover:scale-110">
                    <Boxes className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-wide">CONCILIO</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Next-gen ERP solutions that centralize operations, automate workflows, and drive data-driven growth.
                </p>
              </div>

              <div className="pt-4">
                <p className="text-brand-orange font-semibold flex items-center gap-2">
                  <span>One Platform.</span>
                  <span>Total Control.</span>
                </p>
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Solutions</h4>
              <ul className="space-y-3">
                {solutionLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-400 hover:text-brand-orange transition-all duration-200 flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-slate-400 hover:text-brand-orange transition-all duration-200 flex items-center gap-2 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <Mail className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="mailto:contact@concilio.com" className="text-slate-400 hover:text-brand-orange transition-colors text-sm">
                    contact@concilio.com
                  </a>
                </li>
                <li className="flex items-start gap-3 group">
                  <Phone className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <a href="tel:+919876543210" className="text-slate-400 hover:text-brand-orange transition-colors text-sm">
                    +91 98765 43210
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400 text-sm">Mumbai, India</span>
                </li>
              </ul>

              {/* Social Links */}
              <div className="flex gap-2 mt-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-white/10 hover:bg-brand-orange flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:scale-110 border border-white/10 hover:border-brand-orange"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-orange to-brand-orange-light flex items-center justify-center text-white hover:shadow-lg hover:shadow-brand-orange/50 transition-all hover:scale-110"
              aria-label="Scroll to top"
            >
              <ArrowUpRight className="w-5 h-5 -rotate-90" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">&copy; 2024 Concilio. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
