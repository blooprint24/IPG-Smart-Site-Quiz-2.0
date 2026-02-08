import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

function Intro({ onStart }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass p-8 md:p-16 text-center shadow-2xl"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue rounded-full text-brand-blue-deep font-semibold text-sm mb-8">
                <Sparkles className="w-4 h-4" />
                <span>3-Minute Diagnostic</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                Where is <span className="text-brand-blue-deep italic">pressure</span> building in your business?
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                Identify the quiet risks holding you back. Get custom fixes to reduce stress and unlock growth.
            </p>

            <button
                onClick={onStart}
                className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98] group"
            >
                Check the health of my business
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-8 text-slate-400 font-medium">
                Free diagnostic. No credit card. Just clarity.
            </p>
        </motion.div>
    );
}

export default Intro;
