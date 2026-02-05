import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { useScrollView } from '@site/src/hooks/useScrollView';
import styles from './styles.module.css';

const NAMESPACE = 'ae-ai-hit16-docs';

const DocStats = () => {
    const [readingTime, setReadingTime] = useState(0);
    const [viewCount, setViewCount] = useState(0);
    const [hasCounted, setHasCounted] = useState(false);

    const location = useLocation();
    // Create a safe key from the path, replacing slashes with dots or underscores
    // Remove trailing slash and leading slash for consistency
    const pageKey = location.pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';

    const isBottom = useScrollView();

    // Calculate Reading Time
    useEffect(() => {
        const text = document.querySelector('main')?.innerText || "";
        const wpm = 200;
        const words = text.trim().split(/\s+/).length;
        const time = Math.ceil(words / wpm);
        setReadingTime(time);
    }, []);

    // Fetch initial view count
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await fetch(`https://api.countapi.xyz/info/${NAMESPACE}/${pageKey}`);
                const data = await response.json();
                if (data && data.value) {
                    setViewCount(data.value);
                }
            } catch (error) {
                console.error("Error fetching view count:", error);
            }
        };

        fetchCount();
    }, [pageKey]);

    // Increment view count when scrolled to bottom
    useEffect(() => {
        if (isBottom && !hasCounted) {
            const incrementCount = async () => {
                try {
                    const response = await fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${pageKey}`);
                    const data = await response.json();
                    if (data && data.value) {
                        setViewCount(data.value);
                        setHasCounted(true);
                    }
                } catch (error) {
                    console.error("Error incrementing view count:", error);
                }
            };
            incrementCount();
        }
    }, [isBottom, hasCounted, pageKey]);

    return (
        <div className={styles.docStats}>
            <span className={styles.statItem}>
                ⏱️ {readingTime} min read
            </span>
            <span className={styles.statItem}>
                👀 {viewCount} views
            </span>
        </div>
    );
};

export default DocStats;
