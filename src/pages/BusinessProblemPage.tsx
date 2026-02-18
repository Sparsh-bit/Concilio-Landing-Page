import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProblemDescriptionForm from '../components/ProblemDescriptionForm';
import Footer from '../components/Footer';

const BusinessProblemPage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#030303]"></div>
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}>
                </div>
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

            <div className="relative z-10 w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center p-6 pt-24 pb-12">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest mb-6">
                        Concilio — Tell Us Your Challenge
                    </div>
                </div>

                <ProblemDescriptionForm
                    title="Describe Your Business Problem"
                    subtitle="Tell us about the challenges you're facing. Whether it's operations, inventory, compliance, or anything else — our engineers will analyze and propose a custom solution."
                    context="general"
                />

                <div className="mt-12 text-center">
                    <p className="text-xs text-white/20 max-w-md mx-auto leading-relaxed">
                        All information is treated with strict confidentiality. <br />
                        Our team typically responds within 12 hours.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BusinessProblemPage;
