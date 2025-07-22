
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const isServer = typeof window === 'undefined';

const DEFAULT_THEME = {
    primary: '226, 66%, 32%',
    accent: '145, 63%, 42%',
    background: '210, 20%, 98%',
};

// These are the base HSL values that don't change with the theme picker
const BASE_HSL_VARS = {
    '--foreground': '222 47% 11%',
    '--card': '0 0% 100%',
    '--card-foreground': '222 47% 11%',
    '--popover': '0 0% 100%',
    '--popover-foreground': '222 47% 11%',
    '--primary-foreground': '0 0% 100%',
    '--secondary': '220 13% 91%',
    '--secondary-foreground': '222 47% 11%',
    '--muted': '220 9% 96%',
    '--muted-foreground': '220 9% 45%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '220 13% 91%',
    '--input': '220 13% 91%',
    '--ring': '226 66% 32%',
    '--chart-1': 'hsl(var(--primary))',
    '--chart-2': 'hsl(var(--accent))',
    '--chart-3': '197 37% 24%',
    '--chart-4': '43 74% 66%',
    '--chart-5': '27 87% 67%',
    '--radius': '0.5rem',
    '--sidebar-background': '0 0% 98%',
    '--sidebar-foreground': '240 5.3% 26.1%',
    '--sidebar-primary': '240 5.9% 10%',
    '--sidebar-primary-foreground': '0 0% 98%',
    '--sidebar-accent': '240 4.8% 95.9%',
    '--sidebar-accent-foreground': '240 5.9% 10%',
    '--sidebar-border': '220 13% 91%',
    '--sidebar-ring': '217.2 91.2% 59.8%',
};

const BASE_DARK_HSL_VARS = {
    '--foreground': '0 0% 98%',
    '--card': '222 47% 11%',
    '--card-foreground': '0 0% 98%',
    '--popover': '222 47% 11%',
    '--popover-foreground': '0 0% 98%',
    '--primary-foreground': '226 66% 32%',
    '--secondary': '220 13% 18%',
    '--secondary-foreground': '0 0% 98%',
    '--muted': '220 13% 18%',
    '--muted-foreground': '220 9% 55%',
    '--accent-foreground': '0 0% 100%',
    '--destructive': '0 62.8% 30.6%',
    '--destructive-foreground': '0 0% 98%',
    '--border': '220 13% 18%',
    '--input': '220 13% 18%',
    '--ring': '145 63% 42%',
    '--chart-1': 'hsl(var(--primary))',
    '--chart-2': 'hsl(var(--accent))',
    '--chart-3': '30 80% 55%',
    '--chart-4': '280 65% 60%',
    '--chart-5': '340 75% 55%',
    '--sidebar-background': '240 5.9% 10%',
    '--sidebar-foreground': '240 4.8% 95.9%',
    '--sidebar-primary': '224.3 76.3% 48%',
    '--sidebar-primary-foreground': '0 0% 100%',
    '--sidebar-accent': '240 3.7% 15.9%',
    '--sidebar-accent-foreground': '240 4.8% 95.9%',
    '--sidebar-border': '240 3.7% 15.9%',
    '--sidebar-ring': '217.2 91.2% 59.8%',
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

    const baseVars = mode === 'light' ? BASE_HSL_VARS : BASE_DARK_HSL_VARS;
    
    // Set base variables first
    Object.entries(baseVars).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Then override with theme-specific colors
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--accent', theme.accent);

    if (mode === 'light') {
        root.style.setProperty('--background', theme.background);
    } else {
        // In dark mode, we use a fixed dark background but can adjust primary/accent
        root.style.setProperty('--background', BASE_DARK_HSL_VARS['--background']);
    }
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
