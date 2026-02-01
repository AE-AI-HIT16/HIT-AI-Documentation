import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import styles from './LoginPage.module.css';

const LoginPage = () => {
    const { loginWithGithub } = useAuth();
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            await loginWithGithub();
        } catch (err) {
            console.error("Login Error:", err);
            // Show the specific error message from Firebase
            setError(`Login Failed: ${err.message} (${err.code || 'unknown'})`);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Welcome back!</h1>
                <p className={styles.subtitle}>Please sign in to access the documentation.</p>

                <button className={styles.githubButton} onClick={handleLogin}>
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={styles.icon}>
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    Sign in with GitHub
                </button>

                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
