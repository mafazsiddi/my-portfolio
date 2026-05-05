'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, ChevronRight, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const experience = {
    company: 'Oro Media Lab',
    role: 'Frontend Developer',
    period: 'May 2025 – Present',
    location: 'Bengaluru, India',
    description: [
      'Building production-grade responsive web applications using React, Next.js, and Tailwind CSS.',
      'Developing reusable UI components and high-performance animations with GSAP.',
      'Working with CMS platforms like WordPress and HubSpot for scalable web solutions.',
      'Collaborating with designers to translate Figma prototypes into pixel-perfect code.',
      'Contributing to clean UI architecture and mentoring junior developers.',
    ],
    skills: ['React', 'Next.js', 'GSAP', 'TypeScript', 'Tailwind', 'PHP', 'WordPress'],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
          },
        }
      );

      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 container relative overflow-hidden">
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent-blue/10 rounded-full blur-[100px] md:blur-[120px] pointer-events-none opacity-40" 
      />

      <div className="flex flex-col items-center mb-12 md:mb-16 relative z-10">
        <h2 className="text-accent-blue font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 text-[10px] md:text-sm">Professional Journey</h2>
        <h3 className="text-4xl md:text-7xl font-bold tracking-tighter text-center">
          Work <span className="text-gradient">Experience</span>
        </h3>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div 
          ref={cardRef}
          className="glass-card p-6 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] relative border-white/10 overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent" />
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 md:mb-12">
            <div>
              <div className="flex items-center gap-2 text-accent-purple mb-3">
                <Briefcase className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-sm font-mono uppercase tracking-widest font-bold">Current Role</span>
              </div>
              <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight group-hover:text-accent-blue transition-colors duration-500">
                {experience.company}
              </h4>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-400">
                <p className="text-lg md:text-2xl font-medium text-white/80">{experience.role}</p>
                <span className="hidden sm:block w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/20" />
                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-accent-blue" />
                  {experience.location}
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-auto px-5 md:px-6 py-2.5 md:py-3 glass rounded-xl md:rounded-2xl border-accent-blue/20">
              <div className="flex items-center gap-2 text-accent-blue mb-1">
                <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Timeline</span>
              </div>
              <p className="text-sm md:text-lg font-bold font-mono whitespace-nowrap">{experience.period}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
            <div className="lg:col-span-3">
              <h5 className="text-white font-bold mb-5 md:mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-xs">
                Key Responsibilities
              </h5>
              <ul className="space-y-4 md:space-y-5">
                {experience.description.map((item, i) => (
                  <li key={i} className="flex gap-3 md:gap-4 text-gray-400 text-sm md:text-base leading-relaxed group/item">
                    <div className="mt-1 w-5 h-5 md:w-6 md:h-6 rounded-full glass border-accent-blue/30 flex items-center justify-center shrink-0 group-hover/item:border-accent-blue transition-colors">
                      <ChevronRight className="w-3 h-3 md:w-3.5 md:h-3.5 text-accent-blue" />
                    </div>
                    <span className="group-hover/item:text-gray-200 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h5 className="text-white font-bold mb-5 md:mb-6 flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-xs">
                Technologies Used
              </h5>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {experience.skills.map((skill) => (
                  <div 
                    key={skill} 
                    className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-white/5 border border-white/10 text-[10px] md:text-sm font-medium text-gray-300 hover:border-accent-blue/40 hover:bg-accent-blue/5 transition-all cursor-default"
                  >
                    {skill}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 md:mt-10 p-5 md:p-6 glass rounded-xl md:rounded-2xl border-white/5 bg-gradient-to-br from-accent-purple/10 to-transparent">
                <p className="text-xs md:text-sm text-gray-400 italic leading-relaxed">
                  &quot;Working at Oro Media Lab has allowed me to bridge the gap between creative design and high-performance engineering.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
