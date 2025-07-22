
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME = {
    primary: '211, 90%, 53%',
    accent: '145, 58%, 59%',
    background: '0, 0%, 100%',
};

const HSL_VARS = {
    '--background': '0 0% 100%',
    '--foreground': '222 47% 11%',
    '--card': '0 0% 100%',
    '--card-foreground': '222 47% 11%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '222 47% 11%',
    '--primary': '211 90% 53%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '210 40% 96.1%',
    '--secondary-foreground': '222 47% 11%',
    '--muted': '210 40% 96.1%',
    '--muted-foreground': '220 9% 45%',
    '--accent': '145 58% 59%',
    '--accent-foreground': '222 47% 11%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '214 32% 91%',
    '--input': '214 32% 91%',
    '--ring': '211 90% 53%',
};

const DARK_HSL_VARS = {
    '--background': '222 47% 11%',
    '--foreground': '0 0% 98%',
    '--card': '222 47% 11%',
    '--card-foreground': '0 0% 98%',
    '--popover': '222 47% 11%',
    '--popover-foreground': '0 0% 98%',
    '--primary': '211 90% 63%',
    '--primary-foreground': '222 47% 11%',
    '--secondary': '220 13% 18%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '220 13% 18%',
    '--muted-foreground': '220 9% 55%',
    '--accent': '145 58% 69%',
    '--accent-foreground': '222 47% 11%',
    '--destructive': '0 62.8% 30.6%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '220 13% 18%',
    '--input': '220 13% 18%',
    '--ring': '211 90% 63%',
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

    const baseVars = mode === 'light' ? HSL_VARS : DARK_HSL_VARS;
    
    const newVars = {
        ...baseVars,
        '--primary': theme.primary,
        '--accent': theme.accent,
    };

    if (mode === 'light') {
        newVars['--background'] = theme.background;
    }

    Object.keys(newVars).forEach(property => {
        root.style.setProperty(property, newVars[property]);
    });
}


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
        applyTheme(theme, mode);
        localStorage.setItem('website-theme', JSON.stringify(theme));
    }
  }, [theme, mode]);

   useEffect(() => {
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
