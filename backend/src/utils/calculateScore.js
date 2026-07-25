export function calculateScore(analysis) {
  let score = 100;
  const recommendations = [];

  const checks = [
    analysis.title,
    analysis.metaDescription,
    analysis.h1,
    analysis.images,
    analysis.wordCount,
  ];

  for (const check of checks) {
    if (check.status === 'warning') {
      score -= 10;
      recommendations.push(check.message);
    }

    if (check.status === 'error') {
      score -= 20;
      recommendations.push(check.message);
    }
  }

  if (score < 0) {
    score = 0;
  }

  return {
    score,
    grade: getGrade(score),
    recommendations,
  };
}

function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}