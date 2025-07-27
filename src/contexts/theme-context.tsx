
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { THEMES, Theme, HSLColor } from '@/lib/themes';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
  customColors: {
    primary: HSLColor;
    accent: HSLColor;
  };
  setCustomColor: (colorType: 'primary' | 'accent', color: { h: number, s: number, l: number}) => void;
  loading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const applyThemeToDom = (themeToApply: Theme) => {
    const root = document.documentElement;

    root.style.setProperty('--primary-hue', String(themeToApply.colors.primary.h));
    root.style.setProperty('--primary-saturation', `${themeToApply.colors.primary.s}%`);
    root.style.setProperty('--primary-lightness', `${themeToApply.colors.primary.l}%`);
    root.style.setProperty('--ring-hue', String(themeToApply.colors.primary.h));
    root.style.setProperty('--ring-saturation', `${themeToApply.colors.primary.s}%`);
    root.style.setProperty('--ring-lightness', `${themeToApply.colors.primary.l}%`);

    root.style.setProperty('--accent-hue', String(themeToApply.colors.accent.h));
    root.style.setProperty('--accent-saturation', `${themeToApply.colors.accent.s}%`);
    root.style.setProperty('--accent-lightness', `${themeToApply.colors.accent.l}%`);
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, _setTheme] = useState<Theme>(THEMES[0]);
  const [loading, setLoading] = useState(true);
  const [themeKey, setThemeKey] = useState(0);
  const [customColors, setCustomColors] = useState<{primary: HSLColor, accent: HSLColor}>({
    primary: THEMES[0].colors.primary,
    accent: THEMES[0].colors.accent,
  });

  useEffect(() => {
    setLoading(true);
    const savedThemeName = localStorage.getItem('theme') || THEMES[0].name.toLowerCase();
    const savedCustomPrimary = localStorage.getItem('custom-primary');
    const savedCustomAccent = localStorage.getItem('custom-accent');

    let initialTheme = THEMES.find(t => t.name.toLowerCase() === savedThemeName) || THEMES[0];
    let initialCustomColors = { primary: initialTheme.colors.primary, accent: initialTheme.colors.accent };

    if (savedThemeName === 'custom' && savedCustomPrimary && savedCustomAccent) {
      try {
        const primary = JSON.parse(savedCustomPrimary);
        const accent = JSON.parse(savedCustomAccent);
        initialCustomColors = { primary, accent };
        initialTheme = { name: 'Custom', colors: { primary, accent } };
      } catch (e) {
         console.error("Failed to parse custom theme from localStorage", e);
      }
    }
    
    _setTheme(initialTheme);
    setCustomColors(initialCustomColors);
    applyThemeToDom(initialTheme);
    setThemeKey(prev => prev + 1);
    setLoading(false);
  }, []);

  const setTheme = (themeName: string) => {
    let newTheme: Theme;
    if (themeName.toLowerCase() === 'custom') {
      newTheme = {
          name: 'Custom',
          colors: customColors
      };
      localStorage.setItem('theme', 'custom');
    } else {
      newTheme = THEMES.find(t => t.name.toLowerCase() === themeName.toLowerCase()) || THEMES[0];
      localStorage.setItem('theme', newTheme.name.toLowerCase());
      localStorage.removeItem('custom-primary');
      localStorage.removeItem('custom-accent');
    }
     _setTheme(newTheme);
     applyThemeToDom(newTheme);
     setThemeKey(prev => prev + 1);
  };
  
  const setCustomColor = (colorType: 'primary' | 'accent', color: { h: number, s: number, l: number}) => {
    const newColor: HSLColor = { h: color.h, s: color.s * 100, l: color.l * 100 };
    const newCustomColors = { ...customColors, [colorType]: newColor };
    setCustomColors(newCustomColors);
    localStorage.setItem('custom-primary', JSON.stringify(newCustomColors.primary));
    localStorage.setItem('custom-accent', JSON.stringify(newCustomColors.accent));
    
    const customTheme = { name: 'Custom', colors: newCustomColors };
    _setTheme(customTheme);
    localStorage.setItem('theme', 'custom');
    applyThemeToDom(customTheme);
    setThemeKey(prev => prev + 1);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColor, loading }}>
       <AnimatePresence mode="wait">
            <motion.div
                key={themeKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
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
