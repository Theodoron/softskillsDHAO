import React, { useState, useEffect } from 'react';
import './Test.css';

const Question = ({ questionText, explanation, onAnswer, selected }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [localSelected, setLocalSelected] = useState(selected || null);

  useEffect(() => {
    setLocalSelected(selected || null);
  }, [selected]);

  const handleAnswer = (value) => {
    setLocalSelected(value);
    onAnswer(value);
  };

  return (
    <div className="question-container" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div
        className="question-header"
        style={{
          width: '100%',
          maxWidth: '700px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}
      >
        <div
          className="question-text"
          style={{
            fontSize: '1.5rem',
            fontFamily: "'Quicksand', sans-serif",
            textAlign: 'left',
            flexGrow: 1,
            marginRight: '0.2rem'
          }}
        >
          {questionText}
        </div>
        <div style={{ marginTop: '0.1rem' }}>
          <button
            className="info-button"
            onClick={() => setShowInfo(!showInfo)}
            aria-label="Afficher l'explication"
            style={{
              fontSize: '1.6rem',
              color: '#5B3C8B',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            💡
          </button>
        </div>
      </div>

      {showInfo && (
        <div
          className="tooltip"
          style={{
            marginTop: '1rem',
            color: '#5B3C8B',
            fontFamily: "'Quicksand', sans-serif"
          }}
        >
          {explanation}
        </div>
      )}

      <div className="likert-scale" style={{ marginTop: '2rem' }}>
        <span
          style={{
            fontFamily: "'Quicksand', sans-serif",
            alignSelf: 'center',
            marginRight: '0.5rem'
          }}
        >
          Pas du tout
        </span>
        {[1, 2, 3, 4, 5].map((value) => (
          <label key={value} className={`likert-option ${localSelected === value ? 'selected' : ''}`}>
            <input
              type="radio"
              name="likert"
              value={value}
              onChange={() => handleAnswer(value)}
              checked={localSelected === value}
            />
            {value}
          </label>
        ))}
        <span
          style={{
            fontFamily: "'Quicksand', sans-serif",
            alignSelf: 'center',
            marginLeft: '0.5rem'
          }}
        >
          Tout à fait
        </span>
      </div>
    </div>
  );
};

export default Question;
