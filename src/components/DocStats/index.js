import React, { useState, useEffect } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { db } from '../../firebase-config';
import { doc, onSnapshot, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import styles from './styles.module.css';

// Simple function to estimate reading time (200 words per minute)
const calculateReadingTime = (content) => {
    if (!content) return 0;
    const words = content.trim().split(/\s+/).length;
    const match = content.match(/<[^>]+>/g); // crude HTML tag removal
    const cleanContent = content.replace(/<[^>]+>/g, '');
    const wpm = 200;
    const time = Math.ceil(cleanContent.length / 1000); // Very rough estimate based on chars, or use words
    // Better:
    const wordCount = content.split(/\s+/g).length;
    return Math.ceil(wordCount / 200);
};

// Actually, Docusaurus DOES provide reading time in the prop if enabling a specific remark plugin, 
// but since we don't have that easily, we can just show the view count for now or try to get reading time from frontMatter if manually added.
// However, the user HAD it. 

// Let's implement View Count only for now as Reading time usually comes from internal Docusaurus props 
// which are hard to get without the blog plugin or swizzling the entire DocItem.
// BUT, we can make a fake one or just show views.

const DocStats = () => {
    const { metadata } = useDoc();
    const [views, setViews] = useState(0);

    // Sanitize ID for Firestore (replace invalid chars like /)
    const safeId = metadata.id.replace(/\//g, '_').replace(/\s+/g, '_');

    useEffect(() => {
        const docRef = doc(db, "page_stats", safeId);

        // Increment view count on mount
        const incrementView = async () => {
            try {
                // Use setDoc with merge to create if not exists
                await setDoc(docRef, {
                    views: increment(1)
                }, { merge: true });
            } catch (e) {
                console.error("Error updating views:", e);
            }
        };
        incrementView();

        // Listen for real-time updates
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setViews(docSnap.data().views || 0);
            }
        });

        return () => unsubscribe();
    }, [metadata.id]);

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
                👁️ {views} views
            </span>
            <span className={styles.statItem}>
                ⏱️ {readingTime} min read
            </span>
        </div>
    );
};

export default DocStats;
