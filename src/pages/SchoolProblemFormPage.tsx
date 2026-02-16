
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProblemDescriptionForm from '../components/ProblemDescriptionForm';

const SchoolProblemFormPage = () => {
    return (
        <div className="min-h-screen bg-[#050505] text-[#e8e4dc] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[#050505]"></div>

                {/* Premium Gold Luxury Grain */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                        mixBlendMode: 'overlay'
                    }}>
                </div>

                {/* Subtle Gold Glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ffcc00]/10 blur-[150px] rounded-full pointer-events-none"></div>
            </div>

            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full p-6 z-50">
                <Link to="/school-erp" className="inline-flex items-center gap-2 text-[#ffcc00]/70 hover:text-[#ffcc00] transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-display-serif font-semibold">Back to School ERP</span>
                </Link>
            </nav>

            <div className="relative z-10 w-full max-w-2xl">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-[#ffcc00]/10 border border-[#ffcc00]/20 text-[#ffcc00] text-[10px] uppercase tracking-widest font-display-serif mb-4">
                        Campus Support
                    </div>
                </div>

                <ProblemDescriptionForm
                    title="Report Campus Challenges"
                    subtitle="Admissions chaos? Fee collection delays? Grade management issues? Tell us what's slowing down your institution."
                    context="school"
                />

                <div className="mt-12 text-center">
                    <p className="text-xs text-white/20 max-w-md mx-auto leading-relaxed font-display-serif italic">
                        Your institution's data privacy is paramount. <br />All reports are handled with strict confidentiality.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SchoolProblemFormPage;
