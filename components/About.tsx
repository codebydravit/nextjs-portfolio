'use client';

import { motion } from 'framer-motion';
import { User, Code, Coffee, Zap } from 'lucide-react';

export default function About() {
  const highlights = [
    { icon: Code, title: 'AI/ML Systems', description: 'Building RAG-based systems and intelligent chatbots' },
    { icon: Zap, title: 'Scalable APIs', description: 'Expert in FastAPI backends with Azure deployment' },
    { icon: Coffee, title: 'Full-Stack Skills', description: 'React frontends integrated with AI-powered backends' },
    { icon: User, title: 'Deployment Expertise', description: 'Production-ready deployments on Azure infrastructure' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50 dark:bg-slate-800/50 light:bg-blue-50/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white light:text-blue-900 mb-6">
            About <span className="text-purple-400 dark:text-purple-400 light:text-blue-600">Me</span>
          </h2>
          <div className="w-20 h-1 bg-purple-400 dark:bg-purple-400 light:bg-blue-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-1 rounded-2xl">
              <div className="bg-slate-900 dark:bg-slate-900 light:bg-white p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-white dark:text-white light:text-blue-900 mb-4">Hello There!</h3>
                <p className="text-gray-300 dark:text-gray-300 light:text-blue-700 mb-6 leading-relaxed">
                  I'm an AI Engineer with strong full-stack development and deployment skills. I specialize in 
                  building GenAI applications, intelligent chatbots, and scalable APIs that solve real-world problems. 
                  My expertise spans the entire development lifecycle from AI model integration to production deployment.
                </p>
                <p className="text-gray-300 dark:text-gray-300 light:text-blue-700 mb-6 leading-relaxed">
                  I excel at combining AI technologies like LangChain and OpenAI with robust full-stack solutions 
                  using FastAPI, React, and Azure. My experience includes building enterprise-grade chatbots, 
                  RAG-based systems, and deploying scalable applications in production environments.
                </p>
                <p className="text-gray-300 dark:text-gray-300 light:text-blue-700 mb-6 leading-relaxed">
                  My journey into AI engineering began with a fascination for solving complex problems through 
                  intelligent automation. I believe in building technology that not only works but makes a 
                  meaningful impact. Every project I work on is driven by the goal of creating solutions that 
                  are both technically excellent and genuinely useful for real-world applications.
                </p>
                <p className="text-gray-300 dark:text-gray-300 light:text-blue-700 leading-relaxed">
                  I'm passionate about bridging the gap between cutting-edge AI capabilities and practical, 
                  deployable solutions. Currently seeking opportunities where I can leverage my full-stack AI 
                  engineering skills to build innovative GenAI applications and scalable systems.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 p-6 rounded-xl border border-slate-700 dark:border-slate-700 light:border-blue-200 hover:border-purple-500 dark:hover:border-purple-500 light:hover:border-blue-400 transition-colors duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-purple-600 dark:bg-purple-600 light:bg-blue-600 rounded-lg mr-3">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-white dark:text-white light:text-blue-900">{item.title}</h4>
                </div>
                <p className="text-gray-300 dark:text-gray-300 light:text-blue-700 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}