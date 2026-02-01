import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '../components/Auth/AuthContext';
import LoginPage from '../components/Auth/LoginPage';
import Head from '@docusaurus/Head';

// Component that checks auth state and redirects/renders content
const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // While loading auth state, show a spinner or blank screen
  if (!mounted || loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f6f8fa'
      }}>
        Loading...
      </div>
    );
  }

  // If user is logged in, show the content
  if (user) {
    return children;
  }

  // Otherwise show the login page
  return (
    <>
      <Head>
        <title>Login Required</title>
      </Head>
      <LoginPage />
    </>
  );
};

export default function Root({ children }) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}
