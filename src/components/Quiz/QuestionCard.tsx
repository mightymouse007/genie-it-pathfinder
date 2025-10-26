import { Question, QuestionOption } from '@/utils/questions';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswer: (answerId: string) => void;
}

export const QuestionCard = ({ question, selectedAnswer, onAnswer }: QuestionCardProps) => {
  const renderOption = (option: QuestionOption) => {
    const Icon = option.icon ? (Icons as any)[option.icon] : null;
    const isSelected = selectedAnswer === option.id;

    if (question.type === 'rating') {
      return (
        <button
          key={option.id}
          onClick={() => onAnswer(option.id)}
          className={cn(
            "flex items-center justify-center w-16 h-16 rounded-xl border-2 transition-all duration-300",
            isSelected
              ? "border-primary bg-primary text-primary-foreground scale-110 shadow-lg shadow-primary/50"
              : "border-border hover:border-primary/50 hover:scale-105"
          )}
        >
          <span className="text-2xl font-bold">{option.text}</span>
        </button>
      );
    }

    if (question.type === 'binary') {
      return (
        <button
          key={option.id}
          onClick={() => onAnswer(option.id)}
          className={cn(
            "flex-1 glass-card p-8 rounded-2xl transition-all duration-300 group",
            isSelected
              ? "bg-primary/20 border-primary shadow-lg shadow-primary/30 scale-105"
              : "hover:bg-card/60 hover:border-primary/50 hover:scale-102"
          )}
        >
          <div className="flex flex-col items-center gap-4">
            {Icon && (
              <Icon className={cn(
                "w-12 h-12 transition-colors",
                isSelected ? "text-primary" : "text-muted-foreground group-hover:text-primary"
              )} />
            )}
            <span className={cn(
              "text-lg font-medium text-center",
              isSelected ? "text-primary" : "group-hover:text-foreground"
            )}>
              {option.text}
            </span>
          </div>
        </button>
      );
    }

    return (
      <button
        key={option.id}
        onClick={() => onAnswer(option.id)}
        className={cn(
          "glass-card p-6 rounded-xl transition-all duration-300 text-left group",
          isSelected
            ? "bg-primary/20 border-primary shadow-lg shadow-primary/30"
            : "hover:bg-card/60 hover:border-primary/50"
        )}
      >
        <div className="flex items-center gap-4">
          {Icon && (
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
              isSelected 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted group-hover:bg-primary/20"
            )}>
              <Icon className="w-6 h-6" />
            </div>
          )}
          <span className={cn(
            "font-medium",
            isSelected ? "text-primary" : "group-hover:text-foreground"
          )}>
            {option.text}
          </span>
        </div>
      </button>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div className="glass-card p-8 md:p-12 rounded-3xl shadow-card">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 glow-text">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-muted-foreground mb-8">
            {question.description}
          </p>
        )}

        <div className={cn(
          "grid gap-4",
          question.type === 'binary' 
            ? "md:grid-cols-2" 
            : question.type === 'rating'
            ? "grid-cols-5 max-w-md mx-auto"
            : "grid-cols-1"
        )}>
          {question.options.map(renderOption)}
        </div>
      </div>
    </div>
  );
};