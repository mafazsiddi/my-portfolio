'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [labelText, setLabelLabelText] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;

    if (!cursor || !follower || !label) return;

    // Movement tracking
    const xCursorTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yCursorTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });
    
    const xFollowerTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const yFollowerTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    // Velocity tracking for stretching
    let mouse = { x: 0, y: 0 };
    let lastMouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      
      xCursorTo(e.clientX);
      yCursorTo(e.clientY);
      xFollowerTo(e.clientX);
      yFollowerTo(e.clientY);

      // Calculate velocity for stretching effect
      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      if (velocity > 5) {
        gsap.to(follower, {
          scaleX: 1 + velocity / 100,
          scaleY: 1 - velocity / 200,
          rotation: angle,
          duration: 0.2,
        });
      } else {
        gsap.to(follower, {
          scaleX: 1,
          scaleY: 1,
          rotation: 0,
          duration: 0.4,
        });
      }

      lastMouse = { ...mouse };
    };

    const onMouseDown = () => {
      gsap.to(follower, { scale: 0.6, duration: 0.3, backgroundColor: 'rgba(59, 130, 246, 0.3)' });
    };

    const onMouseUp = () => {
      gsap.to(follower, { scale: 1, duration: 0.3, backgroundColor: 'transparent' });
    };

    // Label triggers
    const handleHoverEnter = (e: any) => {
      const target = e.currentTarget;
      const type = target.getAttribute('data-cursor');
      
      if (type) {
        setLabelLabelText(type);
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
        gsap.to(follower, { scale: 2.5, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderColor: 'rgba(59, 130, 246, 0.8)', duration: 0.3 });
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
      } else {
        gsap.to(follower, { scale: 1.8, backgroundColor: 'rgba(255, 255, 255, 0.1)', duration: 0.3 });
      }
    };

    const handleHoverLeave = () => {
      gsap.to(label, { opacity: 0, scale: 0, duration: 0.2 });
      gsap.to(follower, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(59, 130, 246, 0.2)', duration: 0.3 });
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    const updateListeners = () => {
      const links = document.querySelectorAll('a, button, .hover-target');
      links.forEach((link) => {
        link.addEventListener('mouseenter', handleHoverEnter);
        link.addEventListener('mouseleave', handleHoverLeave);
      });
    };

    updateListeners();
    const interval = setInterval(updateListeners, 2000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Label (VIEW/DRAG etc) */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[10002] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 flex items-center justify-center"
      >
        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">
          {labelText}
        </span>
      </div>

      {/* Core Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent-blue rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
      />

      {/* Trailing Liquid Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-accent-blue/30 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

export default CustomCursor;
