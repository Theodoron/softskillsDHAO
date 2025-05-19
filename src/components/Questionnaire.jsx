// src/components/Questionnaire.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate }           from 'react-router-dom';
import questionsData             from '../data/questions';
import ProgressBar               from './ProgressBar';
import Question                  from './Question';

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export default function Questionnaire() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx]             = useState(0);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    setQuestions(shuffle(questionsData));
  }, []);

  if (!questions.length) return <p>Chargement…</p>;

  const current  = questions[idx];
  const progress = Math.round(((idx + 1) / questions.length) * 100);
  const selected = responses[current.id] ?? null;

  const answer = v => {
    const next = { ...responses, [current.id]: v };
    setResponses(next);
    setTimeout(() => {
      if (idx < questions.length - 1) setIdx(i => i + 1);
      else navigate('/results', { state: { responses: next } });
    }, 200);
  };

  const goBack = () => { if (idx > 0) setIdx(i => i - 1); };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginTop: '40px'   /* EXACTEMENT 20px sous le header */
      }}
    >
      <div
        style={{
          width: '600px',    /* largeur FIXE à 600px */
          margin: '0 auto',
          padding: '0 1rem'
        }}
      >
        <ProgressBar progress={progress} />

        <Question
          questionText={current.text}
          explanation={current.explanation}
          onAnswer={answer}
          selected={selected}
        />

        {idx > 0 && (
          <div style={{ textAlign: 'center', margin: '1rem 0' }}>
            <button
              onClick={goBack}
              style={{
                backgroundColor: '#fff',
                color: '#5B3C8B',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                fontFamily: "'Quicksand', sans-serif"
              }}
            >
              ◀ Question précédente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
