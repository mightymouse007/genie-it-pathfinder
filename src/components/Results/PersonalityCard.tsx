import * as Icons from 'lucide-react';
import { personalityTypes } from '@/utils/questions';

interface PersonalityCardProps {
  personalityType: string;
}

export const PersonalityCard = ({ personalityType }: PersonalityCardProps) => {
  const personality = personalityTypes[personalityType as keyof typeof personalityTypes];
  if (!personality) return null;

  const Icon = (Icons as any)[personality.icon];

  return (
    <div className="glass-card p-8 md:p-12 rounded-3xl text-center mb-8 animate-scale-in shadow-card">
      <div className="inline-block mb-6">
        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse-glow">
          {Icon && <Icon className="w-16 h-16 text-white" />}
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-3 glow-text">
        {personality.name}
      </h1>
      <p className="text-xl text-muted-foreground">
        {personality.tagline}
      </p>
    </div>
  );
};