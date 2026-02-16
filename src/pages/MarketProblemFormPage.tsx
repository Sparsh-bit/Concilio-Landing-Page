
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProblemDescriptionForm from '../components/ProblemDescriptionForm';

const MarketProblemFormPage = () => {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#020617]"></div>

                {/* Tech Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #0891b2 1px, transparent 1px), linear-gradient(to bottom, #0891b2 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}>
                </div>

                {/* Cyberpunk Glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50">
                <Link to="/market-erp" className="inline-flex items-center gap-2 text-cyan-500/70 hover:text-cyan-400 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-mono font-semibold">Back to Market ERP</span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-2xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-cyan-900/20 border border-cyan-500/20 text-cyan-400 text-[10px] uppercase tracking-widest font-mono mb-4">
                        Market ERP Support
                    </div>
                </div>

                <ProblemDescriptionForm
                    title="Report Operational Issues"
                    subtitle="Facing challenges with inventory sync, order processing, or analytics? Describe your issue below so our AI engineers can assist you."
                    context="market"
                />

                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed font-mono">
                        // SECURE CHANNEL ESTABLISHED <br />
                        All submitted data is processed with end-to-end encryption.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MarketProblemFormPage;
