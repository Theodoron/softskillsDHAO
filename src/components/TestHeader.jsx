import React from 'react';

const TestHeader = () => {
  return (
    <header
      style={{
        maxWidth: '960px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5B3C8B',
        color: 'white',
        padding: '1.5rem 2rem', // hauteur augmentée
        gap: '1rem',
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px'
      }}
    >
      <img
        src="/logo.png"
        alt="Logo"
        style={{ height: '50px', width: 'auto' }}
      />
      <h1
        style={{
          fontFamily: "'Quicksand', sans-serif",
          fontWeight: 'normal',
          fontSize: '2rem',
          margin: 0,
          textAlign: 'center'
        }}
      >
        Test d’auto-positionnement – Soft Skills
      </h1>
    </header>
  );
};

export default TestHeader;
