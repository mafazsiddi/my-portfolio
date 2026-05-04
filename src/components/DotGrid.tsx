'use client';

import React, { useRef, useEffect, useState } from 'react';

interface DotGridProps {
  dotSize?: number;
  dotColor?: string;
  gap?: number;
  motionBlur?: boolean;
  mouseThreshold?: number;
  className?: string;
}

const DotGrid: React.FC<DotGridProps> = ({
  dotSize = 1.2,
  dotColor = 'rgba(59, 130, 246, 0.3)', // Default to accent blue
  gap = 25,
  mouseThreshold = 100,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const rows = Math.floor(canvas.height / gap);
      const cols = Math.floor(canvas.width / gap);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap + (canvas.width % gap) / 2;
          const y = j * gap + (canvas.height % gap) / 2;

          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let size = dotSize;
          let opacity = 0.2;

          if (dist < mouseThreshold) {
            const factor = 1 - dist / mouseThreshold;
            size = dotSize + factor * 2;
            opacity = 0.2 + factor * 0.8;
          }

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = dotColor.replace('0.3', opacity.toString());
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotSize, dotColor, gap, mouseThreshold]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

export default DotGrid;
