import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { QUADRANTS } from '../constants';

function Quiz({ question, totalQuestions, currentIndex, onAnswer, onBack }) {
    const quadrant = QUADRANTS[question.quadrant];

    // Option specific colors for visual distinction
    const optionStyles = [
        { base: 'bg-blue-50/30 border-blue-100', hover: 'hover:border-blue-400 hover:bg-blue-50/60', icon: 'bg-blue-100 text-blue-600' },
        { base: 'bg-indigo-50/30 border-indigo-100', hover: 'hover:border-indigo-400 hover:bg-indigo-50/60', icon: 'bg-indigo-100 text-indigo-600' },
        { base: 'bg-sky-50/30 border-sky-100', hover: 'hover:border-sky-400 hover:bg-sky-50/60', icon: 'bg-sky-100 text-sky-600' },
        { base: 'bg-slate-50 border-slate-200', hover: 'hover:border-slate-400 hover:bg-slate-100', icon: 'bg-slate-100 text-slate-500' }
    ];

    const quadrants = ['VISIBILITY', 'RESPONSE', 'OPERATIONS', 'MONEY_CONTROL'];
    const activeQuadrantIndex = quadrants.indexOf(question.quadrant);
    const alphabet = ['A', 'B', 'C', 'D'];

    return (
        <div className="flex flex-col gap-6">
            {/* Back Button & Progress Header */}
            <div className="flex items-center justify-between mb-2">
                <button
                    onClick={onBack}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${currentIndex === 0 ? 'opacity-0' : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="flex gap-2">
                    {quadrants.map((q, i) => (
                        <div
                            key={q}
                            className={`h-2 w-12 rounded-full transition-all duration-500 ${activeQuadrantIndex > i
                                ? 'bg-slate-900'
                                : activeQuadrantIndex === i
                                    ? `bg-brand-${quadrant.color}-deep`
                                    : 'bg-slate-200'
                                }`}
                        />
                    ))}
                </div>

                <span className="text-sm font-bold text-slate-400 tabular-nums">
                    {currentIndex + 1} / {totalQuestions}
                </span>
            </div>

            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="glass p-8 md:p-12"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10 leading-tight">
                    {question.text}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ x: 8 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => onAnswer(question.id, option.weight)}
                            className={`group flex items-center text-left p-5 rounded-2xl border-2 transition-all ${optionStyles[index].base} ${optionStyles[index].hover}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 transition-colors ${optionStyles[index].icon} group-hover:bg-white`}>
                                {alphabet[index]}
                            </div>
                            <span className="flex-1 text-lg text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                                {option.text}
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                        </motion.button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Quiz;
