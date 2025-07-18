'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('technical');

  const skillCategories = [
    {
      id: 'ai',
      title: '🤖 GenAI',
      skills: [
        { name: 'OpenAI', level: 90 },
        { name: 'LangChain', level: 85 },
        { name: 'RAG Systems', level: 80 },
        { name: 'Prompt Engineering', level: 90 },
        { name: 'Vector DBs', level: 75 },
      ],
    },
    {
      id: 'backend',
      title: '⚙️ Backend',
      skills: [
        { name: 'FastAPI', level: 90 },
        { name: 'Python', level: 85 },
        { name: 'REST API', level: 80 },
      ],
    },
    {
      id: 'database',
      title: '🧱 RDBMS',
      skills: [
      { name: 'MS SQL Server', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MariaDB', level: 70 },

      ],
    },

    {
      id: 'devops',
      title: '📡 DevOps / Infra',
      skills: [
        { name: 'SSH', level: 80 },
        { name: 'Azure', level: 75 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Linux', level: 75 },
      ],
    },
     {
      id: 'frontend',
      title: '🧩 Frontend',
      skills: [
      { name: 'Next.js', level: 80 },
      { name: 'React.js', level: 80 }, 
      { name: 'HTML/CSS/JS', level: 75 },
      { name: 'UI/UX', level: 70 },
      { name: 'WordPress', level: 70 },
      ],
    },
  ];

  const softSkills = [
    { name: 'Problem Solving', level: 95 },
    { name: 'Team Collaboration', level: 90 },
    { name: 'Project Management', level: 85 },
    { name: 'Communication', level: 88 },
    { name: 'Adaptability', level: 92 },
    { name: 'Critical Thinking', level: 90 },
  ];

  const categories = [
    { id: 'technical', label: 'Technical Skills', icon: '💻' },
    { id: 'soft', label: 'Soft Skills', icon: '🤝' },
  ];

  const technologies = [
  // AI / ML / GenAI
  'OpenAI', 'LangChain', 'LLM', 'GenAI', 'RAG', 'Prompt Engineering', 'AI', 'Ollama', 'Chatbots',
  // Vector Databases
  'VectorDB',
  // Backend / API
  'FastAPI', 'Python', 'Postman', 'REST API', 'Docker',
  // Databases
  'RDBMS',
  // Frontend
  'React.js', 'Next.js','WordPress',
  'Meta for Developers',
  'Microsoft',
  // DevOps / Infra
  'Azure', 'Linux ', 'Git & GitHub',
  // Soft Skills
  'Problem Solving', 'Leadership & Collaboration',
];


  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-white light:text-blue-900 mb-6">
            Skills & <span className="text-purple-400 dark:text-purple-400 light:text-blue-600">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-purple-400 dark:bg-purple-400 light:bg-blue-600 mx-auto"></div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="flex bg-slate-800/50 dark:bg-slate-800/50 light:bg-blue-100/80 rounded-xl p-2 border border-slate-700 dark:border-slate-700 light:border-blue-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-purple-600 dark:bg-purple-600 light:bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-700 light:text-blue-700 light:hover:text-blue-900 light:hover:bg-blue-200'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Technical Skills */}
        {activeCategory === 'technical' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 p-6 rounded-xl border border-slate-700 dark:border-slate-700 light:border-blue-200"
              >
                <h3 className="text-xl font-semibold text-white dark:text-white light:text-blue-900 mb-6">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-300 dark:text-gray-300 light:text-blue-700">{skill.name}</span>
                        <span className="text-purple-400 dark:text-purple-400 light:text-blue-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 dark:bg-slate-700 light:bg-blue-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-500 dark:to-blue-500 light:from-blue-500 light:to-blue-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Soft Skills */}
        {activeCategory === 'soft' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2 lg:col-span-3 bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 p-8 rounded-xl border border-slate-700 dark:border-slate-700 light:border-blue-200"
            >
              <h3 className="text-2xl font-semibold text-white dark:text-white light:text-blue-900 mb-8 text-center">🤝 Soft Skills</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {softSkills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 dark:text-gray-300 light:text-blue-700">{skill.name}</span>
                      <span className="text-purple-400 dark:text-purple-400 light:text-blue-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 dark:bg-slate-700 light:bg-blue-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-500 dark:to-blue-500 light:from-blue-500 light:to-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Technology Tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold text-white dark:text-white light:text-blue-900 mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-slate-800 dark:bg-slate-800 light:bg-blue-200 text-white dark:text-white light:text-blue-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-600 dark:hover:bg-purple-600 light:hover:bg-blue-400 light:hover:text-white transition-colors duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}