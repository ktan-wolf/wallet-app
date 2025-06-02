"use client"

import React from 'react';

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  totalSteps, 
  currentStep 
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-4">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`h-2 rounded-full transition-all duration-300 w-full ml-60 ${
            index === currentStep 
              ? 'w-10 bg-indigo-600' 
              : index < currentStep 
                ? 'w-8 bg-indigo-400' 
                : 'w-8 bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;