// src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import TestHeader from './components/TestHeader';
import Questionnaire from './components/Questionnaire';
import SummaryIntro from './components/SummaryIntro';
import Results from './components/Results';
import { calculateScores } from './utils/score';
import questions from './data/questions';

function ResultsPage() {
  const location = useLocation();
  const responses = location.state?.responses ?? {};
  console.log('📦 Responses reçues dans ResultsPage:', responses);

  // On récupère dimensions et details depuis calculateScores
  const { dimensions, details } = calculateScores(responses, questions);
  const results = { dimensions, details };
  console.log('📈 Résultats calculés:', results);

  // On passe l'objet results en props à Results
  return <Results results={results} />;
}

export default function App() {
  return (
    <div className="App">
      <TestHeader />
      <Routes>
        <Route path="/" element={<Questionnaire />} />
        <Route path="/summary" element={<SummaryIntro />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}
