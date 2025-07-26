
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { THEMES, Theme } from '@/lib/themes';
import { motion, AnimatePresence } from 'framer-motion';

interface HSLColor {
  h: number;
  s: number;
  l: number;
}
interface ThemeContextType {
  theme: Theme;
  setTheme: (themeName: string) => void;
  customColors: {
    primary: HSLColor;
    accent: HSLColor;
  };
  setCustomColor: (colorType: 'primary' | 'accent', color: HSLColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const parseHsl = (hslString: string): HSLColor => {
    const [h, s, l] = hslString.split(' ').map(val => parseFloat(val.replace('%', '')));
    return { h, s, l };
}

const applyThemeToDom = (themeToApply: Theme, customColors: { primary: HSLColor, accent: HSLColor }) => {
    const root = document.documentElement;
    const colors = themeToApply.name.toLowerCase() === 'custom'
      ? {
          primary: `${customColors.primary.h} ${customColors.primary.s}% ${customColors.primary.l}%`,
          accent: `${customColors.accent.h} ${customColors.accent.s}% ${customColors.accent.l}%`,
        }
      : themeToApply.colors;

    const primaryHsl = parseHsl(colors.primary);
    const accentHsl = parseHsl(colors.accent);

    root.style.setProperty('--primary-hue', String(primaryHsl.h));
    root.style.setProperty('--primary-saturation', `${primaryHsl.s}%`);
    root.style.setProperty('--primary-lightness', `${primaryHsl.l}%`);
    root.style.setProperty('--ring-hue', String(primaryHsl.h));
    root.style.setProperty('--ring-saturation', `${primaryHsl.s}%`);
    root.style.setProperty('--ring-lightness', `${primaryHsl.l}%`);

    root.style.setProperty('--accent-hue', String(accentHsl.h));
    root.style.setProperty('--accent-saturation', `${accentHsl.s}%`);
    root.style.setProperty('--accent-lightness', `${accentHsl.l}%`);
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, _setTheme] = useState<Theme>(THEMES[0]);
  const [themeKey, setThemeKey] = useState(0);
  const [customColors, setCustomColors] = useState<{primary: HSLColor, accent: HSLColor}>({
    primary: parseHsl(THEMES[0].colors.primary),
    accent: parseHsl(THEMES[0].colors.accent),
  });

  useEffect(() => {
    const savedThemeName = localStorage.getItem('theme') || THEMES[0].name.toLowerCase();
    const savedCustomPrimary = localStorage.getItem('custom-primary');
    const savedCustomAccent = localStorage.getItem('custom-accent');

    if (savedThemeName === 'custom' && savedCustomPrimary && savedCustomAccent) {
      try {
        const primary = JSON.parse(savedCustomPrimary);
        const accent = JSON.parse(savedCustomAccent);
        const customTheme = { name: 'Custom', colors: { primary: `${primary.h} ${primary.s}% ${primary.l}%`, accent: `${accent.h} ${accent.s}% ${accent.l}%` } };
        _setTheme(customTheme);
        setCustomColors({ primary, accent });
        applyThemeToDom(customTheme, { primary, accent });
      } catch (e) {
        _setTheme(THEMES[0]);
        applyThemeToDom(THEMES[0], customColors);
      }
    } else {
      const savedTheme = THEMES.find(t => t.name.toLowerCase() === savedThemeName) || THEMES[0];
      _setTheme(savedTheme);
      applyThemeToDom(savedTheme, customColors);
    }
    setThemeKey(prev => prev + 1);
  }, []);

  const setTheme = (themeName: string) => {
    let newTheme: Theme;
    if (themeName === 'custom') {
      newTheme = {
          name: 'Custom',
          colors: {
              primary: `${customColors.primary.h} ${customColors.primary.s}% ${customColors.primary.l}%`,
              accent: `${customColors.accent.h} ${customColors.accent.s}% ${customColors.accent.l}%`,
          }
      };
      localStorage.setItem('theme', 'custom');
    } else {
      newTheme = THEMES.find(t => t.name.toLowerCase() === themeName.toLowerCase()) || THEMES[0];
      localStorage.setItem('theme', newTheme.name.toLowerCase());
      localStorage.removeItem('custom-primary');
      localStorage.removeItem('custom-accent');
    }
     _setTheme(newTheme);
     applyThemeToDom(newTheme, newTheme.name.toLowerCase() === 'custom' ? customColors : { primary: parseHsl(newTheme.colors.primary), accent: parseHsl(newTheme.colors.accent) });
     setThemeKey(prev => prev + 1);
  };
  
  const setCustomColor = (colorType: 'primary' | 'accent', color: HSLColor) => {
    const newCustomColors = { ...customColors, [colorType]: color };
    setCustomColors(newCustomColors);
    localStorage.setItem('custom-primary', JSON.stringify(newCustomColors.primary));
    localStorage.setItem('custom-accent', JSON.stringify(newCustomColors.accent));
    
    const customTheme = { name: 'Custom', colors: { primary: `${newCustomColors.primary.h} ${newCustomColors.primary.s}% ${newCustomColors.primary.l}%`, accent: `${newCustomColors.accent.h} ${newCustomColors.accent.s}% ${newCustomColors.accent.l}%` } };
    _setTheme(customTheme);
    localStorage.setItem('theme', 'custom');
    applyThemeToDom(customTheme, newCustomColors);
    setThemeKey(prev => prev + 1);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColor }}>
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
