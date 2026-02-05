import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);

    // Helper to handle option selection
    const handleOptionClick = (index) => {
        if (showFeedback) return; // Prevent changing answer

        setSelectedOption(index);
        setShowFeedback(true);

        if (index === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setSelectedOption(null);
            setShowFeedback(false);
        } else {
            setIsCompleted(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedOption(null);
        setShowFeedback(false);
        setScore(0);
        setIsCompleted(false);
    };

    if (!questions || questions.length === 0) return null;

    if (isCompleted) {
        return (
            <div className={styles.quizContainer}>
                <div className={styles.score}>
                    🎉 Quiz Completed! <br />
                    Your Score: {score} / {questions.length}
                    <div style={{ marginTop: '1rem' }}>
                        <button className={styles.resetBtn} onClick={resetQuiz}>
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const questionData = questions[currentQuestion];

    return (
        <div className={styles.quizContainer}>
            <div className={styles.question}>
                {currentQuestion + 1}. {questionData.question}
            </div>

            <div className={styles.options}>
                {questionData.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === questionData.correct;

                    let btnClass = styles.optionBtn;
                    if (showFeedback) {
                        if (isCorrect) btnClass = clsx(styles.optionBtn, styles.correct);
                        else if (isSelected) btnClass = clsx(styles.optionBtn, styles.incorrect);
                    }

                    return (
                        <button
                            key={index}
                            className={btnClass}
                            onClick={() => handleOptionClick(index)}
                            disabled={showFeedback}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {showFeedback && (
                <div className={styles.feedback}>
                    <strong>
                        {selectedOption === questionData.correct ? "✅ Correct!" : "❌ Incorrect"}
                    </strong>
                    <div className={styles.explanation}>
                        {questionData.explanation}
                    </div>

                    <div className={styles.controls}>
                        <button className={styles.nextBtn} onClick={handleNext}>
                            {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
