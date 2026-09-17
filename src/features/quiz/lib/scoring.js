// src/features/quiz/lib/scoring.js — pure scoring logic

export function scoreQuiz(answers = {}) {
  const counts = {};
  for (const key of Object.keys(answers)) {
    const value = answers[key];
    if (!value) continue;
    counts[value] = (counts[value] || 0) + 1;
  }

  let topResult = 'builder';
  let topCount = 0;
  for (const [key, count] of Object.entries(counts)) {
    if (count > topCount) {
      topCount = count;
      topResult = key;
    }
  }

  return topResult;
}
