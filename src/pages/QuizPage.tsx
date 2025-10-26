import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FloatingParticles } from '@/components/Quiz/FloatingParticles';
import { Header } from '@/components/Layout/Header';
import { ProgressBar } from '@/components/Quiz/ProgressBar';
import { QuestionCard } from '@/components/Quiz/QuestionCard';
import { questions } from '@/utils/questions';
import { QuizAnswers } from '@/utils/scoringLogic';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gdgenius-quiz-progress');
    if (saved) {
      const { answers: savedAnswers, currentQuestion: savedCurrent } = JSON.parse(saved);
      setAnswers(savedAnswers);
      setCurrentQuestion(savedCurrent);
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('gdgenius-quiz-progress', JSON.stringify({
      answers,
      currentQuestion
    }));
  }, [answers, currentQuestion]);

  const handleAnswer = (answerId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answerId
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setDirection('forward');
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz complete - navigate to results
      localStorage.setItem('gdgenius-quiz-answers', JSON.stringify(answers));
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection('backward');
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const currentAnswer = answers[questions[currentQuestion].id];
  const canProceed = currentAnswer !== undefined;

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
          
          <div
            key={currentQuestion}
            className={direction === 'forward' ? 'animate-slide-in-right' : 'animate-slide-in-left'}
          >
            <QuestionCard
              question={questions[currentQuestion]}
              selectedAnswer={currentAnswer}
              onAnswer={handleAnswer}
            />
          </div>

          <div className="flex justify-between items-center mt-8 gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="glass-card"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {canProceed ? '✓ Answer selected' : 'Select an answer to continue'}
            </div>

            <Button
              size="lg"
              onClick={handleNext}
              disabled={!canProceed}
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              {currentQuestion === questions.length - 1 ? 'View Results' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;