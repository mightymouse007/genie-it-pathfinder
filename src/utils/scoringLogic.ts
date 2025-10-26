export interface QuizAnswers {
  [questionId: number]: string;
}

export interface PersonalityScores {
  architect: number;
  codeWizard: number;
  securityGuardian: number;
  dataScientist: number;
  devOps: number;
  uiUx: number;
  qaDetective: number;
  techSupport: number;
  cloudNavigator: number;
  innovationPioneer: number;
}

export const calculateScores = (answers: QuizAnswers, questions: any[]): PersonalityScores => {
  const scores: PersonalityScores = {
    architect: 0,
    codeWizard: 0,
    securityGuardian: 0,
    dataScientist: 0,
    devOps: 0,
    uiUx: 0,
    qaDetective: 0,
    techSupport: 0,
    cloudNavigator: 0,
    innovationPioneer: 0
  };

  Object.entries(answers).forEach(([questionId, answerId]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (!question) return;

    const option = question.options.find((opt: any) => opt.id === answerId);
    if (!option || !option.scores) return;

    Object.entries(option.scores).forEach(([personality, points]) => {
      scores[personality as keyof PersonalityScores] += points as number;
    });
  });

  return scores;
};

export const getDominantPersonality = (scores: PersonalityScores): string => {
  let maxScore = 0;
  let dominantType = 'codeWizard';

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantType = type;
    }
  });

  return dominantType;
};

export const getTraitPercentages = (scores: PersonalityScores): Record<string, number> => {
  const maxPossibleScore = Object.values(scores).reduce((sum, score) => sum + score, 0);
  const percentages: Record<string, number> = {};

  Object.entries(scores).forEach(([type, score]) => {
    percentages[type] = maxPossibleScore > 0 ? Math.round((score / maxPossibleScore) * 100) : 0;
  });

  return percentages;
};

export const getTopTraits = (scores: PersonalityScores, count: number = 3): Array<{ type: string; score: number }> => {
  return Object.entries(scores)
    .map(([type, score]) => ({ type, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
};