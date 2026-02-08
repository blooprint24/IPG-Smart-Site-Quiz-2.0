import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUADRANTS, QUESTIONS } from '../constants';
import { Eye, Phone, Settings, BarChart3, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const icons = { Eye, Phone, Settings, BarChart3 };

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
        <div className="w-full max-w-4xl mx-auto py-12">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="calculating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-20"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-12 h-12 border-4 border-slate-200 border-t-slate-800 rounded-full mx-auto mb-6"
                        />
                        <h2 className="text-2xl font-medium text-slate-600">Calculating your Business Pressure...</h2>
                    </motion.div>
                )}

                {step >= 2 && (
                    <motion.div
                        key="results-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            border: step >= 4 && isMax ? `2px solid #64748b` : '1px solid transparent'
                                        }}
                                        className={`quadrant-card glass relative overflow-hidden h-64 flex flex-col items-center justify-center ${step >= 4 && isMax ? 'shadow-2xl z-10' : ''}`}
                                    >
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: step >= 3 ? `${fillPercentage}%` : 0 }}
                                            className={`absolute bottom-0 left-0 w-full opacity-10 ${quad.color === 'blue' ? 'bg-blue-500' : quad.color === 'green' ? 'bg-green-500' : quad.color === 'orange' ? 'bg-orange-500' : 'bg-purple-500'}`}
                                        />

                                        <div className="p-4 rounded-2xl mb-4 bg-slate-50">
                                            <Icon className="w-8 h-8 text-slate-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{quad.name}</h3>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {step >= 4 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
                            >
                                <div className="inline-flex items-center space-x-2 text-orange-700 bg-orange-50 px-4 py-1 rounded-full text-sm font-bold mb-6">
                                    <Zap className="w-4 h-4" />
                                    <span>Pressure Point Identified</span>
                                </div>

                                <h2 className="text-3xl font-bold text-slate-800 mb-4">
                                    {userData.name ? `${userData.name}, this` : 'This'} is where pressure is building first.
                                </h2>

                                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                                    This doesn’t mean you’re doing anything wrong. It means {QUADRANTS[maxQuadrant].name} is where risk is quietly growing — and where fixing one thing will help everything else feel easier.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mb-10">
                                    <div className="bg-blue-50/50 p-6 rounded-2xl">
                                        <div className="flex items-center space-x-3 mb-3">
                                            <ShieldCheck className="w-6 h-6 text-blue-600" />
                                            <h4 className="font-bold text-slate-800 tracking-tight">Ownership View</h4>
                                        </div>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Systems reduce risk by carrying the load for you. The more your business depends on systems, the safer it becomes.
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <h4 className="font-bold text-slate-800 mb-3 tracking-tight">The First Fix</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            By focusing on reducing risk in **{QUADRANTS[maxQuadrant].name}** first, you unlock the momentum needed to stabilize the whole business.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="group flex items-center justify-center space-x-2 bg-slate-800 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-slate-700 transition-all shadow-xl hover:shadow-2xl w-full md:w-auto mx-auto"
                                >
                                    <span>See your first fix →</span>
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ResultsReveal;
