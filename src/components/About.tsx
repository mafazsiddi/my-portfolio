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
      description: 'Years of building complex web apps with modern technologies.',
    },
    {
      icon: <Code2 className="w-6 h-6 text-accent-purple" />,
      title: 'Tech Stack',
      description: 'Expertise in React, Next.js, TypeScript, and Tailwind CSS.',
    },
    {
      icon: <Rocket className="w-6 h-6 text-accent-blue" />,
      title: 'Performance',
      description: 'Focus on optimized, scalable, and high-performance code.',
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
            Frontend Developer with experience building production-grade responsive web applications using JavaScript, 
            React, Next.js, and Tailwind CSS. Strong focus on performance, scalability, and clean UI architecture.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            I love pushing the boundaries of web development by integrating physics, 3D elements, and smooth animations 
            to create memorable user interactions.
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
