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
            <div className="space-y-8 mb-8">
              {/* Introduction */}
              {aiAnalysis.introduction && (
                <div className="glass-card p-8 rounded-2xl animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">Your Personality Profile</h2>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {aiAnalysis.introduction}
                    </p>
                  </div>
                </div>
              )}

              {/* Raw content fallback */}
              {aiAnalysis.rawContent && !aiAnalysis.introduction && (
                <div className="glass-card p-8 rounded-2xl animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">Your Personality Analysis</h2>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                      {aiAnalysis.rawContent}
                    </p>
                  </div>
                </div>
              )}

              {/* Strengths */}
              {aiAnalysis.strengths && aiAnalysis.strengths.length > 0 && (
                <div className="glass-card p-8 rounded-2xl animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Your Superpowers 💪</h2>
                  <ul className="space-y-3">
                    {aiAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-primary text-xl">✓</span>
                        <span className="text-foreground/90">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Career Paths */}
              {aiAnalysis.careerPaths && aiAnalysis.careerPaths.length > 0 && (
                <div className="glass-card p-8 rounded-2xl animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Ideal Career Paths 🚀</h2>
                  <div className="space-y-4">
                    {aiAnalysis.careerPaths.map((career, index) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <h3 className="font-bold text-lg mb-1">{career.title}</h3>
                        <p className="text-muted-foreground">{career.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Recommendations */}
              {aiAnalysis.learningRecommendations && aiAnalysis.learningRecommendations.length > 0 && (
                <div className="glass-card p-8 rounded-2xl animate-fade-in">
                  <h2 className="text-2xl font-bold mb-6">Learning & Growth 📚</h2>
                  <div className="space-y-6">
                    {aiAnalysis.learningRecommendations.map((rec, index) => (
                      <div key={index}>
                        <h3 className="font-bold text-primary mb-3">{rec.category}</h3>
                        <ul className="space-y-2 ml-4">
                          {rec.items?.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <span className="text-secondary">•</span>
                              <span className="text-foreground/90">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Dynamics */}
              {aiAnalysis.teamDynamics && (
                <div className="glass-card p-8 rounded-2xl animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">Team Dynamics 👥</h2>
                  <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                    {aiAnalysis.teamDynamics}
                  </p>
                </div>
              )}

              {/* Closing */}
              {aiAnalysis.closing && (
                <div className="glass-card p-8 rounded-2xl text-center animate-fade-in bg-gradient-to-br from-primary/10 to-secondary/10">
                  <p className="text-lg text-foreground/90 leading-relaxed italic">
                    "{aiAnalysis.closing}"
                  </p>
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