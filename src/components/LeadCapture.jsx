import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Mail, User } from 'lucide-react';

function LeadCapture({ onSubmit, onBack }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email) {
            onSubmit({ name, email });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-8 md:p-12 text-center relative"
        >
            <button
                onClick={onBack}
                className="absolute left-8 top-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className="max-w-md mx-auto pt-8">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                    You're 30 seconds away from your results.
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                    Enter your details below. We'll reveal your primary pressure point now and send a full report with custom fixes to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blue-deep focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-blue-deep focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98] group mt-6"
                    >
                        Reveal My Pressure Score
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-xs text-slate-400 mt-6 italic">
                    No spam. Just your diagnostic report and actionable business insights.
                </p>
            </div>
        </motion.div>
    );
}

export default LeadCapture;
