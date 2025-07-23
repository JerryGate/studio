
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes, Theme } from '@/lib/themes';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME_NAME = 'default';

const applyTheme = (theme: Theme) => {
    if (isServer || !theme) return;
    const root = document.documentElement;
    root.style.setProperty('--primary', theme.colors.primary);
    root.style.setProperty('--accent', theme.colors.accent);
    root.style.setProperty('--background', theme.colors.background);
};

type ThemeMode = 'light' | 'dark';

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
    if (isServer) return themes.find(t => t.name === DEFAULT_THEME_NAME)!;
    try {
        const savedThemeName = localStorage.getItem('website-theme-name');
        const foundTheme = themes.find(t => t.name === savedThemeName);
        return foundTheme || themes.find(t => t.name === DEFAULT_THEME_NAME)!;
    } catch (e) {
        return themes.find(t => t.name === DEFAULT_THEME_NAME)!;
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
        localStorage.setItem('website-theme-name', theme.name);
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
    setThemeState(themes.find(t => t.name === DEFAULT_THEME_NAME)!);
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
