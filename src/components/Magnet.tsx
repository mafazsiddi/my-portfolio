'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagnetProps {
  children: ReactNode;
  strength?: number;
  range?: number; // Added to control influence area
  className?: string;
}

const Magnet: React.FC<MagnetProps> = ({ children, strength = 20, range = 1.2, className = "" }) => {
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const magnet = magnetRef.current;
    if (!magnet) return;

    const xTo = gsap.quickTo(magnet, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(magnet, "y", { duration: 0.8, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = magnet.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Use the custom range prop to calculate influence
      const influenceRadius = width * range;

      if (distance < influenceRadius) {
        xTo((deltaX / width) * strength);
        yTo((deltaY / height) * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const onMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', onMouseMove);
    magnet.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      magnet.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength, range]);

  return (
    <div ref={magnetRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
};

export default Magnet;
