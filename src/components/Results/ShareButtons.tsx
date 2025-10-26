import { Button } from '@/components/ui/button';
import { Share2, Download, Twitter, Linkedin, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  personalityName: string;
}

export const ShareButtons = ({ personalityName }: ShareButtonsProps) => {
  const { toast } = useToast();

  const shareText = `I just discovered I'm ${personalityName} on the GDGenius IT Personality Quiz! 🚀 Find out yours:`;
  const shareUrl = window.location.origin;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    };

    if (urls[platform]) {
      window.open(urls[platform], '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "Share your results with friends",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Coming soon!",
      description: "PDF download feature will be available soon",
    });
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      <Button
        variant="outline"
        onClick={() => handleShare('twitter')}
        className="glass-card gap-2"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        onClick={() => handleShare('linkedin')}
        className="glass-card gap-2"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        onClick={() => handleShare('facebook')}
        className="glass-card gap-2"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>

      <Button
        variant="outline"
        onClick={handleCopyLink}
        className="glass-card gap-2"
      >
        <Share2 className="w-4 h-4" />
        Copy Link
      </Button>

      <Button
        variant="outline"
        onClick={handleDownload}
        className="glass-card gap-2"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </Button>
    </div>
  );
};