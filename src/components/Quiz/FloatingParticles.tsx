import { Code, Database, Cloud, Lock, Sparkles, Zap } from 'lucide-react';

export const FloatingParticles = () => {
  const particles = [
    { Icon: Code, delay: '0s', duration: '20s', left: '10%', top: '20%' },
    { Icon: Database, delay: '2s', duration: '25s', left: '80%', top: '30%' },
    { Icon: Cloud, delay: '4s', duration: '22s', left: '20%', top: '70%' },
    { Icon: Lock, delay: '1s', duration: '24s', left: '90%', top: '60%' },
    { Icon: Sparkles, delay: '3s', duration: '23s', left: '50%', top: '10%' },
    { Icon: Zap, delay: '5s', duration: '21s', left: '70%', top: '80%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(({ Icon, delay, duration, left, top }, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-10"
          style={{
            left,
            top,
            animationDelay: delay,
            animationDuration: duration,
          }}
        >
          <Icon className="w-12 h-12 text-primary" />
        </div>
      ))}
      
      {/* Gradient orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};