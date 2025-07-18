'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="p-2 rounded-lg bg-slate-800 dark:bg-slate-800 light:bg-blue-200 w-10 h-10 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 light:bg-blue-200 light:hover:bg-blue-300 text-white dark:text-white light:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun size={20} className="transition-transform duration-300 rotate-0 hover:rotate-12" />
      ) : (
        <Moon size={20} className="transition-transform duration-300 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
}