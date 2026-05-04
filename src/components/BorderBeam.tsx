'use client';

import React from 'react';

interface BorderBeamProps {
  size?: number;
  duration?: number;
  anchor?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
  borderRadius?: number;
}

const BorderBeam: React.FC<BorderBeamProps> = ({
  size = 150,
  duration = 8,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "#3b82f6",
  colorTo = "#a855f7",
  delay = 0,
  borderRadius = 24,
}) => {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:var(--border-width)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:exclude] [-webkit-mask-composite:destination-out] [mask-image:linear-gradient(white,white),linear-gradient(white,white)]"
    >
      <div 
        className="absolute aspect-square w-[var(--size)] [animation:border-beam_var(--duration)_infinite_linear_var(--delay)] [background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent_80%)] [offset-anchor:calc(var(--anchor)*1%)_50%] [offset-path:rect(0_100%_100%_0_round_var(--border-radius))]"
      />
    </div>
  );
};

export default BorderBeam;
