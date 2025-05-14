import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
        <div
          style={{
            height: '12px',
            width: `${progress}%`,
            backgroundColor: '#55D4F0',
            transition: 'width 0.4s ease-in-out'
          }}
        />
      </div>
      <div
        style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          fontFamily: "'Quicksand', sans-serif"
        }}
      >
        {progress} %
      </div>
    </div>
  );
};

export default ProgressBar;
