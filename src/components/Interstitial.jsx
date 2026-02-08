import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Eye, Phone, Settings, BarChart3 } from 'lucide-react';
import { QUADRANTS } from '../constants';

const icons = {
    Eye: Eye,
    Phone: Phone,
    Settings: Settings,
    BarChart3: BarChart3
};

function Interstitial({ quadrantKey, onNext, onBack }) {
    const quadrant = QUADRANTS[quadrantKey];
    const Icon = icons[quadrant.icon];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="glass p-6 md:p-16 text-center relative overflow-hidden flex flex-col items-center"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute left-6 top-6 md:left-8 md:top-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 group z-10"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold">Back</span>
            </button>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={`inline-flex p-5 md:p-6 rounded-[2rem] bg-brand-${quadrant.color} mb-6 md:mb-8 shadow-sm`}
            >
                <Icon className={`w-10 h-10 md:w-12 md:h-12 text-brand-${quadrant.color}-deep`} />
            </motion.div>

            <motion.h2
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-4 md:mb-6"
            >
                {quadrant.name} Check
            </motion.h2>

            <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-base md:text-xl text-slate-600 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed px-4"
            >
                {quadrant.insight}
            </motion.p>

            <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onClick={onNext}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 md:px-10 py-4 md:py-5 bg-slate-900 text-white rounded-2xl font-bold text-base md:text-lg hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98] group"
            >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Decorative background circle with quadrant color */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-brand-${quadrant.color}/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none`} />
        </motion.div>
    );
}

export default Interstitial;
