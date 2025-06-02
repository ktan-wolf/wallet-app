"use client"

import React, { useEffect, useState } from 'react';

interface SlideInProps {
  children: React.ReactNode;
  direction: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
}

export const SlideIn: React.FC<SlideInProps> = ({ 
  children, 
  direction, 
  delay = 0, 
  duration = 700 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return 'translateX(-50px)';
      case 'right': return 'translateX(50px)';
      case 'up': return 'translateY(-50px)';
      case 'down': return 'translateY(50px)';
      default: return 'translateX(0)';
    }
  };
  
  return (
    <div
      className="transition-all"
      style={{ 
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        opacity: isVisible ? 1 : 0,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};