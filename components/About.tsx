'use client';

import { motion } from 'framer-motion';
import { User, Code, Coffee, Zap, Download, FileText, Award, Calendar } from 'lucide-react';

export default function About() {
  const highlights = [
    { icon: Code, title: 'AI/ML Systems', description: 'Building RAG-based systems and intelligent chatbots' },
    { icon: Zap, title: 'Scalable APIs', description: 'Expert in FastAPI backends with Azure deployment' },
    { icon: Coffee, title: 'Full-Stack Skills', description: 'React frontends integrated with AI-powered backends' },
    { icon: User, title: 'Deployment Expertise', description: 'Production-ready deployments on Azure infrastructure' },
  ];

  const stats = [
    { icon: Award, label: 'Years Experience', value: '1+' },
    { icon: Code, label: 'GenAI Projects', value: '5+' },
    { icon: Zap, label: 'APIs Deployed', value: '10+' },
    { icon: Calendar, label: 'Available', value: 'Now' },
  ];

  return (
    <section id="about" className="py-20 bg-blue-50/80 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
            About <span className="text-blue-600 dark:text-purple-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-1 rounded-2xl">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">Hello There!</h3>
                <p className="text-blue-700 dark:text-gray-300 mb-6 leading-relaxed">
                  I'm an AI Engineer with strong full-stack development and deployment skills. I specialize in 
                  building GenAI applications, intelligent chatbots, and scalable APIs that solve real-world problems. 
                  My expertise spans the entire development lifecycle from AI model integration to production deployment.
                </p>
                <p className="text-blue-700 dark:text-gray-300 mb-6 leading-relaxed">
                  I excel at combining AI technologies like LangChain and OpenAI with robust full-stack solutions 
                  using FastAPI, React, and Azure. My experience includes building enterprise-grade chatbots, 
                  RAG-based systems, and deploying scalable applications in production environments.
                </p>
                <p className="text-blue-700 dark:text-gray-300 mb-6 leading-relaxed">
                  My journey into AI engineering began with a fascination for solving complex problems through 
                  intelligent automation. I believe in building technology that not only works but makes a 
                  meaningful impact. Every project I work on is driven by the goal of creating solutions that 
                  are both technically excellent and genuinely useful for real-world applications.
                </p>
                <p className="text-blue-700 dark:text-gray-300 leading-relaxed">
                  I'm passionate about bridging the gap between cutting-edge AI capabilities and practical, 
                  deployable solutions. Currently seeking opportunities where I can leverage my full-stack AI 
                  engineering skills to build innovative GenAI applications and scalable systems.
                </p>

                {/* Resume Download Section */}
                <div className="mt-8 p-6 bg-blue-50 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-slate-700">
                  <div className="flex items-center mb-4">
                    <FileText className="text-blue-600 dark:text-purple-400 mr-3" size={24} />
                    <h4 className="text-xl font-semibold text-blue-900 dark:text-white">Professional Resume</h4>
                  </div>
                  <p className="text-blue-700 dark:text-gray-300 mb-4 text-sm">
                    Download my comprehensive resume featuring detailed experience in AI engineering, 
                    full-stack development, and production deployments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <a
                      href="/resume-download/Dravit_1Year_Experience_AI_Developer_Resume.pdf"
                      download
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      <Download size={20} />
                      Download Resume
                    </a>
                    <div className="text-blue-600 dark:text-gray-400 text-sm">
                      <span className="font-medium">PDF Format</span> • Updated December 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-slate-900/50 p-4 rounded-xl border border-blue-200 dark:border-slate-700 text-center hover:border-blue-400 dark:hover:border-purple-500 transition-colors duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-blue-600 dark:bg-purple-600 rounded-lg">
                      <stat.icon size={20} className="text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-blue-700 dark:text-gray-300 text-xs">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Highlights Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-slate-900/50 p-6 rounded-xl border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-purple-500 transition-colors duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-600 dark:bg-purple-600 rounded-lg mr-3">
                      <item.icon size={24} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-blue-900 dark:text-white">{item.title}</h4>
                  </div>
                  <p className="text-blue-700 dark:text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white"
            >
              <h4 className="text-xl font-semibold mb-3">Ready to Collaborate?</h4>
              <p className="text-blue-100 mb-4 text-sm">
                Let's discuss your AI engineering needs and how I can help build your next GenAI application.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="mailto:dravit162@gmail.com"
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                >
                  <User size={16} />
                  Email Me
                </a>
                <a
                  href="https://linkedin.com/in/dravit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
                >
                  <Code size={16} />
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Resume Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 dark:bg-slate-900/50 p-8 rounded-xl border border-blue-200 dark:border-slate-700">
            <h3 className="text-2xl font-semibold text-blue-900 dark:text-white mb-6">What You'll Find in My Resume</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg inline-block mb-4">
                  <Zap size={32} className="text-white" />
                </div>
                <h4 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">Technical Experience</h4>
                <p className="text-blue-700 dark:text-gray-300 text-sm">
                  Detailed breakdown of AI engineering projects, full-stack development, and production deployments
                </p>
              </motion.div>
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg inline-block mb-4">
                  <Code size={32} className="text-white" />
                </div>
                <h4 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">Skills & Technologies</h4>
                <p className="text-blue-700 dark:text-gray-300 text-sm">
                  Comprehensive list of AI/ML frameworks, programming languages, and deployment technologies
                </p>
              </motion.div>
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="p-3 bg-blue-600 dark:bg-purple-600 rounded-lg inline-block mb-4">
                  <Award size={32} className="text-white" />
                </div>
                <h4 className="text-lg font-semibold text-blue-900 dark:text-white mb-2">Key Achievements</h4>
                <p className="text-blue-700 dark:text-gray-300 text-sm">
                  Quantified results from GenAI applications, API performance metrics, and successful deployments
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
