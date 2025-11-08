import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventDetail } from '@/types/event';
import { Share2, Copy, Facebook, X, Instagram, MessageCircle, Check } from 'lucide-react';

interface ShareButtonsProps {
  event: EventDetail;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ event }) => {
  const [copied, setCopied] = useState(false);

  const eventUrl = typeof window !== 'undefined' ? window.location.href : '';
  const eventTitle = `${event.title_zh} - ${event.date}`;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventUrl)}`,
    instagram: `https://www.instagram.com/`, // Instagram doesn't support direct URL sharing, opens Instagram app
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(eventUrl)}&text=${encodeURIComponent(eventTitle)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${eventTitle} ${eventUrl}`)}`
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          分享活動
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Social Media Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-blue-500/10 hover:border-blue-500/30"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span className="text-xs">Facebook</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('instagram')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-pink-500/10 hover:border-pink-500/30"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span className="text-xs">Instagram</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('x')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-gray-800/10 hover:border-gray-800/30"
            >
              <X className="w-4 h-4 text-gray-800 dark:text-gray-200" />
              <span className="text-xs">X</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('whatsapp')}
              className="flex flex-col items-center gap-1 h-auto py-3 hover:bg-green-500/10 hover:border-green-500/30"
            >
              <MessageCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs">WhatsApp</span>
            </Button>
          </div>

          {/* Copy Link Button */}
          <Button
            variant="outline"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-500" />
                <span>已複製連結</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>複製連結</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareButtons;