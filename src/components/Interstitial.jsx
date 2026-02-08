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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="glass p-8 md:p-16 text-center relative overflow-hidden"
        >
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute left-8 top-8 text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back</span>
            </button>

            <div className={`inline-flex p-6 rounded-[2rem] bg-brand-${quadrant.color} mb-8`}>
                <Icon className={`w-12 h-12 text-brand-${quadrant.color}-deep`} />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                {quadrant.name} Check
            </h2>

            <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
                {quadrant.insight}
            </p>

            <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98] group"
            >
                Continue
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
}

export default Interstitial;
