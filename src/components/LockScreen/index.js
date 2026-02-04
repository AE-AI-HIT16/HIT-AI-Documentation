import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function LockScreen({ releaseDate }) {
    const formattedDate = new Date(releaseDate).toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.container}>
            <div className={styles.icon}>🔒</div>
            <h2 className={styles.title}>Content Locked</h2>
            <p className={styles.message}>
                This lesson is currently locked. It will be available on{' '}
                <span className={styles.date}>{formattedDate}</span>.
            </p>
        </div>
    );
}
