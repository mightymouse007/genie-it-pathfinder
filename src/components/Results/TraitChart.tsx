import { personalityTypes } from '@/utils/questions';
import * as Icons from 'lucide-react';

interface TraitChartProps {
  scores: Record<string, number>;
}

export const TraitChart = ({ scores }: TraitChartProps) => {
  const sortedTraits = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="glass-card p-8 rounded-2xl">
      <h2 className="text-2xl font-bold mb-6">Your Trait Breakdown</h2>
      
      <div className="space-y-4">
        {sortedTraits.map(([type, percentage]) => {
          const personality = personalityTypes[type as keyof typeof personalityTypes];
          const Icon = personality ? (Icons as any)[personality.icon] : null;
          
          return (
            <div key={type} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {Icon && <Icon className="w-5 h-5 text-primary" />}
                  <span className="font-medium">{personality?.name || type}</span>
                </div>
                <span className="text-primary font-bold">{percentage}%</span>
              </div>
              <div className="h-3 bg-muted/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};