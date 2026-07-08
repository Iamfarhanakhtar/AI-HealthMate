import React from 'react';

function Container({ children, className = '', size = 'max-w-[1200px]' }) {
  return (
    <div className={`w-full mx-auto px-6 md:px-10 ${size} ${className}`}>
      {children}
    </div>
  );
}

export default Container;
