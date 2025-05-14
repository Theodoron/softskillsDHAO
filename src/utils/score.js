// src/utils/score.js

/**
 * calculateScores
 * @param {Object} responses - { [questionId]: sélection (1–5) }
 * @param {Array} questions - questions avec { id, dimension, skill }
 * @returns {{
 *   dimensions: { [dimension: string]: number },
 *   details:    { [dimension: string]: { [skill: string]: number } }
 * }}
 */
export function calculateScores(responses, questions) {
  const scoreMapping = { 1: 0, 2: 1, 3: 3, 4: 6, 5: 10 };
  const dimensions = {};
  const details = {};

  questions.forEach((q) => {
    const { id, dimension, skill } = q;
    const resp = responses[id];
    if (resp != null) {
      const pts = scoreMapping[resp] ?? 0;

      // Total par dimension
      dimensions[dimension] = (dimensions[dimension] || 0) + pts;

      // Total par compétence (skill) dans chaque dimension
      if (!details[dimension]) {
        details[dimension] = {};
      }
      details[dimension][skill] = (details[dimension][skill] || 0) + pts;
    }
  });

  return { dimensions, details };
}
