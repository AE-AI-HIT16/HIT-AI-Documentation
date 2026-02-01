import React from 'react';
import styles from './styles.module.css';

export default function ReadingTime({ content }) {
    // Calculate reading time (average 200 words per minute)
    const calculateReadingTime = (text) => {
        if (!text) return 0;
        const wordsPerMinute = 200;
        const wordCount = text.trim().split(/\s+/).length;
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        return minutes;
    };

    const minutes = calculateReadingTime(content);

    if (minutes === 0) return null;

    return (
        <div className={styles.readingTime}>
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{minutes} min read</span>
        </div>
    );
}
