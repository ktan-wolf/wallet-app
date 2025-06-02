"use client"

import React, { useEffect, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  color: string;
  size: number;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ icon: Icon, color, size }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex items-center justify-center p-6">
      <div
        className={`
          absolute inset-0 rounded-full
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}
        style={{
          background: `linear-gradient(to right, ${color}33, ${color}0D)` // 20% and 5% opacity
        }}
      />
      <div
        className={`
          transform transition-all duration-700 hover:scale-110 hover:rotate-3
          ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
        `}
      >
        <Icon size={size} color={color} strokeWidth={1.5} />
      </div>
    </div>
  );
};
