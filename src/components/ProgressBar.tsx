import React from 'react';

export const ProgressBar = ({ value, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
      style={{ width: `${value}%` }}
    />
  </div>
);