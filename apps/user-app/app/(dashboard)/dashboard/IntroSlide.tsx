"use client"

import React from 'react';
import { FadeIn } from './animations/FadeIn';
import { SlideIn } from './animations/SlideIn';
import Image , { StaticImageData } from 'next/image';

interface IntroSlideProps {
  isActive: boolean;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string | StaticImageData;
  gradient: string;
}

const IntroSlide: React.FC<IntroSlideProps> = ({ 
  isActive, 
  title, 
  description, 
  icon,
  imageUrl,
  gradient
}) => {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-start px-6 pt-10">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-12">
          <FadeIn delay={300}>
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-b ${gradient} rounded-full blur-xl`} />
              {icon}
            </div>
          </FadeIn>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[calc(89vh-320px)] group bg-white">
          <SlideIn direction="right">
            <div 
                className="absolute  inset-0 bg-cover bg-center transition-transform duration-10000 group-hover:scale-110"
                // style={{ 
                //     backgroundImage: `url(${typeof imageUrl === 'string' ? imageUrl : imageUrl.src})` 
                // }}
                >
                <img src={typeof imageUrl === 'string' ? imageUrl : imageUrl.src} className="absolute  opacity-75  inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>

          </SlideIn>
          
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <FadeIn delay={100}>
              <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{title}</h2>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="text-white/90 text-lg max-w-xs drop-shadow">{description}</div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSlide;