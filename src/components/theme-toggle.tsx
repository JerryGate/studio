
'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/theme-context';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      className="relative overflow-hidden"
    >
      <motion.div
        animate={{ y: mode === 'light' ? 0 : -30, rotate: mode === 'light' ? 0 : -90 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
      <motion.div
        animate={{ y: mode === 'dark' ? 0 : 30, rotate: mode === 'dark' ? 0 : 90 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="absolute"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </motion.div>
    </Button>
  );
}
