import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b">
      <div className="container mx-auto px-4 py-4">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold glow-text">GDGenius</h1>
            <p className="text-xs text-muted-foreground">Discover Your IT Personality</p>
          </div>
        </Link>
      </div>
    </header>
  );
};