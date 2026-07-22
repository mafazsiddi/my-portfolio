'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Magnet from './Magnet';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 3.5, ease: 'power4.out' }
    );
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-[5000] px-4 md:px-6 w-full max-w-[1280px]"
      >
        <div className="glass px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center justify-between border-white/10 shadow-2xl">
          <a href="#" className="text-lg md:text-xl font-bold tracking-tighter hover:text-accent-blue transition-colors">
            MAFAZ<span className="text-accent-blue">.</span>
          </a>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Magnet key={link.name} strength={10} range={0.8}>
                <button
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="text-[10px] xl:text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors px-2 py-1"
                >
                  {link.name}
                </button>
              </Magnet>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Magnet strength={15} range={0.8}>
              <a 
                href="#contact" 
                className="bg-white text-black text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-4 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-accent-blue hover:text-white transition-all whitespace-nowrap"
              >
                Hire Me
              </a>
            </Magnet>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden absolute top-20 left-4 right-4 glass rounded-3xl p-6 transition-all duration-300 origin-top ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors py-2 border-b border-white/5 text-left"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
