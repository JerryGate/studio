
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { THEMES, Theme } from '@/lib/themes';

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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, _setTheme] = useState<Theme>(THEMES[0]); // Default to the first theme
  const [customColors, setCustomColors] = useState<{primary: HSLColor, accent: HSLColor}>({
    primary: parseHsl(THEMES[0].colors.primary),
    accent: parseHsl(THEMES[0].colors.accent),
  });

  useEffect(() => {
    const savedThemeName = localStorage.getItem('theme') || THEMES[0].name.toLowerCase();
    const savedTheme = THEMES.find(t => t.name.toLowerCase() === savedThemeName) || THEMES[0];
    const savedCustomPrimary = localStorage.getItem('custom-primary');
    const savedCustomAccent = localStorage.getItem('custom-accent');

    if (savedThemeName === 'custom' && savedCustomPrimary && savedCustomAccent) {
      const primary = JSON.parse(savedCustomPrimary);
      const accent = JSON.parse(savedCustomAccent);
      _setTheme({ name: 'Custom', colors: { primary: `${primary.h} ${primary.s}% ${primary.l}%`, accent: `${accent.h} ${accent.s}% ${accent.l}%` } });
      setCustomColors({ primary, accent });
    } else {
      _setTheme(savedTheme);
    }
  }, []);

  const setTheme = (themeName: string) => {
    if (themeName === 'custom') {
      const customTheme: Theme = {
          name: 'Custom',
          colors: {
              primary: `${customColors.primary.h} ${customColors.primary.s}% ${customColors.primary.l}%`,
              accent: `${customColors.accent.h} ${customColors.accent.s}% ${customColors.accent.l}%`,
          }
      };
      _setTheme(customTheme);
      localStorage.setItem('theme', 'custom');
      localStorage.setItem('custom-primary', JSON.stringify(customColors.primary));
      localStorage.setItem('custom-accent', JSON.stringify(customColors.accent));
    } else {
      const newTheme = THEMES.find(t => t.name.toLowerCase() === themeName.toLowerCase());
      if (newTheme) {
        _setTheme(newTheme);
        localStorage.setItem('theme', newTheme.name.toLowerCase());
      }
    }
  };
  
  const setCustomColor = (colorType: 'primary' | 'accent', color: HSLColor) => {
    setCustomColors(prev => {
        const newColors = { ...prev, [colorType]: color };
        localStorage.setItem('custom-primary', JSON.stringify(newColors.primary));
        localStorage.setItem('custom-accent', JSON.stringify(newColors.accent));
        return newColors;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.name.toLowerCase() === 'custom'
      ? {
          primary: `${customColors.primary.h} ${customColors.primary.s}% ${customColors.primary.l}%`,
          accent: `${customColors.accent.h} ${customColors.accent.s}% ${customColors.accent.l}%`,
        }
      : theme.colors;

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

  }, [theme, customColors]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColor }}>
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
