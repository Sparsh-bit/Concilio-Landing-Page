import React from "react";
import {
    Cpu,
    Database,
    Globe,
    Layers,
    LayoutDashboard,
    ShieldCheck,
    Smartphone,
    Workflow
} from "lucide-react";

export const ConcilioInfo: React.FC = () => {
    return (
        <div className="space-y-32">
            {/* 1. Company Overview & Mission */}
            <section className="py-10 border-b border-white/5">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="reveal-up">
                        <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Company Overview</span>
                        <h2 className="font-display-serif text-3xl md:text-4xl lg:text-5xl text-white italic mb-6">
                            Engineering Simplicity for Complex Businesses.
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                            Concilio is a technology company dedicated to simplifying complex business operations through intelligent, scalable, and industry-specific software solutions.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mt-8">
                            <div>
                                <h4 className="text-white font-bold mb-2">Our Mission</h4>
                                <p className="text-sm text-muted-foreground">To digitize traditional businesses, reducing fraud and automating financial tracking with smart dashboards.</p>
                            </div>
                            <div>
                                <h4 className="text-white font-bold mb-2">Our Vision</h4>
                                <p className="text-sm text-muted-foreground">To become a global leader in industry-focused ERP and automation systems.</p>
                            </div>
                        </div>
                    </div>
                    <div className="reveal-up grid grid-cols-2 gap-4">
                        <div className="p-6 bg-[#080808] border border-white/5 rounded-2xl flex flex-col items-center text-center">
                            <Globe className="w-8 h-8 text-emerald-500 mb-4" />
                            <h3 className="text-white font-semibold mb-1">Global Standard</h3>
                            <p className="text-xs text-muted-foreground">Enterprise-grade ERP solutions.</p>
                        </div>
                        <div className="p-6 bg-[#080808] border border-white/5 rounded-2xl flex flex-col items-center text-center">
                            <ShieldCheck className="w-8 h-8 text-blue-500 mb-4" />
                            <h3 className="text-white font-semibold mb-1">Secure Core</h3>
                            <p className="text-xs text-muted-foreground">Fraud detection & prevention.</p>
                        </div>
                        <div className="p-6 bg-[#080808] border border-white/5 rounded-2xl flex flex-col items-center text-center">
                            <Workflow className="w-8 h-8 text-purple-500 mb-4" />
                            <h3 className="text-white font-semibold mb-1">Automation</h3>
                            <p className="text-xs text-muted-foreground">Replacing manual records.</p>
                        </div>
                        <div className="p-6 bg-[#080808] border border-white/5 rounded-2xl flex flex-col items-center text-center">
                            <LayoutDashboard className="w-8 h-8 text-yellow-500 mb-4" />
                            <h3 className="text-white font-semibold mb-1">Analytics</h3>
                            <p className="text-xs text-muted-foreground">Real-time business insights.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Other Capabilities */}
            <section className="py-10 border-b border-white/5">
                <div className="reveal-up mb-14 text-center max-w-2xl mx-auto">
                    <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 block">Beyond PetroLedger</span>
                    <h2 className="font-display-serif text-3xl md:text-4xl text-white italic">
                        Expanding Capabilities
                    </h2>
                    <p className="text-muted-foreground mt-4">
                        While we specialize in fuel, our core engines drive innovation across manufacturing, retail, and finance.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Custom ERP */}
                    <div className="reveal-up card-origin group p-8 bg-[#050505] border border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-colors">
                        <Layers className="w-10 h-10 text-white/20 group-hover:text-emerald-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Custom ERP</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Tailored systems for manufacturers and distributors covering inventory, billing, GST, and role-based access.
                        </p>
                        <ul className="text-xs text-white/40 space-y-1">
                            <li>• Manufacturing Units</li>
                            <li>• Retail Stores</li>
                            <li>• Logistics</li>
                        </ul>
                    </div>

                    {/* AI Automation */}
                    <div className="reveal-up card-origin group p-8 bg-[#050505] border border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-colors" style={{ transitionDelay: '100ms' }}>
                        <Cpu className="w-10 h-10 text-white/20 group-hover:text-blue-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">AI Automation</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Smart tools for data reconciliation, fraud alerts, and predictive business forecasting.
                        </p>
                        <ul className="text-xs text-white/40 space-y-1">
                            <li>• Smart Alerts</li>
                            <li>• Anomaly Detection</li>
                            <li>• Future Forecasting</li>
                        </ul>
                    </div>

                    {/* Business Intelligence */}
                    <div className="reveal-up card-origin group p-8 bg-[#050505] border border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-colors" style={{ transitionDelay: '200ms' }}>
                        <Database className="w-10 h-10 text-white/20 group-hover:text-purple-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">BI Dashboards</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            Visual analytics for revenue performance, growth tracking, and complex data parsing.
                        </p>
                        <ul className="text-xs text-white/40 space-y-1">
                            <li>• Revenue Analytics</li>
                            <li>• Growth Tracking</li>
                            <li>• Custom Reports</li>
                        </ul>
                    </div>

                    {/* Payment Systems */}
                    <div className="reveal-up card-origin group p-8 bg-[#050505] border border-white/[0.03] rounded-2xl hover:bg-white/[0.02] transition-colors" style={{ transitionDelay: '300ms' }}>
                        <Smartphone className="w-10 h-10 text-white/20 group-hover:text-yellow-500 transition-colors mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">FinTech</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            QR reconciliation tools, UPI settlement tracking, and multi-bank integration systems.
                        </p>
                        <ul className="text-xs text-white/40 space-y-1">
                            <li>• QR Reconciliation</li>
                            <li>• POS Integration</li>
                            <li>• CSV Parsing</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. Tech Stack */}
            <section className="py-10">
                <div className="reveal-up mb-10">
                    <h2 className="font-display-serif text-3xl text-white italic mb-8">Technology Philosophy</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Frontend */}
                    <div className="reveal-up p-6 border-l border-white/10">
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 block">Frontend</span>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="text-white">React / Next.js</li>
                            <li>TailwindCSS</li>
                            <li>Framer Motion</li>
                            <li>WebGL / Three.js</li>
                        </ul>
                    </div>
                    {/* Backend */}
                    <div className="reveal-up p-6 border-l border-white/10" style={{ transitionDelay: '100ms' }}>
                        <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 block">Backend</span>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="text-white">Node.js + Express</li>
                            <li>Python (AI Modules)</li>
                            <li>Serverless Functions</li>
                            <li>WebSocket Real-time</li>
                        </ul>
                    </div>
                    {/* Database */}
                    <div className="reveal-up p-6 border-l border-white/10" style={{ transitionDelay: '200ms' }}>
                        <span className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 block">Data</span>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="text-white">PostgreSQL</li>
                            <li>MongoDB</li>
                            <li>Redis Caching</li>
                            <li>Time-series Data</li>
                        </ul>
                    </div>
                    {/* Integration */}
                    <div className="reveal-up p-6 border-l border-white/10" style={{ transitionDelay: '300ms' }}>
                        <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-3 block">Integration</span>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="text-white">Unified Bank APIs</li>
                            <li>POS Hardware</li>
                            <li>IoT Sensors</li>
                            <li>Cloud Ingestion</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 4. Future Roadmap Preview */}
            <section className="reveal-up py-10 border-t border-white/5 text-center">
                <p className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-4">Future Innovation Tracks</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
                    <span>Hospitals</span>
                    <span>•</span>
                    <span>Logistics</span>
                    <span>•</span>
                    <span>IoT Devices</span>
                    <span>•</span>
                    <span>SaaS Inventory</span>
                    <span>•</span>
                    <span>Smart Audit</span>
                </div>
            </section>
        </div>
    );
};
