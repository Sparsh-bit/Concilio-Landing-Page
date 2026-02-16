import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Send, User, Phone, Mail } from 'lucide-react';

interface ProblemDescriptionFormProps {
    title?: string;
    subtitle?: string;
    context?: 'general' | 'petro' | 'market' | 'school';
    className?: string;
}

const ProblemDescriptionForm: React.FC<ProblemDescriptionFormProps> = ({
    title = "Describe Your Problem",
    subtitle = "Tell us the challenges you're facing. We'll verify if our solution fits your needs.",
    context = 'general',
    className = ""
}) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        problem: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form Submitted:', { context, ...formData });
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const getContextTheme = () => {
        switch (context) {
            case 'petro': return 'text-[#d4af37] border-[#d4af37]/30 from-[#d4af37]/10';
            case 'market': return 'text-cyan-400 border-cyan-400/30 from-cyan-400/10';
            case 'school': return 'text-[#ffcc00] border-[#ffcc00]/30 from-[#ffcc00]/10';
            default: return 'text-emerald-400 border-emerald-400/30 from-emerald-400/10';
        }
    };

    const themeClass = getContextTheme();

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-full max-w-2xl mx-auto p-8 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-center ${className}`}
            >
                <div className={`w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-white/5 border ${themeClass.split(' ')[1]}`}>
                    <Send className={`w-8 h-8 ${themeClass.split(' ')[0]}`} />
                </div>
                <h3 className="text-2xl font-display-serif text-white mb-2">Request Received</h3>
                <p className="text-muted-foreground">Thank you for sharing your challenges. Our team is analyzing your input and will contact you shortly.</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-sm text-white/50 hover:text-white transition-colors"
                >
                    Submit another response
                </button>
            </motion.div>
        );
    }

    return (
        <div className={`w-full max-w-3xl mx-auto ${className}`}>
            <div className="text-center mb-10">
                <h2 className="font-display-serif text-3xl md:text-4xl text-white italic mb-4">{title}</h2>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto">{subtitle}</p>
            </div>

            <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6 bg-white/[0.02] p-6 md:p-10 rounded-3xl border border-white/[0.05]"
            >
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Your Name</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-white transition-colors" />
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all"
                                placeholder="+91 99999 99999"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Email Address (Optional)</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-white transition-colors" />
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all"
                            placeholder="john@company.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Describe Your Problem</label>
                    <div className="relative group">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-white transition-colors" />
                        <textarea
                            required
                            value={formData.problem}
                            onChange={e => setFormData({ ...formData, problem: e.target.value })}
                            rows={5}
                            className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.02] transition-all resize-none"
                            placeholder={context === 'petro' ? "e.g., I'm facing issues with fuel theft reconciliation..." : "Describe the operational challenges you are facing in your business..."}
                        />
                    </div>
                    <p className="text-[10px] text-white/30 text-right">You can describe in English, Hindi, or any preferred language.</p>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full group relative overflow-hidden rounded-xl border ${themeClass.split(' ')[1]} bg-gradient-to-br ${themeClass.split(' ')[2]} to-transparent px-8 py-4 font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? 'Analyzing...' : 'Find Solution'}
                            {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </span>
                        <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${themeClass.split(' ')[2]} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

export default ProblemDescriptionForm;
