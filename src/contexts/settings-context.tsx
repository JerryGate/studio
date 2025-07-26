
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Default number for Nigeria, replace as needed
const DEFAULT_WHATSAPP_NUMBER = '2348000000000';

interface SettingsContextType {
  whatsAppNumber: string;
  setWhatsAppNumber: (number: string) => void;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [whatsAppNumber, _setWhatsAppNumber] = useState<string>(DEFAULT_WHATSAPP_NUMBER);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const storedNumber = localStorage.getItem('whatsAppNumber');
            if (storedNumber) {
                _setWhatsAppNumber(storedNumber);
            } else {
                 _setWhatsAppNumber(DEFAULT_WHATSAPP_NUMBER);
            }
        } catch (error) {
            console.error("Failed to parse WhatsApp number from localStorage", error);
            _setWhatsAppNumber(DEFAULT_WHATSAPP_NUMBER);
        } finally {
            setLoading(false);
        }
    }, []);

    const setWhatsAppNumber = (number: string) => {
        const sanitizedNumber = number.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        localStorage.setItem('whatsAppNumber', sanitizedNumber);
        _setWhatsAppNumber(sanitizedNumber);
    };

    return (
        <SettingsContext.Provider value={{ whatsAppNumber, setWhatsAppNumber, loading }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
