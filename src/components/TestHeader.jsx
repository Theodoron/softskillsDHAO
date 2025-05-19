// src/components/TestHeader.jsx
import React from 'react';

const TestHeader = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1000,
      backgroundColor: '#5B3C8B',
      color: '#fff',
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
    }}>
      {/* wrapper centré à 600px pour aligner avec les questions */}
      <div style={{
        width: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <img
          src="/logo.png"
          alt="Logo SoftSkills"
          style={{ height: '3rem', flexShrink: 0 }}
        />
        <h1 style={{
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 'normal',
          fontSize: '2.2rem',
          margin: 0,
          textAlign: 'center'
        }}>
          Auto-positionnement – Soft Skills
        </h1>
      </div>
    </header>
  );
};

export default TestHeader;
