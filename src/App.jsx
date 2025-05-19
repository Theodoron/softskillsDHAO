// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TestHeader from './components/TestHeader';
import Questionnaire from './components/Questionnaire';
import SummaryIntro from './components/SummaryIntro';
import Results from './components/Results';
import { calculateScores } from './utils/score';
import questions from './data/questions';
import './App.css';

const ResultsPage = () => {
  const location = useLocation();
  const responses = location.state?.responses || {};
  const results = calculateScores(responses, questions);
  return <Results results={results} />;
};

function App() {
  const { pathname } = useLocation();
  const isQuiz = pathname === '/';

  return (
    <div
      className="App"
      style={{
        width: isQuiz ? '100%' : 'auto',
        maxWidth: isQuiz ? 'none' : '1280px'
      }}
    >
      <TestHeader />
      <Routes>
        <Route path="/" element={<Questionnaire />} />
        <Route path="/summary" element={<SummaryIntro />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
