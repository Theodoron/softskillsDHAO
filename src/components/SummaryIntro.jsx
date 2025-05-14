import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SummaryIntro = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responses = location.state?.responses || {};

  const handleNext = () => {
    navigate('/results', { state: { responses } });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', textAlign: 'center' }}>
      <h2 style={{ fontFamily: "'Quicksand', sans-serif", color: '#5B3C8B' }}>
        Vous avez terminé le test !
      </h2>
      <p style={{ fontSize: '1.1rem' }}>
        Un graphique de vos résultats va vous être présenté pour vous permettre d’explorer vos forces en soft skills.
      </p>
      <button
        onClick={handleNext}
        style={{
          marginTop: '2rem',
          backgroundColor: '#5B3C8B',
          color: 'white',
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}
      >
        Afficher les résultats
      </button>
    </div>
  );
};

export default SummaryIntro;
