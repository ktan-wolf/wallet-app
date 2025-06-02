"use client"

import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, BarChart3, Wallet, Router } from 'lucide-react';
import IntroSlide from './IntroSlide';
import ProgressIndicator from './ProgressIndicator';
import { AnimatedIcon } from './AnimatedIcon';
import { FadeIn } from './animations/FadeIn';
import BackgroundAnimation from './BackgroundAnimation';
import intro from './images/intro1.jpg';
import security from './images/security.jpg';
import start from './images/start.jpg';
import { useRouter } from 'next/navigation';


export default function() {

    const router = useRouter();
    const [activeSlide, setActiveSlide] = useState(0);
    const totalSlides = 3;


    const nextSlide = () => {
        if (activeSlide < totalSlides - 1) {
        setActiveSlide(prev => prev + 1);
        }
    };

    const skipToLast = () => {
        setActiveSlide(totalSlides - 1);
    };

    const slides = [
        {
        title: "Welcome to Finflow",
        description: "The secure way to manage your digital finances",
        icon: <AnimatedIcon icon={Wallet} color="#3949AB" size={48} />,
        image: intro.src,
        gradient: "from-blue-500/20 via-indigo-500/10 to-transparent"
        },
        {
        title: "Bank-Grade Security",
        description: "Your funds are protected with advanced encryption technology",
        icon: <AnimatedIcon icon={Shield} color="#00C853" size={48} />,
        image: security.src,
        gradient: "from-green-500/20 via-emerald-500/10 to-transparent"
        },
        {
        title: "Ready to Start",
        description: "Track, save, and grow your finances with powerful tools",
        icon: <AnimatedIcon icon={BarChart3} color="#7E57C2" size={48} />,
        image: start.src,
        gradient: "from-purple-500/20 via-violet-500/10 to-transparent"
        }
    ];

    return (
        <div className="relative min-h-fit w-full">
            <BackgroundAnimation />
            
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm" />
            
            <div className="absolute top-4 right-4 z-10">
                {activeSlide < totalSlides - 1 && (
                <button 
                    onClick={skipToLast}
                    className="text-indigo-600 font-medium px-4 py-2 rounded-full hover:bg-indigo-50 transition-colors"
                >
                    Skip
                </button>
                )}
            </div>
            
            <div className="relative h-[calc(100vh-120px)] overflow-hidden">
                {slides.map((slide, index) => (
                <IntroSlide
                    key={index}
                    isActive={activeSlide === index}
                    title={slide.title}
                    description={slide.description}
                    icon={slide.icon}
                    imageUrl={slide.image}
                    gradient={slide.gradient}
                />
                ))}
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-sm">
                <div className="flex flex-col gap-6 max-w-md mx-auto">
                <ProgressIndicator
                    totalSteps={totalSlides} 
                    currentStep={activeSlide} 
                />
                
                <FadeIn delay={300}>
                    {activeSlide === totalSlides - 1 ? (
                    <button 
                        className="bg-indigo-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        onClick={() => router.push('/transfer')}
                    >
                        Get Started
                        <ArrowRight size={20} />
                    </button>
                    ) : (
                    <button 
                        className="bg-indigo-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        onClick={nextSlide}
                    >
                        Next
                        <ArrowRight size={20} />
                    </button>
                    )}
                </FadeIn>
                </div>
            </div>
        </div>
    );
}