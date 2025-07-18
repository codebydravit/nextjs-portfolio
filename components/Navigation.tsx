'use client';

import { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface NavigationProps {
  activeSection: string;
}

export default function Navigation({ activeSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // delay for animation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-50/90 dark:bg-slate-900/80 backdrop-blur-md border-b border-blue-200 dark:border-slate-700 overflow-x-hidden transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-blue-900 dark:text-white whitespace-nowrap">
            <span className="text-blue-600 dark:text-purple-400">D</span>ravit V
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ThemeToggle />
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-blue-600 dark:text-purple-400'
                    : 'text-blue-700 hover:text-blue-900 dark:text-gray-300 dark:hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a
              href="/resume-download/Dravit_1Year_Experience_AI_Developer_Resume.pdf"
              download
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl whitespace-nowrap font-semibold"
            >
              <Download size={16} />
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-blue-900 dark:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full overflow-hidden md:hidden bg-blue-100 dark:bg-slate-800 border-t border-blue-200 dark:border-slate-700"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <div className="px-3 py-2">
                  <ThemeToggle />
                </div>
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                      activeSection === item.id
                        ? 'text-blue-600 bg-blue-200 dark:text-purple-400 dark:bg-slate-700'
                        : 'text-blue-700 hover:text-blue-900 hover:bg-blue-200 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <a
                  href="/resume-download/Dravit_1Year_Experience_AI_Developer_Resume.pdf"
                  download
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-3 py-2 rounded-md transition-colors duration-300 shadow-lg font-semibold"
                >
                  <Download size={16} />
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
