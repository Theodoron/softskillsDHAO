
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../data/questions';
import Question from './Question';
import ProgressBar from './ProgressBar';

const shuffle = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Questionnaire = () => {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [fadeKey, setFadeKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledQuestions(shuffle(questionsData));
  }, []);

  const handleAnswer = (value) => {
    const currentQuestion = shuffledQuestions[currentIndex];
    const updatedResponses = { ...responses, [currentQuestion.id]: value };
    setResponses(updatedResponses);

    setTimeout(() => {
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFadeKey(prev => prev + 1);
      } else {
        navigate('/summary', { state: { responses: updatedResponses } });
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFadeKey(prev => prev + 1);
    }
  };

  if (shuffledQuestions.length === 0) return <p>Chargement des questions...</p>;

  const currentQuestion = shuffledQuestions[currentIndex];
  const progressPercent = Math.round((currentIndex + 1) / shuffledQuestions.length * 100);
  const selectedValue = responses[currentQuestion.id] || null;

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in' }} key={fadeKey}>
      <ProgressBar progress={progressPercent} />
      <Question
        questionText={currentQuestion.text}
        explanation={currentQuestion.explanation}
        onAnswer={handleAnswer}
        selected={selectedValue}
      />
      {currentIndex > 0 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={handleBack}
            style={{
              backgroundColor: '#ffffff',
              color: '#5B3C8B',
              fontSize: '0.9rem',
              border: 'none',        
              padding: '0.5rem 1rem',
              fontFamily: "'Quicksand', sans-serif",
              cursor: 'pointer',
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1'
            }}
          >
            ◀ Revenir à la question précédente
          </button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
