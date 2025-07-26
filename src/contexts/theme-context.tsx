
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { themes, Theme } from '@/lib/themes';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME_NAME = 'default';

const applyThemeColors = (theme: Theme) => {
    if (isServer || !theme) return;
    const root = document.documentElement;

    const [primaryHue, primarySaturation, primaryLightness] = theme.colors.primary.split(' ');
    root.style.setProperty('--primary-hue', primaryHue);
    root.style.setProperty('--primary-saturation', primarySaturation);
    root.style.setProperty('--primary-lightness', primaryLightness);

    const [accentHue, accentSaturation, accentLightness] = theme.colors.accent.split(' ');
    root.style.setProperty('--accent-hue', accentHue);
    root.style.setProperty('--accent-saturation', accentSaturation);
    root.style.setProperty('--accent-lightness', accentLightness);

    // Set background variables for light mode
    const [bgHue, bgSat, bgLightness] = theme.colors.background.split(' ');
    root.style.setProperty('--background-hue', bgHue);
    root.style.setProperty('--background-saturation', bgSat);
    root.style.setProperty('--background-lightness', bgLightness);
};


interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resetTheme: () => void;
  mode: 'light' | 'dark';
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

  const [mode, setMode] = useState<'light' | 'dark'>(() => {
      if (isServer) return 'light';
      try {
          const savedMode = localStorage.getItem('website-mode') as 'light' | 'dark';
          if (savedMode) return savedMode;
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } catch (e) {
          return 'light';
      }
  });

  useEffect(() => {
    if (!isServer) {
        applyThemeColors(theme);
        localStorage.setItem('website-theme-name', theme.name);
    }
  }, [theme]);
  
  useEffect(() => {
      if (!isServer) {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');
          root.classList.add(mode);
          localStorage.setItem('website-mode', mode);
      }
  }, [mode]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };
  
  const resetTheme = () => {
    setThemeState(themes.find(t => t.name === DEFAULT_THEME_NAME)!);
  }

  const toggleMode = () => {
      setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

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
