import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Intro from './components/Intro';
import Quiz from './components/Quiz';
import Interstitial from './components/Interstitial';
import LeadCapture from './components/LeadCapture';
import ResultsReveal from './components/ResultsReveal';
import { QUESTIONS } from './constants';

function App() {
    const [stage, setStage] = useState('intro'); // intro, quiz, interstitial, lead, results
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [userData, setUserData] = useState({ name: '', email: '' });
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionTimeoutRef = useRef(null);

    // Ensure we scroll to top on stage/question changes for mobile
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [stage, currentQuestionIndex]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        };
    }, []);

    const handleStart = () => {
        setStage('quiz');
    };

    const handleAnswer = (questionId, weight) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setAnswers(prev => ({ ...prev, [questionId]: weight }));

        transitionTimeoutRef.current = setTimeout(() => {
            const nextIndex = currentQuestionIndex + 1;

            if (nextIndex < QUESTIONS.length) {
                const currentQuad = QUESTIONS[currentQuestionIndex].quadrant;
                const nextQuad = QUESTIONS[nextIndex].quadrant;

                if (currentQuad !== nextQuad) {
                    setStage('interstitial');
                } else {
                    setCurrentQuestionIndex(nextIndex);
                }
            } else {
                setStage('lead');
            }
            setIsTransitioning(false);
            transitionTimeoutRef.current = null;
        }, 400);
    };

    const handleBack = () => {
        // If transitioning, clear the timeout and stop the forward move
        if (isTransitioning) {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current);
                transitionTimeoutRef.current = null;
            }
            setIsTransitioning(false);
            // We just stay on the same question, effectively "cancelling" the transition
            return;
        }

        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setStage('quiz');
        } else {
            setStage('intro');
        }
    };

    const handleNextFromInterstitial = () => {
        setCurrentQuestionIndex(prev => prev + 1);
        setStage('quiz');
    };

    const handleLeadSubmit = (data) => {
        setUserData(data);
        setStage('results');
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden transition-colors duration-500">
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[90vh]">
                <AnimatePresence mode="wait">
                    {stage === 'intro' && (
                        <Intro key="intro" onStart={handleStart} />
                    )}

                    {stage === 'quiz' && (
                        <Quiz
                            key={`quiz-${currentQuestionIndex}`}
                            question={QUESTIONS[currentQuestionIndex]}
                            totalQuestions={QUESTIONS.length}
                            currentIndex={currentQuestionIndex}
                            onAnswer={handleAnswer}
                            onBack={handleBack}
                            isTransitioning={isTransitioning}
                        />
                    )}

                    {stage === 'interstitial' && (
                        <Interstitial
                            key="interstitial"
                            quadrantKey={QUESTIONS[currentQuestionIndex + 1].quadrant}
                            onNext={handleNextFromInterstitial}
                            onBack={() => {
                                setStage('quiz');
                            }}
                        />
                    )}

                    {stage === 'lead' && (
                        <LeadCapture
                            key="lead"
                            onSubmit={handleLeadSubmit}
                            onBack={() => {
                                setStage('quiz');
                                setCurrentQuestionIndex(QUESTIONS.length - 1);
                            }}
                        />
                    )}

                    {stage === 'results' && (
                        <ResultsReveal
                            key="results"
                            answers={answers}
                            userData={userData}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
