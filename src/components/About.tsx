'use client';

import React from 'react';
import { User, Code2, Rocket, Heart } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import TiltedCard from './TiltedCard';
import BorderBeam from './BorderBeam';

const About: React.FC = () => {
  // ... same cards array ...
  const cards = [
    {
      icon: <User className="w-6 h-6 text-accent-blue" />,
      title: 'Experience',
      description: '1+ year building production web apps across frontend and backend.',
    },
    {
      icon: <Code2 className="w-6 h-6 text-accent-purple" />,
      title: 'Full-Stack',
      description: 'React, Next.js, Express.js, REST APIs, and database integration.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-accent-blue" />,
      title: 'Production',
      description: 'Authentication, role-based authorization, and real deployments.',
    },
    {
      icon: <Heart className="w-6 h-6 text-accent-purple" />,
      title: 'Design',
      description: 'Passionate about creating stunning and accessible user interfaces.',
    },
  ];

  return (
    <section id="about" className="py-24 container">
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* ... About content ... */}
        <div className="lg:w-1/2">
          <h2 className="text-accent-blue font-mono tracking-widest uppercase mb-4">About Me</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">
            I Craft Digital <br />
            <span className="text-gradient">Experiences</span>
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Developer with 1+ year of professional experience building web applications using React.js, Next.js,
            JavaScript, and Tailwind CSS. Experienced in responsive web development, full-stack applications, REST APIs,
            CMS-driven websites, authentication, database integration, and production deployments.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            I love pushing the boundaries of web development by integrating physics, 3D elements, and smooth animations
            to create memorable user interactions — while collaborating closely with cross-functional teams on both
            frontend and backend solutions.
          </p>
        </div>

        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <TiltedCard key={index} intensity={20}>
              <SpotlightCard 
                className="glass-card p-8 rounded-3xl group transition-all duration-300 relative h-full"
                spotlightColor={index % 2 === 0 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(168, 85, 247, 0.15)'}
              >
                <BorderBeam size={150} duration={10} delay={index} borderRadius={24} />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{card.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                </div>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
