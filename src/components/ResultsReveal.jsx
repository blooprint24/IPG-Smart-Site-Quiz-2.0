import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUADRANTS, QUESTIONS } from '../constants';
import { Eye, Phone, Settings, BarChart3, ShieldCheck, Zap } from 'lucide-react';

const icons = { Eye, Phone, Settings, BarChart3 };

const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600'
};

const ResultsReveal = ({ answers, userData }) => {
    const [step, setStep] = useState(1); // 1: Calculating, 2: Grid, 3: Fill, 4: Highlight, 5: Complete

    const scores = useMemo(() => {
        const s = { VISIBILITY: 0, RESPONSE: 0, OPERATIONS: 0, MONEY_CONTROL: 0 };
        Object.entries(answers).forEach(([qId, weight]) => {
            const question = QUESTIONS.find(q => q.id === parseInt(qId));
            if (question) s[question.quadrant] += weight;
        });
        return s;
    }, [answers]);

    const maxQuadrant = useMemo(() => {
        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }, [scores]);

    const maxScorePerQuadrant = useMemo(() => {
        const counts = { VISIBILITY: 0, RESPONSE: 0, OPERATIONS: 0, MONEY_CONTROL: 0 };
        QUESTIONS.forEach(q => counts[q.quadrant]++);
        const max = {};
        Object.keys(counts).forEach(k => max[k] = counts[k] * 3);
        return max;
    }, []);

    useEffect(() => {
        if (step === 1) setTimeout(() => setStep(2), 2500);
        if (step === 2) setTimeout(() => setStep(3), 1000);
        if (step === 3) setTimeout(() => setStep(4), 2000);
        if (step === 4) setTimeout(() => setStep(5), 1500);
    }, [step]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-[60vh] flex flex-col justify-center">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="calculating"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-20"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full mx-auto mb-6"
                        />
                        <h2 className="text-xl md:text-2xl font-semibold text-slate-600">Calculating your Business Pressure...</h2>
                    </motion.div>
                )}

                {step >= 2 && (
                    <motion.div
                        key="results-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-8 md:space-y-12"
                    >
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
                            {Object.keys(QUADRANTS).map((key) => {
                                const quad = QUADRANTS[key];
                                const Icon = icons[quad.icon];
                                const score = scores[key];
                                const isMax = key === maxQuadrant;
                                const fillPercentage = (score / maxScorePerQuadrant[key]) * 100;

                                return (
                                    <motion.div
                                        key={key}
                                        layout
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{
                                            scale: step >= 4 && isMax ? 1.05 : 1,
                                            opacity: step >= 4 && !isMax ? 0.6 : 1,
                                            boxShadow: step >= 4 && isMax ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' : 'none'
                                        }}
                                        className={`quadrant-card glass relative overflow-hidden h-32 md:h-48 flex flex-col items-center justify-center border-2 transition-all duration-500 ${step >= 4 && isMax ? 'border-slate-400 z-10' : 'border-slate-100'}`}
                                    >
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: step >= 3 ? `${fillPercentage}%` : 0 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className={`absolute bottom-0 left-0 w-full opacity-10 ${quad.color === 'blue' ? 'bg-blue-500' : quad.color === 'green' ? 'bg-green-500' : quad.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}
                                        />

                                        <div className={`p-2 md:p-3 rounded-xl bg-slate-50 relative z-10 ${isMax && step >= 4 ? 'animate-pulse' : ''}`}>
                                            <Icon className="w-5 h-5 md:w-6 h-6 text-slate-600" />
                                        </div>
                                        <h3 className="text-xs md:text-sm font-bold text-slate-800 text-center px-1 relative z-10 mt-2">{quad.name}</h3>

                                        {step >= 3 && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute top-2 right-2 text-[10px] font-bold text-slate-400 tabular-nums"
                                            >
                                                {Math.round(fillPercentage)}%
                                            </motion.span>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {step >= 4 && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-center bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-xl max-w-3xl mx-auto"
                            >
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    className="inline-flex items-center space-x-2 text-orange-700 bg-orange-50 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 shadow-sm"
                                >
                                    <Zap className="w-3.5 h-3.5 md:w-4 h-4" />
                                    <span>Pressure Point Identified</span>
                                </motion.div>

                                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                                    This is where pressure is building first.
                                </h2>

                                <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed px-2">
                                    This doesn’t mean you’re doing anything wrong. It means <span className={`font-bold transition-colors duration-500 ${colorClasses[QUADRANTS[maxQuadrant].color]}`}>{QUADRANTS[maxQuadrant].name}</span> is where risk is quietly growing — and where fixing one thing will help everything else feel easier.
                                </p>

                                <div className="grid md:grid-cols-2 gap-4 md:gap-6 text-left mb-10">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50"
                                    >
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-blue-100 rounded-lg">
                                                <ShieldCheck className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h4 className="font-bold text-slate-800 tracking-tight">Ownership View</h4>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Systems reduce risk by carrying the load for you. The more your business depends on systems, the safer it becomes.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-slate-50 p-6 rounded-2xl border border-slate-100"
                                    >
                                        <div className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-slate-200 rounded-lg">
                                                <Zap className="w-5 h-5 text-slate-600" />
                                            </div>
                                            <h4 className="font-bold text-slate-800 tracking-tight">The First Fix</h4>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            By focusing on reducing risk in <span className={`font-bold transition-colors duration-500 ${colorClasses[QUADRANTS[maxQuadrant].color]}`}>{QUADRANTS[maxQuadrant].name}</span> first, you unlock the momentum needed to stabilize the whole business.
                                        </p>
                                    </motion.div>
                                </div>

                                <div className="mt-12 border-t border-slate-100 pt-10">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Get your personalized First Fix report</h3>
                                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                                        We'll show you exactly how to fix these gaps right away — before they start hurting your business or limiting your growth.
                                    </p>
                                    <div className="w-full min-h-[500px] bg-slate-50 rounded-[50px] overflow-hidden shadow-inner">
                                        <iframe
                                            src="https://updates.idealperformancegroup.com/widget/form/ewdFP0Bausi8ra0Gguzz"
                                            style={{ width: '100%', height: '100%', border: 'none', borderRadius: '50px' }}
                                            id="inline-ewdFP0Bausi8ra0Gguzz"
                                            data-layout="{'id':'INLINE'}"
                                            data-trigger-type="alwaysShow"
                                            data-trigger-value=""
                                            data-activation-type="alwaysActivated"
                                            data-activation-value=""
                                            data-deactivation-type="neverDeactivate"
                                            data-deactivation-value=""
                                            data-form-name="Form 9"
                                            data-height="492"
                                            data-layout-iframe-id="inline-ewdFP0Bausi8ra0Gguzz"
                                            data-form-id="ewdFP0Bausi8ra0Gguzz"
                                            title="Form 9"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResultsReveal;
