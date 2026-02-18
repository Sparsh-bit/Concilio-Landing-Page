import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Lock, FileText, Cookie } from 'lucide-react';
import Footer from '../components/Footer';

const LegalPage = () => {
    const location = useLocation();
    const path = location.pathname.substring(1);

    const getTitle = () => {
        switch (path) {
            case 'privacy': return 'Privacy Policy';
            case 'terms': return 'Terms of Service';
            case 'cookies': return 'Cookie Policy';
            default: return 'Legal Information';
        }
    };

    const getIcon = () => {
        switch (path) {
            case 'privacy': return <Lock className="w-12 h-12 text-emerald-500/50" />;
            case 'terms': return <FileText className="w-12 h-12 text-blue-500/50" />;
            case 'cookies': return <Cookie className="w-12 h-12 text-amber-500/50" />;
            default: return <ShieldCheck className="w-12 h-12 text-white/20" />;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#030303]"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50">
                <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Back to Home</span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-3xl mx-auto flex-1 flex flex-col items-center justify-center p-6 pt-24 pb-12">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-8">
                        {getIcon()}
                    </div>
                    <h1 className="font-display-serif text-4xl md:text-5xl lg:text-6xl text-white italic mb-6">
                        {getTitle()}
                    </h1>
                    <div className="w-12 h-1 bg-emerald-500/30 mx-auto rounded-full mb-8" />
                </div>

                <div className="w-full bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12">
                    <div className="space-y-8 text-white/60 leading-relaxed">
                        <section>
                            <h2 className="text-white font-bold text-lg mb-4">Under Review</h2>
                            <p>
                                Our legal team is currently finalizing the {getTitle().toLowerCase()} for the Q3 2026 deployment phase.
                                We are committed to transparency and the highest standards of data integrity for our enterprise partners.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-white font-bold text-lg mb-4">Our Commitment</h2>
                            <p>
                                Concilio Studio follows industry-leading security protocols to ensure that all operational data
                                processed through our ERP systems remains confidential, encrypted, and compliant with relevant
                                international standards.
                            </p>
                        </section>

                        <div className="pt-8 border-t border-white/5">
                            <p className="text-xs italic">
                                Last Updated: February 2026 <br />
                                For specific inquiries regarding our legal frameworks, please contact <a href="mailto:studio@concilio.in" className="text-emerald-500 hover:underline">studio@concilio.in</a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link to="/describe-problem" className="text-xs text-white/30 hover:text-white transition-colors uppercase tracking-[0.2em] font-bold">
                        Need technical support? Tell us your problem →
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LegalPage;
