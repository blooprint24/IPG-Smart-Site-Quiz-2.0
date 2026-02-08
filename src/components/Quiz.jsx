import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { QUADRANTS } from '../constants';

function Quiz({ question, totalQuestions, currentIndex, onAnswer, onBack, isTransitioning }) {
    const quadrant = QUADRANTS[question.quadrant];
    const [selectedId, setSelectedId] = useState(null);

    const quadrants = ['VISIBILITY', 'RESPONSE', 'OPERATIONS', 'MONEY_CONTROL'];
    const activeQuadrantIndex = quadrants.indexOf(question.quadrant);
    const alphabet = ['A', 'B', 'C', 'D'];

    // Option specific colors for visual distinction
    const optionStyles = [
        { base: 'bg-blue-50/30 border-blue-100', hover: 'hover:border-blue-400 hover:bg-blue-50/60', icon: 'bg-blue-100 text-blue-600', active: 'border-blue-500 bg-blue-100/50' },
        { base: 'bg-indigo-50/30 border-indigo-100', hover: 'hover:border-indigo-400 hover:bg-indigo-50/60', icon: 'bg-indigo-100 text-indigo-600', active: 'border-indigo-500 bg-indigo-100/50' },
        { base: 'bg-sky-50/30 border-sky-100', hover: 'hover:border-sky-400 hover:bg-sky-50/60', icon: 'bg-sky-100 text-sky-600', active: 'border-sky-500 bg-sky-100/50' },
        { base: 'bg-slate-50 border-slate-200', hover: 'hover:border-slate-400 hover:bg-slate-100', icon: 'bg-slate-100 text-slate-500', active: 'border-slate-500 bg-slate-200' }
    ];

    const handleSelect = (index, weight) => {
        if (isTransitioning) return;
        setSelectedId(index);
        onAnswer(question.id, weight);
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6 w-full">
            {/* Back Button & Progress Header */}
            <div className="flex items-center justify-between px-2">
                <button
                    onClick={onBack}
                    disabled={currentIndex === 0 || isTransitioning}
                    className={`p-2 -ml-2 flex items-center gap-1.5 text-sm font-bold transition-all ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-slate-800'
                        } ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>

                <div className="flex gap-1.5 md:gap-2">
                    {quadrants.map((q, i) => (
                        <div
                            key={q}
                            className={`h-1.5 md:h-2 w-8 md:w-12 rounded-full transition-all duration-700 ${activeQuadrantIndex > i
                                ? 'bg-slate-900'
                                : activeQuadrantIndex === i
                                    ? `bg-brand-${quadrant.color}-deep`
                                    : 'bg-slate-200'
                                }`}
                        />
                    ))}
                </div>

                <span className="text-xs md:text-sm font-bold text-slate-400 tabular-nums flex-shrink-0 px-2">
                    {currentIndex + 1} <span className="text-slate-300">/</span> {totalQuestions}
                </span>
            </div>

            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="glass p-6 md:p-12 shadow-2xl relative overflow-hidden"
            >
                <h2 className="text-xl md:text-3xl font-bold text-slate-900 mb-8 md:mb-12 leading-tight tracking-tight">
                    {question.text}
                </h2>

                <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {question.options.map((option, index) => {
                        const style = optionStyles[index];
                        const isSelected = selectedId === index;

                        return (
                            <motion.button
                                key={index}
                                whileHover={!isTransitioning ? { scale: 1.01, x: 4 } : {}}
                                whileTap={!isTransitioning ? { scale: 0.98 } : {}}
                                onClick={() => handleSelect(index, option.weight)}
                                disabled={isTransitioning}
                                className={`group flex items-center text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 min-h-[72px] md:min-h-[84px] ${isSelected ? style.active : `${style.base} ${style.hover}`} ${isTransitioning && !isSelected ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}
                            >
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 transition-all duration-300 ${isSelected ? 'bg-white shadow-inner' : style.icon} group-hover:scale-110`}>
                                    {alphabet[index]}
                                </div>
                                <span className={`flex-1 text-base md:text-lg font-medium transition-colors duration-300 ${isSelected ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                                    {option.text}
                                </span>
                                <div className={`flex-shrink-0 ml-2 transition-transform duration-300 ${isSelected ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                    <ChevronRight className={`w-5 h-5 ${isSelected ? 'text-slate-900' : 'text-slate-300'}`} />
                                </div>
                            </motion.button>
                        );
                    })}
                </div>

                {/* Subtle loading line for transition feedback */}
                {isTransitioning && (
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                        className="absolute bottom-0 left-0 w-full h-1 bg-slate-900/10 origin-left"
                    />
                )}
            </motion.div>
        </div>
    );
}

export default Quiz;
