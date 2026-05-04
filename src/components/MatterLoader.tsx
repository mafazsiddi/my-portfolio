'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';

const MatterLoader: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    const world = engine.world;

    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    Composite.add(world, [
      Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 50, window.innerWidth, 100, wallOptions),
      Bodies.rectangle(-50, window.innerHeight / 2, 100, window.innerHeight, wallOptions),
      Bodies.rectangle(window.innerWidth + 50, window.innerHeight / 2, 100, window.innerHeight, wallOptions),
    ]);

    // Falling shapes
    const shapes: Matter.Body[] = [];
    const colors = ['#3b82f6', '#a855f7', '#ffffff'];

    const addShape = () => {
      const x = Math.random() * window.innerWidth;
      const size = 30 + Math.random() * 40;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      let shape;
      if (Math.random() > 0.5) {
        shape = Bodies.rectangle(x, -100, size, size, {
          render: { fillStyle: color, strokeStyle: '#ffffff', lineWidth: 1 },
          restitution: 0.6,
        });
      } else {
        shape = Bodies.circle(x, -100, size / 2, {
          render: { fillStyle: color, strokeStyle: '#ffffff', lineWidth: 1 },
          restitution: 0.6,
        });
      }
      
      shapes.push(shape);
      Composite.add(world, shape);
    };

    const interval = setInterval(() => {
      if (shapes.length < 40) {
        addShape();
      }
    }, 100);

    // Mouse constraint for interaction
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);

    // Timeout to finish loading
    const timer = setTimeout(() => {
      clearInterval(interval);
      
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          setLoading(false);
          Engine.clear(engine);
          Render.stop(render);
          Runner.stop(runner);
        },
      });
    }, 3000);

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden"
    >
      <canvas ref={canvasRef} />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white z-10">
          MAFAZ<span className="text-accent-blue">.</span>
        </h1>
        <p className="text-gray-400 mt-4 animate-pulse uppercase tracking-[0.2em] text-sm">
          Loading Experience
        </p>
      </div>
    </div>
  );
};

export default MatterLoader;
