import React, { useState } from 'react';
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

    const handleStart = () => {
        setStage('quiz');
    };

    const handleAnswer = (questionId, weight) => {
        setAnswers(prev => ({ ...prev, [questionId]: weight }));
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
    };

    const handleBack = () => {
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
        <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden">
            <div className="w-full max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                    {stage === 'intro' && (
                        <Intro key="intro" onStart={handleStart} />
                    )}

                    {stage === 'quiz' && (
                        <Quiz
                            key="quiz"
                            question={QUESTIONS[currentQuestionIndex]}
                            totalQuestions={QUESTIONS.length}
                            currentIndex={currentQuestionIndex}
                            onAnswer={handleAnswer}
                            onBack={handleBack}
                        />
                    )}

                    {stage === 'interstitial' && (
                        <Interstitial
                            key="interstitial"
                            quadrantKey={QUESTIONS[currentQuestionIndex + 1].quadrant}
                            onNext={handleNextFromInterstitial}
                            onBack={() => {
                                setStage('quiz');
                                // stay at same currentQuestionIndex which is the last answered one
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
