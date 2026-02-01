import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function ViewCounter({ docId }) {
    const [views, setViews] = useState(0);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const storageKey = `doc-views-${docId}`;

        // Get current view count
        const currentViews = parseInt(localStorage.getItem(storageKey) || '0', 10);

        // Increment view count
        const newViews = currentViews + 1;
        localStorage.setItem(storageKey, newViews.toString());
        setViews(newViews);
    }, [docId]);

    if (views === 0) return null;

    return (
        <div className={styles.viewCounter}>
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{views.toLocaleString()} {views === 1 ? 'view' : 'views'}</span>
        </div>
    );
}
