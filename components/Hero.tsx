'use client';

import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className='mt-20 mb-20'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative  z-10">
        <motion.div 
          className="flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Profile Image Left */}
          <Image
            src="/asset/dravit_photo.jpeg"
            alt="Dravit V"
            width={220}
            height={220}
            priority
            className="rounded-full border-4 border-white shadow-md"
          />

          {/* Text Content */}
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white dark:text-white light:text-blue-900 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-blue-600 dark:text-purple-400">Dravit V</span> — AI Engineer & Full-Stack Developer
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-blue-700 dark:text-gray-300 mb-8 max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI Engineer with strong full-stack development and deployment skills, experienced in building 
              GenAI apps, chatbots, and scalable APIs using FastAPI, LangChain, React, and Azure.
              Lead generative AI developer | Built Multiple GenAI Applications | Vibe Coder
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 text-blue-700 dark:text-gray-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <span className="text-blue-600 dark:text-purple-400">📍</span>
                Chennai
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 dark:text-purple-400">📧</span>
                dravit162@gmail.com
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 dark:text-purple-400">🌐</span>
                Remote Available
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={scrollToAbout}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Learn More About Me
              </button>
              <div className="flex gap-4">
                <a
                  href="https://github.com/codebydravit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-200 hover:bg-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-900 dark:text-white rounded-lg transition-colors duration-300"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/dravit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-200 hover:bg-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-900 dark:text-white rounded-lg transition-colors duration-300"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:dravit162@gmail.com"
                  className="p-3 bg-blue-200 hover:bg-blue-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-blue-900 dark:text-white rounded-lg transition-colors duration-300"
                >
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue-600/60 hover:text-blue-900 dark:text-white/60 dark:hover:text-white transition-colors duration-300"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown size={32} />
      </motion.button>
      </div>
    </section>
  );
}