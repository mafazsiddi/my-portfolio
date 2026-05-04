'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const skills = [
    'JavaScript', 'React', 'Next.js', 'Tailwind', 'GSAP', 
    'Matter.js', 'TypeScript', 'Node.js', 'Python', 'PHP', 
    'Git', 'Docker', 'Figma', 'WordPress'
  ];

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
        width: containerRef.current.clientWidth,
        height: window.innerWidth < 768 ? 400 : 500,
        wireframes: false,
        background: 'transparent',
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const width = containerRef.current.clientWidth;
    const height = window.innerWidth < 768 ? 400 : 500;

    // Walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    Composite.add(world, [
      Bodies.rectangle(width / 2, height + 10, width, 20, wallOptions),
      Bodies.rectangle(-10, height / 2, 20, height, wallOptions),
      Bodies.rectangle(width + 10, height / 2, 20, height, wallOptions),
      Bodies.rectangle(width / 2, -10, width, 20, wallOptions),
    ]);

    // Skill bodies
    skills.forEach((skill) => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const isMobile = window.innerWidth < 768;
      
      const skillBody = Bodies.rectangle(x, y, skill.length * (isMobile ? 8 : 12) + 24, isMobile ? 32 : 40, {
        chamfer: { radius: 20 },
        render: {
          fillStyle: 'rgba(255, 255, 255, 0.03)',
          strokeStyle: 'rgba(255, 255, 255, 0.15)',
          lineWidth: 1,
          text: {
            content: skill,
            color: '#ffffff',
            size: isMobile ? 10 : 14,
            family: 'Geist Sans',
          }
        } as any,
        restitution: 0.8,
        friction: 0.1,
      });

      Composite.add(world, skillBody);
    });

    Matter.Events.on(render, 'afterRender', () => {
      const context = render.context;
      const isMobile = window.innerWidth < 768;
      context.font = `${isMobile ? '10px' : '14px'} Geist Sans`;
      context.fillStyle = '#ffffff';
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      const bodies = Composite.allBodies(world);
      bodies.forEach((body: any) => {
        if (body.render && body.render.text) {
          context.save();
          context.translate(body.position.x, body.position.y);
          context.rotate(body.angle);
          context.fillText(body.render.text.content, 0, 0);
          context.restore();
        }
      });
    });

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Composite.add(world, mouseConstraint);

    const handleResize = () => {
      if (!containerRef.current) return;
      render.canvas.width = containerRef.current.clientWidth;
      render.options.width = containerRef.current.clientWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
    };
  }, []);

  return (
    <section id="skills" className="py-20 md:py-32 container overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-accent-blue font-mono tracking-[0.2em] md:tracking-widest uppercase mb-4 text-[10px] md:text-sm">Skills</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">Interactive <span className="text-gradient">Playground</span></h3>
          <p className="text-gray-400 text-sm md:text-lg leading-relaxed mb-8">
            Play with the technology stack I use every day. Drag, toss, and interact with the elements.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {skills.map(s => (
              <span key={s} className="px-3 py-1 glass rounded-full text-[10px] text-gray-500">{s}</span>
            ))}
          </div>
        </div>

        <div 
          ref={containerRef} 
          data-cursor="DRAG"
          className="w-full md:w-2/3 glass rounded-3xl h-[400px] md:h-[500px] relative cursor-grab active:cursor-grabbing overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>
      </div>
    </section>
  );
};

export default Skills;
