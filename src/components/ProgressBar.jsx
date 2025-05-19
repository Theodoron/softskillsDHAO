import React from 'react';

const ProgressBar = ({ progress }) => {
  const barHeight = 22;
  const radius = barHeight / 2;

  return (
    <div style={{ maxWidth: '960px', width: '100%', margin: '0 auto' }}>
      {/* Conteneur gris avec coins arrondis */}
      <div
        style={{
          backgroundColor: '#e0e0e0',
          overflow: 'hidden',
          borderRadius: `${radius}px`,
          height: `${barHeight}px`,
        }}
      >
        {/* Barre colorée, coins arrondis à gauche */}
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#55D4F0',
            transition: 'width 0.4s ease-in-out',
            borderRadius: `${radius}px 0 0 ${radius}px`,
          }}
        />
      </div>

      {/* Pourcentage en-dessous */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '0.5rem',
          fontFamily: "'Quicksand', sans-serif",
        }}
      >
        {progress} %
      </div>
    </div>
  );
};

export default ProgressBar;
