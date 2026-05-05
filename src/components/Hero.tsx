'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';
import Magnet from './Magnet';
import GradientText from './GradientText';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [magnetStrength, setMagnetStrength] = useState(0);

  // Use a resize listener to handle both mount and window resizing
  useEffect(() => {
    const handleResize = () => {
      setMagnetStrength(window.innerWidth < 768 ? 0 : 30);
    };
    
    handleResize(); // Initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { opacity: 0 });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, delay: 0.5 }
      )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      const onMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 768) return; 
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(innerRef.current, {
          rotationY: xPos,
          rotationX: -yPos,
          duration: 0.6,
          ease: 'power2.out'
        });
      };

      window.addEventListener('mousemove', onMouseMove);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 px-4 overflow-hidden perspective-2000"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent-blue/10 md:bg-accent-blue/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-pulse-slow z-0" />

      <div ref={innerRef} className="z-10 text-center relative pb-20 md:pb-40 transform-style-3d w-full max-w-5xl mx-auto">
        <p 
          ref={subtitleRef}
          className="text-accent-blue font-mono tracking-[0.2em] md:tracking-widest uppercase mb-4 md:mb-6 text-[10px] md:text-sm opacity-0" 
        >
          Based in Bengaluru, India
        </p>
        <h1
          ref={titleRef}
          className="text-[12vw] md:text-8xl lg:text-9xl font-bold tracking-tighter mb-6 md:mb-8 leading-[1.12] opacity-0"
        >
          Creative <br />
          <GradientText
            colors={["#3b82f6", "#a855f7", "#3b82f6", "#a855f7", "#3b82f6"]}
            animationSpeed={6}
            showBorder={false}
            className="inline-block"
          >
            Developer
          </GradientText>
        </h1>
        <p className="text-gray-400 text-sm md:text-lg lg:text-xl max-w-lg md:max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed px-4">
          Hi, I&apos;m <span className="text-white font-medium">Mafaz Siddiqua</span>. I build production-grade web applications 
          with a focus on performance, scalability, and stunning UI.
        </p>

        <div ref={ctaRef} className="flex justify-center items-center relative z-20 opacity-0 px-4">
          <Magnet strength={magnetStrength} range={1.2}>
            <a
              href="#projects"
              className="group relative px-6 md:px-10 py-3 md:py-5 bg-white text-black text-xs md:text-base font-bold rounded-full overflow-hidden flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Magnet>
        </div>
      </div>
    </section>
  );
};

export default Hero;
