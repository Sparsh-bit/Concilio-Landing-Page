import { Link } from "react-router-dom";
import { Mail, Phone, ArrowUpRight, ShieldCheck, Globe, Zap } from "lucide-react";

const productLinks = [
    { label: "PetroLedger", href: "/petroledger" },
    { label: "Market ERP", href: "/market-erp" },
    { label: "School ERP", href: "/school-erp" },
];

const companyLinks = [
    { label: "About Solutions", href: "/#simplify" },
    { label: "The Method", href: "/#process" },
    { label: "Describe Problem", href: "/describe-problem" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#030303] border-t border-white/[0.05] overflow-hidden" role="contentinfo">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Main footer */}
            <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                                <div className="w-4 h-4 bg-black rounded-sm" />
                            </div>
                            <span className="font-bold tracking-tight text-white text-lg">Concilio</span>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
                            Engineering simplicity for complex businesses. Intelligent, scalable, and industry-specific ERP solutions.
                        </p>
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:studio@concilio.in"
                                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                            >
                                <Mail className="w-4 h-4 text-emerald-500/60 group-hover:text-emerald-500 transition-colors" />
                                studio@concilio.in
                            </a>
                            <a
                                href="tel:+919912044852"
                                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
                            >
                                <Phone className="w-4 h-4 text-emerald-500/60 group-hover:text-emerald-500 transition-colors" />
                                +91 99120 44852
                            </a>
                        </div>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-emerald-500/50" />
                            Solutions
                        </h4>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors group"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1 group-hover:translate-y-0 translate-x-1 group-hover:translate-x-0" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                            <Globe className="w-3 h-3 text-emerald-500/50" />
                            Company
                        </h4>
                        <ul className="space-y-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        {link.label}
                                        {link.href === "/describe-problem" && (
                                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-[8px] text-emerald-500 font-bold border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-black transition-all">NEW</span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-emerald-500/50" />
                            Trust
                        </h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-white/50 hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/[0.05] bg-black/40 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xs text-white/25">
                        © {currentYear} Concilio Studio. All rights reserved. <span className="hidden md:inline mx-2 text-white/5">|</span> <span className="text-white/15">Made for modern enterprises.</span>
                    </span>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-[10px] text-white/25 uppercase tracking-widest border border-white/5 rounded-full px-3 py-1">
                            <span>Secured by</span>
                            <span className="text-emerald-500/60 font-bold">Cloudflare</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
