
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProblemDescriptionForm from '../components/ProblemDescriptionForm';

const PetroProblemFormPage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#e8e4dc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#080808]"></div>
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50">
                <Link to="/petroledger" className="inline-flex items-center gap-2 text-[#d4af37]/70 hover:text-[#d4af37] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Back to PetroLedger</span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-2xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-[10px] uppercase tracking-widest mb-4">
                        Concilio Support
                    </div>
                </div>

                <ProblemDescriptionForm
                    title="Report Operational Issues"
                    subtitle="Share the specific challenges you are facing at your fuel station. Our engineering team will analyze your problem and propose a custom solution."
                    context="petro"
                />

                <div className="mt-12 text-center">
                    <p className="text-xs text-white/20 max-w-md mx-auto leading-relaxed">
                        Data submitted through this form involves proprietary operational metrics. All information is encrypted and processed under strict NDA compliance.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PetroProblemFormPage;
