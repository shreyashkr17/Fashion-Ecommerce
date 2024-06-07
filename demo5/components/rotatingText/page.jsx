import React from 'react';

const RotatingText = () => {
  const text = "Website is in Beta version and Testing phase, will launch soon...";
  
  return (
    <div className="rotating-text-container" style={{
      width: '100vw',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      color: 'whitesmoke',
      backgroundColor:"transparent",
      fontWeight: '100',
      fontSize: '1.5rem',
    }}>
      <div className="rotating-text" style={{
            width: '100%',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        animation: 'scrollText 50s linear infinite',
      }}>
        <span>{text}</span>
        {/* Repeating text to ensure smooth transition */}
      </div>
      <style>{`
  @keyframes scrollText {
    0% {
      transform: translateX(100%);
    }
    50% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(100%);
    }
  }
      `}</style>
    </div>
  );
};

export default RotatingText;
