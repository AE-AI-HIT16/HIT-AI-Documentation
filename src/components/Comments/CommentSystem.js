import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { db } from '../../firebase-config';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import styles from './CommentSystem.module.css';

const CommentSystem = ({ pageId }) => {
    const { user, loginWithGithub } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);

    // Real-time listener for comments
    useEffect(() => {
        if (!pageId) return;

        // Query comments for this page, ordered by time
        const q = query(
            collection(db, "comments"),
            where("pageId", "==", pageId),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(msgs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching comments:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [pageId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        if (!user) {
            alert("Please login to comment");
            return;
        }

        try {
            await addDoc(collection(db, "comments"), {
                pageId,
                text: newComment,
                createdAt: serverTimestamp(),
                userId: user.uid,
                userName: user.displayName,
                userPhoto: user.photoURL
            });
            setNewComment('');
        } catch (error) {
            console.error("Error adding comment:", error);
            alert("Failed to send comment. Please check your connection.");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.header}>Discussion ({comments.length})</h3>

            {/* Input Area */}
            {user ? (
                <form onSubmit={handleSubmit} className={styles.inputForm}>
                    <img src={user.photoURL} alt="Me" className={styles.avatar} />
                    <div className={styles.inputWrapper}>
                        <textarea
                            className={styles.textarea}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="What are your thoughts?"
                            rows={3}
                        />
                        <button type="submit" className={styles.submitBtn} disabled={!newComment.trim()}>
                            Post Comment
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.loginPrompt}>
                    <p>Please login to join the discussion.</p>
                    <button onClick={loginWithGithub} className={styles.loginBtn}>Login with GitHub</button>
                </div>
            )}

            {/* Comment List */}
            <div className={styles.list}>
                {loading ? <p>Loading comments...</p> : comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <img src={comment.userPhoto} alt={comment.userName} className={styles.avatar} />
                        <div className={styles.content}>
                            <div className={styles.meta}>
                                <span className={styles.name}>{comment.userName}</span>
                                <span className={styles.date}>
                                    {comment.createdAt?.seconds ? new Date(comment.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                                </span>
                            </div>
                            <p className={styles.text}>{comment.text}</p>
                        </div>
                    </div>
                ))}
                {!loading && comments.length === 0 && (
                    <p className={styles.empty}>No comments yet. Be the first to start the conversation!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSystem;
