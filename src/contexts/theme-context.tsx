'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME = {
    primary: '226, 66%, 32%',
    accent: '145, 63%, 42%',
    background: '210, 20%, 98%',
};

interface Theme {
  primary: string;
  accent: string;
  background: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (isServer) return DEFAULT_THEME;
    const savedTheme = localStorage.getItem('website-theme');
    return savedTheme ? JSON.parse(savedTheme) : DEFAULT_THEME;
  });

  useEffect(() => {
    if (!isServer) {
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--accent', theme.accent);
        document.documentElement.style.setProperty('--background', theme.background);
        document.documentElement.style.setProperty('--ring', theme.primary);
        localStorage.setItem('website-theme', JSON.stringify(theme));
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const resetTheme = () => {
    setThemeState(DEFAULT_THEME);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
