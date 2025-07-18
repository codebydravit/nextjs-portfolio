'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      title: 'AI Engineer',
      // title: 'AI Developer',
      company: 'Zgrow Solutions Private Limited',
      location: 'Remote • Chennai • Full-time',
      period: 'June 2024 - Present',
      description: 'Leading AI engineering initiatives with strong focus on full-stack development and deployment. Building GenAI applications, intelligent chatbots, and scalable APIs using FastAPI, LangChain, React, and Azure.',
      achievements: [
        'Engineered 2+ production GenAI applications with full-stack architecture',
        'Built and deployed scalable FastAPI backends handling 1K+ daily requests',
        'Developed React frontends integrated with AI-powered chatbot systems',
        'Managed end-to-end Azure deployments with cost optimization strategies'
      ],
      logo: '/logos/zgrow.png',
    },
    {
      title: 'AI Developer Intern',
      company: 'Vincilium',
      location: 'Remote • Chennai • Full-time',
      period: 'Feb 2024 - Feb 2024',
      description: 'Gained comprehensive experience in AI development. Worked on GenAI applications and chatbot development best practices using modern tech stack.',
      achievements: [
        'Developed GenAI prototypes using LangChain and LLaMA APIs',
        'Built applications using Streamlit and Python',
        'Gained experience in project management',
        'Contributed to AI engineering projects'
      ],
      logo: '/logos/vincilium.png',
    },
    
    
  ];

  return (
    <section id="experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Work <span className="text-blue-600 dark:text-purple-400">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-300 dark:bg-slate-700"></div>

          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 dark:bg-purple-500 rounded-full border-4 border-blue-50 dark:border-slate-900 z-10"></div>
              {/* Logo */}
              <div className="hidden md:flex w-full md:w-6/12 flex justify-center mb-4 md:mb-0 ">
                {experience.logo && (
                  <motion.img
                    src={experience.logo}
                    alt={`${experience.company || 'Company'} logo`}
                    initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{
                      x: index % 2 === 0 ? -8 : 8,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  
                    className="w-full  max-w-[140px] h-auto object-contain"
                  />
                )}
              </div>
              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                <div className="bg-white/80 dark:bg-slate-900/50 p-6 rounded-xl border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-purple-500 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-1">{experience.title}</h3>
                      <p className="text-blue-600 dark:text-purple-400 font-medium">{experience.company}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-blue-600 dark:text-gray-400 text-sm mb-1">
                        <Calendar size={14} className="hidden md:flex mr-1" />
                        {experience.period}
                      </div>
                      <div className="hidden md:flex items-center text-gray-400 text-sm ">
                      <div className="hidden md:flex items-center text-blue-600 dark:text-gray-400 text-sm ">
                        <MapPin size={14} className="hidden md:flex mr-1" />
                        {experience.location}
                      </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-blue-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {experience.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-blue-900 dark:text-white font-medium text-sm">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="text-blue-700 dark:text-gray-300 text-sm flex items-start">
                          <span className="text-blue-600 dark:text-purple-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}