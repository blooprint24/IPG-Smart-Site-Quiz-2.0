import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles } from 'lucide-react';

function Intro({ onStart }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="glass p-6 md:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center"
        >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue rounded-full text-brand-blue-deep font-semibold text-xs md:text-sm mb-6 md:mb-8 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 md:w-4 h-4" />
                <span>3-Minute Diagnostic</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight px-2">
                Where is <span className="text-brand-blue-deep italic">pressure</span> building in your business?
            </h1>

            <p className="text-lg md:text-2xl text-slate-600 mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
                Identify the quiet risks holding you back. Get custom fixes to reduce stress and unlock growth.
            </p>

            <button
                onClick={onStart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg md:text-xl hover:bg-slate-800 transition-all hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98] group"
            >
                Check the health of my business
                <ChevronRight className="w-5 h-5 md:w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-8 text-slate-400 font-medium text-sm md:text-base">
                Free diagnostic. No credit card. Just clarity.
            </p>

            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />
        </motion.div>
    );
}

export default Intro;
