import React from 'react';

function LoadingSpinner({ className = '', size = 'w-10 h-10' }) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`border-2 border-primary/20 border-t-primary rounded-full animate-spin ${size}`}></div>
    </div>
  );
}

export default LoadingSpinner;
