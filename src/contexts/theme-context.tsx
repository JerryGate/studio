
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

    const [bgHue, bgSat, bgLightness] = theme.colors.background.split(' ');
    root.style.setProperty('--background-hue', bgHue);
    root.style.setProperty('--background-saturation', bgSat);
    root.style.setProperty('--background-lightness', bgLightness);
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
    const defaultTheme = themes.find(t => t.name === 'default')!;
    setThemeState(defaultTheme);
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
