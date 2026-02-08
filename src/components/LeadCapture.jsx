import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

function LeadCapture({ onSubmit, onBack }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="glass p-6 md:p-12 max-w-2xl mx-auto shadow-2xl relative overflow-hidden"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute left-4 top-4 p-2 -ml-2 text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-2 group z-10"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-bold">Back</span>
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-center mt-8 md:mt-4 mb-8 md:mb-10"
            >
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight px-4">
                    Analysis Complete
                </h2>
                <p className="text-base md:text-xl text-slate-600 px-6 leading-relaxed">
                    We've identified your primary pressure points. Enter your details to reveal your results and receive your customized "First Fix" report.
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 px-2 md:px-4">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="relative group"
                >
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-slate-500 transition-colors" />
                    <input
                        required
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 md:py-5 pl-12 pr-6 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all text-base md:text-lg"
                    />
                </motion.div>

                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="relative group"
                >
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-slate-500 transition-colors" />
                    <input
                        required
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 md:py-5 pl-12 pr-6 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-all text-base md:text-lg"
                    />
                </motion.div>

                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white rounded-2xl py-4 md:py-5 font-bold text-lg md:text-xl hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl group"
                >
                    Reveal My Results
                    <ArrowRight className="w-5 h-5 md:w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-center gap-2 text-slate-400 text-xs md:text-sm font-medium pt-2"
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Your privacy is important. No spam, ever.</span>
                </motion.div>
            </form>

            {/* Subtle decorative elements */}
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-blue/5 rounded-full translate-y-1/2 translate-x-1/2 blur-xl pointer-events-none" />
        </motion.div>
    );
}

export default LeadCapture;
