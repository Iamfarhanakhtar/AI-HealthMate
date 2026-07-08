import React from 'react';

function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[-1] overflow-hidden pointer-events-none">
      {/* Primary cyan blur top-left */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary-container/8 opacity-25 filter blur-[80px] -top-24 -left-24"></div>
      
      {/* Secondary mint blur bottom-right */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-secondary-container/8 opacity-20 filter blur-[90px] bottom-0 right-0"></div>
      
      {/* Tertiary violet blur in the middle */}
      <div className="absolute w-[350px] h-[350px] rounded-full bg-tertiary-container/8 opacity-15 filter blur-[100px] top-1/2 left-1/3"></div>
    </div>
  );
}

export default BackgroundBlobs;
