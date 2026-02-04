import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../firebase-config';
import { onAuthStateChanged, signInWithPopup, GithubAuthProvider, signOut } from 'firebase/auth';

const GITHUB_TOKEN_KEY = 'github_access_token';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [githubAccessToken, setGithubAccessToken] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const stored = typeof window !== 'undefined' && localStorage.getItem(GITHUB_TOKEN_KEY);
                if (stored) setGithubAccessToken(stored);
            } else {
                setGithubAccessToken(null);
                if (typeof window !== 'undefined') localStorage.removeItem(GITHUB_TOKEN_KEY);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const loginWithGithub = () => {
        const provider = new GithubAuthProvider();
        provider.addScope('public_repo');
        return signInWithPopup(auth, provider).then((result) => {
            const credential = GithubAuthProvider.credentialFromResult(result);
            if (credential?.accessToken) {
                setGithubAccessToken(credential.accessToken);
                if (typeof window !== 'undefined') {
                    localStorage.setItem(GITHUB_TOKEN_KEY, credential.accessToken);
                }
            }
            return result;
        });
    };

    const logout = () => {
        setGithubAccessToken(null);
        if (typeof window !== 'undefined') localStorage.removeItem(GITHUB_TOKEN_KEY);
        return signOut(auth);
    };

    const clearGithubToken = () => {
        setGithubAccessToken(null);
        if (typeof window !== 'undefined') localStorage.removeItem(GITHUB_TOKEN_KEY);
    };

    const value = {
        user,
        loading,
        githubAccessToken,
        loginWithGithub,
        logout,
        clearGithubToken
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
