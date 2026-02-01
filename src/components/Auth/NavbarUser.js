import React from 'react';
import { useAuth } from './AuthContext';

const NavbarUser = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
            <img
                src={user.photoURL}
                alt={user.displayName}
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '2px solid var(--ifm-color-primary)'
                }}
                title={user.displayName}
            />
            <button
                onClick={logout}
                style={{
                    background: 'none',
                    border: '1px solid var(--ifm-color-emphasis-300)',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--ifm-color-content)',
                    fontWeight: 600
                }}
                className="button--hover-overlay"
            >
                Logout
            </button>
        </div>
    );
};

export default NavbarUser;
