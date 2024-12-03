import React from 'react';

const DecorativeShapes = () => {
  return (
    <>
      {/* Animated circles */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400/20 rounded-full 
                    animate-pulse blur-xl hidden lg:block"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-300/20 rounded-full 
                    animate-bounce blur-xl hidden lg:block"></div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-1/3 h-1 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-purple-500/50 to-transparent"></div>
      
      {/* Corner shapes */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 transform rotate-45 -translate-y-1/2 translate-x-1/2"></div>
      {/* <div className="absolute bottom-10 right-0 w-32 rounded-l-3xl h-10 bg-black/80 backdrop-blur-sm"></div> */}
    </>
  );
};

export default DecorativeShapes;