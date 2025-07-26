
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes, Theme } from '@/lib/themes';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME_NAME = 'default';

const applyThemeColors = (theme: Theme) => {
    if (isServer || !theme) return;
    const root = document.documentElement;
    root.style.setProperty('--primary-hue', theme.colors.primary.split(' ')[0]);
    root.style.setProperty('--primary-saturation', theme.colors.primary.split(' ')[1]);
    root.style.setProperty('--primary-lightness', theme.colors.primary.split(' ')[2]);
    root.style.setProperty('--accent-hue', theme.colors.accent.split(' ')[0]);
    root.style.setProperty('--accent-saturation', theme.colors.accent.split(' ')[1]);
    root.style.setProperty('--accent-lightness', theme.colors.accent.split(' ')[2]);

    // For simplicity, we can also update the background here if needed by the theme
    // For now, we only handle primary and accent colors as per the `themes.ts` file
};

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
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
        // If localStorage is unavailable or fails, fallback to default
        return themes.find(t => t.name === DEFAULT_THEME_NAME)!;
    }
  });

  useEffect(() => {
    if (!isServer) {
        applyThemeColors(theme);
        localStorage.setItem('website-theme-name', theme.name);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const resetTheme = () => {
    setThemeState(themes.find(t => t.name === DEFAULT_THEME_NAME)!);
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
