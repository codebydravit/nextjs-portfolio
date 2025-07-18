'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Code } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'SQL Analytics Chatbot',
      description: 'Enterprise GenAI chatbot for querying SQL databases using LLMs. Built LLM-prompt-to-SQL pipeline with LangChain and schema understanding. Features GeoMap generation using Folium + Pandas, hosted on Azure VM with cost tracking and moderation.',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['LangChain', 'OpenAI', 'MS SQL Server', 'FastAPI', 'Azure VM', 'Folium', 'Pandas'],
      categories: ['AI', 'Backend', 'Database'],
      github: 'https://github.com/dravitv/sql-analytics-chatbot',
      live: '#',
      period: 'May 2024 – Present',
      responsibilities: [
        'Engineered LLM-to-SQL pipeline with full-stack FastAPI backend',
        'Built React frontend with real-time query visualization',
        'Deployed scalable solution on Azure with automated CI/CD',
        'Implemented cost optimization and production monitoring'
      ]
    },
    {
      title: 'AI Sales WhatsApp + Web Chatbot CRM',
      description: 'Voice + Text AI chatbot integrated with Meta API and RAG for customer support. Handles PDF, .txt, .md ingestion with RAG vector indexing. Features multilingual speech capabilities using 11 Labs + Google Translate API.',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Meta API', 'RAG', 'Vector DB', '11 Labs', 'Google Translate', 'React', 'FastAPI'],
      categories: ['AI', 'React', 'Backend'],
      github: 'https://github.com/dravitv/ipposales-chatbot',
      live: '#',
      period: 'Nov 2024 – June 2025',
      responsibilities: [
        'Built full-stack WhatsApp integration with Meta API and FastAPI',
        'Engineered RAG system with vector database and document processing',
        'Developed React web interface with real-time chat capabilities',
        'Deployed multilingual AI features with Azure infrastructure'
      ]
    },
    {
      title: 'RAG-Based Document Assistant',
      description: 'Intelligent document processing system using RAG architecture for enterprise knowledge management. Features advanced vector search, semantic understanding, and multi-format document support.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['RAG', 'LangChain', 'Pinecone', 'OpenAI', 'FastAPI', 'Streamlit'],
      categories: ['AI', 'Backend'],
      github: 'https://github.com/dravitv/rag-document-assistant',
      live: '#',
      period: 'Aug 2024 – Oct 2024',
      responsibilities: [
        'Designed RAG architecture for document processing',
        'Implemented vector search with Pinecone',
        'Built semantic understanding pipeline',
        'Created Streamlit interface for user interaction'
      ]
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      description: 'Enterprise analytics dashboard with AI-driven insights and natural language querying. Built with modern web technologies and integrated with multiple data sources for comprehensive business intelligence.',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'FastAPI', 'OpenAI', 'Chart.js', 'PostgreSQL', 'Azure'],
      categories: ['React', 'AI', 'Backend'],
      github: 'https://github.com/dravitv/ai-analytics-dashboard',
      live: '#',
      period: 'Jun 2024 – Aug 2024',
      responsibilities: [
        'Built AI-powered natural language querying',
        'Integrated multiple data sources',
        'Created interactive visualization components',
        'Deployed scalable backend on Azure'
      ]
    },
  ];

  const filterCategories = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'AI', label: 'AI/ML', count: projects.filter(p => p.categories.includes('AI')).length },
    { id: 'React', label: 'React', count: projects.filter(p => p.categories.includes('React')).length },
    { id: 'Backend', label: 'Backend', count: projects.filter(p => p.categories.includes('Backend')).length },
    { id: 'Database', label: 'Database', count: projects.filter(p => p.categories.includes('Database')).length },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="py-20 bg-blue-50/80 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 dark:text-white mb-6">
            Featured <span className="text-blue-600 dark:text-purple-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-purple-400 mx-auto"></div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category.id
                  ? 'bg-blue-600 dark:bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-blue-200 dark:bg-slate-800 text-blue-700 dark:text-gray-300 hover:bg-blue-300 hover:text-blue-900 dark:hover:bg-slate-700 dark:hover:text-white border border-blue-300 dark:border-slate-600'
              }`}
            >
              {category.label}
              <span className={`text-xs px-2 py-1 rounded-full ${
                activeFilter === category.id ? 'bg-blue-700 dark:bg-purple-700' : 'bg-blue-300 dark:bg-slate-700'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/90 dark:bg-slate-900/50 rounded-xl overflow-hidden border border-blue-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-purple-500 transition-all duration-300 group"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                
                {/* Hover Preview */}
                {hoveredProject === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-black/80 flex items-center justify-center p-6"
                  >
                    <div className="text-center text-white">
                      <h4 className="text-lg font-semibold mb-2">Quick Preview</h4>
                      <p className="text-sm text-gray-200 mb-4">
                        {project.description.substring(0, 120)}...
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-600 dark:bg-purple-600 text-white px-2 py-1 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="bg-slate-600 text-white px-2 py-1 rounded-full text-xs">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-blue-900 dark:text-white mb-3">{project.title}</h3>
                {false && // This completely removes it from the DOM.
                <div className="text-blue-600 dark:text-purple-400 text-sm mb-2">{project.period}</div>}
                <p className="text-blue-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                
                {project.responsibilities && (
                  <div className="mb-4">
                    <h4 className="text-blue-900 dark:text-white font-medium text-sm mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {project.responsibilities.map((responsibility, idx) => (
                        <li key={idx} className="text-blue-700 dark:text-gray-300 text-xs flex items-start">
                          <span className="text-blue-600 dark:text-purple-400 mr-2">•</span>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {false &&
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    <Github size={16} />
                    Code
                  </a>
                  {false && 
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                  }
                </div>
                }
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/codebydravit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <Code size={20} />
            View More Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
}