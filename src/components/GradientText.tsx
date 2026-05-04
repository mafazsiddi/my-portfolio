'use client';

import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  className = "",
  colors = ["#3b82f6", "#a855f7", "#3b82f6", "#a855f7", "#3b82f6"],
  animationSpeed = 8,
  showBorder = false,
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit flex-row items-center justify-center font-medium transition-shadow duration-500 overflow-hidden ${className}`}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[inherit] z-[-1]"
            style={{ margin: "1px" }}
          />
        </div>
      )}
      <div
        className="inline-block relative z-10 bg-cover bg-clip-text text-transparent animate-gradient"
        style={{
          ...gradientStyle,
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientText;
