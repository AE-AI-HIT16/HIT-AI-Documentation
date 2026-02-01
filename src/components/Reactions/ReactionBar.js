import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc } from 'firebase/firestore';
import styles from './ReactionBar.module.css';

const EMOJIS = ['🗿', '🤡', '💀', '🐸', '😭', '🤣', '🔥', '🚀', '🌭', '💩'];

const ReactionBar = ({ docRef, orientation = 'horizontal', size = 'medium' }) => {
    const { user } = useAuth();
    const [reactions, setReactions] = useState({});

    useEffect(() => {
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setReactions(docSnap.data().reactions || {});
            }
        }, (error) => {
            // Silently fail or log if doc doesn't exist yet (will be created on first reaction)
        });
        return () => unsubscribe();
    }, [docRef]);

    const toggleReaction = async (emoji) => {
        if (!user) {
            alert("Please login to react!");
            return;
        }

        try {
            const currentUsers = reactions[emoji] || [];
            const hasReacted = currentUsers.includes(user.uid);

            if (hasReacted) {
                // Remove reaction
                await updateDoc(docRef, {
                    [`reactions.${emoji}`]: arrayRemove(user.uid)
                });
            } else {
                // Add reaction (and create doc if strictly needed, though updateDoc usually needs existing doc. 
                // We use setDoc with merge for safety on first interaction if might not exist)
                // Actually updateDoc fails if doc doesn't exist.
                // Let's try setDoc with merge which handles both.
                await setDoc(docRef, {
                    reactions: {
                        [emoji]: arrayUnion(user.uid)
                    }
                }, { merge: true });
            }
        } catch (err) {
            console.error("Failed to react:", err);
        }
    };

    return (
        <div className={`${styles.container} ${styles[orientation]} ${styles[size]}`}>
            {EMOJIS.map(emoji => {
                const count = (reactions[emoji] || []).length;
                const isActive = user && (reactions[emoji] || []).includes(user.uid);

                return (
                    <button
                        key={emoji}
                        className={`${styles.reactionBtn} ${isActive ? styles.active : ''}`}
                        onClick={() => toggleReaction(emoji)}
                        title={isActive ? "Unlike" : "Like"}
                    >
                        <span className={styles.emoji}>{emoji}</span>
                        {count > 0 && <span className={styles.count}>{count}</span>}
                    </button>
                );
            })}
        </div>
    );
};

export default ReactionBar;
