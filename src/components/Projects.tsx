'use client';

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import TiltedCard from './TiltedCard';
import BorderBeam from './BorderBeam';

const Projects: React.FC = () => {
  const projects = [
    // ... same projects array ...
    {
      title: 'HomePro',
      category: 'Real Estate',
      description: 'A modern property listing and home search experience with clean UI and responsive design.',
      tags: ['React', 'Next.js', 'Vercel'],
      github: 'https://github.com/mafazsiddi/HomePro',
      demo: 'https://home-pro-six.vercel.app/',
    },
    {
      title: 'Smart Parking System',
      category: 'Web App',
      description: 'Responsive frontend for real-time parking availability tracking and management.',
      tags: ['Next.js', 'Firebase', 'Maps'],
      github: 'https://github.com/Mohammed-Mafaz/Parking_System',
      demo: '#',
    },
    {
      title: 'AI Heart Health Chatbot',
      category: 'AI / Machine Learning',
      description: 'NLP chatbot using Python and Scikit-learn for basic heart health assessment.',
      tags: ['Python', 'NLTK', 'React'],
      github: 'https://github.com/mafazsiddi/AI-chatbot-for-heart-disease',
      demo: '#',
    },
    {
      title: '3D Exotic Bikes Simulation',
      category: 'Computer Graphics',
      description: 'OpenGL-based interactive 3D simulation of premium motorcycles with custom physics.',
      tags: ['OpenGL', 'C++', 'GLFW'],
      github: 'https://github.com/mafazsiddi/3D-Exotic-Bike',
      demo: '#',
    },
    {
      title: 'Plant AI Scanner',
      category: 'AI / Machine Learning',
      description: 'AI-powered web application for plant identification with real-time image-based analysis.',
      tags: ['React.js', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/mafazsiddi/Lumina',
      demo: 'https://lumina-zeta-opal.vercel.app/',
    },
    {
      title: 'Fyne Green',
      category: 'Eco Web App',
      description: 'Sustainable design-focused web experience highlighting eco-friendly practices and resources.',
      tags: ['Next.js', 'Vercel', 'Responsive'],
      github: 'https://github.com/mafazsiddi/Fyne-Green',
      demo: 'https://fyne-green-weld.vercel.app/',
    },
    {
      title: 'Mira',
      category: 'Full-Stack',
      description: 'End-to-end client platform built for ClearTax with REST APIs, role-based authorization, and passwordless OTP authentication.',
      tags: ['React', 'Vite', 'Express.js', 'PostgreSQL', 'Drizzle ORM'],
      github: 'https://github.com/mafazsiddi/cleartax-pipeline',
      demo: 'https://cleartax-pipeline.vercel.app/',
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 container">
      <div className="mb-12 md:mb-20">
        <h2 className="text-accent-blue font-mono tracking-[0.2em] md:tracking-widest uppercase mb-4 text-[10px] md:text-sm">Portfolio</h2>
        <h3 className="text-4xl md:text-7xl font-bold tracking-tight">Featured <span className="text-gradient">Projects</span></h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        {projects.map((project, index) => (
          <TiltedCard key={index} intensity={15} containerClassName="h-full">
            <div className="glass-card p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] h-full flex flex-col justify-between relative">
              <BorderBeam size={200} duration={12} delay={index * 2} borderRadius={32} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-accent-purple font-mono text-[10px] tracking-widest uppercase">
                    {project.category}
                  </span>
                  <div className="flex gap-4">
                    {project.github !== '#' && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                        title="View Source Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo !== '#' && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <h4 className="text-2xl md:text-4xl font-bold mb-4 group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-400 text-sm md:text-lg mb-8 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3 relative z-10">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-medium text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </TiltedCard>
        ))}
      </div>
    </section>
  );
};

export default Projects;
