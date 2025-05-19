import React, { useState, useEffect } from 'react';
import './Question.css';

export default function Question({ questionText, explanation, onAnswer, selected }) {
  const [showInfo, setShowInfo] = useState(false);
  const [value, setValue] = useState(selected);

  useEffect(() => {
    setValue(selected);
  }, [selected]);

  const choose = (v) => {
    setValue(v);
    onAnswer(v);
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <div className="question-text">{questionText}</div>
        <button
          className="info-button"
          onClick={() => setShowInfo(sh => !sh)}
          aria-label="Aide"
        >💡</button>
      </div>

      {showInfo && (
        <div className="question-explanation">
          {explanation}
        </div>
      )}

      <div className="likert-scale">
        { [1,2,3,4,5].map((v) => (
          <label key={v} className="likert-option">
            <input
              type="radio"
              name="likert"
              checked={value === v}
              onChange={() => choose(v)}
            />
            <span className="likert-number">{v}</span>
          </label>
        )) }
      </div>

      <div className="likert-labels">
        <span>Pas du tout</span>
        <span>Tout à fait</span>
      </div>
    </div>
  );
}
