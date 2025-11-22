import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate(); // Removed to avoid context error if used outside Router, but usually AuthProvider is inside Router. 
    // Actually, AuthProvider is often outside or inside. Let's assume inside for now, but to be safe I won't use navigate here directly unless I pass it or wrap properly.
    // For simplicity, I'll just manage state here.

    useEffect(() => {
        // Check for stored user in localStorage
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Hardcoded demo credentials
                if (email === 'admin@tourism.com' && (password === 'admin123' || password === 'admin@tourism.com')) {
                    const userData = {
                        id: '1',
                        name: 'Super Admin',
                        email: email,
                        role: 'Superadmin',
                        avatar: '/avatars/admin.png'
                    };
                    setUser(userData);
                    localStorage.setItem('adminUser', JSON.stringify(userData));
                    resolve(userData);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
        // window.location.href = '/login'; // Force redirect
    };

    const hasRole = (requiredRoles) => {
        if (!user) return false;
        if (user.role === 'Superadmin') return true; // Superadmin has access to everything
        return requiredRoles.includes(user.role);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
