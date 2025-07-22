
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME = {
    primary: '211, 90%, 53%',
    accent: '145, 58%, 59%',
    background: '0, 0%, 100%',
};

const applyTheme = (theme: Theme) => {
    if (isServer) return;
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--background', theme.background);
};


type ThemeMode = 'light' | 'dark';

interface Theme {
  primary: string;
  accent: string;
  background: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (isServer) return DEFAULT_THEME;
    try {
        const savedTheme = localStorage.getItem('website-theme');
        return savedTheme ? JSON.parse(savedTheme) : DEFAULT_THEME;
    } catch (e) {
        return DEFAULT_THEME;
    }
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
      if (isServer) return 'light';
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
      return savedMode || 'light';
  });

  useEffect(() => {
    if (!isServer) {
        applyTheme(theme);
        localStorage.setItem('website-theme', JSON.stringify(theme));
    }
  }, [theme]);

   useEffect(() => {
    if (isServer) return;
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const resetTheme = () => {
    setThemeState(DEFAULT_THEME);
  }

  const toggleMode = () => {
      setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme, mode, toggleMode }}>
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
