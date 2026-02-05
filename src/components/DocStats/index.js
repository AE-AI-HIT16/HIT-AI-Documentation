import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const DocStats = () => {
    // View counting removed as it depended on Firebase

    const [readingTime, setReadingTime] = useState(0);

    useEffect(() => {
        const text = document.querySelector('main')?.innerText || "";
        const wpm = 200;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        setReadingTime(time);
    }, []);

    return (
        <div className={styles.docStats}>

            <span className={styles.statItem}>
                ⏱️ {readingTime} min read
            </span>
        </div>
    );
};

export default DocStats;
