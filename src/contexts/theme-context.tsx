
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME = {
    primary: '226, 66%, 32%',
    accent: '145, 63%, 42%',
    background: '210, 20%, 98%',
};

const HSL_VARS = {
    '--background': '210 20% 98%',
    '--foreground': '222 47% 11%',
    '--card': '0 0% 100%',
    '--card-foreground': '222 47% 11%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '222 47% 11%',
    '--primary': '226 66% 32%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '220 13% 91%',
    '--secondary-foreground': '222 47% 11%',
    '--muted': '220 9% 96%',
    '--muted-foreground': '220 9% 45%',
    '--accent': '145 63% 42%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '220 13% 91%',
    '--input': '220 13% 91%',
    '--ring': '226 66% 32%',
};

const DARK_HSL_VARS = {
    '--background': '222 47% 11%',
    '--foreground': '0 0% 98%',
    '--card': '222 47% 11%',
    '--card-foreground': '0 0% 98%',
    '--popover': '222 47% 11%',
    '--popover-foreground': '0 0% 98%',
    '--primary': '0 0% 98%',
    '--primary-foreground': '226 66% 32%',
    '--secondary': '220 13% 18%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '220 13% 18%',
    '--muted-foreground': '220 9% 55%',
    '--accent': '145 63% 42%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 62.8% 30.6%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '220 13% 18%',
    '--input': '220 13% 18%',
    '--ring': '145 63% 42%',
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

const applyTheme = (theme: Theme, mode: ThemeMode) => {
    const root = document.documentElement;

    const applyColors = (vars: Record<string, string>) => {
        Object.keys(vars).forEach(property => {
            root.style.setProperty(property, vars[property]);
        });
    };

    if (mode === 'light') {
        applyColors({
            ...HSL_VARS,
            '--primary': theme.primary,
            '--accent': theme.accent,
            '--background': theme.background,
            '--ring': theme.primary,
        });
    } else {
        const bgHsl = theme.background.split(',').map(s => parseFloat(s));
        const invertedBg = `${bgHsl[0]}, ${bgHsl[1]}%, ${100 - bgHsl[2]}%`;

        applyColors({
            ...DARK_HSL_VARS,
            '--primary': theme.accent,
            '--primary-foreground': '0, 0%, 100%',
            '--accent': theme.primary,
            '--accent-foreground': '0, 0%, 100%',
            '--background': invertedBg,
            '--foreground': `0, 0%, 98%`,
            '--card': invertedBg,
            '--card-foreground': `0, 0%, 98%`,
            '--popover': invertedBg,
            '--popover-foreground': `0, 0%, 98%`,
            '--ring': theme.accent,
        });
    }
}


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (isServer) return DEFAULT_THEME;
    const savedTheme = localStorage.getItem('website-theme');
    return savedTheme ? JSON.parse(savedTheme) : DEFAULT_THEME;
  });

  const [mode, setMode] = useState<ThemeMode>(() => {
      if (isServer) return 'light';
      const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
      return savedMode || 'light';
  });

  useEffect(() => {
    if (!isServer) {
        applyTheme(theme, mode);
        localStorage.setItem('website-theme', JSON.stringify(theme));
    }
  }, [theme, mode]);

   useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
