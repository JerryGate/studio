
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthUser, UserRole } from '@/types';
import { mockAuthUsers } from '@/lib/mock-data';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock implementation. In a real app, you would integrate with a real auth provider.
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        // Simulate checking for a logged-in user from a session or token
        try {
            const storedUser = sessionStorage.getItem('mock-user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from session storage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (role: UserRole) => {
        setLoading(true);
        const mockUser = mockAuthUsers[role];
        if (!mockUser) {
            console.error(`No mock user found for role: ${role}`);
            setLoading(false);
            return;
        }
        sessionStorage.setItem('mock-user', JSON.stringify(mockUser));
        setUser(mockUser);
        setLoading(false);
    };

    const logout = () => {
        sessionStorage.removeItem('mock-user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
