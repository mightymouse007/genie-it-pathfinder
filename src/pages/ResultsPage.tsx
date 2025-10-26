import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FloatingParticles } from '@/components/Quiz/FloatingParticles';
import { Header } from '@/components/Layout/Header';
import { PersonalityCard } from '@/components/Results/PersonalityCard';
import { TraitChart } from '@/components/Results/TraitChart';
import { ShareButtons } from '@/components/Results/ShareButtons';
import { questions, personalityTypes } from '@/utils/questions';
import { calculateScores, getDominantPersonality, getTraitPercentages } from '@/utils/scoringLogic';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AIAnalysis {
  introduction?: string;
  strengths?: string[];
  careerPaths?: Array<{ title: string; description: string }>;
  learningRecommendations?: Array<{ category: string; items: string[] }>;
  teamDynamics?: string;
  closing?: string;
  rawContent?: string;
}

const ResultsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [personalityType, setPersonalityType] = useState<string>('');
  const [traitPercentages, setTraitPercentages] = useState<Record<string, number>>({});
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const answersStr = localStorage.getItem('gdgenius-quiz-answers');
    
    if (!answersStr) {
      navigate('/');
      return;
    }

    const answers = JSON.parse(answersStr);
    const scores = calculateScores(answers, questions);
    const dominant = getDominantPersonality(scores);
    const percentages = getTraitPercentages(scores);

    setPersonalityType(dominant);
    setTraitPercentages(percentages);

    // Fetch AI analysis
    fetchAIAnalysis(dominant, answers);
  }, [navigate]);

  const fetchAIAnalysis = async (type: string, answers: any) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: funcError } = await supabase.functions.invoke('generate-personality-analysis', {
        body: { personalityType: type, answers }
      });

      if (funcError) throw funcError;

      if (data?.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        throw new Error('No analysis data received');
      }
    } catch (err) {
      console.error('Error fetching AI analysis:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate analysis');
      toast({
        title: "Error",
        description: "Failed to generate AI analysis. Showing basic results.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetake = () => {
    localStorage.removeItem('gdgenius-quiz-answers');
    localStorage.removeItem('gdgenius-quiz-progress');
    navigate('/quiz');
  };

  if (!personalityType) return null;

  const personality = personalityTypes[personalityType as keyof typeof personalityTypes];

  return (
    <div className="min-h-screen relative">
      <FloatingParticles />
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <PersonalityCard personalityType={personalityType} />

          {isLoading && (
            <div className="glass-card p-12 rounded-2xl text-center mb-8">
              <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
              <h3 className="text-xl font-bold mb-2">Generating Your Personalized Analysis...</h3>
              <p className="text-muted-foreground">Our AI is crafting insights just for you</p>
            </div>
          )}

          {error && (
            <div className="glass-card p-8 rounded-2xl mb-8 border-destructive/50">
              <p className="text-destructive mb-4">⚠️ {error}</p>
              <Button
                onClick={() => {
                  const answers = JSON.parse(localStorage.getItem('gdgenius-quiz-answers') || '{}');
                  fetchAIAnalysis(personalityType, answers);
                }}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </Button>
            </div>
          )}

          {!isLoading && aiAnalysis && (
            <div className="space-y-6 mb-8">
              {/* Strengths as visual cards */}
              {aiAnalysis.strengths && aiAnalysis.strengths.length > 0 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Your Superpowers
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {aiAnalysis.strengths.slice(0, 6).map((strength, index) => (
                      <div key={index} className="glass-card p-4 rounded-xl hover:scale-105 transition-transform">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{index + 1}</span>
                          </div>
                          <p className="text-sm font-medium">{strength}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Paths as icon cards */}
              {aiAnalysis.careerPaths && aiAnalysis.careerPaths.length > 0 && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">Ideal Career Paths</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {aiAnalysis.careerPaths.map((career, index) => (
                      <div key={index} className="glass-card p-6 rounded-xl text-center hover:scale-105 transition-transform">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{career.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">{career.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Recommendations as badge grid */}
              {aiAnalysis.learningRecommendations && aiAnalysis.learningRecommendations.length > 0 && (
                <div className="glass-card p-6 rounded-2xl animate-fade-in">
                  <h2 className="text-xl font-bold mb-4">Growth Areas</h2>
                  <div className="flex flex-wrap gap-2">
                    {aiAnalysis.learningRecommendations.map((rec, index) => 
                      rec.items?.slice(0, 3).map((item, itemIndex) => (
                        <div key={`${index}-${itemIndex}`} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
                          {item.length > 40 ? item.substring(0, 40) + '...' : item}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <TraitChart scores={traitPercentages} />

          <div className="glass-card p-8 rounded-2xl mt-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Share Your Results</h2>
            <ShareButtons personalityName={personality.name} />
          </div>

          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              onClick={handleRetake}
              variant="outline"
              className="glass-card gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Retake Quiz
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsPage;